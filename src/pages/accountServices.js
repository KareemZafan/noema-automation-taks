const {test} = require('@playwright/test');

class AccountServices {
    constructor(page) {
        this.page = page;
    }

    async openNewAccount() {
        await this.page.locator(`//a[text()='Open New Account']`).click();
        await this.page.locator(`input[value='Open New Account']`).click();
        return await this.page.locator('id=newAccountId').textContent();
    }

    async getTotalBalance() {
        await this.page.locator(`//a[text()='Accounts Overview']`).click();
        await this.page.waitForSelector('b.ng-binding');
        const totalBalance = await this.page.locator(`b.ng-binding`).textContent();
        return totalBalance;
    }

    async transferFunds(amount, fromAccount, toAccount) {
        await this.page.locator(`//a[text()='Transfer Funds']`).click();
        await this.page.locator(`input#amount`).fill(amount);
        await this.page.locator(`#fromAccountId`).selectOption(fromAccount);
        await this.page.locator(`#toAccountId`).selectOption(toAccount);
        await this.page.locator(`input[value='Transfer']`).click();
        await this.page.waitForSelector('h1.title');
        return await this.page.locator('h1.title').textContent();

    }

    async requestLoan(loanAmount, downAmount, fromAccount = 1) {
        await this.page.locator(`//a[text()='Request Loan']`).click();
        await this.page.locator(`id=amount`).fill(loanAmount);
        await this.page.locator(`id=downPayment`).fill(loanAmount);
        await this.page.locator(`input[value='Apply Now']`).click();
        await this.page.waitForSelector('id=loanStatus');
        return await this.page.locator('id=loanStatus').textContent();
    }

    async payBill(accountNumber, amount, fromAccount = 1) {
        await this.page.locator(`//a[text()='Bill Pay']`).click();
        await this.page.locator(`input[name='payee.name']`).fill('kareem');
        await this.page.locator(`input[name='payee.address.street']`).fill('16 Ahmed Orabi');
        await this.page.locator(`input[name='payee.address.city']`).fill('Cairo');
        await this.page.locator(`input[name='payee.address.state']`).fill('Egypt');
        await this.page.locator(`input[name='payee.address.zipCode']`).fill('12345');
        await this.page.locator(`input[name='payee.phoneNumber']`).fill('3456789');
        await this.page.locator(`input[name='payee.accountNumber']`).fill(accountNumber);
        await this.page.locator(`input[name='verifyAccount']`).fill(accountNumber);
        await this.page.locator(`input[name='amount']`).fill(amount);
        await this.page.locator(`select[name='fromAccountId']`).selectOption(fromAccount);
        await this.page.locator(`input[value='Send Payment']`).click();
        await this.page.waitForSelector(`div[ng-show='showResult'] > h1`);
        return await this.page.locator(`div[ng-show='showResult'] > h1`).textContent();
    }

    async getCustomerBalance(customerNumber) {
        await this.page.locator(`//a[text()='Accounts Overview']`).click();
        await this.page.waitForSelector(`//a[text()='${customerNumber}']/../../td[2]`);
        return await this.page.locator(`//a[text()='${customerNumber}']/../../td[2]`).textContent();
    }
}

module.exports = {AccountServices};