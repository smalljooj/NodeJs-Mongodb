const mongoose = require("mongoose")

// configurando o mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/bancotest", {
	useMongoClient: true
}).then(()=>{
	console.log("mongodb: conectado");
}).catch((err)=>{
	console.log("erro ao se conectar ao mongodb"+ err);
});

// models

const UsuarioSchema = mongoose.Schema({

	nome: {
		type: String,
		require: true
	},
	sobrenome:{
		type: String,
		require : true
	},
	email: {
		type: String,
		require : true
	},
	idade: {
		type: Number,
		require : true
	},
	pais:{
		type: String
	}

})
//collection
mongoose.model('usuarios', UsuarioSchema)

const usuario = mongoose.model('usuarios')

new usuario({
	nome: "jose",
	sobrenome: "asdas",
	email: "asda@hmail.com",
	idade: 23,
	pais : "romenia"
}).save().then(()=>{
	console.log("usuario criado")
}).catch((err)=>{
	console.log("erro: "+err)
})