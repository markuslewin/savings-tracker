import { apiAuthCookieName, frontendAuthCookieName } from "@/app/utils/cookie";
import { getDatePart } from "@/app/utils/date";
import { apiBase, register, validPassword } from "@/tests/utils";
import AxeBuilder from "@axe-core/playwright";
import { faker } from "@faker-js/faker";
import { expect, Page, request, test } from "@playwright/test";
import * as z from "zod";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/home/i);
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

test("/new-password a11y", async ({ page }) => {
  await signIn(page);
  await page.goto("/new-password");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

test("/goals a11y", async ({ page }) => {
  await page.goto("/goals/1");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

test("/profile a11y", async ({ page }) => {
  await signIn(page);
  await page.goto("/profile");

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
  const { email } = await register();
  await page.goto("/signin");
  await page.getByRole("textbox", { name: "email" }).fill(email);
  await page.getByRole("textbox", { name: "password" }).fill(validPassword);
  await page.getByRole("button", { name: "sign in" }).click();

  await expect(page).toHaveURL("/");
  await expect(
    page.getByRole("button", { name: `signed in as ${email}` }),
  ).toBeAttached();
});

test("sign out", async ({ page }) => {
  await signIn(page);
  await page.goto("/");
  await page.getByRole("button", { name: "signed in as" }).click();
  await page.getByRole("button", { name: "sign out" }).click();

  await expect(page).toHaveURL("/signin");

  await page.goto("/");

  await expect(
    page.getByRole("button", { name: "signed in as" }),
  ).not.toBeAttached();
});

test("anonymous user gets redirected from profile", async ({ page }) => {
  await page.goto("/profile");

  await expect(page).toHaveURL("/signin");
});

test("user can edit profile", async ({ page }) => {
  const fullName = faker.person.fullName();
  const email = faker.internet.email();

  await signIn(page);
  await page.goto("/");
  await page.getByRole("button", { name: "signed in as" }).click();
  await page.getByRole("link", { name: "edit profile" }).click();
  await page.getByRole("textbox", { name: "full name" }).fill(fullName);
  await page.getByRole("textbox", { name: "email" }).fill(email);
  await page.getByRole("button", { name: "edit profile" }).click();
  await page.getByRole("button", { name: "signed in as" }).click();

  const popover = page.getByRole("dialog");
  await expect(popover.getByTestId("fullName")).toHaveText(fullName);
  await expect(popover.getByTestId("email")).toHaveText(email);
});

test("anonymous user gets redirected from new password", async ({ page }) => {
  await page.goto("/new-password");

  await expect(page).toHaveURL("/signin");
});

test("user can change password", async ({ page }) => {
  // const oldPassword = validPassword;
  const newPassword = "P@ssw0rd1";

  const { email } = await signIn(page);
  await page.goto("/");
  await page.getByRole("button", { name: "signed in as" }).click();
  await page.getByRole("link", { name: "change password" }).click();
  await page
    .getByRole("textbox", { name: "new password" })
    .first()
    .fill(newPassword);
  await page
    .getByRole("textbox", { name: "confirm new password" })
    .fill(newPassword);
  await page.getByRole("button", { name: "reset password" }).click();

  await expect(
    page.getByRole("heading", { name: "password reset" }),
  ).toBeAttached();

  await page.getByRole("link", { name: "sign in" }).click();
  await page.getByRole("textbox", { name: "email" }).fill(email);
  // await page.getByRole("textbox", { name: "password" }).fill(oldPassword);
  // await page.getByRole("button", { name: "sign in" }).click();

  // todo: Expect error message

  await page.getByRole("textbox", { name: "password" }).fill(newPassword);
  await page.getByRole("button", { name: "sign in" }).click();

  await expect(
    page.getByRole("button", { name: "signed in as" }),
  ).toBeAttached();
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

  await expect(page).toHaveTitle(new RegExp(name));
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

  await expect(page).toHaveTitle(new RegExp(name));
  await expect(page.getByRole("heading", { name })).toBeAttached();
  await expect(page.getByTestId("target")).toHaveText(/\$100/i);
});

test("user can create goal with deadline", async ({ page }) => {
  const name = faker.food.dish();

  await page.clock.setFixedTime(new Date("2024-02-02T10:30:00"));
  await signIn(page);
  await page.goto("/");
  await page.getByRole("button", { name: "new goal" }).click();

  const dialog = page.getByRole("dialog", { name: "new goal" });
  await dialog.getByRole("textbox", { name: "name" }).fill(name);
  await dialog.getByRole("textbox", { name: "target" }).fill("100");
  await dialog.getByRole("button", { name: "deadline" }).click();
  await page.getByRole("button", { name: "18" }).click();
  await dialog.getByRole("button", { name: "create" }).click();

  await expect(page).toHaveTitle(new RegExp(name));
  await expect(page.getByRole("heading", { name })).toBeAttached();
  await expect(page.getByTestId("target")).toHaveText(/\$100/i);
  await expect(page.getByTestId("deadline")).toHaveText(/18 feb 2024/i);
});

test("filter goals", async ({ page }) => {
  await signIn(page);
  const inProgressGoal = await createGoal(page, {
    name: "In progress",
    target: "10",
  });
  await addDeposit(page, { goalId: inProgressGoal.id, amount: 5 });
  const completedGoal = await createGoal(page, {
    name: "Completed",
    target: "10",
  });
  await addDeposit(page, { goalId: completedGoal.id, amount: 10 });
  await createGoal(page, { name: "Not started", target: "10" });

  await page.goto("/");

  const goals = page
    .getByRole("list", { name: "your goals" })
    .getByRole("heading");
  await expect(goals).toHaveText(["Not started", "Completed", "In progress"]);

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

  await expect(goals).toHaveText(["Not started", "Completed", "In progress"]);
});

test("always aggregate on total goals", async ({ page }) => {
  await signIn(page);
  // 2 goals in progress
  const oneGoal = await createGoal(page, { name: "One", target: "10" });
  await addDeposit(page, { goalId: oneGoal.id, amount: 1 });
  const twoGoal = await createGoal(page, { name: "Two", target: "10" });
  await addDeposit(page, { goalId: twoGoal.id, amount: 1 });

  await page.goto("/");

  await page.getByRole("button", { name: "filters" }).click();
  await page.getByRole("radio", { name: "not started" }).click({ force: true });
  await page.keyboard.press("Escape");

  await expect(page.getByTestId("total-savings")).toHaveText("$2");
  await expect(page.getByTestId("active-goals")).toHaveText("2");
  await expect(
    page.getByRole("list", { name: "monthly deposits" }).getByRole("listitem"),
  ).toHaveText([
    new RegExp("\\$0"),
    new RegExp("\\$0"),
    new RegExp("\\$0"),
    new RegExp("\\$0"),
    new RegExp("\\$0"),
    new RegExp("\\$0"),
    new RegExp("\\$0"),
    new RegExp("\\$0"),
    new RegExp("\\$0"),
    new RegExp("\\$0"),
    new RegExp("\\$0"),
    new RegExp("\\$2"),
  ]);
});

test("sort goals", async ({ page }) => {
  await signIn(page);
  const aGoal = await createGoal(page, { name: "A", target: "100" });
  await addDeposit(page, { goalId: aGoal.id, amount: 50 }); // Progress: 0.5
  const bGoal = await createGoal(page, { name: "B", target: "5" });
  await addDeposit(page, { goalId: bGoal.id, amount: 4 }); // Progress: 0.8
  const cGoal = await createGoal(page, { name: "C", target: "100" });
  await addDeposit(page, { goalId: cGoal.id, amount: 10 }); // Progress: 0.1

  await page.goto("/");

  const goals = page
    .getByRole("list", { name: "your goals" })
    .getByRole("heading");
  await expect(goals).toHaveText(["C", "B", "A"]);

  // todo: Deadline

  await page.getByRole("button", { name: "sort" }).click();
  await page
    .getByRole("radio", { name: "progress (highest first)" })
    .click({ force: true });
  await page.keyboard.press("Escape");

  await expect(goals).toHaveText(["B", "A", "C"]);

  await page.getByRole("button", { name: "sort" }).click();
  await page
    .getByRole("radio", { name: "progress (lowest first)" })
    .click({ force: true });
  await page.keyboard.press("Escape");

  await expect(goals).toHaveText(["C", "A", "B"]);

  await page.getByRole("button", { name: "sort" }).click();
  await page
    .getByRole("radio", { name: "amount saved" })
    .click({ force: true });
  await page.keyboard.press("Escape");

  await expect(goals).toHaveText(["A", "C", "B"]);

  await page.getByRole("button", { name: "sort" }).click();
  await page
    .getByRole("radio", { name: "alphabetical" })
    .click({ force: true });
  await page.keyboard.press("Escape");

  await expect(goals).toHaveText(["A", "B", "C"]);

  await page.getByRole("button", { name: "sort" }).click();
  await page
    .getByRole("radio", { name: "recently added" })
    .click({ force: true });
  await page.keyboard.press("Escape");

  await expect(goals).toHaveText(["C", "B", "A"]);
});

test("can go to goal", async ({ page }) => {
  const name = faker.food.dish();

  await signIn(page);
  await createGoal(page, { name });
  await page.goto("/");
  await page
    .getByRole("list", { name: "your goals" })
    .getByRole("link", { name })
    .click();

  await expect(page).toHaveTitle(new RegExp(name));
  await expect(page.getByRole("heading", { name, level: 1 })).toBeAttached();
});

test("anonymous user gets redirected when trying to edit a goal", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("list", { name: "your goals" })
    .getByRole("link")
    .first()
    .click();
  await page.getByRole("button", { name: "edit goal" }).click();

  await expect(page).toHaveURL("/signin");
});

test("can edit goal", async ({ page }) => {
  const name = faker.food.dish();
  const target = faker.finance.amount();

  await signIn(page);
  const goal = await createGoal(page);
  await page.goto(`/goals/${goal.id}`);
  await page.getByRole("button", { name: "edit" }).click();

  const dialog = page.getByRole("dialog", { name: "edit goal" });
  await expect(dialog.getByRole("textbox", { name: "name" })).toHaveValue(
    goal.name,
  );
  await expect(dialog.getByRole("textbox", { name: "target" })).toHaveValue(
    goal.target,
  );

  await dialog.getByRole("textbox", { name: "name" }).fill(name);
  await dialog.getByRole("textbox", { name: "target" }).fill(target);
  await dialog.getByRole("button", { name: "save" }).click();

  await expect(page.getByRole("heading", { name, level: 1 })).toBeAttached();
  await expect(page.getByTestId("target")).toHaveText(new RegExp(target));
});

test("can edit goal deadline", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-08-10T10:30:00"));
  await signIn(page);
  const goal = await createGoal(page, { deadline: "2025-01-01" });
  await page.goto(`/goals/${goal.id}`);
  await page.getByRole("button", { name: "edit" }).click();

  const dialog = page.getByRole("dialog", { name: "edit goal" });
  await dialog.getByRole("button", { name: "1 jan 2025" }).click();
  await page.getByRole("button", { name: "11" }).click();
  await dialog.getByRole("button", { name: "save" }).click();

  await expect(
    page.getByRole("heading", { name: goal.name, level: 1 }),
  ).toBeAttached();
  await expect(page.getByTestId("deadline")).toHaveText(/11 aug 2026/i);
});

test("anonymous user gets redirected when trying to delete a goal", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("list", { name: "your goals" })
    .getByRole("link")
    .first()
    .click();
  await page.getByRole("button", { name: "delete goal" }).click();

  await expect(page).toHaveURL("/signin");
});

test("can delete goal", async ({ page }) => {
  await signIn(page);
  const goal = await createGoal(page);
  await page.goto(`/goals/${goal.id}`);
  await page.getByRole("button", { name: "delete goal" }).click();

  const dialog = page.getByRole("alertdialog", { name: "delete" });
  await dialog.getByRole("button", { name: "delete goal" }).click();

  await expect(
    page.getByRole("heading", { name: "no goals yet" }),
  ).toBeAttached();
});

test("anonymous user gets redirected when trying to add a deposit", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("list", { name: "your goals" })
    .getByRole("link")
    .first()
    .click();
  // Ideally, we don't redirect _after_ they fill the form, but the form is right there, so...
  await page
    .getByRole("textbox", { name: "amount" })
    .fill(faker.finance.amount());
  await page.getByRole("button", { name: "add funds" }).click();

  await expect(page).toHaveURL("/signin");
});

