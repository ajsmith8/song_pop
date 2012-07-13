class ChangeSourceUrlToText < ActiveRecord::Migration
  def up
    remove_column :sources, :url
    add_column :sources, :url, :text 
  end

  def down
  end
end
