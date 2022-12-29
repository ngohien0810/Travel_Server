'use strict';
const bcryptjs = require('bcryptjs');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            // Categories.belongsToMany(models.User, {
            //     through: 'todo_users',
            //     as: 'users',
            //     foreignKey: 'todo_id',
            // });
            // Categories.hasMany(models.Todo_Comments, {
            //     as: 'comments',
            // });
        }
    }
    Users.init(
        {
            Username: DataTypes.STRING,
            Email: DataTypes.STRING,
            Phone: DataTypes.STRING,
            Password: DataTypes.STRING,
            Role: DataTypes.INTEGER,
            Address: DataTypes.STRING,
            Status: DataTypes.INTEGER,
            isActive: DataTypes.INTEGER,
            CreatedDate: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'Users',
            modelName: 'Users',
            timestamps: false,
            // beforeCreate: async function (user) {
            //     const salt = await bcryptjs.genSalt(10); //whatever number you want
            //     user.password = await bcryptjs.hash(user.password, salt);
            // },
            // createdAt: 'CreatedDate',
        }
    );
    Users.prototype.validPassword = async function (password) {
        return await bcryptjs.compare(password, this.Password);
    };
    return Users;
};