test("can add deposits", async ({ page }) => {
  const note = faker.lorem.sentence();

  await signIn(page);
  const goal = await createGoal(page, { target: "100" });
  page.goto(`/goals/${goal.id}`);

  await expect(page.getByTestId("progress")).toHaveText("0%");
  await expect(page.getByTestId("remaining")).toHaveText(/\$100/);
  await expect(page.getByTestId("saved")).toHaveText(/\$0/);

  await page.getByRole("textbox", { name: "amount" }).fill("10.53");
  await page.getByRole("textbox", { name: "note" }).fill(note);
  await page.getByRole("button", { name: "add funds" }).click();

  const deposit = page
    .getByRole("list", { name: "deposits" })
    .getByRole("listitem")
    .first();
  await expect(deposit.getByTestId("note")).toHaveText(note);
  await expect(deposit.getByTestId("amount")).toHaveText(/\$10.53/);

  await expect(page.getByTestId("progress")).toHaveText("10%");
  await expect(page.getByTestId("remaining")).toHaveText(/\$89\.47/);
  await expect(page.getByTestId("saved")).toHaveText(/\$10\.53/);

  await page.getByRole("textbox", { name: "amount" }).fill("89.46");
  await page
    .getByRole("textbox", { name: "note" })
    .fill(faker.lorem.sentence());
  await page.getByRole("button", { name: "add funds" }).click();

  await expect(
    page.getByRole("list", { name: "deposits" }).getByTestId("amount"),
  ).toHaveText([new RegExp("\\$89.46"), new RegExp("\\$10.53")]);
  await expect(page.getByTestId("progress")).toHaveText("99%");
  await expect(page.getByTestId("remaining")).toHaveText(/\$0\.01/);
  await expect(page.getByTestId("saved")).toHaveText(/\$99\.99/);

  await page.getByRole("textbox", { name: "amount" }).fill("0.01");
  await page.getByRole("button", { name: "add funds" }).click();

  await expect(
    page.getByRole("heading", { name: "goal complete" }),
  ).toBeAttached();
  await expect(page.getByTestId("saved")).toHaveText(["$100", "$100"]);
  await expect(page.getByTestId("deposits-count")).toHaveText(["3", "3", "3"]);
  await expect(
    page.getByRole("list", { name: "deposits" }).getByTestId("amount"),
  ).toHaveText([
    new RegExp("\\$0.01"),
    new RegExp("\\$89.46"),
    new RegExp("\\$10.53"),
  ]);
});

