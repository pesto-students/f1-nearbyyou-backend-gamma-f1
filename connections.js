var mongoose = require('mongoose');

//Db Connection Start-----------------------------------
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Near_By_you', { useNewUrlParser: true })

  .then(() => console.log('Connection Done'))
  .catch((err) => console.error(err))
//Db Connection End--------------------------------------
