class AddTimeToChallenges < ActiveRecord::Migration
  def change
    add_column :challenges, :time_created, :integer
  end
end
