require 'sinatra'
require 'redcarpet'

require './lib/sequelize_renderer'
require './lib/helpers'

set :markdown, :renderer => SequelizeRenderer, :fenced_code_blocks => true, :strikethrough => true

get '/' do
  redirect to('/documentation')
end

get '/documentation' do
  html = erb('documentation/index'.to_sym)
  html = Helpers.inject_navigation(html)
  html
end

get '/heroku' do
  html = erb('articles/heroku/index'.to_sym)
  html = Helpers.inject_navigation(html)
  html
end
