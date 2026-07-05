/**
 * This file does NOT go on GitHub or in your website folder.
 * It goes inside a Google Sheet's Apps Script editor.
 * Full step-by-step instructions are in README.md.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),           // timestamp
    data.name,
    data.occasion,
    data.language,
    data.story,
    data.contactinfo
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
