# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Project.destroy_all;
Section.destroy_all;
Piece.destroy_all;

projects = Project.create([
    {
        name: "RHCP Poker Table",
        description: 'Poker table designed to emulate the Red Hot Chili Peppers logo.'
    },
    {
        name: "Canoe Paddle",
        description: 'Paddle made from oak, cedar, pine, and sealed with fiberglass/epoxy.'
    }
])

# sections = Section.create([
#     {
#         name: 'Table Top',
#         description: 'Octagonal shape, red black and white stain',
#         project: projects.first
#     },
#     {
#         name: 'Table Bottom',
#         description: 'Square shape, painted black',
#         project: projects.first
#     }
# ])

# pieces = Piece.create([
#     {
#         pieceLength: 17.25,
#         pieceWidth: 5.75,
#         pieceHeight: 1.00,
#         section: sections.first
#     },
#     {
#         pieceLength: 17.25,
#         pieceWidth: 5.75,
#         pieceHeight: 1.00,
#         section: sections.first
#     },
#     {
#         pieceLength: 17.25,
#         pieceWidth: 5.75,
#         pieceHeight: 1.00,
#         section: sections.first
#     },
#     {
#         pieceLength: 17.25,
#         pieceWidth: 5.75,
#         pieceHeight: 1.00,
#         section: sections.second
#     },
#     {
#         pieceLength: 17.25,
#         pieceWidth: 5.75,
#         pieceHeight: 1.00,
#         section: sections.second
#     },
#     {
#         pieceLength: 17.25,
#         pieceWidth: 5.75,
#         pieceHeight: 1.00,
#         section: sections.second
#     },
#     {
#         pieceLength: 17.25,
#         pieceWidth: 5.75,
#         pieceHeight: 1.00,
#         section: sections.second
#     },
# ])