// const express = require('express');
// const app = express();
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const session = require('express-session')
// const userRouter = require('./routes/users')
// const championRouter = require('./routes/champions');
// const { support } = require('jquery');

// const PORT = process.env.PORT || 8080
// app.use(cors());
// app.use(express.json());
// app.use(session({
//     secret: 'somesecret',
//     resave: false, 
//     saveUninitialized: true
// }))
// app.use('/user', userRouter)
// app.use('/champions', championRouter)

// app.listen(PORT, () => {
//     console.log('Server listening on port 8080...')
// })