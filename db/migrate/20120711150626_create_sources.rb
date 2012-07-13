class CreateSources < ActiveRecord::Migration
  def change
    create_table :sources do |t|
      t.integer :t_id
      t.integer :reason_id
      t.text :description
      t.string :url
      t.boolean :is_approved, default: false
      
      t.timestamps
    end
  end
end
