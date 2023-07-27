const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const comment = require('./comment');

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const postSchema = new Schema({
    title: String,
    images: [ImageSchema],
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, opts);

postSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        });
    }
});

module.exports = mongoose.model('Post', postSchema);

