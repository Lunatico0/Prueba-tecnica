const jsonFixer = {
  fixJson: function (partialJson) {
    let json = (partialJson || "").trim();
    const lastChar = json[json.length - 1];
    const isAlphaNumeric = /[a-z0-9]/i.test(lastChar);
    const LastEndOfValue = json.lastIndexOf('"');
    const lastStartOfVValue = json.lastIndexOf(':"');
    const quoteCount = (json.match(/"/g) || []).length;
    const isEvenQuote = quoteCount % 2 === 0;
    const isOddQuote = !isEvenQuote;

    const lastQuoteIndex = json.lastIndexOf('"');
    const lastColonIndex = json.lastIndexOf(':');

    const isEvenWithOpenQuote = isEvenQuote && lastColonIndex > lastQuoteIndex;
    console.log('INPUT (limpio):', json);


    if (lastColonIndex > lastQuoteIndex && !json.endsWith('}')) {
      json += '"';
    }

    if (json.trim().endsWith(':')) {
      json += '"VALUE"';
    }

    json = json.replace(/:\s*\{\s*\}/g, ':{"UNKNOWN_KEY":"VALUE"}'); // [Todavía usa Regex]

    const openBraces = (json.match(/{/g) || []).length; // [Todavía usa Regex]
    const closeBraces = (json.match(/}/g) || []).length; // [Todavía usa Regex]
    const missingBraces = openBraces - closeBraces;
    if (missingBraces > 0) {
      json += '}'.repeat(missingBraces);
    }

    console.log('lastQuoteIndex:', lastQuoteIndex);
    console.log('lastColonIndex:', lastColonIndex);
    console.log('------------------------------');
    console.log('Output (corregido):', json);

    return json;
  }
};
