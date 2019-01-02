/**
 * @author    Anthony Vilarim Caliani
 * @contact   https://github.com/avcaliani
 * 
 * @Description
 * File Upload Handler using Multer.
 */
const Multer = require('multer');

const Storage = Multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, process.env.FILE_UPLOAD_FOLDER);
  },
  filename: (request, file, callback) => {
    callback(null, `${new Date().toISOString()}.${file.originalname}`);
  }
});

const FileFilter = (request, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    callback(null, true);  // Accept the file
  else
    callback(null, false);   // Refuse the file
}

exports.upload = Multer({
  storage: Storage,
  limits: {
    fileSize: (1024 * 1024) * 5 // 5MB
  },
  fileFilter: FileFilter
});