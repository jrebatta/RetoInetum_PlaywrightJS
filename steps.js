import { createBdd } from 'playwright-bdd';
import { LoginPage } from './loginPage'; // Ruta correcta a page.ts
import { PIMPage } from './pimPage'; // Ruta correcta a page.ts

const { Given, When, Then } = createBdd();
let loginPage;
let pimPage;

Given('I navigate to OrangeHRM', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openUrl();
});

Given('the user enters {string} and {string} and clicks the login button', async ({ page }, username, password) => {
    loginPage = new LoginPage(page);
    await loginPage.login(username, password);
});

Then('the user should see the dashboard message {string}', async ({ page }, expectedMessage) => {
    loginPage = new LoginPage(page);
    await loginPage.verifySuccessMessage(expectedMessage);
});
When('the user navigates to PIM and clicks on Add Employee', async ({ page }) => {
    pimPage = new PIMPage(page);
    await pimPage.navigateToPIMAndAddEmployee();
});

When('the user creates a new employee with the following data:', async ({ page }, dataTable) => {
    pimPage = new PIMPage(page);
    const rows = dataTable.raw();
    if (rows.length < 2) {
        throw new Error('The data table does not contain enough rows.');
    }
    const headers = rows[0];
    const values = rows[1];
    if (headers.length < 4 || values.length < 4) {
        throw new Error('The data table does not have the expected number of columns.');
    }
    const employeeData = {
        firstName: values[0] || '',
        middleName: values[1] || '',
        lastName: values[2] || '',
        employeeID: values[3] || ''
    };
    await pimPage.createEmployee(employeeData.firstName, employeeData.middleName, employeeData.lastName);
});


Then('the user should see the confirmation message {string}', async ({ page }, expectedMessage) => {
    pimPage = new PIMPage(page);
    await pimPage.verifySuccessMessage(expectedMessage);
});

Then('the user should see the employee name {string} and {string}', async ({ page }, firstName, lastName) => {
    pimPage = new PIMPage(page);
    await pimPage.verifyEmployeeName(`${firstName} ${lastName}`);
});

Then('the employee appears in the employee list', async ({ page }) => {
    pimPage = new PIMPage(page);
    await pimPage.verifyEmployeeNameInList();
});
