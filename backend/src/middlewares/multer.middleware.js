import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb){
        cb(null, file.originalname) // file.originalname means like photo.png - original file name save in folder
    }
})

export const upload = multer({
    storage,
})