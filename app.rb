require 'sinatra'
require 'redcarpet'

require './lib/sequelize_renderer'
require './lib/helpers'

set :markdown, :renderer => SequelizeRenderer, :fenced_code_blocks => true, :strikethrough => true

get '/' do
  html = erb('documentation/index'.to_sym)
  html = Helpers.inject_navigation(html)
  html
end
