class CreatePieces < ActiveRecord::Migration[5.1]
  def change
    create_table :pieces do |t|
      t.float :pieceLength
      t.float :pieceWidth
      t.float :pieceHeight
      t.float :pieceCost
      t.string :pieceLabel
      t.string :typeOfWood
      t.references :section, foreign_key: true

      t.timestamps
    end
  end
end
