const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Friend extends Model { }

Friend.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    requester_id: {
       type: DataTypes.INTEGER,
       allowNull:false,
       references:{
        model: "user",
        key: "id",
       },
    },
    accepter_id:{
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
        indexes: [
            {
              unique: true,
              fields: ['requester_id', 'accepter_id'], // Order doesn't matter
            },
          ],
})

module.exports = Friend