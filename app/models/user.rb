class User < ActiveRecord::Base
  attr_accessible :name, :email, :provider, :uid, :token, :score, :level, :is_admin, :first_name, :last_initial, :is_temp_user,
                  :current_events, :education, :finance, :health, :politics, :tech
                  
  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.name = auth["info"]["name"]
      user.first_name = auth["info"]["first_name"]
      user.last_initial = auth["info"]["last_name"][0].upcase
      user.email = auth["info"]["email"]
    end
  end
end
