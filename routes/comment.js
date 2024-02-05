var express = require('express');
const router = express.Router();

let Comment = require("../models/Comment")

router.get('/', (req, res, next) => {
    Comment.find({})
        .then((data) => {
            res.json(data);      
        }).catch(err => {
            next(err);
        });
});

router.post("/", (req, res, next) => {
    console.log(req.body);
    Comment.create({
        writer: req.body.writer,
        content: req.body.content
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        next(err);
    })
})

router.get('/', (req, res, next) => {
    Comment.find().then((data) => {
        res.json(data);      
        }).catch(err => {
            next(err);
        });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Comment.findOne({_id: id})
        .then((data) => {
            res.json(data);      
        }).catch(err => {
            next(err);
        });
});

router.put('/', (req, res, next) => {
    const writer = req.body.writer;
    const modifyContent = req.body.content;

    Comment.findOneAndUpdate(
        {writer: writer}, 
        {content: modifyContent}, 
        {new: true})
        .then(update => {
            res.json(update);      
        }).catch(err => {
            next(err);
        });
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const modifyWriter = req.body.writer;
    const modifyContent = req.body.content;

    Comment.findOneAndUpdate({_id: id}, 
        {
        writer: modifyWriter, 
        content: modifyContent
        }, {new: true})
        .then(update => {
            res.json(update); 
        }).catch(err => {
            next(err);
        });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    
    Comment.findOneAndDelete({_id: id})
        .then(() => {
            res.json("deleted");
        })
        .catch(err => {
            next(err);
        })
});



module.exports = router;