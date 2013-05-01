require 'sinatra'
require 'redcarpet'

class SequelizeRenderer < Redcarpet::Render::HTML
  def doc_header
    '<div class="row"><div class="span12">'
  end

  def doc_footer
    '</div></div>'
  end
end

set :markdown, :renderer => SequelizeRenderer, :fenced_code_blocks => true, :strikethrough => true

get '/' do
  def markdown
  Redcarpet::Markdown.new(SequelizeRenderer, :fenced_code_blocks => true)
end

  erb 'documentation/index'.to_sym
end
