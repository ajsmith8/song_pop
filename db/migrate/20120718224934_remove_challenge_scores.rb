class RemoveChallengeScores < ActiveRecord::Migration
  def up
    drop_table :challenge_scores
  end

  def down
  end
end
