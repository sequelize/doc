$(function() {
  $('pre code:not(.skip)').each(function(i, e) {
    var $code     = $(e)
    var codeLines = $code.html().split("\n")

    $code.html(
      codeLines.reduce(function(lines, line, lineNumber) {
        var href   = "block-" + i + "-line-" + lineNumber + ""
          , isLast = ((codeLines.length - 1) === lineNumber)

        if (isLast && (line.trim() === "")) {
          return lines
        } else {
          return lines + "<a href='#" + href + "' class='code-anchor' id='" + href + "'>" + line + "</a>\n"
        }

      }, "")
    )

    hljs.configure({classPrefix: ''});
    hljs.highlightBlock(e);
  })

   $("code[class='javascript']").each(function(){
      var $c = $(this);
      var $a = $('<a/>').addClass('view-raw').text('raw');
      $a.click(function(){
        var popup = window.open('', "popup");
        $(popup.document.body).append($('<pre/>').text($c.text()));
      });

      $a.insertBefore($c);
   });


  var scrollToAnchor = function(anchor) {
    var $element = $('[name="' + anchor + '"],[id="' + anchor + '"]')
    $('html, body').stop().animate({ scrollTop: $element.offset().top - 150 }, 'slow')
  }

  var match = document.location.href.match(/#(.+)$/)

  if (match) {
    ([200, 1000]).forEach(function (delay) {
      setTimeout(function() { scrollToAnchor(match[1]) }, delay);
    });
  }


  $("h1,h2,h3,h4,h5,h6,h7,h8,h9").each(function () {
    var $headline = $(this);
    var id        = $headline.attr('id');

    if (id && ($headline.html().indexOf("<a") === -1)) {
      var $link = $('<a>').attr('href', '#' + id).text($headline.text());
      $headline.html($link);
    }
  });

  $("a[href^=#]").click(function(e) {
    var anchor = $(e.currentTarget).attr('href');

    if (history.pushState) {
      history.pushState(null, null, anchor);
      e.preventDefault();
      scrollToAnchor(anchor.replace("#", ""));
    }
  })
})
