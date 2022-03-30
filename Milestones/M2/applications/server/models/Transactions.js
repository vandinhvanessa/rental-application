module.exports = (sequelize, DataTypes) => {

    const Transactions = sequelize.define("Transactions", {
        itemDescription:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        renter: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        transactionBegin: {
            type: DataTypes.DATETIME,
            allowNull: false,
        },
        transactionEnd: {
            type: DataTypes.DATETIME,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOL,
            allowNull: false,
        },
        cost: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
        
    });
    return Transactions;
}