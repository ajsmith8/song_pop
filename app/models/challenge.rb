class Challenge < ActiveRecord::Base
  attr_accessible :t_id, :reason_id, :challenger_id, :user_id, :is_finished, :time_created, :user_score, :challenger_score, :is_ready
end
