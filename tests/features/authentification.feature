Feature: Authentication

  Scenario: User registers with valid credentials
    Given the user provides a valid email and password
    When the user submits the registration form
    Then the user should be registered successfully
