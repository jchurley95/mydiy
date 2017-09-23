class AddLengthListToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :projectLengthList, :float, array: true, default: []
  end
end
