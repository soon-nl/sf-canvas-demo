var express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path') 
var app = express();
var crypto = require("crypto");
var consumerSecretApp = process.env.CANVAS_CONSUMER_SECRET || 'XXXX'; // This secret is already configured in App service environment variable

const PORT = process.env.PORT || 3000;

console.log('consumer secret - '+consumerSecretApp);

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'dist')));

// app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('hello');
});

// Define route to render EJS view
// app.get('/app', (req, res) => {
//   res.render('app', { title: 'Express React App' });
// });

app.post('/', function (req, res) { 
  var bodyArray = req.body.signed_request.split(".");
  var consumerSecret = bodyArray[0];
  var encoded_envelope = bodyArray[1];

  var check = crypto.createHmac("sha256", consumerSecretApp).update(encoded_envelope).digest("base64");

  if (check === consumerSecret) { 
      var envelope = JSON.parse(new Buffer(encoded_envelope, "base64").toString("ascii"));
      //req.session.salesforce = envelope;
      console.log("got the session object:");
      console.log(envelope);
      console.log(JSON.stringify(envelope) );
  //     res.render('index', { title: envelope.context.user.userName, req : JSON.stringify(envelope) });
      res.render('app', { title: envelope.context.user.userName, req : JSON.stringify(envelope) });
  }else{
      res.send("authentication failed");
  } 

  // res.render('app', { title: 'test' });
})
 
app.listen(PORT , function () {
	console.log ("server is listening!!! at port " + PORT);
} );