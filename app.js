// Importmodules
var express = require('express');
var path = require('path');
var app = express();
const exphbs = require('express-handlebars');

// Define the port for the application
const port = process.env.port || 3000;

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Configure Handlebars as the view engine
app.engine('.hbs', exphbs.engine({ 
  extname: '.hbs' ,defaultLayout:"main"
}));

app.set('view engine', 'hbs');

// Define route for the home page
app.get('/', function(req, res) {
  res.render('partials/index', { title: 'Express' });
});

// Define route for the '/users' endpoint
app.get('/users', function(req, res) {
  res.send('respond with a resource');
});

//Assignment One - STEP 6

const data = require('./datasetB.json')
app.get('/data', (req, res) => {
  console.log(data);
  res.render('partials/data',{title:'Data Page'});
});
 
//Assignment One - End
app.get('/data/asin/:index', (req, res) => {
  const index = req.params.index;
  const productInfo = data[index];

if(productInfo){
  res.render(    'partials/indexproduct', { productInfo });}
  else{
  
      res.status(404).json({ error: 'Product not found' });
  }
});

app.get('/data/search/prdID', (req, res) => {
  res.render('partials/prodID');
});

app.get('/data/search/prdID/result', (req, res) => {
  const asin = req.query.asin;
  const productInfo = data.find(product => product.asin === asin);
    if (productInfo) {
      res.render('partials/prdIdData', { productInfo });}
  else{
  
      res.status(404).json({ error: 'Product not found' });
  }
});
//name form
app.get('/data/search/prdName/', (req, res) => {
  res.render('partials/prdName');
  
});

app.get('/data/search/prdName/result', (req, res) => {
  const productName = req.query.productName;
  const matchingProducts = data.filter(prodt => prodt.title.toLowerCase().includes(productName));

  //  const matchingProducts = data.filter(prodt => prodt.title.toLowerCase().includes(productName));
    if (matchingProducts.length > 0) {
      res.render(  'partials/prdNamedata', { matchingProducts });}
  else{
  
      res.status(404).json({ error: 'Product not found' });
  }
});

//ASSIGNMENT 1 ENDS
 app.get('/allData', (req, res) => {
   res.render('partials/allData',{product: data, title:'All data in Table format'});
  
 });

//step 9
 const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    zero: function (value){
      return value !=0;
    }
    // Tozero: function (value){
    //   if(value =="0")
    //   return "N/A";
    // else
    // return value;
    // }
    
  }
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
 




// Catch-all route for any other endpoint, rendering the 'error' page
app.get('*', function(req, res) {
  res.render('partials/error', { title: 'Error', message: 'Wrong Route' });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
