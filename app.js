var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var multer = require('multer'); // Add multer for handling file uploads

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter = require('./routes/student'); // Add the student router for image upload functionality

var app = express();

// Step 1: Install Required Packages : npm install express mongoose multer body-parser ejs
// Step 2: Set Up the Project Structure : setup the public / uploads folder 
// Step 3: Configure Mongoose and Create the Student Model
// Step 4: Set Up Multer for Image Uploads
// Step 5: Create the Controller Logic
// Step 6: Create the Routes
// Step 7: Create the EJS Form for Image Upload
// Step 8: Create the Success Page  
// Step 8: Test the Application
  // Start your server: nodemon
  // Open your browser and navigate to http://localhost:3000/student/new.
  // Fill in the form, choose an image, and submit.
  // After submission, the image should be saved in public/uploads, and the success page should display the name and image.


// NOTE : line 16 - 30 are for the multer setup : Set Up Multer for Image Uploads 
// Connect to MongoDB (update the database URL to your MongoDB instance)
mongoose.connect('mongodb://localhost:27017/image_saving_demo_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Set up Multer storage for image uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'), // Set upload folder
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // File naming convention
  }
});
const upload = multer({ storage: storage });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/student', studentRouter); // Add route to handle /student requests

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
