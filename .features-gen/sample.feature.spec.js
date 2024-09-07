/** Generated from: sample.feature */
import { test } from "playwright-bdd";

test.describe("Login and Employee Management", () => {

  test.beforeEach(async ({ Given, page }) => {
    await Given("I navigate to OrangeHRM", null, { page });
  });

  test("Successful login with valid credentials", { tag: ["@Tests", "@Test1"] }, async ({ Given, page, Then }) => {
    await Given("the user enters \"Admin\" and \"admin123\" and clicks the login button", null, { page });
    await Then("the user should see the dashboard message \"Dashboard\"", null, { page });
  });

  test("Creating a new employee", { tag: ["@Tests", "@Test2"] }, async ({ Given, page, And, When, Then }) => {
    await Given("the user enters \"Admin\" and \"admin123\" and clicks the login button", null, { page });
    await And("the user should see the dashboard message \"Dashboard\"", null, { page });
    await When("the user navigates to PIM and clicks on Add Employee", null, { page });
    await And("the user creates a new employee with the following data:", {"dataTable":{"rows":[{"cells":[{"value":"First Name"},{"value":"Middle Name"},{"value":"Last Name"},{"value":"Employee ID"}]},{"cells":[{"value":"Juan"},{"value":"Pedro"},{"value":"Perez"},{"value":""}]}]}}, { page });
    await And("the user should see the confirmation message \"Successfully Saved\"", null, { page });
    await And("the user should see the employee name \"Juan\" and \"Perez\"", null, { page });
    await Then("the employee appears in the employee list", null, { page });
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use("sample.feature"),
  $bddFileMeta: ({}, use) => use(bddFileMeta),
});

const bddFileMeta = {
  "Successful login with valid credentials": {"pickleLocation":"9:3","tags":["@Tests","@Test1"],"ownTags":["@Test1"]},
  "Creating a new employee": {"pickleLocation":"14:3","tags":["@Tests","@Test2"],"ownTags":["@Test2"]},
};