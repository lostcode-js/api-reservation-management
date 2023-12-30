const multer = require('multer');
const parser = multer({ dest: 'public/uploads/' })

exports.upload = async (req, res) => {
    try {
        parser.single('avatar')(req, res, err => {
            if (err)
                res.status(500).json({ message: err });
            else {
                const image = {};
                image.id = req.file.filename;
                image.url = `/uploads/${image.id}`;
                res.status(200).json({ message: 'Upload da imagem com sucesso', avatar: { id: image.id, url: image.url } });
            }
        });
    } catch (error) {
        response.status(500).json({ message: 'Ocorreu um erro ao salvar uma imagem' });
    }
}