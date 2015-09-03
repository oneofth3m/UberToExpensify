# UberToExpensify
Send uber emails to expensify

(Tested with Uber, Gmail and Expensify)

One Time Steps:

GMail (If uber receipts are sent to non-Gmail accounts, set a filter to forward receipts to a gmail account) :
- Add a filter to automatically apply label 'UberReceipts' to mails from 'receipts.bangalore@uber.com'.
  * 'Settings' -> 'Filters' -> 'Create a new Filter' -> In From, add 'receipts.bangalore@uber.com' -> 'Create filter with this search' -> Apply the label (select/create 'UberReceipts' in drop down)

Expensify (These steps are needed only if Expensify and Uber accounts are configured with different email id's):
- Add 'secondary email address' in Expensify.
  * 'Personal Settings' -> 'Add Secondary Login' -> Add Gmail id of account configured above.
  * Verify the email id by clicking on the link sent.

script.google.com (See: https://developers.google.com/apps-script/overview & https://developers.google.com/apps-script/reference/) :
- Go to script.google.com
- Login with the Gmail account configured above containing label 'UberReceipts'.
- Click Start Scripting to proceed to the script editor.
- Create a 'Blank Project'
- Remove any auto generated code.
- Copy/Paste the script 'uberToExpensify.gs' into editor.
- When 'Run' for first time, a dialog box will appear and tell you that the script requires authorization. Click Continue. 

How To:
- Each month edit the START_DATE and END_DATE in the script.
- Add/Remove address in 'ADDR_1' and 'ADDR_2' as needed.
- Do a dry 'Run' by keeping STATS_ONLY = true
- Goto 'View' -> 'Logs'. Scroll down and verify the stats make sense.
- Change STATS_ONLY = false
- Run the script again to forward the receipts to Expensify.
- Go to Expensify -> 'Receipts' -> 'Select All' -> 'New Report'
  * Make sure before running the script, there are no pending receipts in Expensify. Else manually unselect the other receipts 

