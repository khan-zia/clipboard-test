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

** Acceptance Criteria **
- When the agent creation and updating functionality is covered 100% by feature tests and at least 80% by unit tests.
- When the report generation functionality is covered 100% by feature tests and at least 80% by unit tests.
- When the agent creation and updating functionality is covered by end to end tests.
- When the report generation functionality is covered by end to end tests.

** Time estimates **
If no previous tests exists at all, this ticket is expected to take 16 to 24 hours of work.

### Add support for custom ID.

Because a user-defined, custom ID could be of any type, it's better to use a string datatype for the column. When adding a new column, this must be defaulted to a NULL or any other value to account for any existing records that may not have a Custom ID yet. This can be used to track such records and prompt the user to associate a new custom ID with them later. Also, ensure that the custom ID is unique for each Facility. It does not have to be unique universally. Incremental database migrations should be used to push these changes to the database schema.

Next, allow users to specify a custom ID when creating a new agent or when updating an existing agent's record. Again, make sure the ID is unique per agent for each facility. As long as the ID is unique per agent per facility, it is okay to allow a facility to update an agent's custom ID later. This should not affect the generation of reports later on as the system will now recognize the new custom ID for the agent when generating a report.

**Acceptance Criteria**
- When running the migration on a table with existing data, runs smoothly and adds a new column to the table for a custom ID e.g. "custom_id" with a default value of NULL.
- When a user can specify a custom ID when creating a new agent.
- When a user can update an existing agent's custom ID.
- When all of the new functionality is covered with Feature and Unit tests.

**Time estimates**
This task is epxected to take 16 to 20 hours of work.


### Update report generation.

Update the `generateReport` functionality to use the newly added `custom_id` when generating reports. If the `custom_id` does not exist for an agent, then fallback to the agent's internal database ID. This behavior is to be highly anticipated as many of existing agents may not have a custom ID assigned to them or even new agents may still be created without specifying a custom ID for them.

**Acceptance Criteria**
- When generated reports for agents with custom IDs, uses the agents custom ID in the report.
- When it safely uses the agent's default database ID if a custom ID does not exist.
- When all of this functionality is covered with Feature and Unit tests.

**Time estimates**
This task is epxected to take 8 to 12 hours of work.


### Add UI support for the new feature.

The Frontend UI needs to be updated to allow the users to add a custom ID when creating or updating an Agent's record.. This ID also needs to be displayed when the details are being viewed for an agent.

**Acceptance Criteria**
- When a user can specify a custom ID when creating a new agent.
- When a user can specify a custom ID when updating an existing agent.
- When a user gets appropriate error responses associated with this functionality. For example, when using a custom ID that already exists for another agent.
- When these features are covered by end-to-end (browser) tests.

**Time estimates**
This task is epxected to take 12 to 16 hours of work.
