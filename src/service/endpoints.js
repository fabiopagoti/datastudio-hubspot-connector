var endpoint = {
  base: "https://api.hubapi.com",
  account: "/integrations/v1/me",
  crm: {
    contacts: "/crm/v3/objects/contacts",
    companies: "/crm/v3/objects/companies"
  }
};

function getFullPath(apikey, sPath, oQuery) {
  var sFullPathWithoutQuery = this.endpoint.base + sPath;
  var oQueryWithAuth = oQuery || {};
  
  oQueryWithAuth.hapikey = apikey;
  
  return sFullPathWithoutQuery.addQuery(oQueryWithAuth);
}


function connectWithHubSpot(sQuery) {
  var response = UrlFetchApp.fetch("?hapikey=&q=" + sQuery);
  var sReponseBody = response.getContentText();
  Logger.log(sReponseBody);
}

function connectWithHubSpotTest() {
  connectWithHubSpot("Coo");
}

function getLists() {
  var sPath = getFullPath("/contacts/v1/lists");
  // Logger.log(sPath);

  var oResponse = UrlFetchApp.fetch(sPath);
  var aLists = JSON.parse(oResponse).lists;

  var aMappedLists;
  aMappedLists = aLists.map(function(oList) {
    return {
      listId: oList.listId,
      name: oList.name,
      listType: oList.listType,
      size: oList.metaData.size
    };
  });

  Logger.log(aMappedLists);

  return aMappedLists;
}
