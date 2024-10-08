const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); 
app.use(fileUpload());

app.use('/api', studentRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
