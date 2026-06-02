import { error, success } from "@/app/utils/result";
import * as z from "zod";

const base = process.env.GOALSERVICE_HTTPS;
if (base === undefined) {
  throw new Error("Missing env `GOALSERVICE_HTTPS`.");
}

export const register = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(new URL("accounts/register", base), {
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
  const response = await fetch(new URL("accounts/login", base), {
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
  return success({ setCookies });
};

export const getMessage = async ({ cookie }: { cookie: string | null }) => {
  const response = await fetch(new URL("accounts/secret", base), {
    headers:
      cookie === null
        ? undefined
        : {
            cookie,
          },
  });
  if (!response.ok) {
    return null;
  }
  return await response.text();
};

export const getGoals = async () => {
  const response = await fetch(new URL("goals", base));
  const json = await response.json();
  const goals = z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        target: z.number(),
        deadline: z.nullable(z.coerce.date()),
        deposits: z.array(
          z.object({
            id: z.number(),
            amount: z.number(),
            note: z.string(),
            createdAt: z.coerce.date(),
          }),
        ),
      }),
    )
    .parse(json);
  return goals;
};

export const getGoal = async (id: number) => {
  const response = await fetch(new URL(`goals/${id}`, base));
  if (response.status === 404) return success(null);
  if (!response.ok) return error(new Error("Unsuccessful status code"));

  const json = await response.json();
  const goal = z
    .object({
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
    })
    .parse(json);
  return success(goal);
};

export const createGoal = async ({
  name,
  target,
}: {
  name: string;
  target: number;
}) => {
  const response = await fetch(new URL("goals", base), {
    method: "post",
    headers: {
      "content-type": "application/json",
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