test("forgot password", async ({ page }) => {
  const email = faker.internet.email();

  await page.goto("/signin");
  await page.getByRole("link", { name: "forgot password" }).click();

  await expect(page).toHaveTitle(/forgot password/i);

  await page.getByRole("textbox", { name: "email" }).fill(email);
  await page.getByRole("button", { name: "reset" }).click();

  await expect(
    page.getByRole("heading", { name: "check your inbox" }),
  ).toBeAttached();
  await expect(page.getByTestId("email")).toHaveText(email);
});

const signIn = async (page: Page) => {
  const user = await register();

  const context = await createApiContext();
  await context.post("/accounts/login", {
    data: {
      email: user.email,
      password: user.password,
    },
  });
  const cookie = (await context.storageState()).cookies.find(
    (c) => c.name === apiAuthCookieName,
  );
  if (cookie === undefined) throw new Error("No auth cookie");

  page.context().addCookies([{ ...cookie, name: frontendAuthCookieName }]);

  return user;
};

const createGoal = async (
  page: Page,
  options?: { name?: string; target?: string; deadline?: string },
) => {
  const name = options?.name ?? faker.food.dish();
  const target = options?.target ?? faker.finance.amount();
  const deadline = options?.deadline ?? getDatePart(faker.date.recent());

  const context = await createApiContext(page);
  const response = await context.post("/goals", {
    data: {
      name,
      target,
      deadline,
    },
  });
  const { id } = z.object({ id: z.number() }).parse(await response.json());

  return { id, name, target, deadline };
};

const addDeposit = async (
  page: Page,
  { goalId, amount }: { goalId: number; amount: number },
) => {
  const context = await createApiContext(page);
  await context.post(`/goals/${goalId}/deposits`, {
    data: {
      amount: amount.toString(),
      note: "",
    },
  });
};

type StorageState =
  Exclude<
    Parameters<typeof request.newContext>[0],
    "string" | undefined
  > extends {
    storageState?: infer T;
  }
    ? T
    : never;

const createApiContext = async (page?: Page) => {
  let storageState: StorageState | undefined = undefined;
  if (page !== undefined) {
    const cookie = (await page.context().cookies()).find(
      (c) => c.name === frontendAuthCookieName,
    );
    if (cookie === undefined) throw new Error("No auth cookie");

    storageState = {
      cookies: [{ ...cookie, name: apiAuthCookieName }],
      origins: [],
    };
  }

  return await request.newContext({
    baseURL: apiBase,
    storageState,
  });
};
