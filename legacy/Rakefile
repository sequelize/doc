namespace :blog do
  namespace :post do
    desc "Create a new blog post"
    task :create, :title do |t, args|
      path = "views/blog/posts/#{Time.new.to_i}-#{args[:title].downcase.gsub(' ', '-')}.md"

      File.open path, "w" do |f|
        f.write [
          "### #{args[:title]}",
          "teaser teaser teaser",
          "#### Sub headline",
          "text text text"
        ].join("\n\n")
      end
    end
  end
end
