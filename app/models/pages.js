var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');
var PageSchema = mongoose.Schema({
  username: String,
  pages: {
  pageID: String,
  pageName: String,
  pageImageURL: String,
  pageText: Object,
  created_at: {type: Date, default: Date.now}      
  }

})


var Pages = mongoose.model('Pages', PageSchema)
