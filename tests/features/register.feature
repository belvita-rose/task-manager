Feature: Inscription utilisateur
  Scenario: Inscription avec des informations valides
    Given un utilisateur n'est pas inscrit
    When il s'inscrit avec un email valide et un mot de passe
    Then l'utilisateur doit être ajouté à la base de données
