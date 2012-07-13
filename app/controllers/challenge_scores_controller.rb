class ChallengeScoresController < ApplicationController
  respond_to :json
  
  def index
    respond_with ChallengeScore.all
  end
  
  def show
    respond_with ChallengeScore.find(params[:id])
  end
  
  def create
    respond_with ChallengeScore.create(params[:challenge_score])
  end
  
  def update
    respond_with ChallengeScore.update(params[:id], params[:challenge_score])
  end
  
  def destroy
    respond_with ChallengeScore.destroy(params[:id])
  end
end
