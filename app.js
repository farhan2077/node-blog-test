const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { findByIdAndDelete } = require('./models/blog');

const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));    // accept form data
app.use(morgan('dev'));

// mongodb
const dbURI = 'mongodb+srv://testUser:testUser12345678@nodetutblog.kxfwi.mongodb.net/node-blog-test?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});