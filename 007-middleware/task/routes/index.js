const express = require('express');
const fs = require('fs');
const router = express.Router();
const fileMulter = require('../middleware/file');
const Books = require('../src/Books');

const dir = './books/';
const store = fs.readdirSync(dir);

const err404 = { error: 404, reason: "404 | Страница не найдена" };

router.post('/upload-book', 
    fileMulter.single('book'),
    (req, res) => {
        if(req.file){
            const {path} = req.file;
            store.push(new Books(req.body))
            res.json({path, 'id': store[store.length - 1].id});            
        }
        res.json()
    })

router.get('/', (req, res) => {
    res.json(store);
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    const idx = store.findIndex(el => el.id === id);

    if( idx !== -1) {
        res.json(store[idx]);
    } else {
        res.status(404);
        res.json(err404);
    }
})

router.post('/', (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;

    const newBook = new Books(title, description, authors, favorite, fileCover, fileName, fileBook);
    store.push(newBook);

    res.status(201);
    res.json(newBook);
})

router.put('/:id', (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
    const {id} = req.params;
    const idx = store.findIndex(el => el.id === id);

    if (idx !== -1){
        store[idx] = {
            ...store[idx],
            title,
            description,
            authors, 
            favorite, 
            fileCover, 
            fileName,
            fileBook
        }

        res.json(store[idx])
    } else {
        res.status(404);
        res.json(err404);
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const idx = store.findIndex(el => el.id === id);
     
    if(idx !== -1){
        store.splice(idx, 1);
        res.json(true);
    } else {
        res.status(404);
        res.json(err404);
    }
})

module.exports = router;