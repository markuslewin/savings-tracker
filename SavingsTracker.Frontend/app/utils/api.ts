import { apiAuthCookieName, frontendAuthCookieName } from "@/app/utils/cookie";
import { error, success } from "@/app/utils/result";
import { Sort } from "@/app/utils/sort";
import { parseSetCookie, serialize } from "cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";

const userSchema = z.object({
  fullName: z.string(),
  email: z.string(),
});
export type User = z.infer<typeof userSchema>;

const goalSchema = z.object({
  id: z.number(),
  name: z.string(),
  target: z.number(),
  deadline: z.nullable(z.coerce.date()),
  createdAt: z.coerce.date(),
  deposits: z.array(
    z.object({
      id: z.number(),
      amount: z.number(),
      note: z.string(),
      createdAt: z.coerce.date(),
    }),
  ),
});
export type Goal = z.infer<typeof goalSchema>;
export type Deposit = Goal["deposits"][number];

const goalsSchema = z.array(goalSchema);

export const getAuthCookie = async () => {
  const cookie = (await cookies()).get(frontendAuthCookieName);
  if (cookie === undefined) {
    return null;
  }
  return serialize({ ...cookie, name: apiAuthCookieName });
};

export const ensureAuthCookie = async () => {
  const cookie = await getAuthCookie();
  if (cookie === null) redirect("/signin");
  return cookie;
};

export const setAuthCookie = async (
  cookie: ReturnType<typeof parseSetCookie>,
) => {
  (await cookies()).set({
    ...cookie,
    name: frontendAuthCookieName,
    value: cookie.value ?? "",
  });
};

const getBase = () => {
  const base = process.env.GOALSERVICE_HTTPS;
  if (base === undefined) {
    throw new Error("Missing env `GOALSERVICE_HTTPS`.");
  }
  return base;
};

const parseValidationProblem = <T extends string>(
  keys: readonly T[],
  data: unknown,
) => {
  return z
    .object({
      errors: z.record(z.enum(keys), z.array(z.string())),
    })
    .parse(data);
};

export const register = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(new URL("accounts/register", getBase()), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ fullName, email, password }),
  });
  if (response.status === 400) {
    const json = parseValidationProblem(
      ["fullName", "email", "password"],
      await response.json(),
    );
    return { status: response.status, json } as const;
  }
  if (!response.ok)
    throw new Error(`Unexpected status code ${response.status}`);
};

export const logIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch(new URL("accounts/login", getBase()), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.status === 400) {
    const json = parseValidationProblem(
      ["email", "password"],
      await response.json(),
    );
    return { status: response.status, json } as const;
  }
  if (response.status === 401) {
    return { status: response.status } as const;
  }
  if (response.status !== 204)
    throw new Error(`Unexpected status code: ${response.status}`);

  const setCookies = response.headers.getSetCookie();
  for (const setCookie of setCookies) {
    const parsed = parseSetCookie(setCookie);
    if (parsed.name === apiAuthCookieName) {
      return { status: response.status, data: { setCookie: parsed } } as const;
    }
  }
  throw new Error("No Set-Cookie");
};

export const logOut = async ({ cookie }: { cookie: string }) => {
  const response = await fetch(new URL("accounts/logout", getBase()), {
    method: "POST",
    headers: { cookie },
  });
  if (response.status !== 204)
    throw new Error(`Unexpected status code ${response.status}`);

  const setCookies = response.headers.getSetCookie();
  for (const setCookie of setCookies) {
    const parsed = parseSetCookie(setCookie);
    if (parsed.name === apiAuthCookieName) {
      return { status: response.status, data: { setCookie: parsed } } as const;
    }
  }
  throw new Error("No Set-Cookie");
};

export const getUser = async ({ cookie }: { cookie: string }) => {
  const response = await fetch(new URL("accounts/info", getBase()), {
    headers: {
      cookie,
    },
  });
  if (response.status !== 200)
    throw new Error(`Unexpected status code ${response.status}`);

  const json = userSchema.parse(await response.json());
  return { status: response.status, json } as const;
};

export const updateUser = async ({
  cookie,
  data: { fullName, email },
}: {
  cookie: string;
  data: { fullName: string; email: string };
}) => {
  const response = await fetch(new URL("/accounts/info", getBase()), {
    method: "POST",
    headers: { cookie, "content-type": "application/json" },
    body: JSON.stringify({ fullName, email }),
  });
  if (response.status === 400) {
    const json = parseValidationProblem(
      ["fullName", "email"],
      await response.json(),
    );
    return { status: response.status, json } as const;
  }
  if (response.status === 401) {
    return { status: response.status } as const;
  }
  if (response.status !== 204)
    throw new Error(`Unexpected status code: ${response.status}`);

  return { status: response.status } as const;
};

