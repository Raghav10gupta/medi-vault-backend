const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Dummy users & data
let users = [{ username: 'saksham', password: '1234' }];
let records = {};
let reminders = {};
let doctors = [
  { name: "Dr. Mehta Clinic", address: "Delhi", distance: "2km" },
  { name: "Apollo Health", address: "Connaught Place", distance: "3.5km" }
];

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  return user ? res.json({ status: 'success' }) : res.status(401).json({ status: 'unauthorized' });
});

// Upload/View records
app.post('/uploadRecord', (req, res) => {
  const { username, data } = req.body;
  records[username] = records[username] || [];
  records[username].push(data);
  res.json({ status: 'record uploaded' });
});

app.get('/getRecords/:username', (req, res) => {
  res.json(records[req.params.username] || []);
});

// Set/Get reminders
app.post('/setReminder', (req, res) => {
  const { username, reminder } = req.body;
  reminders[username] = reminders[username] || [];
  reminders[username].push(reminder);
  res.json({ status: 'reminder set' });
});

app.get('/getReminders/:username', (req, res) => {
  res.json(reminders[req.params.username] || []);
});

// Find nearby doctors
app.get('/findDoctors', (req, res) => {
  res.json(doctors);
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
