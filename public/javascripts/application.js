var Application = {
  init: function() {
    this.initPrettify()
    this.fixSubNavigation()
  },

  initPrettify: function() {
    window.prettyPrint && prettyPrint()
  },

  fixSubNavigation: function() {
    // fix sub nav on scroll
    var $win = $(window)
      , $nav = $('.subnav')
      , navTop = $nav.length && $nav.offset().top - 40
      , isFixed = 0

    processScroll()

    $win.on('scroll', processScroll)

    function processScroll() {
      var i, scrollTop = $win.scrollTop()

      if (scrollTop >= navTop && !isFixed) {
        isFixed = 1
        $nav.addClass('subnav-fixed')
        $('body').addClass('with-subnav')
      } else if (scrollTop <= navTop && isFixed) {
        isFixed = 0
        $nav.removeClass('subnav-fixed')
        $('body').removeClass('with-subnav')
      }
    }
  }
}
