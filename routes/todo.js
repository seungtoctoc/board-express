var express = require('express');
const router = express.Router();

let Todo = require("../models/Todo")

router.get('/', (req, res, next) => {
    Todo.find({})
        .then((data) => {
            res.json(data);      
        }).catch(err => {
            next(err);
        });
});

router.post("/", (req, res, next) => {
    console.log(req.body);
    Todo.create({
        writer: req.body.writer,
        content: req.body.content,
        color: req.body.color
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        next(err);
    })
})

router.get('/', (req, res, next) => {
    Todo.find().then((data) => {
        res.json(data);      
        }).catch(err => {
            next(err);
        });
});

router.get('/:keyword', (req, res, next) => {
    const keyword = req.params.keyword;
    Todo.find({
        $or: [
            { writer: { $regex: keyword, $options: 'i' } }, // 'i' 옵션은 대소문자를 무시하도록 합니다.
            { content: { $regex: keyword, $options: 'i' } }
        ]
    })
    .then((data) => {
        res.json(data);      
    }).catch(err => {
        next(err);
    });
});

// router.put('/', (req, res, next) => {
//     const writer = req.body.writer;
//     const modifyContent = req.body.content;
//     const modifyColor = req.body.color;

//     Todo.findOneAndUpdate(
//         {writer: writer}, 
//         {content: modifyContent},
//         {new: true})
//         .then(update => {
//             res.json(update);      
//         }).catch(err => {
//             next(err);
//         });
// });

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const modifyWriter = req.body.writer;
    const modifyContent = req.body.content;
    const modifyColor = req.body.color;

    Todo.findOneAndUpdate({_id: id}, 
        {
        writer: modifyWriter, 
        content: modifyContent,
        color: modifyColor
        }, {new: true})
        .then(update => {
            res.json(update); 
        }).catch(err => {
            next(err);
        });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    
    Todo.findOneAndDelete({_id: id})
        .then(() => {
            res.json("deleted");
        })
        .catch(err => {
            next(err);
        })
});



module.exports = router;