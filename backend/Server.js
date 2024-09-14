const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// const dotenv = require('dotenv');
require('dotenv').config()

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());




const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pollDB',
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected');
});


// Register route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
  const checkUser = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUser, [email], async (err, result) => {
      if (err) return res.status(500).send({ error: 'Database error' });
      if (result.length > 0) return res.status(400).send({ error: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
      db.query(sql, [email, hashedPassword], (err, result) => {
          if (err) return res.status(500).send({ error: 'Error creating user' });
          res.send({ message: 'User registered successfully' });
      });
  });
});


// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
  const findUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(findUserQuery, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email,usertype: user.usertype }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });


    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set secure in production for HTTPS
      maxAge: 24 * 60 * 60 * 1000 ,// 1 day
      sameSite: 'Strict'
    });

    res.json({ message: 'Login successful',user:{id: user.id, email: user.email,usertype: user.usertype} });

  });
});



app.get('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });
  res.status(200).json({ message: 'Logged out successfully' });
});




const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403).json({ message: 'Invalid token' });
      req.user = user;
      next();
  });
};
app.get('/',authenticateToken,(req,res)=>{
  res.send("Hello"+req.user.id);
})



// app.post('/createPoll', (req, res) => {
//   const { title, description, option1, option2 } = req.body;
//   const sql = 'INSERT INTO polls (title, description, option1, option2) VALUES (?, ?, ?, ?)';
//   db.query(sql, [title, description, option1, option2], (err, result) => {
//     if (err) throw err;
//     res.send({ message: 'Poll created successfully', pollId: result.insertId });
//   });
// });
app.post('/createPoll', authenticateToken, (req, res) => {
  const { title, description, option1, option2 } = req.body;
  const sql = 'INSERT INTO polls (title, description, option1, option2) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, description, option1, option2], (err, result) => {
      if (err) throw err;
      res.send({ message: 'Poll created successfully', pollId: result.insertId });
  });
});

//FAIR
// app.post('/polls/:id/vote', (req, res) => {
//   const pollId = req.params.id;
//   const { option } = req.body;

//   let sql;
//   if (option === 'option1') {
//     sql = 'UPDATE polls SET option1Votes = option1Votes + 1 WHERE id = ?';
//   } else if (option === 'option2') {
//     sql = 'UPDATE polls SET option2Votes = option2Votes + 1 WHERE id = ?';
//   }

//   db.query(sql, [pollId], (err, result) => {
//     if (err) throw err;
//     res.send({ message: 'Vote submitted successfully' });
//   });
// });

// app.post('/polls/:id/vote', (req, res) => {
//   const pollId = req.params.id;
//   const { option } = req.body;

//   console.log('Poll ID:', pollId);
//   console.log('Selected option:', option);

//   let sql;
//   if (option === 'option1') {
//     sql = 'UPDATE polls SET option1Votes = option1Votes + 1 WHERE id = ?';
//   } else if (option === 'option2') {
//     sql = 'UPDATE polls SET option2Votes = option2Votes + 1 WHERE id = ?';
//   } else {
//     return res.status(400).send({ error: 'Invalid option selected' });
//   }

//   db.query(sql, [pollId], (err, result) => {
//     if (err) {
//       console.error('Error updating vote count:', err);  // Log any errors
//       return res.status(500).send({ error: 'Error updating vote count' });
//     }
//     console.log('Vote updated successfully:', result);  // Log the result on success
//     res.send({ message: 'Vote submitted successfully' });
//   });
// });



app.post('/polls/:id/vote',authenticateToken, (req, res) => {
  const pollId = req.params.id;
  const { option } = req.body;
  const userId = req.user.id; 

  const checkVoteSql = 'SELECT * FROM votes WHERE pollId = ? AND userId = ?';
  db.query(checkVoteSql, [pollId, userId], (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Error checking vote status' });
    }
    if (result.length > 0) {
      return res.status(400).send({ error: 'You have already voted' });
    }


    let updateSql;
    if (option === 'option1') {
      updateSql = 'UPDATE polls SET option1Votes = option1Votes + 1 WHERE id = ?';
    } else if (option === 'option2') {
      updateSql = 'UPDATE polls SET option2Votes = option2Votes + 1 WHERE id = ?';
    } else {
      return res.status(400).send({ error: 'Invalid option selected' });
    }

    db.query(updateSql, [pollId], (err, result) => {
      if (err) {
        return res.status(500).send({ error: 'Error updating vote count' });
      }

      // Record the vote
      const insertVoteSql = 'INSERT INTO votes (pollId, userId, option) VALUES (?, ?, ?)';
      db.query(insertVoteSql, [pollId, userId, option], (err, result) => {
        if (err) {
          return res.status(500).send({ error: 'Error recording vote' });
        }
        res.send({ message: 'Vote submitted successfully' });
      });
    });
  });
});



// //tried
// app.post('/polls/:id/vote', (req, res) => {
//   const pollId = req.params.id;
//   const { option } = req.body;

//   let sql;
//   if (option === 'option1') {
//     sql = 'UPDATE polls SET option1Votes = option1Votes + 1 WHERE id = ?';
//   } else if (option === 'option2') {
//     sql = 'UPDATE polls SET option2Votes = option2Votes + 1 WHERE id = ?';
//   } else {
//     return res.status(400).send({ message: 'Invalid option selected' });
//   }

//   db.query(sql, [pollId], (err, result) => {
//     if (err) {
//       return res.status(500).send({ message: 'Database error', error: err });
//     }
//     res.send({ message: 'Vote recorded successfully' });
//   });
// });

// //tried
// app.get('/poll/:id/results', (req, res) => {
//   const pollId = req.params.id;
//   const sql = 'SELECT option1Votes, option2Votes FROM polls WHERE id = ?';

//   db.query(sql, [pollId], (err, result) => {
//     if (err) {
//       return res.status(500).send({ message: 'Database error', error: err });
//     }
//     if (result.length > 0) {
//       res.send(result[0]);
//     } else {
//       res.status(404).send({ message: 'Poll not found' });
//     }
//   });
// });






app.get('/polls',authenticateToken,(req, res) => {
  const sql = 'SELECT * FROM polls';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

//FAIR
app.get('/polls/:id/results',authenticateToken, (req, res) => {
  const pollId = req.params.id;
  const sql = 'SELECT option1Votes, option2Votes FROM polls WHERE id = ?';
  db.query(sql, [pollId], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});


app.get('/poll/:id',authenticateToken, (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM polls WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
}); 



 
app.listen(5000, () => {
  console.log('Server running on port 5000');
  // console.log(process.env.JWT_SECRET)
});








