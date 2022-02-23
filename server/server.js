require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {seed} = require('./seed');
const { getLocations, getOneLocation } = require('./controller');


app.use(cors())
app.use(express.json())
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})


app.post('/api/seed', seed)

app.get('/api/locations', getLocations)

app.get('/api/location/:state', getOneLocation)

// app.get('/api/menu_items', getMenuItems)

const port = process.env.PORT || process.env.SERVER_PORT;
app.listen(port, () => console.log(`Server is running on ${port}`))