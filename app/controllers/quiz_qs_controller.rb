class QuizQsController < ApplicationController
  respond_to :json
  
  def index
    respond_with QuizQ.all
  end
  
  def show
    respond_with QuizQ.find(params[:id])
  end
  
  def create
    respond_with QuizQ.create(params[:quiz_q])
  end
  
  def update
    respond_with QuizQ.update(params[:id], params[:quiz_q])
  end
  
  def destroy
    respond_with QuizQ.destroy(params[:id])
  end
end
