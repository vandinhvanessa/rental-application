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
        paymentReceived: {//when transaction is complete
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        itemReturned: {//initial set to zero, once returned will be 1 for reviews
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        itemLeftRenter: {//flag for renter to say that they shipped to return item
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