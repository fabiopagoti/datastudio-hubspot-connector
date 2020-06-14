function checkConnection(apikey) {
  var sPath = getFullPath(apikey, this.endpoint.account);

  var oResponse = UrlFetchApp.fetch(sPath, {
    muteHttpExceptions: true
  });

  var oResponseBody = JSON.parse(oResponse.getContentText());
  if (oResponse.getResponseCode() != 200) {
    throw new Error(oResponseBody.message);
  }
  return true;
}

function checkConnectionTest() {
  checkConnection("a");
}
