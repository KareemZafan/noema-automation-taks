const {test, expect} = require('@playwright/test');
const {HomePage} = require("../src/pages/homePage");
const {AccountServices} = require("../src/pages/accountServices");
import userData from '../resources/users.json'

let homePage = undefined;
let accountServices = undefined;
let account1 = undefined;
let account2 = undefined;
let account3 = undefined;

test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    accountServices = new AccountServices(page);
    await page.goto('localhost:8080/parabank');
    await homePage.login(userData.users[3].username, userData.users[3].password);
});

test('test 3 accounts creation', async ({page}) => {
    account1 = await accountServices.openNewAccount();
    await expect(page.locator('h1.title')).toContainText('Account Opened!');
    account2 = await accountServices.openNewAccount()
    await expect(page.locator('h1.title')).toContainText('Account Opened!');
    account3 = await accountServices.openNewAccount()
    await expect(page.locator('h1.title')).toContainText('Account Opened!');

});

test('test total balance', async ({page}) => {
    const totalBalance = await accountServices.getTotalBalance();
    console.log(totalBalance);
    await expect(totalBalance).toEqual('$515.50');

});
test('test customer balance', async ({page}) => {
    const totalBalance = await accountServices.getCustomerBalance('17451');
    await expect(totalBalance).toEqual('$3500,000.00')
});

test('test transferring to same account', async ({page}) => {
    const transferStatus = await accountServices.transferFunds('1000', '17340', '17340');
    await expect(transferStatus).toBe('You can not transfer the amount to same account.')
});

test('test transferring amount more than available balance', async ({page}) => {
    const transferStatus = await accountServices.transferFunds('10000000', '17562', '16896');
    await expect(transferStatus).toBe('You can not transfer more than the balance in your account.')
});

test('test loan, down payment is less than loan amount', async ({page}) => {
    const loanStatus = await accountServices.requestLoan('5000', '1000')
    await expect(loanStatus).toBe('Approved')
});

test('test loan, down payment is higher than loan amount', async ({page}) => {
    const loanStatus = await accountServices.requestLoan('1000', '7000')
    await expect(loanStatus).toBe('Denied')
});

test('test paying bill within the balance range', async ({page}) => {
    const paymentStatus = await accountServices.payBill('17562', '3500000', '17451');
    await expect(paymentStatus).toEqual('Bill Payment Complete');
    const currentCustomerBalance = await accountServices.getCustomerBalance('17451');
    await expect(currentCustomerBalance).toEqual('$0.00');
});

test('test paying bill out of the balance range', async ({page}) => {
    const paymentStatus = await accountServices.payBill('17562', '3700000', '17340');
    await expect(paymentStatus).toEqual('You can not pay more than balance in your account');
});

test.afterAll(async ({browser}) => {
    await browser.close();
})





