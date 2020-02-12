const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const sslRedirect = require('heroku-ssl-redirect');

const app = express();
dotenv.config();
const uri = process.env.MONGODB_URI;

// enable ssl redirect
app.use(sslRedirect());

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(() => console.log(err));

mongoose.set('useFindAndModify', false);

const User = require('./models/MaildilloUser');
const Email = require('./models/MaildilloEmail');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'YOUR-DOMAIN.TLD'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/getuseremails/:userid', (req, res) => {
  Email.find({ userid: req.params.userid }).then(emails => res.send(emails));
});

app.delete('/deleteemail/:id', (req, res) => {
  Email.findOneAndDelete({ _id: req.params.id })
    .then(res.send('Email deleted.'))
    .catch(err => console.log(err));
});

app.post('/editemail/:id', (req, res) => {
  Email.findOneAndUpdate({ _id: req.params.id }, { $set: { edit: true } })
    .then(res.send('Email being edited.'))
    .catch(err => console.log(err));
});
app.post('/addemail', (req, res) => {
  Email.create(req.body)
    .then(email => {
      Email.find({ userid: email.userid })
        .then(emails => res.send(emails))
        .catch(err => console.log(err));
    })
    .catch(err => {
      res.send('error:' + err);
    });
});
app.post('/saveemail/:id', (req, res) => {
  Email.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { edit: false, content: req.body.newEmail } }
  )
    .then(res.send('Email updated successfully.'))
    .catch(err => console.log(err));
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
  try {
    const user = await User.findOne({
      email: req.body.email
    });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const payload = {
          userid: user._id,
          useremail: user.email
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 30 * 60
        });
        res.send(token);
      } else {
        res.json({ error: 'Invalid login credentials.' });
      }
    } else {
      res.json({ error: 'User does not exist.' });
    }
  } catch {
    res.send('error: ' + err);
  }
});

// app.get('/profile', (req, res) => {
//   let decoded = jwt.verify(
//     req.headers['authorization'],
//     process.env.JWT_SECRET
//   );

//   User.findOne({
//     _id: decoded._id
//   })
//   .then(user => {
//     if (user) {
//       res.json(user);
//     } else {
//       res.send('User does not exist.');
//     }
//   })
//   .catch(err => {
//     res.send('error: ' + err);
//   });
// });

// getting rid of code above to allow profile page refresh

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

// app.get('*', function(req, res) {
//   res.redirect('https://' + req.headers.host + req.url);

//   // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
//   // res.redirect('https://example.com' + req.url);
// })

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  // app.use('*', express.static('client/build')); // added as per https://stackoverflow.com/questions/45419943/express-react-router-internal-server-error-when-linked-directly
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
