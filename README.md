# UberToExpensify
Send uber emails to expensify

(Tested with Uber, Gmail and Expensify)

How To:
* Goto 'script.google.com'.
* Edit 'START_DATE' and 'END_DATE' in the script.
* Run the script.
* Go to Expensify -> 'Receipts' -> 'Select All' -> File 'New Report' and 'Submit'
  - Before running the script, move all existing 'Receipts' in Expensify to 'Reports'.
  - Else, manually (un)select receipts to be filed in the Report.


STATS_ONLY mode:
- You can do a dry 'Run' by setting 'STATS_ONLY' to true.
- Run the script and Goto 'View' -> 'Logs'. Scroll down and verify that the stats make sense.


ONE TIME steps:

GMail (If uber receipts are not sent to GMail, set a filter to forward receipts to a gmail account) :
* Add a filter to automatically apply label 'UberReceipts' to mails from 'receipts.bangalore@uber.com'.
  - 'Settings' -> 'Filters' -> 'Create a new Filter' -> In From, add 'receipts.bangalore@uber.com' -> 'Create filter with this search' -> Apply the label (select/create 'UberReceipts' in drop down)

Expensify (These steps are needed only if Expensify and Uber accounts are configured with different email id's):
* Add 'secondary email address' in Expensify.
  - 'Personal Settings' -> 'Add Secondary Login' -> Add GMail id of the account configured above.
  - Verify the email id by clicking on the link sent.

script.google.com (See: https://developers.google.com/apps-script/overview & https://developers.google.com/apps-script/reference/) :
- Go to script.google.com
- Login with the GMail account configured above containing the label 'UberReceipts'.
- Click 'Start Scripting' to proceed to the script editor.
- Create a 'Blank Project'
- Remove any auto generated code.
- Copy/Paste the script 'uberToExpensify.gs' into editor.
- When 'Run' for first time, a dialog box will appear and tell you that the script requires authorization. Click Continue. 
