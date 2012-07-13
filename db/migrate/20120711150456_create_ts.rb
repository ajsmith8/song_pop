class CreateTs < ActiveRecord::Migration
  def change
    create_table :ts do |t|
      t.string :title
      t.text :description
      t.string :source_url
      t.string :url
      t.integer :score, default: 0
      t.boolean :is_approved, default: false
      t.integer :current_events, default: 0
      t.integer :education, default: 0
      t.integer :finance, default: 0
      t.integer :health, default: 0
      t.integer :politics, default: 0
      t.integer :tech, default: 0

      t.timestamps
    end
  end
end
