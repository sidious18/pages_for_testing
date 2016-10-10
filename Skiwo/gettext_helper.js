function replaceVars(str, values) {
  var regex = /%\{([^)]+?)\}/;

  for (var i = 0; i < Object.keys(values).length; i++) {
    forReplace = regex.exec(str)[0];
    variable = regex.exec(str)[1];
    str = str.replace(forReplace, values[variable]);
  }
  return str;
};
