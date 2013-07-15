/*global $, Prism, window*/

(function() {
  'use strict';

  var Application = {
    renderMiniBrowsers: function() {
      $('.mini-browser').each(function() {
        var $browser = $(this)

        $browser
          .append($('<img src="/img/mini-browser.png">'))
          .css('background', 'transparent url(' + $browser.data('img-url') + ') no-repeat left 42px')
      })
    },

    highlightCode: function() {
      $('code.js').removeClass('js').addClass('language-javascript')
      Prism.highlightAll()
    },

    initScrollSpy: function() {
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

      $('.subnav').on('activate', function(e) {
        var $a      = $(e.target).find('a')
          , href    = $a.data('href') || $a.attr('href')
          , $parent = $('.navbar a[href="' + href + '"]').parent()

        $('.navbar .active').removeClass('active')
        $parent.addClass('active')
        $parent.parents('.dropdown').addClass('active')
      })
    },

    checkForFlickrImages: function() {
      $("[data-source='flickr']").each(function() {
        var $img  = $(this)

        $img
          .wrap(
            $("<a href='" + $img.data('page') + "'></a>")
              .css({
                position:        "relative",
                display:         "inline-block",
                "margin-bottom": "30px"
              })
          )
          .addClass('img-polaroid')
          .css({ "padding-bottom": 40 })
          .after(
            $("<span>")
              .html("<img src='/img/cc.png' style='width: 20px'>&nbsp;&nbsp;&nbsp;Image courtesy of " + $img.data('author') + " on Flickr")
              .css({
                position: "absolute",
                bottom:   10,
                left:     10
              })
          )
      })
    }
  }

  Object.keys(Application).forEach(function(key) {
    Application[key]()
  })
})()
