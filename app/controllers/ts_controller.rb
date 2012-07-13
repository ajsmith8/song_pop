class TsController < ApplicationController
  respond_to :json
  
  def index
    respond_with T.all
  end
  
  def show
    respond_with T.find(params[:id])
  end
  
  def create
    respond_with T.create(params[:t])
  end
  
  def update
    respond_with T.update(params[:id], params[:t])
  end
  
  def destroy
    respond_with T.destroy(params[:id])
  end
end
