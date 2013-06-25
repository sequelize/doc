require 'rack/rewrite'

use Rack::Rewrite do
  r301 %r{.*}, 'http://sequelizejs.com/blog', :if => Proc.new { |rack_env|
    rack_env['SERVER_NAME'] == 'blog.sequelizejs.com' # && rack_env['REQUEST_PATH'] == '/'
  }
  r301 %r{.*}, 'http://sequelizejs.com$&', :if => Proc.new { |rack_env|
    (rack_env['SERVER_NAME'] != 'sequelizejs.com') && !rack_env['SERVER_NAME'].include?('localhost')
  }
  r301 '/post/23227764351/changes-in-sequelize-1-2-1', '/blog/changes-in-sequelize-v1-2-1'
  r301 '/post/23227707458/changes-in-sequelize-1-3-0', '/blog/changes-in-sequelize-v1-3-0'
  r301 '/post/24345409723/changes-in-sequelize-1-4-0', '/blog/changes-in-sequelize-v1-4-0'
  r301 '/post/24403298792/changes-in-sequelize-1-4-1', '/blog/changes-in-sequelize-v1-4-1'
  r301 '/post/46949108134/v1-6-0-eager-loading-support-for-enums-decimals-and', '/blog/v1-6-0-Eager-loading-enums-performance'
end

require './app'
run Sinatra::Application
