import { expect } from '@playwright/test';
import {LoginPath} from "../paths/loginPath";

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.selectors = new LoginPath();
    }

    async openUrl() {
        await this.page.goto(this.selectors.url);
    }

    async login(username, password) {
        await this.page.fill(this.selectors.inputUser, username);
        await this.page.fill(this.selectors.inputPassword, password);
        await this.page.click(this.selectors.btnLogin);
    }

    async verifySuccessMessage(expectedMessage) {
        const message = await this.page.textContent(this.selectors.dashboardMessage);
        expect(message).toContain(expectedMessage);
    }
}
