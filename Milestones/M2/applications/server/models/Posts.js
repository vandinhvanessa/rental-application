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
        category:{
            type: DataTypes.STRING,
            allowNull: false
        },
        pricePerDay:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        depositFee:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        shippingFee:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        subTotal:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        showPost: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    });
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade", 
        })
    }
    return Posts;
}