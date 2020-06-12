function getFields() {
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  fields
    .newDimension()
    .setId("id")
    .setName("Id")
    .setType(types.TEXT);

  fields
    .newMetric()
    .setId("distance")
    .setName("Distance")
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  return fields;
}

// https://developers.google.com/datastudio/connector/reference#getschema
function getSchema(request) {

  try {
    request = validateConfig(request);
  } catch (e) {
    throwConnectorError(e.message); 
  }

  return { schema: getFields().build() };
}

function getSchemaTest(request) {
  getSchema({ configParams : {} } );
  }
  
  