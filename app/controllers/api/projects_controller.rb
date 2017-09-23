class Api::ProjectsController < ApplicationController
    def index
        @projects = Project.all
        render json: @projects
    end
    
    def create
        @project = Project.create!(project_params)
        redirect_to api_project_path(@project)
    end
    
    def show
        @project = Project.find(params[:id])
        render json: @project
    end
    
    def update
        @project = Project.find(params[:id])
        @project.update!(project_params)
        redirect_to api_project_path(@project)
    end
    
    def destroy
        @project = Project.find(params[:id])
        @project.destroy
        redirect_to api_projects_path
    end
    
    private
    
    def project_params
        params.require(:project).permit(:name, :projectPhotoURL, :description, :totalCostOfProject, :totalNumberOfBoards, :cutPlan)
    end
end
