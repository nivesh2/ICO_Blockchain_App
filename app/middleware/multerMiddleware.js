const multer = require('multer')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './files')
  },
  filename(req, file, cb) {
    const fileExtension = file.originalname.split('.')[1]
    const originalname = file.originalname.split('.')[0]
    const dummyFileName = [originalname, Date.now()].join('-')
    const filename = [dummyFileName, fileExtension].join('.')
    cb(null, filename)
  },
})

const fileMulter = multer({ // contains logo file info and fx margin info
  storage: storage,
}).any()

module.exports = fileMulter