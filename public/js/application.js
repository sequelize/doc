/*global $:false, Prism:false*/

(function() {
  'use strict';

  // load the user images
  $('.mini-browser').each(function() {
    var $browser = $(this)

    $browser
      .append($('<img src="/img/mini-browser.png">'))
      .css('background', 'transparent url(' + $browser.data('img-url') + ') no-repeat left 42px')
  })

  // highlight the code
  $('code.js').removeClass('js').addClass('language-javascript')
  Prism.highlightAll()
})()
