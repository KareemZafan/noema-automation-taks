const {test, expect} = require('@playwright/test');
import userData from '../../resources/users.json'

const {HomePage} = require("./homePage");


class RegistrationPage {

    constructor(page) {
        this.page = page;
    }

    async registerUser(userNumber) {
        await this.page.locator('id=customer.firstName').fill(userData.users[userNumber].fName);
        await this.page.locator('id=customer.lastName').fill(userData.users[userNumber].lName);
        await this.page.locator('id=customer.address.street').fill(userData.users[userNumber].address);
        await this.page.locator('id=customer.address.city').fill(userData.users[userNumber].city);
        await this.page.locator('id=customer.address.state').fill(userData.users[userNumber].state);
        await this.page.locator('id=customer.address.zipCode').fill(userData.users[userNumber].zipCode);
        await this.page.locator('id=customer.phoneNumber').fill(userData.users[userNumber].phone);
        await this.page.locator('id=customer.ssn').fill(userData.users[userNumber].ssn);
        await this.page.locator('id=customer.username').fill(userData.users[userNumber].username);
        await this.page.locator('id=customer.password').fill(userData.users[userNumber].password);
        await this.page.locator('id=repeatedPassword').fill(userData.users[userNumber].password);
        await this.page.locator(`input[value='Register']`).click();
    }
}

module.exports = {RegistrationPage};