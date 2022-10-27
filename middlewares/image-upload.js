const multer = require("multer");
const uuid = require("uuid").v4;

const storageConfiguration = multer.diskStorage({
  destination: "product-data/images",
  filename: (req, file, cb) => {
    cb(null, uuid() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storageConfiguration });

const configuredMulterMiddleware = upload.single("image");

module.exports = configuredMulterMiddleware;
