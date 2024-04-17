const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Favourites = sequelize.define('favourites',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Recipe = sequelize.define('recipe',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    instructions: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.FLOAT, defaultValue: 0}
})

const Ingridient = sequelize.define('ingridients',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Ing_Rec = sequelize.define('ing_rec',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: {type: DataTypes.STRING, allowNull: false},
    amount_type: {type: DataTypes.STRING, allowNull: false}
})

const Brand = sequelize.define('brand',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
})

const Type = sequelize.define('type',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
})

const Feedback = sequelize.define('feedback',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
    body: {type: DataTypes.STRING}
})

User.hasMany(Favourites)
Favourites.belongsTo(User)

User.hasMany(Feedback)
Feedback.belongsTo(User)

Recipe.hasMany(Favourites)
Favourites.belongsTo(Recipe)

Recipe.hasOne(Type)
Type.belongsTo(Recipe)

Brand.hasOne(Recipe)
Recipe.belongsTo(Brand)

Recipe.hasMany(Feedback)
Feedback.belongsTo(Recipe)

Recipe.hasMany(Ing_Rec)
Ing_Rec.belongsTo(Recipe)

Ingridient.hasMany(Ing_Rec)
Ing_Rec.belongsTo(Ingridient)

module.exports = {
    User,
    Favourites,
    Recipe,
    Ingridient,
    Ing_Rec,
    Brand,
    Type,
    Feedback
}