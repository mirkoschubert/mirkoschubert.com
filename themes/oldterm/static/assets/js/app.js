
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

  // INFO: Keyboard Control 

  var bindings = prepareAccessKeys();
  console.log(bindings);

  var list = document.getElementsByClassName('filemanager')[0];
  
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

  // INFO: Retina Images 

  var mainContent = document.getElementsByClassName('site-main')[0];
  var images = mainContent.getElementsByTagName('img');
  console.log(images);

  Array.from(images).forEach(function(image) {
    console.log(image);
    var path = image.src.substr(0, image.src.lastIndexOf('/') + 1);
    var file = image.src.substr(image.src.lastIndexOf('/') + 1, image.src.lastIndexOf('.') - image.src.lastIndexOf('/') - 1);
    var extension = image.src.substring(image.src.lastIndexOf('.'));
    console.log(path, file, extension);

    if (window.devicePixelRatio == 2) {
      file = (file.indexOf('@2x') === -1) ? file + '@2x' : file;
      console.log(path + file + extension);
      image.setAttribute('src', path + file + extension);
    } else {
      file = (file.indexOf('@2x') !== -1) ? file.substr(0, file.indexOf('@2x')) : file;
      console.log(path + file + extension);
      image.setAttribute('src', path + file + extension);
    }
  });

  // INFO: Easter Egg 

  cheet('o n c e', function () {
    alert('Voilà!');
  });

})(window, document);