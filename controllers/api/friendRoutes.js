const router = require('express').Router();
const {Friend} = require('../../models');

router.post('/', async(req, res) => {
    try{
        console.log('New friend request sent')
        console.log(req.body)
        const friendData = await Friend.create({
            user_id: req.session.user_id,
            friend_id: req.body.friend_id,
            status: 'pending'
        });
        res.status(200).json(friendData);
    } catch(err)
    {
        res.json(err)
    }
})

router.post('/accept', async(req, res) => {
    try{
        console.log('Friend request accepted')
        
        const friendData = await Friend.update({
            status: 'accepted'
        },
        {
            where: {
                user_id: req.session.user_id,
                friend_id: req.body.friend_id
            }
        });
        res.status(200).json(friendData)
    } catch(err)
    {
        res.json(err)
    }
})

router.post('/decline', async(req, res) => {
    try{
        console.log('Friend request declined')
        
        const friendData = await Friend.destroy(
        {
            where: {
                user_id: req.session.user_id,
                friend_id: req.body.friend_id
            }
        });
        res.status(200).json(friendData)
    } catch(err)
    {
        res.json(err)
    }
})