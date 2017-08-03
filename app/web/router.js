const router = require('express').Router()

const multer = require('multer')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './file')
  },
  filename(req, file, cb) {
    const fileExtension = file.originalname.split('.')[1]
    const originalname = file.originalname.split('.')[0]
    const dummyFileName = [originalname, Date.now()].join('-')
    const filename = [dummyFileName, fileExtension].join('.')
    cb(null, filename)
  },
})
const upload = multer({ storage })

const { addFile, getFile } = require('../../ipfs')

const userContract = require('../contract/userContract');

router.get('/version', (req, res) => {
  res.json({
    success: true,
    description: 'ICO Prototype Application',
  })
})

router.post('/create/user', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  userContract.addUser(email, password)
    .then((result) => {
      logger.info(result)
      return res.json({ result })
    }).catch((err) => {
      return res.json({ err })
    })
})

router.get('/test', (req, res) => {
  return res.render('index', { data: { headerName: 'Dots Bank', menu: ['Apply', 'Invest'] } })
})

router.post('/submit/ico/details', upload.any(), (req, res) => {
  const email = 'requestor@dotsbank.com'
  Promise.all([userContract.setFundraiserAmount(email, req.body.amount), userContract.setFilehash1(email, req.files[0].path), userContract.setFilehash2(email, req.files[1].path)])
    .then((results) => {
      logger.info(results)
      return res.json({ results })
    }).catch((err) => {
      return res.json({ err })
    })

  // if (req.files && req.files.length === 2) {
  //   Promise.all([addFile(req.files[0]), addFile(req.files[1])])
  //     .then((files) => {
  //       res.json({ success: true, files })
  //     }).catch((err) => {
  //       logger.error('ipfs error', err)
  //     })
  // }
  // if (req.files && req.files.length === 1) {
  //   Promise.all([addFile(req.files[0])])
  //     .then((files) => {
  //       getFile(files[0][0].hash)
  //       res.json({ success: true, files })
  //     }).catch((err) => {
  //       logger.error('ipfs error', err)
  //     })
  // }
})

/**
 * Mounting respective paths.
 * @param {object} app Express instance
 */
module.exports = function (app) {
  app.use(router)
}