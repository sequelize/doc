require 'sinatra'
require 'redcarpet'
require 'net/http'
require 'uri'

require './lib/sequelize_renderer'
require './lib/helpers'

set :markdown, :renderer => SequelizeRenderer, :fenced_code_blocks => true, :strikethrough => true

def check_host(req)
  uri = URI(req.url)

  allowed_hosts = [/^www.sequelizejs.com/, /^localhost/]

  unless allowed_hosts.map{ |host| !!uri.host.match(host) }.include?(true)
    uri.host = 'www.sequelizejs.com'
    redirect to(uri.to_s), 301
  end
end

get '/' do
  check_host(request)
  redirect to('/documentation')
end

get '/documentation' do
  check_host(request)

  html = erb('documentation/index'.to_sym)
  html = Helpers.inject_navigation(html)
  html
end

get '/heroku' do
  check_host(request)

  html = erb('articles/heroku/index'.to_sym)
  html = Helpers.inject_navigation(html)

  html
end

get '/changelog' do
  check_host(request)

  changelog = Net::HTTP.get(URI.parse('https://raw.github.com/sequelize/sequelize/master/changelog.md'))
  changelog = changelog.gsub('# ', '### ').scan(/(###.+?)\n\n/m)

  html = erb('changelog/index'.to_sym, :locals => { :changelog => changelog })
  html = Helpers.inject_navigation(html)

  html
end

get '/imprint' do
  check_host(request)

  html = erb('imprint/index'.to_sym)
  html = Helpers.inject_navigation(html)

  html
end
