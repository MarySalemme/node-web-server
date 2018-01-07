const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

// setting up partials
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

// express middleware: lets you configure hou your application will work
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
   const now = new Date().toString();
   const log = `${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log', log + '\n', (err) => {
      if (err) {
         console.log('Unable to append to server.log');
      }
   })
   next();
})

// app.use((req, res, next) => {
//    res.render('ma intenance.hbs');
// })

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

// http route handler
app.get('/', (req, res) => {
   res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to this page',
   })
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
      pageTitle: 'About Page',
   });
});

app.get('/bad', (req, res) => {
   res.send({
      errorMessage: 'Unable to handle request'
   });
});

//binds the application to a port on the machine
app.listen(port, () => {
   console.log(`Server is up on port ${port}`);
});
