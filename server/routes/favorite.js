const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post('/favoriteNumber', (req, res) => {

    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, Info) => {
            if(err) return res.status(400).send(err);


            res.status(200).json({ success: true, favoriteNumber: Info.length })
        })
})

router.post('/favorited', (req, res) => {

    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, Info) => {
            if(err) return res.status(400).send(err);

            let result = false;
            if(Info.length !== 0) result = true

            res.status(200).json({ success: true, favorited: result })
        })
})

router.post('/removeFromFavorite', (req, res) => {
    
    Favorite.findOneAndDelete({userFrom: req.body.userFrom, movieId: req.body.movieId})
        .exec((err, doc) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true})
        })
})

router.post('/addFromFavorite', (req, res) => {
    const favorite = new Favorite(req.body);

    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true})
    })
})

router.post('/getFavoriteMovie', (req, res) => {

    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, favorites })
        })
})

module.exports = router;
