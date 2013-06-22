class Helpers
  require 'nokogiri'

  def self.inject_navigation(document, options={})
    doc         = Nokogiri::HTML(document)
    navigation  = doc.at_css('.nav.dynamic')
    nav_content = ""
    etc_items   = []

    options = {
      limit: 10
    }.merge(options)

    doc.css('section').each_with_index do |section, i|
      h3           = section.at_css('h3')
      section_name = h3["data-nav-value"] || h3.content
      section_id   = section["id"] || (section["id"] = section_name.downcase.gsub(/\W/, '-'))

      if section.css('h4').size == 0
        if i < options[:limit]
          nav_content += navigation_item(section_id, section_name)
        else
          etc_items << { :identifier => section_id, :label => section_name }
        end
      else
        sub_nav   = '<div class="subnav"><ul class="nav nav-pills">'
        sub_items = []
        nav_items = []

        section.css('h4').each do |h4|
          h4_value = h4["data-nav-value"] || h4.content
          h4_id    = "#{section_id}-#{h4_value.downcase.gsub(/\W/, '-')}"
          h4["id"] = h4_id

          nav_items << { :identifier => h4_id, :label => h4_value }
          sub_items << { :identifier => h4_id, :label => h4_value }

          if h4.parent.css('h5').size == 0
            sub_nav += navigation_item(h4_id, h4_value)
          else
            sub_items = h4.parent.css('h5').map do |h5|
              h5_value = h5["data-nav-value"] || h5.content
              h5_id    = "#{h4_id}-#{h5_value.downcase.gsub(/\W/, '-')}"
              h5["id"] = h5_id

              { :identifier => h5_id, :label => h5_value }
            end

            sub_nav += navigation_group(h4_value, h4_id, sub_items)
          end
        end

        sub_nav += "</ul></div>"

        if section.css('.page-header').size != 0
          section.at_css('.page-header').inner_html += sub_nav
        end

        nav_content += navigation_group(section_name, section_id, nav_items)
      end
    end

    if etc_items.size > 0
      nav_content += navigation_group('...', 'etc', etc_items)
    end

    navigation.inner_html = nav_content

    doc.to_html
  end

  def self.inject_blogpost_navigation(document, posts)
    doc        = Nokogiri::HTML(document)
    navigation = doc.at_css('.nav.dynamic')
    items      = []
    etc_items  = []

    posts.each_with_index do |(filename, metadata), i|
      if i < 3
        items << navigation_item("/blog/#{metadata[:url_fragment]}", metadata[:title], { absolute: true })
      else
        etc_items << { :identifier => "/blog/#{metadata[:url_fragment]}", :label => metadata[:title], :absolute => true }
      end
    end


    items.each_with_index do |item, i|
      navigation.inner_html += item
    end

    if etc_items.size > 0
      navigation.inner_html += navigation_group('...', 'etc', etc_items)
    end

    doc.to_html
  end

private

  def self.navigation_item(identifier, label, options={})
    options = {
      absolute: false
    }.merge(options)



    "<li><a href='#{options[:absolute] ? '' : '#'}#{identifier}'>#{label}</a></li>"
  end

  def self.navigation_group(label, identifier, items)
    html = <<-HTML
      <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#" data-href="##{identifier}">
          #{label}
          <b class="caret"></b>
        </a>
        <ul class="dropdown-menu">
    HTML

    items.each do |item|
      html += navigation_item(item.delete(:identifier), item.delete(:label), item)
    end

    html += <<-HTML
        </ul>
      </li>
    HTML

    html
  end
end
