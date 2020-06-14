// https://developers.google.com/datastudio/connector/reference#getschema
function getSchema(request) {
  Logger.log("Schema requested");
  Logger.log(request);
  try {
    request = validateConfig(request);
  } catch (e) {
    throwConnectorError(e.message);
  }

  var oFields = getSchemaFields(request);
  return { schema: oFields.build() };
}

function getSchemaFields(request) {
  var oFields;
  switch (request.configParams.select_object) {
    case "option_contacts":
      oFields = getSchemaContacts();
      break;
    case "option_companies":
      oFields = getSchemaCompanies();
      break;
    default:
      throwConnectorError("Object not recognized");
      break;
  }

  return oFields;
}

function getSchemaContacts() {
  var fields = cc.getFields();
  var types = cc.FieldType;
  // var aggregations = cc.AggregationType;

  fields
    .newDimension()
    .setId("id")
    .setName("ID")
    .setType(types.NUMBER);

  fields
    .newDimension()
    .setId("firstname")
    .setName("First Name")
    .setType(types.TEXT);

  fields
    .newDimension()
    .setId("lastname")
    .setName("Last Name")
    .setType(types.TEXT);

  fields
    .newDimension()
    .setId("email")
    .setName("E-mail")
    .setType(types.TEXT);

  return fields;
}

function getSchemaCompanies() {
  var fields = cc.getFields();
  var types = cc.FieldType;
  // var aggregations = cc.AggregationType;

  fields
    .newDimension()
    .setId("id")
    .setName("ID")
    .setType(types.NUMBER);

  fields
    .newDimension()
    .setId("name")
    .setName("Name")
    .setType(types.TEXT);

  fields
    .newDimension()
    .setId("domain")
    .setName("Domain")
    .setType(types.TEXT);

  return fields;
}

function getSchemaTest(request) {
  getSchema({ configParams: {} });
}
