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
            type: DataTypes.DATE,
            allowNull: false,
        },
        transactionEnd: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        cost: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
        
    });
    return Transactions;
}