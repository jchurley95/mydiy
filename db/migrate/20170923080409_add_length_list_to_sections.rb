class AddLengthListToSections < ActiveRecord::Migration[5.1]
  def change
    add_column :sections, :sectionLengthsList, :float, array: true, default: []
  end
end 
