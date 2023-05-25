const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'books')
    },
    filename(req, file, cb) {
        cb(null, `${Date.now().toLocaleString("ru", {  
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}-${file.originalname}`)
    }
})

module.exports = multer({storage})