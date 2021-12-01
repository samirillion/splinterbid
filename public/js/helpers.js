/**
 * Helpers
 */
/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList}
 */
function htmlToElements(html) {
  var template = document.createElement("template");
  template.innerHTML = html;
  return template.content.childNodes;
}

function createButton(text, clickEvent) {
  var button = document.createElement("BUTTON");
  var textField = document.createTextNode(text);
  button.onclick = clickEvent;
  button.appendChild(textField);
  document.body.appendChild(button);
}