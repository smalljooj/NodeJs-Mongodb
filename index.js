//carregando modules
	const express = require('express')
	const handlebars = require('express-handlebars')
	const bodyParser = require('body-parser')
	const app = express()
	const admin = require(__dirname+'/routes/admin')
	const path = require('path')
	const mongoose = require('mongoose')
//config
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