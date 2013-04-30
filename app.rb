require 'sinatra'
require 'redcarpet'

class SequelizeRenderer < Redcarpet::Render::HTML
  def header(text, header_level)
    result = "<h#{header_level}>#{text}</h#{header_level}>"

    if header_level == 2
      result = "<div class=\"page-header\">#{result}</div>"
    end

    result
  end
end

set :markdown, :renderer => SequelizeRenderer, :fenced_code_blocks => true

get '/' do
  def markdown
  Redcarpet::Markdown.new(SequelizeRenderer, :fenced_code_blocks => true)
end

  erb 'documentation/index'.to_sym
end
