module.exports = (sequelize, DataTypes) => {

    const Transactions = sequelize.define("Transactions", {
        postID:{
            type: DataTypes.STRING,
            allowNull: false
        },
        itemDescription:{
            type: DataTypes.STRING,
            allowNull: true
        },
        lender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        renter: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        transactionBegin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        transactionEnd: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        paymentReceived: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        itemReturned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        itemLeftRenter: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        cost: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
        
    });
    Transactions.associate = (models) => {
        Transactions.hasMany(models.Comments, {
            onDelete: "cascade", 
        })
    } 
    return Transactions;
}