class Section < ApplicationRecord
    belongs_to :project
    has_many :pieces, dependent: :destroy
end
