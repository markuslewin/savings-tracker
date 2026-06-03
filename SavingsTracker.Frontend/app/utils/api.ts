import { error, success } from "@/app/utils/result";
import { serialize, parseSetCookie } from "cookie";
import { cookies } from "next/headers";
import * as z from "zod";

const frontendAuthCookieName = "SavingsTracker.Auth";
const apiAuthCookieName = ".AspNetCore.Identity.Application";

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

const goalsSchema = z.array(goalSchema);

export const getAuthCookie = async () => {
  const cookie = (await cookies()).get(frontendAuthCookieName);
  if (cookie === undefined) {
    return null;
  }
  return serialize({ ...cookie, name: apiAuthCookieName });
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
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ fullName, email, password }),
  });
  if (!response.ok) {
    throw new Error("Failed to register account.");
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
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.status === 401) {
    return error(new Error("Invalid email or password"));
  }
  if (!response.ok) {
    throw new Error("Failed to login.");
  }

  const setCookies = response.headers.getSetCookie();
  for (const setCookie of setCookies) {
    const parsed = parseSetCookie(setCookie);
    if (parsed.name === apiAuthCookieName) {
      return success({ setCookie: parsed });
    }
  }
  return error(new Error("No Set-Cookie found."));
};

export const getGoals = async ({ cookie }: { cookie: string | null }) => {
  const response = await fetch(new URL("goals", getBase()), {
    headers: {
      ...(cookie === null ? {} : { cookie }),
    },
  });
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
  if (response.status === 404) return success(null);
  if (!response.ok) return error(new Error("Unsuccessful status code"));

  const json = await response.json();
  const goal = goalSchema.parse(json);
  return success(goal);
};

export const createGoal = async ({
  cookie,
  data: { name, target },
}: {
  cookie: string | null;
  data: {
    name: string;
    target: number;
  };
}) => {
  const response = await fetch(new URL("goals", getBase()), {
    method: "post",
    headers: {
      "content-type": "application/json",
      ...(cookie === null ? {} : { cookie }),
    },
    body: JSON.stringify({ name, target }),
  });
  if (!response.ok) return error(new Error("Unsuccessful status code"));

  const json = await response.json();
  const data = z
    .object({
      id: z.number(),
    })
    .parse(json);
  return success(data);
};
