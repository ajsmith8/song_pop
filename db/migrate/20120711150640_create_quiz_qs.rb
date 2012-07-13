class CreateQuizQs < ActiveRecord::Migration
  def change
    create_table :quiz_qs do |t|
      t.integer :t_id
      t.integer :source_id
      t.string :question
      t.string :correct
      t.string :wrong1
      t.string :wrong2
      t.string :wrong3
      t.string :wrong4
      t.boolean :is_approved, default: false
      
      t.timestamps
    end
  end
end
