class SequelizeRenderer < Redcarpet::Render::HTML
  def header(text, level)
    display_value, nav_value = text.split('|').map(&:strip)
    attrs = (nav_value ? " data-nav-value='#{nav_value}'" : "")
    "<h#{level}#{attrs}>#{display_value}</h#{level}>"
  end

  def doc_header
    '<div class="row"><div class="span12">'
  end

  def doc_footer
    '</div></div>'
  end
end
