import { expect } from '@playwright/test';
import {PimPath} from "../paths/pimPath";

export class PIMPage {
    constructor(page) {
        this.page = page;
        this.selectors = new PimPath();
        this.employeeID = '';
    }

    async navigateToPIMAndAddEmployee() {
        await this.page.click(this.selectors.aPIM);
        await this.page.click(this.selectors.aAddEmployee);
    }

    async createEmployee(firstName, middleName, lastName) {
        await this.page.fill(this.selectors.inputFirstName, firstName);
        await this.page.fill(this.selectors.inputMiddleName, middleName);
        await this.page.fill(this.selectors.inputLastName, lastName);
        await this.page.click(this.selectors.btnSave);
    }

    async verifySuccessMessage(expectedMessage) {
        const message = await this.page.textContent(this.selectors.successfullySaved);
        expect(message).toContain(expectedMessage);
    }

    async verifyEmployeeName(expectedName) {
        await this.page.waitForSelector(this.selectors.firstLastName);
        await this.page.waitForTimeout(3000);
        const name = await this.page.textContent(this.selectors.firstLastName);
        expect(name).toContain(expectedName);
    }

    async verifyEmployeeNameInList() {
        await this.page.waitForSelector(this.selectors.inputEmployeeID, { state: 'visible' });
        await this.page.waitForTimeout(2000);
        this.employeeID = await this.page.inputValue(this.selectors.inputEmployeeID);
        console.log('Employee ID: ' + this.employeeID);
        await this.page.waitForSelector(this.selectors.EmployeeList);
        await this.page.click(this.selectors.EmployeeList);
        if (this.employeeID) {
            await this.page.fill(this.selectors.inputEmployeeIDList, this.employeeID);
        } else {
            throw new Error('Employee ID is not set.');
        }
        await this.page.click(this.selectors.btnSearchList);
        await this.page.keyboard.press('PageDown');
        await this.page.waitForTimeout(2000);
        const displayedEmployeeID = await this.page.textContent(this.selectors.EmployeeIDList);
        console.log("IDs: ",displayedEmployeeID, this.employeeID)
        expect(displayedEmployeeID).toBe(this.employeeID);
    }
}