const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');
// express middleware: lets you configure hou your application will work 
app.use(express.static(__dirname + '/public'));

// http route handler
app.get('/', (req, res) => {
   res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to this page',
      currentYear: new Date().getFullYear()
   })
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
      pageTitle: 'About Page',
      currentYear: new Date().getFullYear()
   });
});

app.get('/bad', (req, res) => {
   res.send({
      errorMessage: 'Unable to handle request'
   });
});

//binds the application to a port on the machine
app.listen(3000, () => {
   console.log('Server is up on port 3000');
});

