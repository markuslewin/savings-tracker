import AxeBuilder from "@axe-core/playwright";
import { faker } from "@faker-js/faker";
import { expect, Page, test } from "@playwright/test";

const validPassword = "P@ssw0rd";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/next app/i);
});

test("/ a11y", async ({ page }) => {
  await page.goto("/");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

test("/signup a11y", async ({ page }) => {
  await page.goto("/signup");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

test("/signin a11y", async ({ page }) => {
  await page.goto("/signin");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

test("/goals a11y", async ({ page }) => {
  await page.goto("/goals/1");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

test("sign up", async ({ page }) => {
  await page.goto("/signup");
  await page
    .getByRole("textbox", { name: "name" })
    .fill(faker.person.fullName());
  await page
    .getByRole("textbox", { name: "email" })
    .fill(faker.internet.email());
  await page.getByRole("textbox", { name: "password" }).fill(validPassword);
  await page.getByRole("button", { name: "create" }).click();

  await expect(page).toHaveURL("/signin");
});

test("sign in", async ({ page }) => {
  const { email } = await register(page);
  await page.goto("/signin");
  await page.getByRole("textbox", { name: "email" }).fill(email);
  await page.getByRole("textbox", { name: "password" }).fill(validPassword);
  await page.getByRole("button", { name: "sign in" }).click();

  await expect(page).toHaveURL("/");
  // todo: Check avatar
});

test("new user has no goals", async ({ page }) => {
  await signIn(page);
  await page.goto("/");

  await expect(page.getByTestId("total-savings")).toHaveText("$0");
});

const signIn = async (page: Page) => {
  const user = await register(page);
  await page.goto("/signin");
  await page.getByRole("textbox", { name: "email" }).fill(user.email);
  await page.getByRole("textbox", { name: "password" }).fill(validPassword);
  await page.getByRole("button", { name: "sign in" }).click();

  return user;
};

const register = async (page: Page) => {
  const fullName = faker.person.fullName();
  const email = faker.internet.email();

  await page.goto("/signup");
  await page.getByRole("textbox", { name: "name" }).fill(fullName);
  await page.getByRole("textbox", { name: "email" }).fill(email);
  await page.getByRole("textbox", { name: "password" }).fill(validPassword);
  await page.getByRole("button", { name: "create" }).click();

  return { fullName, email };
};
