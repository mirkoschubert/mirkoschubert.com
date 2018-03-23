
function prepareAccessKeys() {

  var keys = [];
  var links = document.getElementsByTagName('a');

  for (var i = 0; i < links.length; i++) {

    if (links[i].hasAttribute('accesskey')) {

      var inner = (links[i].firstElementChild === null) ? links[i].innerHTML : links[i].firstElementChild.innerHTML;
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
/*       if (links[i].firstElementChild === null) {
        links[i].innerHTML = marked;
      } else {
        links[i].firstElementChild.innerHTML = marked;
      }
 */    }
  }

  return keys;
}


function addKeyboardListener(bindings) {

  document.onkeypress = function(e) {
    var keyCode = e.keyCode;
    //e.preventDefault();
    console.log(keyCode);

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

  var bindings = prepareAccessKeys();
  console.log(bindings);

  //addKeyboardListener(shrt);

  document.addEventListener('keydown', function(e) {
    console.log(e);
    bindings.forEach(function(b, i) {
      if (e.key === b.key) {
        if (b.external) window.open(b.href); else window.location.pathname = b.href;
      }
    });
  });

})(window, document);