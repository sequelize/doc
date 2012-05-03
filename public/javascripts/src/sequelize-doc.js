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
        var $element = $(this)
          , $section = $element.is('section') ? $element : $element.parents('section')
          , $newSpan = $('<span>').addClass('new').text('~new~')

        $("> *", $element).first().prepend($newSpan.clone())

        var $naviAnchor = $("a[href='#" + $section.attr("id") +"']")

        if($(".new", $naviAnchor).length == 0) {
          $naviAnchor.append($newSpan.clone())
        }
      })
    }
  }
})()
