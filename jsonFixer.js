const jsonFixer = {
  fixJson: function (partialJson) {
    let json = partialJson;

    const quoteOpen = (json.match(/"/g) || []).length % 2 === 1; //detect last quote open
    const keyMatch = json.match(/,"([^"]*)$/); //detect key incomplete

    if (keyMatch) {
      json = json.replace(/,"[^"]*$/, ',"UNKNOWN_KEY":"VALUE"');
    } else if (quoteOpen) {
      json += '"';
      if (!json.endsWith('"}')) {
        json += '';
      }
    }

    const openBraces = (json.match(/{/g) || []).length;
    const closeBraces = (json.match(/}/g) || []).length;
    const missing = openBraces - closeBraces;

    json += '}'.repeat(missing)

    return json;
  }
};

module.exports = jsonFixer;
