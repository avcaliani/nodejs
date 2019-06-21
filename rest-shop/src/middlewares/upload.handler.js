const multer = require('multer');

const storage = multer.diskStorage({
  destination: (request, file, callback) => callback(
    null, process.env.FILE_UPLOAD_FOLDER
  ),
  filename: (request, file, callback) => callback(
    null, `${new Date().toISOString()}.${file.originalname}`
  )
});

const filter = (request, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    callback(null, true); // Accept the file
  else
    callback(null, false); // Refuse the file
};

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: (1024 * 1024) * 5 // 5MB
  },
  fileFilter: filter
});