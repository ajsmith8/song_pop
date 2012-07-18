class ChangeTimeToFloat < ActiveRecord::Migration
  def up
    remove_column :quiz_tasks, :time
    add_column :quiz_tasks, :time, :float
  end

  def down
  end
end
