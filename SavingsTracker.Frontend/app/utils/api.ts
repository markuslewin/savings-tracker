import { error, success } from "@/app/utils/result";
import { Sort } from "@/app/utils/sort";
import { parseSetCookie, serialize } from "cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";

const frontendAuthCookieName = "SavingsTracker.Auth";
const apiAuthCookieName = ".AspNetCore.Identity.Application";

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
    const json = z
      .object({
        errors: z
          .object({
            fullName: z.array(z.string()),
            email: z.array(z.string()),
            password: z.array(z.string()),
          })
          .partial(),
      })
      .parse(await response.json());
    return { status: response.status, json } as const;
  }
  if (!response.ok) throw new Error(`Status code ${response.status}`);
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
  if (response.status === 401) {
    return error(new Error("Invalid email or password"));
  }
  if (!response.ok) throw new Error(`Status code ${response.status}`);

  const setCookies = response.headers.getSetCookie();
  for (const setCookie of setCookies) {
    const parsed = parseSetCookie(setCookie);
    if (parsed.name === apiAuthCookieName) {
      return success({ setCookie: parsed });
    }
  }
  return error(new Error("No Set-Cookie found."));
};

export const logOut = async ({ cookie }: { cookie: string }) => {
  const response = await fetch(new URL("accounts/logout", getBase()), {
    method: "POST",
    headers: { cookie },
  });
  if (!response.ok) throw new Error(`Status code ${response.status}`);

  const setCookies = response.headers.getSetCookie();
  for (const setCookie of setCookies) {
    const parsed = parseSetCookie(setCookie);
    if (parsed.name === apiAuthCookieName) {
      return success({ setCookie: parsed });
    }
  }
  return error(new Error("No Set-Cookie found."));
};

export const getUser = async ({ cookie }: { cookie: string }) => {
  const response = await fetch(new URL("accounts/info", getBase()), {
    headers: {
      cookie,
    },
  });
  if (!response.ok) throw new Error(`Status code ${response.status}`);

  const json = await response.json();
  const user = userSchema.parse(json);
  return user;
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
  if (!response.ok) throw new Error(`Status code: ${response.status}`);
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
  if (!response.ok) throw new Error(`Status code ${response.status}`);
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
  if (!response.ok) throw new Error(`Status code ${response.status}`);

  const json = await response.json();
  const goals = goalsSchema.parse(json);
  return goals;
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
  if (response.status === 401) return { status: response.status } as const;
  if (response.status === 404) return { status: response.status } as const;
  if (!response.ok) throw new Error(`Status code ${response.status}`);

  const json = await response.json();
  const goal = goalSchema.parse(json);
  return { status: 200, json: goal } as const;
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
  if (!response.ok) throw new Error(`Status code ${response.status}`);

  const json = await response.json();
  const data = z
    .object({
      id: z.number(),
    })
    .parse(json);
  return success(data);
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
  if (!response.ok) throw new Error(`Status code ${response.status}`);
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
  if (!response.ok) throw new Error(`Status code ${response.status}`);
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
  if (!response.ok) throw new Error(`Status code ${response.status}`);
};
