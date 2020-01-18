const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const verifyUser = require('./routes/verifyToken');

const app = express();
dotenv.config();
const uri = process.env.MONGODB_URI;

// Bodyparser Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

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

app.post('/register', (req, res) => {
  const today = new Date();

  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    created: today
  };

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + ' registered!' });
            })
            .catch(err => {
              res.send('error:' + err);
            });
        });
      } else {
        res.json({ error: 'User already exists.' });
      }
    })
    .catch(err => {
      res.send('error:' + err);
    });
});

app.post('/login', async (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
          };
          let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '30m'
          });
          res.send(token);
        } else {
          res.json({ error: 'Invalid login credentials.' });
        }
      } else {
        res.json({ error: 'User does not exist.' });
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    });
});

app.get('/profile', (req, res) => {
  let decoded = jwt.verify(
    req.headers['authorization'],
    process.env.JWT_SECRET
  );

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.send('User does not exist.');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    });
});

app.get('/test', (req, res) => {
  User.find({})
    .stream()
    .on('data', doc => {
      console.log(doc.email + ',');
    })
    .on('close', () => {
      console.log('all done.');
      res.send('All done.');
    });
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
