class CreateSections < ActiveRecord::Migration[5.1]
  def change
    create_table :sections do |t|
      t.string :name
      t.string :description
      t.string :sectionPhotoURL, array: true, default: []
      t.float :totalCostOfSection
      t.string :totalNumberOfBoards
      t.string :cutPlan
      t.references :project, foreign_key: true

      t.timestamps
    end
  end
end
