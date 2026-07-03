import { register } from "@/tests/utils";
import { faker } from "@faker-js/faker";
import { APIRequestContext, expect, test } from "@playwright/test";

test("register validation", async ({ request }) => {
  const response = await request.post("/accounts/register", {
    data: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const { errors } = await response.json();

  expect(response.status()).toBe(400);
  expect(errors).toStrictEqual({
    fullName: ["Required"],
    email: ["Required"],
    password: ["Required"],
  });
});

test("add goal validation", async ({ request }) => {
  await signIn(request);
  const response = await request.post("/goals", {
    data: {
      name: "",
      target: "",
    },
  });
  const { errors } = await response.json();

  expect(response.status()).toBe(400);
  expect(errors).toStrictEqual({
    name: ["Required"],
    target: ["Required"],
  });
});

test("add deposit validation", async ({ request }) => {
  await signIn(request);
  const { id } = await (
    await request.post("/goals", {
      data: {
        name: faker.food.dish(),
        target: faker.finance.amount(),
      },
    })
  ).json();

  const response = await request.post(`/goals/${id}/deposits`, {
    data: {
      amount: "",
      note: "",
    },
  });
  const { errors } = await response.json();

  expect(response.status()).toBe(400);
  expect(errors).toStrictEqual({
    amount: ["Required"],
  });
});

const signIn = async (request: APIRequestContext) => {
  const user = await register();
  await request.post("/accounts/login", {
    data: {
      email: user.email,
      password: user.password,
    },
  });

  return user;
};
