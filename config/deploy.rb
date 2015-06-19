# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'Apps-For-Impact'
set :repo_url, 'git@github.com:Tinybop/Apps-For-Impact.git'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
set :linked_files, %w{.htaccess .htpasswd}

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

set :tmp_dir, '/root/tmp/capistrano'

server '70.32.89.52',
  ssh_options: {
    user: 'root',
    forward_agent: true
  }

namespace :deploy do

  # desc "Restart application"
  # task :symlink_files do
  #   execute "ln -nfs #{shared_path}/.htaccess #{release_path}/.htaccess"
  # end
  #
  # after :finishing, 'deploy:symlink_files'

  after :finishing, 'deploy:cleanup'


end
