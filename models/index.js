const User = require('./User');
const Playlist = require('./Playlist');
const Comment = require('./Comment');
const Message = require('./Message');
const Conversation = require('./Conversation');
const Notification = require('./Notification');
const Friend = require('./Friend');

User.hasMany(Playlist, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Playlist.belongsTo(User, {
    foreignKey: 'user_id'
});

Playlist.hasMany(Comment,{
    foreignKey: 'playlist_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Playlist,{
    foreignKey: 'playlist_id'
});

User.hasMany(Comment,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User,{
    foreignKey: 'user_id'
})

//Messages Associations

User.hasMany(Message, {
    as:"SentMessage",
    foreignKey:'sender_id'
})

User.hasMany(Message,{
    as:"ReceivedMessage",
    foreignKey: 'receiver_id'
})

Message.belongsTo(User, {
    as:"Sender",
    foreignKey: "sender_id",
    allowNull: false
});

Message.belongsTo(User,{
    as:"Receiver",
    foreignKey: "receiver_id",
    allowNull: false
});

Message.belongsTo(Conversation, {allowNull: false}, {
    foreignKey: 'conversation_id',
});

Conversation.hasMany(Message,{
    foreignKey: "conversation_id"
});

//Conversation Associations

User.hasMany(Conversation, {
    foreignKey: 'user1'
});

User.hasMany(Conversation, {
    foreignKey: 'user2'
});

Conversation.belongsTo(User, {as: 'Creator', foreignKey: 'user1', allowNull: false});

Conversation.belongsTo(User, {as: 'Recipient', foreignKey: 'user2', allowNull: false});

//Friend Feature Associations

// User.belongsToMany(User, {
//     through: Friend,
//     as: 'requester',
//     foreignKey: 'requester_id',
//     otherKey: 'accepter_id'
// });

// User.belongsToMany(User, {
//     through: Friend,
//     as: 'accepter',
//     foreignKey: 'accepter_id',
//     otherKey: 'requester_id'
// });

User.hasMany(Friend, { as: 'requester', foreignKey: 'requester_id' });
User.hasMany(Friend, { as: 'accepter', foreignKey: 'accepter_id' });
Friend.belongsTo(User, { as: 'requester', foreignKey: 'requester_id' });
Friend.belongsTo(User, { as: 'accepter', foreignKey: 'accepter_id' });



User.hasMany(Notification)


module.exports = { User, Playlist, Comment, Message, Conversation, Friend, Notification };