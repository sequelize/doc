require 'sinatra'
require 'redcarpet'
require 'net/http'
require 'uri'

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
  posts = Dir['views/blog/posts/*md'].map do |d|
    d.sub('views/blog/posts/', '').sub('.md', '')
  end.sort_by(&:to_i).map do |filename|
    html = markdown("blog/posts/#{filename}".to_sym)

    [
      filename, {
        :title   => [html.match(/<h3>(.*)<\/h3>/), $1].last,
        :content => html
      }
    ]
  end.reverse

  html = erb('blog/index'.to_sym, :locals => { :posts => posts })
end

get '/blog/:title' do
  post = Dir['views/blog/posts/*md'].map do |d|
    d.sub('views/blog/posts/', '').sub('.md', '')
  end.detect do |d|
    d.sub("#{d.to_i}-", "") == params[:title]
  end

  html = erb('blog/show'.to_sym, :locals => { :post => post })
end
