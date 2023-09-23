Feature: Ticket booking
    Scenario: Check hall
        Given user is on "/client/index.php" page
        When user select seance with selector "a[data-seance-id='178']" at 2 day"
        Then user sees name of hall "Зал 1"

    Scenario: Ticket successfully selected
        Given user is on "/client/index.php" page
        When user select seance with selector "a[data-seance-id='178']" at 2 day"        
        When user select 5 row and 6 seat
        When user click the button on 1-st page
        Then user has been navigated on page with title "Вы выбрали билеты:"

    Scenario: Can't book a ticket until have selected a seat
        Given user is on "/client/index.php" page
        When user select seance with selector "a[data-seance-id='178']" at 2 day"  
        Then button is disabled