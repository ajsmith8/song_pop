class AddScoreStuffToChallenges < ActiveRecord::Migration
  def change
    add_column :challenges, :challenger_score, :integer, default: 0
    add_column :challenges, :user_score, :integer, default: 0
  end
end
