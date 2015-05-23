var express = require('express'),
	https = require('https'),
	http = require('http'),
	bodyParser  = require('body-parser'),
	fs = require('fs'),
	fortune = require('./lib/fortune.js');
var app = express();


app.set('port', process.env.PORT || 801);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set up handlebars view engine
var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');




// database configuration
// var mongoose = require('mongoose');
// var options = {
//     server: {
//        socketOptions: { keepAlive: 1 } 
//     }
// };
// switch(app.get('env')){
//     case 'development':
//         mongoose.connect(credentials.mongo.development.connectionString, options);
//         break;
//     case 'production':
//         mongoose.connect(credentials.mongo.production.connectionString, options);
//         break;
//     default:
//         throw new Error('Unknown execution environment: ' + app.get('env'));
// }

// 开始课程
app.get('/', function(req, res){
	res.render('home');
})

app.get('/about', function(req, res){
	res.render('about',{fortune: fortune.getFortune()});
})

















// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

// https server
/*var server;

function startServer() {
	var options = {
		key: fs.readFileSync(__dirname + '/ssl/meadowlark.pem'),
		cert: fs.readFileSync(__dirname + '/ssl/meadowlark.crt'),
	}
	server = https.createServer(options, app).listen(app.get('port'), function(){
		console.log('Express started in ' + app.get('env') +
			' mode on port ' + app.get('port') + '.');
	});
}

if(require.main === module){
    // application run directly; start app server
    startServer();
} else {
    // application imported as a module via "require": export function to create server
    module.exports = startServer;
}*/

app.listen(app.get('port'), function(){
	console.log('Expres started at port ' + app.get('port') + ';press Ctrl + C to terminate');
})