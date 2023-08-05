const router = require('express').Router();
const {Friend, Notification} = require('../../models');

router.post('/', async(req, res) => {
    try{
        console.log('New friend request sent')
        console.log(req.body)
        const friendData = await Friend.create({
            requester_id: req.session.user_id,
            // requester_id: req.body.requester_id,
            accepter_id: req.body.accepter_id,
            status: 'pending'
        });

        
        const notificationData = await Notification.create({
            message: `You have a new friend request`,
            user_id: req.body.accepter_id
        })
        res.status(200).json(friendData);
    } catch(err)
    {
        res.json(err)
    }
})

router.put('/accept', async(req, res) => {
    try{
        console.log('Friend request accepted')
        
        const friendData = await Friend.update({
            status: 'accepted'
        },
        {
            where: {
                requester_id: req.body.requester_id,
                accepter_id: req.session.user_id
                // accepter_id: req.body.accepter_id
            }
        });
         
        const notificationData = await Notification.create({
            message: `Your friend request was accepted`,
            user_id: req.body.requester_id
        })
        res.status(200).json(friendData)
    } catch(err)
    {
        res.json(err)
    }
})

router.put('/decline', async(req, res) => {
    try{
        console.log('Friend request declined')
        
        const friendData = await Friend.destroy(
        {
            where: {
                requester_id: req.body.requester_id,
                accepter_id: req.session.user_id
                // accepter_id: req.body.accepter_id
            }
        });
        const notificationData = await Notification.create({
            message: `Your friend request was declined`,
            user_id: req.body.requester_id
        })
        res.status(200).json(friendData)
    } catch(err)
    {
        res.json(err)
    }
})

module.exports = router