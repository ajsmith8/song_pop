class QuizTasksController < ApplicationController
  respond_to :json
  
  def index
    respond_with QuizTask.all
  end
  
  def show
    respond_with QuizTask.find(params[:id])
  end
  
  def create
    respond_with QuizTask.create(params[:quiz_task])
  end
  
  def update
    respond_with QuizTask.update(params[:id], params[:quiz_task])
  end
  
  def destroy
    respond_with QuizTask.destroy(params[:id])
  end
end
