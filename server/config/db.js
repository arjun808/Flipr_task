const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URL } = process.env;
console.log(MONGO_URL)
const connect = () => {
	mongoose
		.connect(MONGO_URL, {
			useNewUrlparser: true,
			useUnifiedTopology: true,
		})
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};
module.exports=connect