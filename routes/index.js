var express = require('express');
var router = express.Router();
var Doffice = require('../models/distoffice');
var Itndept = require('../models/internaldept');
var Localdept = require('../models/localdept');
var Docin = require('../models/docin');
var Docout = require('../models/docout');
var path = require('path');



// Upload
const app = express();
const multer = require('multer');
// var upload = multer({ dest: 'uploads/' });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads')
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage: storage })



var title = 'NN Documents Recorder';

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

router.get('/', isLoggedIn, (req, res, next) => {
  res.render('home', { title: title, user: req.user });
});



// Document In
router.get('/docin_list', isLoggedIn, async (req, res, next) => {
  const docins = await Docin.find({}).sort({ record_date: 1 });
  res.render('docin_list', { title: title, user: req.user, sub_title: 'รายชื่อหนังสือรับ', docin_list: docins })
})

router.get('/docin_add', isLoggedIn, async (req, res, next) => {
  const locals = await Localdept.find({}).sort({ name: 1 });
  const itns = await Itndept.find({}).sort({ name: 1 });
  const doffices = await Doffice.find({}).sort({ name: 1 });
  res.render('docin_add', { title: title, user: req.user, local_list: locals, itn_list: itns, doffice_list: doffices });
})


// Document Out
router.get('/docout_list', isLoggedIn, async (req, res, next) => {
  const docouts = await Docout.find({});
  res.render('docout_list', { title: title, user: req.user, sub_title: 'รายชื่อหนังสือส่ง', docout_list: docouts })
})

router.get('/docout_add', isLoggedIn, async (req, res, next) => {
  const locals = await Localdept.find({}).sort({ name: 1 });
  const itns = await Itndept.find({}).sort({ name: 1 });
  const doffices = await Doffice.find({}).sort({ name: 1 });
  res.render('docout_add', { title: title, user: req.user, local_list: locals, itn_list: itns, doffice_list: doffices });
})



// District Office
router.get('/doffice_list', isLoggedIn, async (req, res, next) => {
  const doffices = await Doffice.find({}).sort({ name: 1 });
  res.render('doffice_list', { title: title, user: req.user, sub_title: 'รายชื่อที่ว่าการฯ', doffice_list: doffices })
})

router.get('/doffice_add', isLoggedIn, (req, res, next) => {
  res.render('doffice_add', { title: title, user: req.user });
});

router.get('/doffice_del/:id', isLoggedIn, async (req, res, next) => {
  const { id } = req.params.id;
  await Doffice.findOneAndDelete(id);
  res.redirect('/doffice_list');
});



// Local Dept
router.get('/local_list', isLoggedIn, async (req, res, next) => {
  const locals = await Localdept.find({}).sort({ name: 1 });
  res.render('local_list', { title: title, user: req.user, sub_title: 'รายชื่อหน่วยงานภายนอก', local_list: locals })
})

router.get('/local_add', isLoggedIn, (req, res, next) => {
  res.render('local_add', { title: title, user: req.user });
});

router.get('/local_del/:id', isLoggedIn, async (req, res, next) => {
  const { id } = req.params.id;
  await Localdept.findOneAndDelete(id);
  res.redirect('/local_list');
});



// Internal Dept
router.get('/itn_list', isLoggedIn, async (req, res, next) => {
  const itns = await Itndept.find({}).sort({ name: 1 });
  res.render('itn_list', { title: title, user: req.user, sub_title: 'รายชื่อหน่วยงานภายใน', itn_list: itns })
})

router.get('/itn_add', isLoggedIn, (req, res, next) => {
  res.render('itn_add', { title: title, user: req.user });
});

router.get('/itn_del/:id', isLoggedIn, async (req, res, next) => {
  const { id } = req.params.id;
  await Itndept.findOneAndDelete(id);
  res.redirect('/itn_list');
});



// Upload
router.get('/display_file', isLoggedIn, (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', '/uploads/ilovepdf_merged.pdf'));
});

router.get('/download_file', isLoggedIn, (req, res, next) => {
  
  // console.log(req.query.doc_path);
  
  // const file = path.join(__dirname, '../', '/uploads/ilovepdf_merged.pdf');
  
  const file = path.join(__dirname, '../', req.query.doc_path);
  
  res.download(file, function (err) {
    if (err) {
      console.log("Error");
      console.log(err);
    } else {
      console.log("Success");
    }
  });

});

router.get('/upload_file', isLoggedIn, (req, res, next) => {
  res.render('upload_file', { title: title, user: req.user });
});

router.post('/upload_file', upload.single('pdf_file'), (req, res) => {
  console.log(req.file.path);
  res.redirect('/upload_file');
});



// Authentication
router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
