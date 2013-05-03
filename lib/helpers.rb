class Helpers
  require 'nokogiri'

  def self.inject_navigation(document)
    doc         = Nokogiri::HTML(document)
    navigation  = doc.at_css('.nav.dynamic')
    nav_content = ""

    doc.css('section').each do |section|
      section_id   = section["id"]
      section_name = section.at_css('h2').content

      if section.css('h3').size == 0
        nav_content += navigation_item(section_id, section_name)
      else
        sub_nav   = '<div class="subnav"><ul class="nav nav-pills">'
        sub_items = []
        nav_items = []

        section.css('h3').each do |h3|
          h3_value = h3["data-nav-value"] || h3.content
          h3_id    = "#{section_id}-#{h3_value.downcase.gsub(/\W/, '-')}"
          h3.parent.parent["id"] = h3_id

          nav_items << { :identifier => h3_id, :label => h3_value }
          sub_items << { :identifier => h3_id, :label => h3_value }

          if h3.parent.css('h4').size == 0
            sub_nav += navigation_item(h3_id, h3_value)
          else
            sub_items = h3.parent.css('h4').map do |h4|
              h4_value = h4["data-nav-value"] || h4.content
              h4_id    = "#{h3_id}-#{h4_value.downcase.gsub(/\W/, '-')}"
              h4["id"] = h4_id

              { :identifier => h4_id, :label => h4_value }
            end

            sub_nav += navigation_group(h3_value, sub_items)
          end
        end

        sub_nav += "</ul></div>"

        section.at_css('.page-header').inner_html += sub_nav
        nav_content += navigation_group(section_name, nav_items)
      end
    end

    navigation.inner_html = nav_content

    doc.to_html
  end

private

  def self.navigation_item(identifier, label)
    "<li><a href='##{identifier}'>#{label}</a></li>"
  end

  def self.navigation_group(label, items)
    html = <<-HTML
      <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
          #{label}
          <b class="caret"></b>
        </a>
        <ul class="dropdown-menu">
    HTML

    items.each do |item|
      html += navigation_item(item[:identifier], item[:label])
    end

    html += <<-HTML
        </ul>
      </li>
    HTML

    html
  end
end
