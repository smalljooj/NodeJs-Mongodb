//carregando modules
	const express = require('express')
	const handlebars = require('express-handlebars')
	const bodyParser = require('body-parser')
	const admin = require(__dirname+'/routes/admin')
	const path = require('path')
	const mongoose = require('mongoose')
	const session = require('express-session')
	const flash = require('connect-flash')

	const app = express()
//config
	//session
		app.use(session({
			secret: "cursodenode",
			resave: true,
			saveUninitialized:true
		}))
		app.use(flash())
	//middleware
		app.use((req, res, next)=>{
			res.locals.success_msg = req.flash("success_msg")
			res.locals.error_msg = req.flash("error_msg")
			next()
		})
	//body-parser
		app.use(bodyParser.urlencoded({extended : true}))
		app.use(bodyParser.json())
	//handlebars
		app.engine('handlebars', handlebars({defaultlayout : 'main'}))
		app.set('view engine', 'handlebars')
	//mongoose
		mongoose.Promise = global.Promise;
		mongoose.connect("mongodb://localhost/blogapp").then(()=>{
			console.log("Conectado ao mongo")
		}).catch((err)=>{
			console.log(err+"Erro ao se conectar")
		});
	//public
		app.use(express.static(path.join(__dirname, "public")))
//routes
	app.get('/', (req, res)=>{
		res.send("principal")
	})

	app.use('/admin', admin);

//others
const PORT = 3000
app.listen(PORT, ()=>{
	console.log("is running")
})