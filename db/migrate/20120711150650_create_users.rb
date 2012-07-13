class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :provider
      t.string :uid
      t.string :token
      t.integer :score, default: 0
      t.integer :level, default: 0
      t.integer :current_events, default: 0
      t.integer :education, default: 0
      t.integer :finance, default: 0
      t.integer :health, default: 0
      t.integer :politics, default: 0
      t.integer :tech, default: 0
      t.boolean :is_admin, default: false
      
      t.timestamps
    end
  end
end
