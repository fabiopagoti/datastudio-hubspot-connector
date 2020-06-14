// https://developers.google.com/datastudio/connector/reference#getdata
function getData(request) {
  Logger.log("Data requested");
  Logger.log(request);
  try {
    request = validateConfig(request);
    var oFields = getDataFields(request);
    var aRows = getDataRows(request, oFields);
  } catch (e) {
    throwConnectorError(e.message);
  }

  return {
    schema: oFields,
    rows: aRows
  };
}

function getDataFields(request) {
  var oAllFields = getSchemaFields(request);

  var aRequestedFields = request.fields || [];
  aRequestedFields = sanitizeFields(aRequestedFields, oAllFields);

  Logger.log("Requested Fields:");
  Logger.log(aRequestedFields.build());
  return aRequestedFields.build();
}

function sanitizeFields(aRequestedFields, oAllFields) {
  var aRequestedFieldIds = aRequestedFields.map(function(oField) {
    return oField.name;
  });
  return oAllFields.forIds(aRequestedFieldIds);
}

function getDataRows(request, oFields) {
  var aResults;
  var config = request.configParams;

  switch (config.select_object) {
    case "option_contacts":
      aResults = getDataContacts(request);
      break;
    case "option_companies":
      aResults = getDataCompanies(request);
      break;
    default:
      throwConnectorError("Object not recognized");
      break;
  }

  Logger.log("Results found");
  Logger.log(aResults);



  var aRows = [];
  aResults.forEach(function(oRow) {
    var aValues = [];

    oFields.forEach(function(oField) {
      if (oField.name === "id") {
        aValues.push(oRow.id);
      }else{
        aValues.push(oRow.properties[oField.name] || "");
      }
    });

    aRows.push({ values: aValues });
  });

  Logger.log("Result to be returned");
  Logger.log(aRows);

  return aRows;
}

function getDataContacts(request) {
  var aRows = [];

  var sPath = getFullPath(
    request.configParams.input_apikey,
    this.endpoint.crm.contacts
  );

  var oResponse = UrlFetchApp.fetch(sPath, {
    muteHttpExceptions: true
  });

  var oResponseBody = JSON.parse(oResponse.getContentText());

  if (oResponse.getResponseCode() != 200) {
    throw new Error(oResponseBody.message);
  }
  return oResponseBody.results;
}

function getDataCompanies(request) {
  var aRows = [];

  var sPath = getFullPath(
    request.configParams.input_apikey,
    this.endpoint.crm.companies
  );

  var oResponse = UrlFetchApp.fetch(sPath, {
    muteHttpExceptions: true
  });

  var oResponseBody = JSON.parse(oResponse.getContentText());

  if (oResponse.getResponseCode() != 200) {
    throw new Error(oResponseBody.message);
  }
  return oResponseBody.results;
}

// function getData(request) {
//   // Calling `UrlFetchApp.fetch()` makes this connector require authentication.
//   UrlFetchApp.fetch("https://google.com");

//   var requestedFields = getFields().forIds(
//     request.fields.map(function(field) {
//       return field.name;
//     })
//   );

//   // Convert from miles to kilometers if 'metric' units were picked.
//   var unitMultiplier = 1;
//   if (request.configParams.units === "metric") {
//     unitMultiplier = 1.60934;
//   }

//   var rows = [];
//   for (var i = 0; i < 100; i++) {
//     var row = [];
//     requestedFields.asArray().forEach(function(field) {
//       switch (field.getId()) {
//         case "id":
//           return row.push("id_" + i);
//         case "distance":
//           return row.push(i * unitMultiplier);
//         default:
//           return row.push("");
//       }
//     });
//     rows.push({ values: row });
//   }

//   return {
//     schema: requestedFields.build(),
//     rows: rows
//   };
// }

function getDataTest() {
  getData({
    configParams: {
      select_object: option_contacts,
      input_apikey: "b9cef983-4352-4b73-9649-49c47d43b31c"
    },
    scriptParams: {
      lastRefresh: 1592098018346
    },
    fields: [
      {
        name: id
      }
    ]
  });
}
