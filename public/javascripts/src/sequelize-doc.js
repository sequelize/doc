var SequelizeDoc = (function() {
  "use strict"

  return {
    init: function() {
      this.initPrettify()
      this.initSubNavigationBars()
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
    }
  }
})()
