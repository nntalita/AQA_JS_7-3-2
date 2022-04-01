const { test, expect } = require("@playwright/test");

const { user } = require("./user");

test.beforeEach(async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.screenshot({
    path: "screenshot.png",
  });
});
test.describe.only("authorization", () => {
  test("successful authorization", async ({ page }) => {
    // Click [placeholder="Email"]
    await page.locator('[placeholder="Email"]').click();

    // Fill [placeholder="Email"]
    await page.locator('[placeholder="Email"]').fill(user.username);

    // Click [placeholder="Пароль"]
    await page.locator('[placeholder="Пароль"]').click();

    // Fill [placeholder="Пароль"]
    await page.locator('[placeholder="Пароль"]').fill(user.password);

    await page.screenshot({
      path: "screenshot1.png",
    });

    // Click [data-testid="login-submit-btn"]
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
      page.locator('[data-testid="login-submit-btn"]').click(),
    ]);
    

    //  text=Мои курсы и профессии
    await expect(page.locator("text=Мои курсы и профессии")).toBeVisible();
    await page.screenshot({
      path: "screenshot2.png",
    });
  });
  test("unsuccessful authorization", async ({ page }) => {
    // Click [placeholder="Email"]
    await page.locator('[placeholder="Email"]').click();

    // Fill [placeholder="Email"]
    await page.locator('[placeholder="Email"]').fill("dkjgsleghldjh@mail.com");

    // Click [placeholder="Пароль"]
    await page.locator('[placeholder="Пароль"]').click();

    // Fill [placeholder="Пароль"]
    await page.locator('[placeholder="Пароль"]').fill(";zldjvldkj444");

    // Click [data-testid="login-submit-btn"]
    await page.locator('[data-testid="login-submit-btn"]').click();

    await page.screenshot({
      path: "screenshot3.png",
    });

    await expect(
      page.locator('[data-testid="login-error-hint"]')
    ).toContainText("Вы ввели неправильно логин или пароль");
  });
});
