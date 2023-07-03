const express = require('express')
const router = express.Router()
const fileMulter = require('../middleware/file')
const Books = require('../src/Books')

const store = {
    books: [
        new Books(),
        new Books(),
    ],
};

const err404 = { error: 404, reason: "404 | Страница не найдена" };

router.post('/upload-book', 
    fileMulter.single('book'),
    (req, res) => {
        if(req.file){
            const {path} = req.file;
            store.books.push(new Books())
            res.json({path, 'id': store.books[store.books.length - 1].id});            
        }
        res.json()
    })

router.get('/', (req, res) => {
    const {books} = store;
    res.json(books);
})

router.get('/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if( idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json(err404);
    }

})

router.post('/', (req, res) => {
    const {books} = store;
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;

    const newBook = new books(title, description, authors, favorite, fileCover, fileName, fileBook);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
})

router.put('/:id', (req, res) => {
    const {books} = store;
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1){
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors, 
            favorite, 
            fileCover, 
            fileName,
            fileBook
        }

        res.json(books[idx])
    } else {
        res.status(404);
        res.json(err404);
    }
})

router.delete('/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);
     
    if(idx !== -1){
        books.splice(idx, 1);
        res.json(true);
    } else {
        res.status(404);
        res.json(err404);
    }
})

router.get("/download/:id", (req, res) => {
    const { id } = req.params;
    const index = store.books.findIndex((el) => el.id === id);
    if (index !== -1) {
      const { fileName } = store.books[index];
      res.redirect(301, "http://localhost:3000" + `/books/${fileName}`);
    } else {
      res.status(404);
      res.json(err404);
    }
});

module.exports = router;