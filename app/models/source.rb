class Source < ActiveRecord::Base
  attr_accessible :t_id, :reason_id, :description, :url, :is_approved
  
  has_many :quiz_qs, dependent: :destroy
  belongs_to :reason
end
