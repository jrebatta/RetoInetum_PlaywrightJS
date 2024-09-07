import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://opensource-demo.orangehrmlive.com/';
        this.inputUser = 'input[name="username"]';
        this.inputPassword = 'input[name="password"]';
        this.btnLogin = 'button[type="submit"]';
        this.dashboardMessage = 'h6';
    }

    async openUrl() {
        await this.page.goto(this.url);
    }

    async login(username, password) {
        await this.page.fill(this.inputUser, username);
        await this.page.fill(this.inputPassword, password);
        await this.page.click(this.btnLogin);
    }

    async verifySuccessMessage(expectedMessage) {
        const message = await this.page.textContent(this.dashboardMessage);
        expect(message).toContain(expectedMessage);
    }
}
