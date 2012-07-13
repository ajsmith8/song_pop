class CreateChallengeScores < ActiveRecord::Migration
  def change
    create_table :challenge_scores do |t|
      t.integer :a_id
      t.integer :b_id
      t.integer :a_wins
      t.integer :b_wins
      t.integer :ties

      t.timestamps
    end
  end
end
