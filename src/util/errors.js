function throwConnectorError(text) {
    DataStudioApp.createCommunityConnector()
      .newUserError()
      .setDebugText(text)
      .setText(text)
      .throwException();
  }