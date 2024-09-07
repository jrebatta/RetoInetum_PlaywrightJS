import { expect } from '@playwright/test';

export class PIMPage {
    constructor(page) {
        this.page = page;
        this.aPIM = 'a.oxd-main-menu-item[href="/web/index.php/pim/viewPimModule"]';
        this.aAddEmployee = 'ul > li:nth-child(3) > a.oxd-topbar-body-nav-tab-item';
        this.EmployeeList = 'ul > li:nth-child(2) > a.oxd-topbar-body-nav-tab-item';
        this.inputFirstName = 'input[name="firstName"]';
        this.inputMiddleName = 'input[name="middleName"]';
        this.inputLastName = 'input[name="lastName"]';
        this.inputEmployeeID = '#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > div > div.orangehrm-edit-employee-content > div.orangehrm-horizontal-padding.orangehrm-vertical-padding > form > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(2) > input';
        this.inputEmployeeIDList = 'div.oxd-grid-item div.oxd-input-group input.oxd-input.oxd-input--active';
        this.btnSave = 'button[type="submit"]:not([class*="oxd-button--ghost"])';
        this.successfullySaved = 'p.oxd-text.oxd-text--p.oxd-text--toast-message.oxd-toast-content-text';
        this.firstLastName = 'h6.oxd-text.oxd-text--h6.--strong';
        this.btnSearchList = 'button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space';
        this.EmployeeIDList = 'div.oxd-table-row div.oxd-table-cell div[data-v-6c07a142]';
        this.employeeID = '';
    }

    async navigateToPIMAndAddEmployee() {
        await this.page.click(this.aPIM);
        await this.page.click(this.aAddEmployee);
    }

    async createEmployee(firstName, middleName, lastName) {
        await this.page.fill(this.inputFirstName, firstName);
        await this.page.fill(this.inputMiddleName, middleName);
        await this.page.fill(this.inputLastName, lastName);
        await this.page.click(this.btnSave);
    }

    async verifySuccessMessage(expectedMessage) {
        const message = await this.page.textContent(this.successfullySaved);
        expect(message).toContain(expectedMessage);
    }

    async verifyEmployeeName(expectedName) {
        await this.page.waitForSelector(this.firstLastName);
        const name = await this.page.textContent(this.firstLastName);
        expect(name).toContain(expectedName);
    }


    async verifyEmployeeNameInList() {
        await this.page.waitForSelector(this.inputEmployeeID, { state: 'visible' });
        this.employeeID = await this.page.inputValue(this.inputEmployeeID);
        console.log('Employee IDDDDD: ' + this.employeeID);


        await this.page.waitForSelector(this.EmployeeList);
        await this.page.click(this.EmployeeList);


        if (this.employeeID) {
            await this.page.fill(this.inputEmployeeIDList, this.employeeID);
        } else {
            throw new Error('Employee ID is not set.');
        }

        await this.page.click(this.btnSearchList);
        const displayedEmployeeID = await this.page.textContent(this.EmployeeIDList);
        expect(displayedEmployeeID).toBe(this.employeeID);
    }

}
