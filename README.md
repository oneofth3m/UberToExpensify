# UberToExpensify
Send uber emails to expensify

(Tested with Uber, Gmail and Expensify)

One Time Steps:

GMail (If uber receipts are sent to non-Gmail accounts, set a filter to forward receipts to a gmail account) :
- Add a filter to automatically apply label 'UberReceipts' to mails from 'receipts.bangalore@uber.com'.
  * 'Settings' -> 'Filters' -> 'Create a new Filter' -> In From, add 'receipts.bangalore@uber.com' -> 'Create filter with this search' -> Apply the label (select/create 'UberReceipts' in drop down)

Expensify:
- If uber mails are sent to a different email id than Expensify account then add 'secondary email address'
  * 'Personal Settings' -> 'Add Secondary Login' -> Add Gmail id of account configured above.
  * Verify the email id by clicking on the link sent.

search.google.com:
- Go to script.google.com
- Login with the GMail account configured above.
- Create a 'Blank Script'
- Remove any template code
- Copy/Paste the script
- Click on 'Run' button. First time it ask for permissions. Allow.

How TO:
- Each month edit the START_DATE and END_DATE in the script.
- Add/Remove address in 'ADDR_1' and 'ADDR_2' as needed.
- Do a dry 'Run' by keeping STATS_ONLY = true
- Got 'View' -> 'Logs'. Scroll down and verify the stats make sense.
- Change STATS_ONLY = false
- Run the script again to forward the receipts to Expensify.
- Go to 'Expensify' -> 'Receipts' -> 'Select All' -> 'New Report'
  * Make sure before running the script, there are no pending receipts in Expensify. Else manually unselect the other receipts 

