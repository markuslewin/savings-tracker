import { validPassword } from "@/tests/utils";
import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

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

test("add deposit validation", async ({ request }) => {
  const email = faker.internet.email();
  const password = validPassword;

  await request.post("/accounts/register", {
    data: {
      fullName: faker.person.fullName(),
      email,
      password,
    },
  });
  await request.post("/accounts/login", {
    data: {
      email,
      password,
    },
  });
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
