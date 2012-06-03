var SequelizeDoc = (function() {
  "use strict"

  return {
    init: function(version) {
      this.initPrettify()
      this.initSubNavigationBars()
      this.highlightChanges(version)
    },

    initPrettify: function() {
      window.prettyPrint && prettyPrint()
    },

    initSubNavigationBars: function() {
      $('body > .container > section').each(function() {
        var $section = $(this)

        if($('.subnav', $section).length > 0) {
          new SequelizeDoc.SubNavigation($section).observeScrolling()
        }
      })
    },

    highlightChanges: function(version) {
      var formattedVersion = version.replace(/\./g, '-')

      $('.v' + formattedVersion).each(function() {
        var $element       = $(this)
          , $section       = $element.is('section') ? $element : $element.parents('section')
          , $newSpan       = $('<span>').addClass('new').text('~new~')
          , $subNaviAnchor = $("a[href='#" + $section.attr("id") +"']")
          , $naviAnchor    = $("a[href='#" + $subNaviAnchor.parents('section').attr("id") +"']")
          , $child         = $("> *", $element).first()

        if($child.length === 0) {
          $child = $element
        }

        if($child.is('h3')) {
          $child.append($newSpan.clone().addClass('appended'))
        } else {
          $child.prepend($newSpan.clone())
        }

        if ($(".new", $subNaviAnchor).length == 0) {
          $subNaviAnchor.append($newSpan.clone())
        }

        if (($naviAnchor.length > 0) && ($('.new', $naviAnchor).length == 0)) {
          $naviAnchor.append($newSpan.clone())
        }
      })
    }
  }
})()
