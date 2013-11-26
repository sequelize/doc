$(function() {
  $('.mini-browser').each(function() {
    var $browser = $(this)

    $browser
      .append($('<img src="/images/users/mini-browser.png">'))
      .css('background', 'transparent url(' + $browser.data('img-url') + ') no-repeat left 42px')
  })
})
