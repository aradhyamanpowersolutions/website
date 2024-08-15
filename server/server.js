const express = require('express');
const multer = require('multer');
const { createTransport } = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS middleware
app.use(cors({
  origin: ['https://aradhyamanpowersupplier.com', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage });

const transporter = createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/apply', upload.single('resume'), (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'avanish.patidar@cdgi.edu.in',
    cc: email,
    subject: 'New Apply Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    attachments: [
      {
        filename: req.file.originalname,
        content: req.file.buffer,
        contentType: req.file.mimetype,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email', details: error.toString() });
    }
    res.status(200).json({ message: 'Message sent successfully' });
  });
});

app.post('/contact', (req, res) => {
  const { name, email, phone, company, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'avanish.patidar@cdgi.edu.in',
    cc: email,
    subject: 'New Contact Form Submission',
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Company: ${company}
      Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email', details: error.toString() });
    }
    res.status(200).json({ message: 'Message sent successfully' });
  });
});

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;