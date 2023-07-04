const express = require('express');
const fs = require('fs');
const router = express.Router();

const err404 = { error: 404, reason: "404 | Страница не найдена" };

router.get("/:id", (req, res) => {
    const dir = './books/';
    const store = fs.readdirSync(dir);
    const { id } = req.params;    
    const index = store.findIndex((el) => el === id);
    if (index !== -1) {
      res.download(dir + store[index]);      
    } else {
      res.status(404);
      res.json(err404);
    }
});

module.exports = router;