class QuizQ < ActiveRecord::Base
  attr_accessible :t_id, :source_id, :question, :correct, :wrong1, :wrong2, :wrong3, :wrong4, :is_approved, :score, :reason_id
  
  belongs_to :source
end
