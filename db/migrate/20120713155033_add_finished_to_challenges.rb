class AddFinishedToChallenges < ActiveRecord::Migration
  def change
    add_column :challenges, :is_finished, :boolean, default: false
  end
end
