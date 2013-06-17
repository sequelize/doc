require 'rack/rewrite'

use Rack::Rewrite do
  r301 %r{.*}, 'http://sequelizejs.com$&', :if => Proc.new { |rack_env|
    (rack_env['SERVER_NAME'] != 'sequelizejs.com') && !rack_env['SERVER_NAME'].include?('localhost')
  }
end

require './app'
run Sinatra::Application
