const multer = require('multer');
module.exports = ()=>{
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'public/uploads/');
            },
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`);
            }
        })
    })
}