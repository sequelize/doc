require 'sinatra'

get '/' do
  erb 'documentation/index'.to_sym
end
