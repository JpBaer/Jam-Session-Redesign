const {DataTypes, Model} = require('sequelize')
const sequelize = require('../config/connection')

class Notification extends Model {}

Notification.init({
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
         model: "user",
         key: "id",
        },
     },
},
{
    sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'notification',
})

module.exports = Notification