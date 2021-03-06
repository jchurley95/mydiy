# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170923080845) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "pieces", force: :cascade do |t|
    t.float "pieceLength"
    t.float "pieceWidth"
    t.float "pieceHeight"
    t.float "pieceCost"
    t.string "pieceLabel"
    t.string "typeOfWood"
    t.bigint "section_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["section_id"], name: "index_pieces_on_section_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.string "projectPhotoURL", default: [], array: true
    t.string "description"
    t.float "totalCostOfProject"
    t.string "totalNumberOfBoards"
    t.string "cutPlan"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "projectLengthList", default: [], array: true
  end

  create_table "sections", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "sectionPhotoURL", default: [], array: true
    t.float "totalCostOfSection"
    t.string "totalNumberOfBoards"
    t.string "cutPlan"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "sectionLengthsList", default: [], array: true
    t.index ["project_id"], name: "index_sections_on_project_id"
  end

  add_foreign_key "pieces", "sections"
  add_foreign_key "sections", "projects"
end
