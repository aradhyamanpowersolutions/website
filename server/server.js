const express = require('express');
const multer = require('multer');
const { createTransport } = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors({
  origin: ['https://aradhyamanpowersupplier.com', 'https://aradhyamanpowersupplier.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));
dotenv.config();

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
    from: req.body.email, 
    to: 'avanish.patidar@cdgi.edu.in', 
    cc: req.body.email, 
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
      return res.status(500).send({ error: 'Failed to send email', details: error.toString() });
    }
    res.status(200).send('Message sent successfully');
  });
});

// New route for contact form
app.post('/contact', (req, res) => {
  const { name, email, phone, company, message } = req.body;

  const mailOptions = {
    from: req.body.email,
    to: 'avanish.patidar@cdgi.edu.in', // Change this to your desired email
    cc: req.body.email, 
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});