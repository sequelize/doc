class Helpers
  require 'nokogiri'

  def self.find_navigation_items(document)
    doc   = Nokogiri::HTML(document)
    items = []

    doc.css('section').map do |section|
      items << {
        :title => section.at_css('h2').content,
        :url   => section['id']
      }
    end

    items
  end

  def self.inject_navigation(items, document)
    doc     = Nokogiri::HTML(document)
    nav     = doc.at_css('.nav.dynamic')
    content = ""

    puts items.inspect

    items.each do |item|
      content += "<li><a href='##{item[:title]}'>#{item[:title]}</a></li>"
    end

    nav.inner_html = content

    doc.to_html
  end
end
