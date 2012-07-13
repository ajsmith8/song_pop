class SourcesController < ApplicationController
  respond_to :json
  
  def index
    respond_with Source.all
  end
  
  def show
    respond_with Source.find(params[:id])
  end
  
  def create
    respond_with Source.create(params[:source])
  end
  
  def update
    respond_with Source.update(params[:id], params[:source])
  end
  
  def destroy
    respond_with Source.destroy(params[:id])
  end
end
