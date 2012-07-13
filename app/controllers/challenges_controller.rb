class ChallengesController < ApplicationController
  respond_to :json
  
  def index
    respond_with Challenge.all
  end
  
  def show
    respond_with Challenge.find(params[:id])
  end
  
  def create
    respond_with Challenge.create(params[:challenge])
  end
  
  def update
    respond_with Challenge.update(params[:id], params[:challenge])
  end
  
  def destroy
    respond_with Challenge.destroy(params[:id])
  end
end
