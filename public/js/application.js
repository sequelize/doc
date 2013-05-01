/*global $:false, Prism:false, window:false*/

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

  // fix sub nav on scroll
  var $window      = $(window)
    , $body        = $('body')
    , $nav         = $('.subnav')
    , navHeight    = $('.navbar').first().height()
    , subnavHeight = $nav.first().height()
    , marginTop    = parseInt($body.css('margin-top'), 10)

  var processScroll = function(nav, subnavTop, sectionBottom, isFixed) {
    var scrollTop = $window.scrollTop()

    if (((scrollTop >= subnavTop) && (scrollTop <= sectionBottom)) && !isFixed) {
      isFixed = true
      nav.addClass('subnav-fixed')
      $body.css('margin-top', marginTop + subnavHeight + 'px')
    } else if (((scrollTop <= subnavTop) || (scrollTop >= sectionBottom)) && isFixed) {
      isFixed = false
      nav.removeClass('subnav-fixed')
      $body.css('margin-top', marginTop + 'px')
    }

    return isFixed
  }

  $nav.each(function() {
    var nav           = $(this)
      , section       = nav.parents('section')
      , subnavTop     = nav.length && nav.offset().top - navHeight
      , sectionBottom = section.offset().top + section.height()
      , isFixed       = processScroll(nav, subnavTop, sectionBottom, false)

    $window.scroll(function() {
      isFixed = processScroll(nav, subnavTop, sectionBottom, isFixed)
    })
  })
})()
