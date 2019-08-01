let mongoose = require('mongoose');


class Database {
  constructor() {
    this._connect()
  }
  _connect() {

    mongoose.connect(`${process.env.Mongo_URI}`, {useNewUrlParser: true, useFindAndModify: false})
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error')
      })
  }
}
module.exports = new Database();
