'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsToMany(models.Todos, {
                through: 'todo_users',
                foreignKey: 'user_id',
            });
        }
    }
    User.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            avatar: DataTypes.STRING,
            role: DataTypes.STRING,
            occupationGroup: DataTypes.STRING,
            isEmailVerified: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
