class AddReasonIdToQuizQs < ActiveRecord::Migration
  def change
    add_column :quiz_qs, :reason_id, :integer
  end
end
