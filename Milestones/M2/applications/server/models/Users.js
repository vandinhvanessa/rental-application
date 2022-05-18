module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false
        },
        city:{
            type: DataTypes.STRING,
            allowNull: false
        },
        state:{
            type: DataTypes.STRING,
            allowNull: false
        },
        zipCode:{
            type: DataTypes.STRING,
            allowNull: false
        }, 
        country:{
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    Users.associate = (models) => {
        Users.hasMany(models.Posts, {
            onDelete: "cascade", 
        })
    }//users are allowed to have many posts, post will have a userID
    return Users;
}