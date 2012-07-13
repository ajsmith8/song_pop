class AddTempUserToUsers < ActiveRecord::Migration
  def change
    add_column :users, :last_initial, :string
    add_column :users, :is_temp_user, :boolean, default: true
  end
end
