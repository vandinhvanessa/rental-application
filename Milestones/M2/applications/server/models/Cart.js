module.exports = (sequelize, DataTypes) => {

    const Cart = sequelize.define("Cart", {
        userID:{
            type: DataTypes.STRING,
            allowNull: false
        },
        postID: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        
    });
    return Cart;
}