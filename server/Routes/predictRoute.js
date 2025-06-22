// routes/predict.js
import express from 'express';
import multer from 'multer';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path));

    const response = await axios.post('http://localhost:5000/predict', form, {
      headers: form.getHeaders(),
    });

    fs.unlinkSync(req.file.path); // delete temp file

    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Prediction failed' });
  }
});

export default router;
