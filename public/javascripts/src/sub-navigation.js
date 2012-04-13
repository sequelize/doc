SequelizeDoc.SubNavigation = (function() {
  "use strict"

  var SubNavigation = function(section) {
    this.section       = $(section)
    this.subnav        = $('.subnav', this.section)
    this.sectionBottom = this.section.offset().top + this.section.height()
    this.navOffset     = this.subnav.offset().top - 40
    this.isFixed       = false
  }

  SubNavigation.prototype.observeScrolling = function() {
    var self = this

    $(window).scroll(function() {
      checkFixedPosition.call(self)
      checkHighlightOfSuperNavigationItem.call(self)
    })
  }

  var checkFixedPosition = function() {
    var scrollTop = $(window).scrollTop()
      , fixSubNav = ((scrollTop >= this.navOffset) && (scrollTop < this.sectionBottom) && !this.isFixed)
      , unfixSubNav = ((scrollTop <= this.navOffset) || (scrollTop > this.sectionBottom) && this.isFixed)

    if (fixSubNav) {
      this.isFixed = true
      this.subnav.addClass('subnav-fixed')
      $('body').addClass('with-subnav')
      this.subnav.parent().prepend(jQuery('<div class="subnav-placeholder">'))
    } else if (unfixSubNav) {
      this.isFixed = false
      jQuery('.subnav-placeholder', this.subnav.parent()).remove()
      this.subnav.removeClass('subnav-fixed')
      $('body').removeClass('with-subnav')
    }
  }

  var checkHighlightOfSuperNavigationItem = function() {
    var navigationItemSelector = ".navbar-fixed-top a[href='#" + this.section.attr('id') + "']"
      , navigationItem         = $(navigationItemSelector).parent()

    navigationItem.toggleClass('active', this.isFixed)
  }

  return SubNavigation
})()
