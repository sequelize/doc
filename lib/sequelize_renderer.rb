class SequelizeRenderer < Redcarpet::Render::HTML
  def header(text, level)
    display_value, nav_value = text.split('|').map(&:strip)

    attrs  = (nav_value ? " data-nav-value='#{nav_value}'" : "")
    result = "<h#{level}#{attrs}>#{display_value}</h#{level}>"

    if level == 2
      result = "<div class='page-header'>#{result}</div>"
    end

    result
  end

  def doc_header
    '<div class="row"><div class="span12">'
  end

  def doc_footer
    '</div></div>'
  end
end
