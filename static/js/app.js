
function prepareAccessKeys() {

  var keys = [];
  var links = document.getElementsByTagName('a');

  for (var i = 0; i < links.length; i++) {

    if (links[i].hasAttribute('accesskey')) {

      var inner = links[i].firstElementChild.innerHTML;
      var marked = '';
      
      keys.push({
        key:      links[i].getAttribute('accesskey'),
        href:     links[i].getAttribute('href'),
        external: (links[i].hasAttribute('target') && links[i].getAttribute('target') === '_blank')
      });

      for (var j = 0; j < inner.length; j++) {
        marked += inner[j].toLowerCase() === links[i].getAttribute("accesskey") ? "<strong>" + inner[j] + "</strong>" : inner[j];
      }

      //console.log(inner + ' -> ' + marked);
      links[i].firstElementChild.innerHTML = marked;
    }
  }

  return keys;
}


function addKeyboardListener(bindings) {

  document.onkeypress = function(e) {
    var keyCode = e.keyCode;
    e.preventDefault();

    bindings.forEach(function(sh, i) {
      if (keyCode === sh.key.charCodeAt()) {
        if (sh.external) {
          window.open(sh.href);
        } else {
          window.location.pathname = sh.href;
        }
      }
    });
  };
}

(function(w, d) {

  var shrt = prepareAccessKeys();
  console.log(shrt);

  addKeyboardListener(shrt);

})(window, document);