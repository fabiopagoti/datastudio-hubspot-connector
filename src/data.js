// https://developers.google.com/datastudio/connector/reference#getdata
function getData(request) {
  // Calling `UrlFetchApp.fetch()` makes this connector require authentication.
  UrlFetchApp.fetch("https://google.com");

  var requestedFields = getFields().forIds(
    request.fields.map(function(field) {
      return field.name;
    })
  );

  // Convert from miles to kilometers if 'metric' units were picked.
  var unitMultiplier = 1;
  if (request.configParams.units === "metric") {
    unitMultiplier = 1.60934;
  }

  var rows = [];
  for (var i = 0; i < 100; i++) {
    var row = [];
    requestedFields.asArray().forEach(function(field) {
      switch (field.getId()) {
        case "id":
          return row.push("id_" + i);
        case "distance":
          return row.push(i * unitMultiplier);
        default:
          return row.push("");
      }
    });
    rows.push({ values: row });
  }

  return {
    schema: requestedFields.build(),
    rows: rows
  };
}
