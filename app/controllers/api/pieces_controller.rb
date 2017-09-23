class Api::PiecesController < ApplicationController
    def index
        @project = Project.find params[:project_id]
        @section = @project.sections.find params[:section_id]
        @pieces = @section.pieces
        render json: @pieces
    end
    
    def create
        @project = Project.find params[:project_id]
        @section = @project.sections.find params[:section_id]
        @piece = Piece.create(piece_params)
        # redirect_to api_project_section_path(@section)
    end
    
    def show
        @project = Project.find params[:project_id]
        @section = @project.sections.find params[:section_id]
        @piece = @section.pieces.find params[:id]
        render json: @piece
    end
    
    def update
        @piece = Piece.find(params[:id])
        @piece.update!(piece_params)
        redirect_to api_project_section_piece_path(@piece)
    end
    
    def destroy
        @piece = Piece.find(params[:id])
        @piece.destroy
        redirect_to api_project_section_pieces_path
    end
    
    private
    
    def piece_params
        params.require(:piece).permit(:pieceLength, :pieceWidth, :pieceHeight, :pieceCost, :pieceLabel, :typeOfWood, :section_id)
    end
end
