
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
    }
  }

  return keys;
}


(function(w, d) {

  var bindings = prepareAccessKeys();
  console.log(bindings);

  var list = document.getElementsByClassName('articles')[0];

  if (typeof list !== 'undefined') {
    var activeSibling = list.firstElementChild;
    activeSibling.setAttribute("class", "active");
  }


  document.addEventListener('keydown', function(e) {
    console.log(e);
    bindings.forEach(function(b, i) {
      if (e.key === b.key) {
        if (b.external) window.open(b.href); else window.location.pathname = b.href;
      }
    });

    if (e.key === 'ArrowDown') {
      if (activeSibling.nextElementSibling !== null) {
        activeSibling.removeAttribute('class');
        activeSibling.nextElementSibling.setAttribute('class', 'active');
        activeSibling = activeSibling.nextElementSibling;
      }
    }
    if (e.key === 'ArrowUp') {
      if (activeSibling.previousElementSibling !== null) {
        activeSibling.removeAttribute('class');
        activeSibling.previousElementSibling.setAttribute('class', 'active');
        activeSibling = activeSibling.previousElementSibling;
      }
    }
    if (e.key === 'Enter') {
      bindings.forEach(function(b,i) {
        if (b.key === activeSibling.getElementsByClassName('key')[0].innerHTML) {
          if (b.external) window.open(b.href); else window.location.pathname = b.href;
        }
      });
    }
  });

})(window, document);