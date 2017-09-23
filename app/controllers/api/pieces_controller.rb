class Api::PiecesController < ApplicationController
    def index
        @pieces = Piece.all
        render json: @pieces
    end
    
    def create
        @piece = Piece.create(piece_params)
        redirect_to api_project_section_piece_path(@piece)
    end
    
    def show
        @piece = Piece.find(params[:id])
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
