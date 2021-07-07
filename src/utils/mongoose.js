module.exports = {
    multipleMongooseObject: function(mongooses) {
        return mongooses.map(mongooses => mongooses.toObject());
    },
    mongoosetoObject: function(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
}