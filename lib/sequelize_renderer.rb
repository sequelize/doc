class SequelizeRenderer < Redcarpet::Render::HTML
  def doc_header
    '<div class="row"><div class="span12">'
  end

  def doc_footer
    '</div></div>'
  end
end
