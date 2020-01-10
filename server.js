const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');


const app = express();
dotenv.config();
const uri = process.env.MONGODB_URI;

// Bodyparser Middleware
app.use(express.json());

//Cors Middleare
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(() => console.log(err));

// Use Routes
// app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'))

// Serve static assests if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));