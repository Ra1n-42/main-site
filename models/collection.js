const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    creator : { type: mongoose.SchemaTypes.ObjectId, ref: "user"},
    collectionname: {
        type : String,
        required : [true, 'Enter a collectionname'],
        minlength: [6, 'Minimum name length is 6 characters'],
    },
    items: []
});

collectionSchema.statics.itemsFromCollection = async function(name){
    return await this.where({collectionname: name})
};

const Collection = mongoose.model('collection', collectionSchema)
module.exports = Collection;
