class AddScoreToQuizQAgain < ActiveRecord::Migration
  def change
    add_column :quiz_qs, :score, :integer, default: 0
  end
end
