class AddChallengeIdToQuizTask < ActiveRecord::Migration
  def change
    add_column :quiz_tasks, :challenge_id, :integer
  end
end
