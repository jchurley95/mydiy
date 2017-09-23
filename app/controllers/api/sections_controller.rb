class Api::SectionsController < ApplicationController
    def index
        @project = Project.find params[:project_id]
        @sections = @project.sections.all
        render json: @sections
    end
    
    def create
        @project = Project.find params[:project_id]
        @section = Section.create(section_params)
        redirect_to api_project_path(@project)
    end
    
    def show
        @project = Project.find params[:project_id]
        @section = @project.sections.find params[:id]
        @pieces = @section.pieces.all
        render json: {
            project: @project,
            section: @section,
            pieces: @pieces
        }
    end
    
    def update
        @section = Section.find(params[:id])
        @section.update!(section_params)
        redirect_to api_project_section_path(@section)
    end
    
    def destroy
        @section = Section.find(params[:id])
        @section.destroy
        redirect_to api_project_sections_path
    end
    
    private
    
    def section_params
        params.require(:section).permit(:name, :sectionPhotoURL, :description, :totalCostOfSection, :totalNumberOfBoards, :cutPlan, :project_id)
    end
end
