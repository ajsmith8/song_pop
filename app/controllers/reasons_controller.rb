class ReasonsController < ApplicationController
  respond_to :json
  
  def index
    respond_with Reason.all
  end
  
  def show
    respond_with Reason.find(params[:id])
  end
  
  def create
    respond_with Reason.create(params[:reason])
  end
  
  def update
    respond_with Reason.update(params[:id], params[:reason])
  end
  
  def destroy
    respond_with Reason.destroy(params[:id])
  end
end
