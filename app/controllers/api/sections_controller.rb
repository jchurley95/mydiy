class Api::SectionsController < ApplicationController
    def index
        @sections = Section.all
        render json: @sections
    end
    
    def create
        @section = Section.create(section_params)
        redirect_to api_project_section_path(@section)
    end
    
    def show
        @section = Section.find(params[:id])
        render json: @section
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
