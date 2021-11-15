const path = require('path');
const multer = require('multer');

const audiosDirectory = path.join(__dirname, 'public/audios');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, audiosDirectory);
  },
  filename(req, file, callback) {
    const fileExtension = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${fileExtension}`;
    callback(null, name);
  }
});

const audioUploadsMiddleware = multer({ storage }).single('audio');

module.exports = audioUploadsMiddleware;
