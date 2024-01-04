const {test, expect} = require('@playwright/test');
const {RegistrationPage} = require("../src/pages/registrationPage");
const {HomePage} = require("../src/pages/homePage");

test.skip('test registration for the first user', async ({page}) => {
    const homePage = new HomePage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.clickRegister();
    await registrationPage.registerUser(0);
    await expect(page.locator('h1.title')).toContainText('Welcome john.doe');
})
test.skip('test registration for the second user', async ({page}) => {
    const homePage = new HomePage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.clickRegister();
    await registrationPage.registerUser(1);
    await expect(page.locator('h1.title')).toContainText('Welcome jane.smith');
})
test.skip('test registration for the third user', async ({page}) => {
    const homePage = new HomePage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.clickRegister();
    await registrationPage.registerUser(3);
    await expect(page.locator('h1.title')).toContainText('Welcome kar1236');
})

