import { validPassword } from "@/tests/utils";
import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

test("add deposit validation", async ({ request }) => {
  const email = faker.internet.email();
  await request.post("/accounts/register", {
    data: {
      fullName: faker.person.fullName(),
      email,
      password: validPassword,
    },
  });
  await request.post("/accounts/login", {
    data: {
      email,
      password: validPassword,
    },
  });
  const goalResponse = await request.post("/goals", {
    data: {
      name: faker.food.dish(),
      target: faker.finance.amount(),
    },
  });
  const goalId = (await goalResponse.json()).id;
  const depositResponse = await request.post(`/goals/${goalId}/deposits`, {
    data: {
      amount: "100.123",
    },
  });

  expect(depositResponse.status()).toBe(400);
  expect(depositResponse.json()).resolves.toMatchObject({
    errors: {
      amount: ["Invalid decimals"],
    },
  });
});
