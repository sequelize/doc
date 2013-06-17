require 'rack/rewrite'

use Rack::Rewrite do
  r301 %r{.*}, 'http://sequelizejs.com$&', :if => Proc.new { |rack_env|
    (rack_env['SERVER_NAME'] != 'sequelizejs.com') && !rack_env['SERVER_NAME'].include?('localhost')
  }
  r301 '/post/23227764351/changes-in-sequelize-1-2-1', '/blog/changes-in-sequelize-v1-2-1'
end

require './app'
run Sinatra::Application
