class T < ActiveRecord::Base
  attr_accessible :title, :description, :source_url, :url, :score, :is_approved, 
                  :current_events, :education, :finance, :health, :politics, :tech

  has_many :reasons, dependent: :destroy
end
