const express = require('express');
const cors = require('cors')
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors())
app.use(express.json());


const apiRoutes = require('./routes/api');


app.use('/api', apiRoutes);


app.get('/', (req, res) => {
  res.send('Music Api backend ..');
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
