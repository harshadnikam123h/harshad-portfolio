const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.static('.'));
// HTML फॉर्ममधून JSON डेटा वाचण्यासाठी

// MongoDB शी कनेक्ट करा (तुझा लोकल MongoDB URL)
mongoose.connect('mongodb+srv://harshad:Harshad123@cluster0.kbdbeo0.mongodb.net/harshadPortfolio?retryWrites=true&w=majority&appName=Cluster0')  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.log('MongoDB Connection Error: ', err));

// डेटाबेससाठी Schema (रचना) तयार करा
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    date: { type: Date, default: Date.now }
});

// Model तयार करा
const Contact = mongoose.model('Contact', contactSchema);

// API Route - फॉर्म सबमिट झाल्यावर डेटा सेव्ह करण्यासाठी
app.post('/api/contact', async (req, res) => {
    try {
        const newContact = new Contact({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
        });
        await newContact.save();
        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// सर्व्हर सुरू करा
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});