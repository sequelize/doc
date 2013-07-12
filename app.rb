require 'sinatra'
require 'redcarpet'
require 'net/http'
require 'uri'

require './lib/misc/sequelize_renderer'
require './lib/helpers'
require './lib/models/post'

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

get '/changelog' do
  changelog = `curl https://raw.github.com/sequelize/sequelize/master/changelog.md`
  changelog = changelog.gsub('# ', '### ').scan(/(###.+?)\n\n/m)

  html = erb('changelog/index'.to_sym, :locals => { :changelog => changelog })
  html = Helpers.inject_navigation(html)

  html
end

get '/imprint' do
  html = erb('imprint/index'.to_sym)
  html = Helpers.inject_navigation(html)

  html
end

get '/blog' do
  posts = Post.all

  html = erb('blog/index'.to_sym, :locals => { :posts => posts })
  html = Helpers.inject_blogpost_navigation(html, posts)

  html
end

get '/blog/:title' do
  post = Post.find_by_basename(params[:title])

  html = erb('blog/show'.to_sym, :locals => { :post => post })
  html = Helpers.inject_blogpost_navigation(html, Post.all)

  html
end
