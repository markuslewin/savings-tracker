import { faker } from "@faker-js/faker";
import { request } from "@playwright/test";

export const apiBase = "https://localhost:7105";

export const validPassword = "P@ssw0rd";

export const register = async () => {
  const fullName = faker.person.fullName();
  const email = faker.internet.email();
  const password = validPassword;

  const context = await request.newContext({ baseURL: apiBase });
  await context.post("/accounts/register", {
    data: {
      fullName,
      email,
      password,
    },
  });

  return { fullName, email, password };
};
