module.exports = (sequelize, DataTypes) => {

    const Inventory = sequelize.define("Inventory", {
        itemName:{
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
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    Inventory.associate = (models) => {
        Inventory.hasMany(models.Comments, {
            onDelete: "cascade", 
        })
    }
    return Inventory;
}