export const changePassword = async ({
  cookie,
  data: { password },
}: {
  cookie: string;
  data: { password: string };
}) => {
  const response = await fetch(new URL("accounts/changePassword", getBase()), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie,
    },
    body: JSON.stringify({ password }),
  });
  switch (response.status) {
    case 204:
      return { status: 204 } as const;
    case 400:
      const json = parseValidationProblem(["password"], await response.json());
      return { status: 400, json } as const;
    case 401:
      return { status: 401 } as const;
  }
  throw new Error(`Unexpected status code ${response.status}`);
};

export const getGoals = async ({
  cookie,
  data: { sort },
}: {
  cookie: string | null;
  data: { sort: Sort };
}) => {
  const response = await fetch(
    new URL(`goals?${new URLSearchParams({ sort })}`, getBase()),
    {
      headers: {
        ...(cookie === null ? {} : { cookie }),
      },
    },
  );
  switch (response.status) {
    case 204:
      return {
        status: 204,
        json: goalsSchema.parse(await response.json()),
      } as const;
    case 401:
      return { status: 401 } as const;
  }
  throw new Error(`Unexpected status code ${response.status}`);
};

export const getGoal = async ({
  cookie,
  data: { id },
}: {
  cookie: string | null;
  data: { id: number };
}) => {
  const response = await fetch(new URL(`goals/${id}`, getBase()), {
    headers: {
      ...(cookie === null ? {} : { cookie }),
    },
  });
  switch (response.status) {
    case 200:
      return {
        status: 200,
        json: goalSchema.parse(await response.json()),
      } as const;
    case 401:
      return { status: 401 } as const;
    case 404:
      return { status: 404 } as const;
  }
  throw new Error(`Unexpected status code ${response.status}`);
};

export const createGoal = async ({
  cookie,
  data: { name, target },
}: {
  cookie: string;
  data: {
    name: string;
    target: string;
  };
}) => {
  const response = await fetch(new URL("goals", getBase()), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie,
    },
    body: JSON.stringify({ name, target }),
  });
  switch (response.status) {
    case 201:
      return {
        status: 201,
        json: z
          .object({
            id: z.number(),
          })
          .parse(await response.json()),
      } as const;
    case 400:
      return {
        status: 400,
        json: parseValidationProblem(["name", "target"], await response.json()),
      } as const;
    case 401:
      return { status: 401 } as const;
  }
  throw new Error(`Unexpected status code ${response.status}`);
};

export const updateGoal = async ({
  cookie,
  data: { id, name, target },
}: {
  cookie: string;
  data: {
    id: number;
    name: string;
    target: string;
  };
}) => {
  const response = await fetch(new URL(`/goals/${id}`, getBase()), {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      cookie,
    },
    body: JSON.stringify({ name, target }),
  });
  if (response.status === 400) {
    const json = z
      .object({
        errors: z
          .object({
            name: z.array(z.string()),
            target: z.array(z.string()),
          })
          .partial(),
      })
      .parse(await response.json());
    return { status: response.status, json } as const;
  }
  if (!response.ok)
    throw new Error(`Unexpected status code ${response.status}`);
};

export const deleteGoal = async ({
  cookie,
  data: { id },
}: {
  cookie: string;
  data: { id: number };
}) => {
  const response = await fetch(new URL(`/goals/${id}`, getBase()), {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      cookie,
    },
  });
  if (!response.ok)
    throw new Error(`Unexpected status code ${response.status}`);
};

export const addDeposit = async ({
  cookie,
  data: { amount, goalId, note },
}: {
  cookie: string;
  data: { goalId: number; amount: string; note: string };
}) => {
  const response = await fetch(
    new URL(`/goals/${goalId}/deposits`, getBase()),
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        cookie,
      },
      body: JSON.stringify({ amount, note }),
    },
  );
  if (response.status === 400) {
    const json = z
      .object({
        errors: z
          .object({
            amount: z.array(z.string()),
            note: z.array(z.string()),
          })
          .partial(),
      })
      .parse(await response.json());
    return { status: response.status, json } as const;
  }
  if (!response.ok)
    throw new Error(`Unexpected status code ${response.status}`);
};
