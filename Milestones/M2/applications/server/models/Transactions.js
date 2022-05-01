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
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        cost: {
            type: DataTypes.FLOAT,
            allowNull: true,
        }
        
    });
    Transactions.associate = (models) => {
        Transactions.hasMany(models.Comments, {
            onDelete: "cascade", 
        })
    }
    return Transactions;
}