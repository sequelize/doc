class Helpers
  require 'nokogiri'

  def self.inject_sub_navigation(document)
    doc = Nokogiri::HTML(document)

    doc.css('section').each do |section|
      section_id = section.at_css('h2').content.downcase
      sub_nav    = '<div class="subnav"><ul class="nav nav-pills">'

      section.css('h3').each do |h3|
        h3_id = "#{section_id}-#{h3.content.downcase.gsub(/\W/, '-')}"
        h3.parent.parent["id"] = h3_id

        if h3.parent.css('h4').size == 0
          sub_nav += "<li><a href='##{h3_id}'>#{h3.content}</a></li>"
        else
          sub_nav += <<-HTML
            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                #{h3.content}
                <b class="caret"></b>
              </a>
              <ul class="dropdown-menu">
          HTML

          h3.parent.css('h4').each do |h4|
            h4_id    = "#{h3_id}-#{h4.content.downcase.gsub(/\W/, '-')}"
            h4["id"] = h4_id
            sub_nav += "<li><a href='##{h4_id}'>#{h4.content}</a></li>"
          end

          sub_nav += <<-HTML
              </ul>
            </li>
          HTML
        end
      end

      sub_nav += "</ul></div>"
      section.at_css('.page-header').inner_html += sub_nav
    end

    doc.to_html
  end

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
