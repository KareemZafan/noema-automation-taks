const {test, expect} = require('@playwright/test');
const {HomePage} = require("../src/pages/homePage");
test('home screen test', async ({page}) => {
    await page.goto('http://localhost:8080/parabank/index.htm')
    await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');
})

test('test opening registration page', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.clickRegister();
    await expect(page.locator('h1.title')).toContainText('Signing up is easy!');
})

