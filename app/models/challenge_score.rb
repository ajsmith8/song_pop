class ChallengeScore < ActiveRecord::Base
  attr_accessible :a_id, :b_id, :a_wins, :b_wins, :ties
end
