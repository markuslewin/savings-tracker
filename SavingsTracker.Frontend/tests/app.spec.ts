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
  await expect(page.getByTestId("active-goals")).toHaveText("0");
  await expect(page.getByTestId("goals-completed")).toHaveText("0");
  await expect(page.getByTestId("deposits")).toHaveText(/no deposits/i);
  await expect(
    page.getByTestId("goals").getByRole("heading", { name: "no goals" }),
  ).toBeAttached();
});

test("new user can create their first goal", async ({ page }) => {
  const name = faker.food.dish();

  await signIn(page);
  await page.goto("/");
  await page.getByRole("button", { name: "first goal" }).click();

  const dialog = page.getByRole("dialog", { name: "new goal" });
  await dialog.getByRole("textbox", { name: "name" }).fill(name);
  await dialog.getByRole("textbox", { name: "target" }).fill("1234");
  await dialog.getByRole("button", { name: "create" }).click();

  await expect(page).toHaveURL(new URLPattern({ pathname: "/goals/*" }));
  await expect(page.getByRole("heading", { name })).toBeAttached();
  await expect(page.getByTestId("target")).toHaveText(/\$1,234/i);
});

test("user can create goal", async ({ page }) => {
  const name = faker.food.dish();

  await signIn(page);
  await page.goto("/");
  await page.getByRole("button", { name: "new goal" }).click();

  const dialog = page.getByRole("dialog", { name: "new goal" });
  await dialog.getByRole("textbox", { name: "name" }).fill(name);
  await dialog.getByRole("textbox", { name: "target" }).fill("100");
  await dialog.getByRole("button", { name: "create" }).click();

  await expect(page).toHaveURL(new URLPattern({ pathname: "/goals/*" }));
  await expect(page.getByRole("heading", { name })).toBeAttached();
  await expect(page.getByTestId("target")).toHaveText(/\$100/i);
});

test("filter goals", async ({ page }) => {
  await signIn(page);
  await createGoal(page, { name: "In progress", target: 10 });
  await addDeposit(page, { amount: 5 });
  await createGoal(page, { name: "Completed", target: 10 });
  await addDeposit(page, { amount: 10 });
  await createGoal(page, { name: "Not started", target: 10 });

  await page.goto("/");

  const goals = page
    .getByRole("list", { name: "your goals" })
    .getByRole("heading");
  await expect(goals).toHaveText(["In progress", "Completed", "Not started"]);

  await page.getByRole("button", { name: "filters" }).click();
  await page.getByRole("radio", { name: "in progress" }).click({ force: true });
  await page.keyboard.press("Escape");

  await expect(goals).toHaveText(["In progress"]);

  await page.getByRole("button", { name: "filters" }).click();
  await page.getByRole("radio", { name: "completed" }).click({ force: true });
  await page.keyboard.press("Escape");

  await expect(goals).toHaveText(["Completed"]);

  await page.getByRole("button", { name: "filters" }).click();
  await page.getByRole("radio", { name: "not started" }).click({ force: true });
  await page.keyboard.press("Escape");

  await expect(goals).toHaveText(["Not started"]);

  await page.getByRole("button", { name: "filters" }).click();
  await page.getByRole("radio", { name: "all goals" }).click({ force: true });
  await page.keyboard.press("Escape");

  await expect(goals).toHaveText(["In progress", "Completed", "Not started"]);
});

const signIn = async (page: Page) => {
  const user = await register(page);
  await page.goto("/signin");
  await page.getByRole("textbox", { name: "email" }).fill(user.email);
  await page.getByRole("textbox", { name: "password" }).fill(validPassword);
  await page.getByRole("button", { name: "sign in" }).click();
  // Wait for cookie
  await page.waitForURL("/");

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

const createGoal = async (
  page: Page,
  { name, target }: { name: string; target: number },
) => {
  await page.goto("/?dialog=new-goal");

  const dialog = page.getByRole("dialog", { name: "new goal" });
  await dialog.getByRole("textbox", { name: "name" }).fill(name);
  await dialog.getByRole("textbox", { name: "target" }).fill(target.toString());
  await dialog.getByRole("button", { name: "create" }).click();
  await page.waitForURL(new URLPattern({ pathname: "/goals/*" }));
};

const addDeposit = async (page: Page, { amount }: { amount: number }) => {
  await page.getByRole("textbox", { name: "amount" }).fill(amount.toString());
  await page.getByRole("button", { name: "add" }).click();
};
