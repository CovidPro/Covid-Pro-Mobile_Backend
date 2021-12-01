const express = require('express');

const router = express.Router();
const {
  createUser,
  userSignIn,
  uploadProfile,
  signOut,
  updateTime
} = require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
const {
  validateUserSignUp,
  userVlidation,
  validateUserSignIn,
} = require('../middlewares/validation/user');

const multer = require('multer');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};
const uploads = multer({ storage, fileFilter });

router.post('/create-user', validateUserSignUp, userVlidation, createUser);
router.post('/sign-in', validateUserSignIn, userVlidation, userSignIn);
router.post('/sign-out', isAuth, signOut);
router.post(
  '/upload-profile',
  isAuth,
  uploads.single('profile'),
  uploadProfile
);
router.post('/update-time', isAuth, updateTime);

router.get('http://localhost:5000/customers/msg', (req, res) => {
  console.log(req);
  console.log(res);
  res.send('user route');
  console.log(res);
});
/*
fetch('https://api.github.com/users/manishmshiva', {
  method: "GET",
  headers: {"Content-type": "application/json;charset=UTF-8"}
})
    .then(response => response.json())
    .then(json => console.log(json));
.catch(err => console.log(err));
*/
const GetData = [];
useEffect(() => {
  fetch("http://localhost:5000/customers/msg")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //GetModesData.push(...data);
        //setDataState(GetData.map((d) => d.modeName));
      });
}, []);

module.exports = router;
