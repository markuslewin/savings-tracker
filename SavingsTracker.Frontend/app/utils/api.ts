import { apiAuthCookieName, frontendAuthCookieName } from "@/app/utils/cookie";
import { isoDateToDateOnly } from "@/app/utils/date";
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
  deadline: z.nullable(
    z.string().transform((val, ctx) => {
      const result = isoDateToDateOnly(val);
      if (result === null) {
        ctx.issues.push({
          code: "custom",
          input: val,
          message: "Invalid format",
        });
        return z.NEVER;
      }
      return result;
    }),
  ),
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

export const parseValidationProblem = <T extends string>(
  keys: readonly T[],
  data: unknown,
) => {
  return z
    .object({
      errors: z.partialRecord(z.enum(keys), z.array(z.string())),
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
  switch (response.status) {
    case 200:
      return { status: response.status } as const;
    case 400:
      const json = parseValidationProblem(
        ["fullName", "email", "password"],
        await response.json(),
      );
      return { status: response.status, json } as const;
    default:
      throw new Error(`Unexpected status code ${response.status}`);
  }
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
  switch (response.status) {
    case 200:
      const setCookies = response.headers.getSetCookie();
      for (const setCookie of setCookies) {
        const parsed = parseSetCookie(setCookie);
        if (parsed.name === apiAuthCookieName) {
          return {
            status: response.status,
            data: { setCookie: parsed },
          } as const;
        }
      }
      throw new Error("No Set-Cookie");
    case 400:
      const json = parseValidationProblem(
        ["email", "password"],
        await response.json(),
      );
      return { status: response.status, json } as const;
    case 401:
      return { status: response.status } as const;
    default:
      throw new Error(`Unexpected status code: ${response.status}`);
  }
};

export const logOut = async ({ cookie }: { cookie: string }) => {
  const response = await fetch(new URL("accounts/logout", getBase()), {
    method: "POST",
    headers: { cookie },
  });
  switch (response.status) {
    case 200:
      const setCookies = response.headers.getSetCookie();
      for (const setCookie of setCookies) {
        const parsed = parseSetCookie(setCookie);
        if (parsed.name === apiAuthCookieName) {
          return {
            status: response.status,
            data: { setCookie: parsed },
          } as const;
        }
      }
      throw new Error("No Set-Cookie");
    default:
      throw new Error(`Unexpected status code ${response.status}`);
  }
};

export const getUser = async ({ cookie }: { cookie: string }) => {
  const response = await fetch(new URL("accounts/info", getBase()), {
    headers: {
      cookie,
    },
  });
  switch (response.status) {
    case 200:
      const json = userSchema.parse(await response.json());
      return { status: response.status, json } as const;
    case 401:
      return { status: response.status } as const;
    default:
      throw new Error(`Unexpected status code ${response.status}`);
  }
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
  switch (response.status) {
    case 204:
      return { status: response.status } as const;
    case 400:
      const json = parseValidationProblem(
        ["fullName", "email"],
        await response.json(),
      );
      return { status: response.status, json } as const;
    case 401:
      return { status: response.status } as const;
    default:
      throw new Error(`Unexpected status code: ${response.status}`);
  }
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
      return { status: response.status } as const;
    case 400:
      const json = parseValidationProblem(["password"], await response.json());
      return { status: response.status, json } as const;
    case 401:
      return { status: response.status } as const;
    default:
      throw new Error(`Unexpected status code ${response.status}`);
  }
};

export const forgotPassword = async ({
  data: { email },
}: {
  data: { email: string };
}) => {
  const response = await fetch(new URL("accounts/forgotPassword", getBase()), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  switch (response.status) {
    case 200:
      return { status: response.status };
    case 400:
      const json = parseValidationProblem(["email"], await response.json());
      return { status: response.status, json };
    default:
      throw new Error(`Unexpected status code ${response.status}`);
  }
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
    case 200:
      return {
        status: response.status,
        json: goalsSchema.parse(await response.json()),
      } as const;
    case 401:
      return { status: response.status } as const;
    default:
      throw new Error(`Unexpected status code ${response.status}`);
  }
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
        status: response.status,
        json: goalSchema.parse(await response.json()),
      } as const;
    case 401:
      return { status: response.status } as const;
    case 404:
      return { status: response.status } as const;
    default:
      throw new Error(`Unexpected status code ${response.status}`);
  }
};

export const createGoal = async ({
  cookie,
  data: { name, target, deadline },
}: {
  cookie: string;
  data: {
    name: string;
    target: string;
    deadline: string;
  };
}) => {
  const response = await fetch(new URL("goals", getBase()), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie,
    },
    body: JSON.stringify({ name, target, deadline }),
  });
  switch (response.status) {
    case 201:
      return {
        status: response.status,
        json: z
          .object({
            id: z.number(),
          })
          .parse(await response.json()),
      } as const;
    case 400:
      return {
        status: response.status,
        json: parseValidationProblem(["name", "target"], await response.json()),
      } as const;
    case 401:
      return { status: response.status } as const;
    default:
      throw new Error(`Unexpected status code ${response.status}`);
  }
};

export const updateGoal = async ({
  cookie,
  data: { id, name, target, deadline },
}: {
  cookie: string;
  data: {
    id: number;
    name: string;
    target: string;
    deadline: string;
  };
}) => {
  const response = await fetch(new URL(`/goals/${id}`, getBase()), {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      cookie,
    },
    body: JSON.stringify({ name, target, deadline }),
  });
  switch (response.status) {
    case 204:
      return { status: response.status } as const;
    case 400:
      const json = parseValidationProblem(
        ["name", "target"],
        await response.json(),
      );
      return { status: response.status, json } as const;
    case 401:
      return { status: response.status } as const;
    case 404:
      return { status: response.status } as const;
    default:
      throw new Error(`Unexpected status code ${response.status}`);
  }
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
  switch (response.status) {
    case 204:
      return { status: response.status } as const;
    case 401:
      return { status: response.status } as const;
    case 404:
      return { status: response.status } as const;
    default:
      throw new Error(`Unexpected status code ${response.status}`);
  }
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
  switch (response.status) {
    case 204:
      return { status: response.status } as const;
    case 400:
      const json = parseValidationProblem(
        ["amount", "note"],
        await response.json(),
      );
      return { status: response.status, json } as const;
    case 401:
      return { status: response.status } as const;
    case 404:
      return { status: response.status } as const;
    default:
      throw new Error(`Unexpected status code ${response.status}`);
  }
};
