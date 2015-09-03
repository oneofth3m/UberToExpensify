/*
 * Mails with label 'LABEL' between 'START_DATE' to 'END_DATE' and
 * containing 'ADDR_1' and 'ADDR_2' will be forwarded to 'TO_MAIL' address.
 *
 * set 'STATS_ONLY' to 'false' to actually forward the mails.
 *
 * Modify START_DATE, END_DATE, ADDR_1, ADDR_2, LABEL, TO_MAIL below accordingly.
 * Leave ADDR_1 and ADDR_2 as empty lists to consider all mails.
 *
 * Note : We only read latest 300 conversations per label.
 *        This should be fine as at max there will be only 44 (22*2) trips in a month
 *        
 * TODO : Optimize number of mails retrieved by making use of getLastMessageRead().
 *        Currently all mails with a label are read to process, as 
 *        getThreads(start, end) is not always returning mails in sorted order.
 *
 */

var STATS_ONLY = true

var START_DATE = "2015/08/30 03:00:00 +5:30"
var END_DATE   = "2015/09/03 03:00:00 +5:30"

var ADDR_1 = ["Green Glen Layout", "HSR Layout"]
var ADDR_2 = []

var LABEL = "UberReceipts"
var TO_MAIL = "receipts@expensify.com"
  
function getUberMails() {
  
  var start_date = new Date(START_DATE);  
  var end_date = new Date(END_DATE);
  
  Logger.log("Forward mails from '%s' to '%s'.", start_date, end_date);
  
  Logger.log("Getting info for label : " + LABEL);
  var GmailLabel_UberReceipts = GmailApp.getUserLabelByName(LABEL);
  
  var stat_total_mails = 0;
  var stat_forwarded_mails = 0;
  var stat_ignored_mails = 0;
  var stat_ignored_old_mails = 0;
  var stat_ignored_new_mails = 0;
  var stat_ignored_no_addr1 = 0;
  var stat_ignored_no_addr2 = 0;
  
  // At max we only read 300 (num_threads_per_request * num_requests) conversations.
  var num_threads_per_request = 30;
  var num_requests = 10;
  for (var i = 0; i < num_requests; i++) {
    
    var start = i*num_threads_per_request;
    var end = (i+1)*num_threads_per_request;
    
    Logger.log("");
    Logger.log("Getting threads : %s - %s.", start, end);
    var threads = GmailLabel_UberReceipts.getThreads(start, end);
    
    if (threads.length == 0) {
      Logger.log("No more threads.");
      break;
    }
    
    for (var j = 0; j < threads.length; j++) {
      var messages = threads[j].getMessages();
      var first_message = messages[0];
      
      stat_total_mails += 1;
      
      Logger.log("");
      Logger.log("Processing '" + first_message.getSubject() + "' received at '" + first_message.getDate() + "'.");

      // TODO: Enhance this checks to consider getLastMessageRead() and quit early?
      if (first_message.getDate().getTime() < start_date.getTime()) {
        Logger.log("Ignoring mail. Message too old.");
        stat_ignored_old_mails++;
        continue;
      }
        
      if (first_message.getDate().getTime() > end_date.getTime()) {
        Logger.log("Ignoring mail. Message too new.");
        stat_ignored_new_mails++;
        continue;
      }
      
      var found_addr_1 = false;
      if (ADDR_1.length == 0) {
        found_addr_1 = true;
      } else {
        for (var addr_idx = 0; addr_idx < ADDR_1.length; addr_idx++) {
          if (first_message.getBody().indexOf(ADDR_1[addr_idx]) > -1) {
            Logger.log("First Address : '" + ADDR_1[addr_idx] + "' matched.");
            found_addr_1 = true;
            break;
          }
        }
      }
      
      if (!found_addr_1) {
        Logger.log("Ignoring mail. No match in Frist Address.");
        stat_ignored_no_addr1++;
        continue;
      }
            
      var found_addr_2 = false;
      if (ADDR_2.length == 0) {
        found_addr_2 = true;
      } else {
        for (var addr_idx = 0; addr_idx < ADDR_2.length; addr_idx++) {
          if (first_message.getBody().indexOf(ADDR_2[addr_idx]) > -1) {
            Logger.log("Second Address : '" + ADDR_2[addr_idx] + "' matched.");
            found_addr_2 = true;
            break;
          }
        }
      }
      
      if (!found_addr_2) {
        Logger.log("Ignoring mail. No match in Second Address..");
        continue;
        stat_ignored_no_addr2++;
      }
      
      Logger.log("Forwarding '" + first_message.getSubject() + "' received at '" + first_message.getDate() + "'.");
      if (!STATS_ONLY) {
        first_message.forward(TO_MAIL);
        Logger.log("Forwarded.");
      }
      stat_forwarded_mails++;
    }
  }
  Logger.log("");
  Logger.log("All Done !");
  
  stat_ignored_mails = stat_ignored_old_mails + stat_ignored_new_mails + stat_ignored_no_addr1 + stat_ignored_no_addr2;
  Logger.log("STATS : ");
  Logger.log("Total Mails Processed : " + stat_total_mails);
  Logger.log("Total Mails Forwarded : " + stat_forwarded_mails);
  Logger.log("Total Mails Ignored   : " + stat_ignored_mails);
  Logger.log("  Ignored older mail  : " + stat_ignored_old_mails);
  Logger.log("  Ignored newer mail  : " + stat_ignored_new_mails);
  Logger.log("  Ignored no addr1    : " + stat_ignored_no_addr1);
  Logger.log("  Ignored no addr2    : " + stat_ignored_no_addr2);
}
