const db = require('../models/usersModels');

const usersController = {};

usersController.createUser = (req, res, next) => {
  const create = `INSERT INTO users (
    image_url,
    first_name, 
    last_name, 
    email,
    showemail, 
    resident_alum, 
    cohort_location, 
    city, 
    employed, 
    employer, 
    salary,
    showsalary,
    cohort_num, 
    linkedin, 
    verification) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`
  console.log(req.body);
  const {
    imageUrl,
    firstName,
    lastName,
    email,
    showemail,
    residentAlum,
    cohortLocation,
    city,
    employed,
    employer,
    salary,
    showsalary,
    cohortNum,
    linkedin,
    verification
  } = req.body
  console.log(imageUrl, 'image')
  db.query(create, [imageUrl, firstName, lastName, email, showemail, residentAlum, cohortLocation, city, employed, employer, salary, showsalary, cohortNum, linkedin, verification])
    .then((data) => {
      // console.log(data.rows);
      res.locals.userData = data.rows;
      return next();
    })
    .catch(e => 'Error at usersController.createUser');
};

usersController.getUser = (req, res, next) => {
  const findUser = "SELECT * FROM users WHERE email=$1"
  const email = req.query.email
  db.query(findUser, [email])
    .then((data) => {
      res.locals.userData = data.rows[0];
      // console.log(res.locals.userData)
      return next();
    })
    .catch(e => console.log(e, 'Error at usersController.getUser'));
};

usersController.getAll = (req, res, next) => {
  const getUsers = "SELECT * FROM users"
  db.query(getUsers)
    .then((data) => {
      res.locals.users = data.rows
      // console.log(data.rows)
      return next();
    })
    .catch(e => console.log(e, 'Error at usersController.getAll'));
}

usersController.verification = (req, res, next) => {
  const random = "select substr(md5(random()::text), 0, 25)"
  const addCode = "INSERT INTO verification VALUES ($1)"
  db.query(random)
    .then((data) => {
      db.query(addCode, [data.rows[0].substr])
        .then(() => {
          res.locals.code = data.rows[0].substr
          return next();
        })
    })
    .catch(e => console.log(e, 'Error at usersController.verification'));
  // console.log(code);
  // res.locals.code = code;
  // return next();
}

usersController.checkVerification = (req, res, next) => {
  const check = "SELECT * FROM verification WHERE code=$1"
  // console.log(req.query.verification)
  db.query(check, [req.query.verification])
    .then((data) => {
      if (!data.rows.length) res.locals.match = false;
      else res.locals.match = true;
      return next();
    })
    .catch(e => console.log(e, 'Error at usersController.checkVerification'));
}

module.exports = usersController;
