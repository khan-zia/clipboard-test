# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

-   Data is saved in the database in the Facilities, Agents, and Shifts tables
-   A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
-   A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Cover the report generation with tests. Especially with end to end tests.

This is extremely important. When the new custom ID enhancement is added, we wanna make sure the previous functionality is not affected.

### Add a Varchar (string) column to the database.

When adding a new column, this must be defaulted to a NULL or any other value to account for any existing records that may not have a Custom ID yet. This can be used to track such records and prompt the user to associate a new custom
ID with them later. Also, ensure that the custom ID is unique for each Facility. It does not have to be unique universally.

### Add UI support for the new feature.

The Frontend UI needs to be updated to allow the users to add a custom ID. This ID also needs to be displayed when the details are being viewed by the user for that facility. Furthermore, UI to search by this custom ID also needs to be added.

### Add search feature by custom ID.

Update the backend to allow users to search using their custom IDs.
