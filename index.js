import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse POST body (in case Exotel sends params)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Common TwiML XML string
const twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="female" language="en-IN">
        Hello! This is an automated message from your service. 
        Your call is important to us.
    </Say>
    <Pause length="1"/>
    <Say voice="female" language="en-IN">
        Thank you for your time and have a great day!
    </Say>
</Response>`;

// GET endpoint for TwiML
app.get('/twiml', (req, res) => {
    console.log('GET /twiml hit. Query:', req.query);
    res.set('Content-Type', 'text/xml; charset=utf-8');
    res.status(200).send(twimlResponse);
});

// POST endpoint for TwiML
app.post('/twiml', (req, res) => {
    console.log('POST /twiml hit. Body:', req.body);
    res.set('Content-Type', 'text/xml; charset=utf-8');
    res.status(200).send(twimlResponse);
});

// Health check
app.get('/', (req, res) => {
    res.send('Exotel TwiML Server Running');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
