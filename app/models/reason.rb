class Reason < ActiveRecord::Base
  attr_accessible :t_id, :title, :description, :is_pro, :score, :is_approved
  
  has_many :sources, dependent: :destroy
  belongs_to :t
end
