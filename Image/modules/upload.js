const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pms', {useNewUrlParser: true , } );
var conn = mongoose.Collection;
var imageSchema = new mongoose.Schema({
    imagename :  {
      type : String
      
    },
  
    
});

var ImageModel = mongoose.model('Image' , imageSchema);
module.exports = ImageModel
