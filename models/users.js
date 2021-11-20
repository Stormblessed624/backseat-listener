const {
    Schema,
    model
} = require('mongoose');

const UsersSchema = new Schema({
    username: {
        type: String,
        Unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        Unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"]
    },
    thought: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friend: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]

}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});


UsersSchema.virtual('friendCount').get(function () {
    return this.friend.length;
});

const Users = model('Users', UsersSchema);

module.exports = Users;