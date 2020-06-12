// https://developers.google.com/datastudio/connector/reference#getconfig

function getConfig(request) {
  var config = cc.getConfig();

  config
    .newInfo()
    .setId("info_instructions")
    .setText(
      "Thanks for using this connector. Please fill the form below in order to connect your HubSpot account."
    );

  config.newTextInput()
      .setId("input_apikey")
      .setName("API Key *")
      .setHelpText("Check https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key to get your API key")
      .setPlaceholder("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee");

  config
    .newSelectSingle()
    .setId("select_object")
    .setName("Object *")
    .setHelpText("Which kind of HubSpot data do you want to fetch?")
    .addOption(
      config
        .newOptionBuilder()
        .setLabel("Contacts")
        .setValue("option_contacts")
    )
    .addOption(
      config
        .newOptionBuilder()
        .setLabel("Companies")
        .setValue("option_companies")
    );

  return config.build();
}


function validateConfig(request){
  request.configParams = request.configParams || {};
  var config = request.configParams;

  if (!config.input_apikey) {
    throw new Error("API key cannot be blank");    
  }

  if (!config.select_object) {
    throw new Error("Object cannot be blank");    
  }
  
  try{
    checkConnection(config.input_apikey);
  } catch(e){
    throw e;    
  }

  return request;
}