class CreateChallenges < ActiveRecord::Migration
  def change
    create_table :challenges do |t|
      t.integer :t_id
      t.integer :reason_id
      t.integer :challenger_id
      t.integer :user_id
      
      t.timestamps
    end
  end
end
