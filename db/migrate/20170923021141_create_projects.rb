class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :projectPhotoURL, array: true, default: []
      t.string :description
      t.float :totalCostOfProject
      t.string :totalNumberOfBoards
      t.string :cutPlan

      t.timestamps
    end
  end
end
