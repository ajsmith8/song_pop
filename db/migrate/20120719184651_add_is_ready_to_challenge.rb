class AddIsReadyToChallenge < ActiveRecord::Migration
  def change
    add_column :challenges, :is_ready, :boolean, default: false
  end
end
