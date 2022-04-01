const {
  test,
  expect
} = require("@playwright/test");

const {user} = require("./user");

test.beforeEach(async ({
  page
}) => {
  await page.goto("https://netology.ru/?modal=sign_in");
});
test.describe.only("authorization", () => {
  test("successful authorization", async ({
    page
  }) => {
    // Click [placeholder="Email"]
    await page.locator('[placeholder="Email"]').click();

    // Fill [placeholder="Email"]
    await page.locator('[placeholder="Email"]').fill(user.username);

    // Click [placeholder="Пароль"]
    await page.locator('[placeholder="Пароль"]').click();

    // Fill [placeholder="Пароль"]
    await page.locator('[placeholder="Пароль"]').fill(user.password);

    // Click [data-testid="login-submit-btn"]
    await Promise.all([
      page.waitForNavigation( /*{ url: 'https://netology.ru/profile' }*/ ),
      page.locator('[data-testid="login-submit-btn"]').click(),
    ]);

    //  text=Мои курсы и профессии
    await expect(page.locator("text=Мои курсы и профессии")).toBeVisible();
  });
  test("unsuccessful authorization", async ({
    page
  }) => {
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

    await expect(page.locator('[data-testid="login-error-hint"]')).toContainText("Вы ввели неправильно логин или пароль")

  })
})