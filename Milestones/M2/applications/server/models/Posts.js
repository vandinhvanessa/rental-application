module.exports = (sequelize, DataTypes) => {

    const Posts = sequelize.define("Posts", {
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        postText:{
            type: DataTypes.STRING,
            allowNull: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        rentalTool:{
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade", 
        })
    }
    return Posts;
}