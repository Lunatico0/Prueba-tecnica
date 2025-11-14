const jsonFixer = {
  fixJson: function (partialJson) {
    let json = partialJson.trim();

    // 1. Cerrar comillas abiertas
    const openQuotes = (json.match(/"/g) || []).length;
    if (openQuotes % 2 !== 0) {
      json += '"';
    }

    // 2. Detectar clave truncada al final sin ":"
    const keyMatch = json.match(/"([^"])$/);
    if (keyMatch) {
      const before = json.slice(0, keyMatch.index);
      const key = keyMatch[1];

      // Si falta el ":" → es clave incompleta
      if (!before.endsWith(':')) {
        json = before + `"${key}":"VALUE"`;
      }
    }

    // 3. Si una string quedó sin cerrar dentro de un objeto
    json = json.replace(/"([^"])$/, "$1");

    // 4. Arreglar objetos vacíos → UNKNOWN_KEY
    json = json.replace(/{}\s*$/, {"UNKNOWN_KEY":"VALUE"});

    // 5. Contar llaves para cerrar todas
    const openBraces = (json.match(/{/g) || []).length;
    const closeBraces = (json.match(/}/g) || []).length;
    let diff = openBraces - closeBraces;
    if (diff > 0) json += '}'.repeat(diff);

    return json;
  }
};

module.exports = jsonFixer;
