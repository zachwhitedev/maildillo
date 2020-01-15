const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const verifyUser = require('./routes/verifyToken');

const app = express();
dotenv.config();
const uri = process.env.MONGODB_URI;

// Bodyparser Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

const User = require('./models/MaildilloUser');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'YOUR-DOMAIN.TLD'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/showusers', (req, res) => {
  User.find({}).then(users => res.send(users));
});

app.delete('/deleteallusers', (req, res) => {
  User.deleteMany({}).then(res.send('all users delete. database empty'));
});

app.get('/dashboard', verifyUser, (req, res) => {
  res.redirect('http://localhost:3000/login');
})

app.post('/login', async (req, res) => {
  let userData = req.body;
  const user = await User.findOne({ email: userData.email });
  if (!user) return res.status(400).send('Email or password is wrong.');
  if (user.password !== userData.password)
    return res.status(400).send('Email or password is wrong.');

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header('auth-token', token).send(token);
});

app.post('/register', async (req, res) => {
  let userData = req.body;
  const emailAlreadyExists = await User.findOne({ email: userData.email });
  if (emailAlreadyExists) return res.status(400).send('Email already exists.');

  const user = new User({
    name: { first: userData.firstname, last: userData.lastname },
    email: userData.email,
    password: userData.password,
    messages: [
      {
        to: userData.email,
        from: userData.email,
        subject: 'Your first scheduled email!',
        body:
          "Hey me, it's me. Just testing to see if this Maildillo thing actually works.",
        active: true,
        created: Date.now(),
        execute: Date.now()
      }
    ]
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Serve static assests if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
