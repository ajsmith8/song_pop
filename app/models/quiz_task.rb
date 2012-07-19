class QuizTask < ActiveRecord::Base
  attr_accessible :t_id, :reason_id, :quiz_q_id, :user_id, :answer, :time, :score, :challenge_id
end
