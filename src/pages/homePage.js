class HomePage {
    constructor(page) {
        this.page = page;
    }

    async clickRegister() {
        await this.page.goto('http://localhost:8080/parabank/index.htm');
        await this.page.locator('#loginPanel > p:nth-child(3) > a').click();
    }

    async login(username, password) {
        await this.page.locator(`input[name='username']`).fill(username);
        await this.page.locator(`input[name='password']`).fill(password);
        await this.page.locator(`.login .button[value='Log In']`).click();
    }


}

module.exports = {HomePage};