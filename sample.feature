#language: en
@Tests
Feature: Login and Employee Management

  Background:
    Given I navigate to OrangeHRM

  @Test1
  Scenario: Successful login with valid credentials
    Given the user enters "Admin" and "admin123" and clicks the login button
    Then the user should see the dashboard message "Dashboard"

  @Test2
  Scenario: Creating a new employee
    Given the user enters "Admin" and "admin123" and clicks the login button
    And the user should see the dashboard message "Dashboard"
    When the user navigates to PIM and clicks on Add Employee
    And the user creates a new employee with the following data:
      | First Name | Middle Name | Last Name | Employee ID |
      | Juan       | Pedro       | Perez     |             |
    And the user should see the confirmation message "Successfully Saved"
    And the user should see the employee name "Juan" and "Perez"
    Then the employee appears in the employee list
