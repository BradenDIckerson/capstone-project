require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {seed} = require('./seed')


app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})


app.post('/api/seed', seed)





const port = process.env.PORT || process.env.SERVER_PORT;
app.listen(port, () => console.log(`Server is running on ${port}`))