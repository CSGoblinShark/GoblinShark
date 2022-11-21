import express from 'express'
import path from 'path'
import template from './../template'
import devBundle from './devBundle'
import usersController from './controllers/usersController'

let port = process.env.PORT || 3000
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
devBundle.compile(app)

const apiRouter = require('./routes/api');

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use('/api', apiRouter)

app.get('/', (req, res) => {
    res.status(200).send(template())
})

// global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', port)
})