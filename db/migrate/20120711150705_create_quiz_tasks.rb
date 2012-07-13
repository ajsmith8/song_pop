class CreateQuizTasks < ActiveRecord::Migration
  def change
    create_table :quiz_tasks do |t|
      t.integer :t_id
      t.integer :reason_id
      t.integer :quiz_q_id
      t.integer :user_id
      t.string :answer
      t.integer :time
      t.integer :score
      
      t.timestamps
    end
  end
end
