class ChangeTimeToBigInt < ActiveRecord::Migration
  def up
    remove_column :challenges, :time_created
    add_column :challenges, :time_created, :bigint
  end

  def down
  end
end
