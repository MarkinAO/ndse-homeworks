const { v4: uuid } = require('uuid');

class Books {
    constructor(title = "", description = "", id = uuid(), authors = "", favorite = false, fileCover = "", fileName = "", fileBook = "") {
        this.title = title;
        this.description = description;
        this.id = id;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook;
    }
}

module.exports = Books;
