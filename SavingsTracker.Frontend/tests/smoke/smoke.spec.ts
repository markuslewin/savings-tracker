import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

test("can add and delete goal", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-08-10T10:30:00"));
  await page.goto("/");
  await page.getByRole("button", { name: "new goal" }).click();
  await page
    .getByRole("textbox", { name: "email" })
    .fill(process.env.PLAYWRIGHT_TESTUSER_EMAIL!);
  await page
    .getByRole("textbox", { name: "email" })
    .fill(process.env.PLAYWRIGHT_TESTUSER_PASSWORD!);
  await page.getByRole("button", { name: "sign in" }).click();
  await page.getByRole("button", { name: "create" }).click();
  await page.getByRole("textbox", { name: "name" }).fill(faker.food.dish());
  await page
    .getByRole("textbox", { name: "target" })
    .fill(faker.finance.amount());
  await page.getByRole("button", { name: "deadline" }).click();
  await page.getByRole("button", { name: "11" }).click();
  await page.getByRole("button", { name: "create" }).click();
  await page.getByRole("button", { name: "delete" }).click();
  await page.getByRole("button", { name: "delete" }).click();

  await expect(page).toHaveTitle("home");
});
