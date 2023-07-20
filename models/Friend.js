const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Friend extends Model { }

Friend.init({
    user_id: {
       type: DataTypes.INTEGER,
       allowNull:false,
       references:{
        model: "user",
        key: "id",
       },
    },
    friend_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: "user",
            key: "id",
        }
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
    },

},
{
    sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'friend',
})