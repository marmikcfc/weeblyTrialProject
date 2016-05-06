var mongoose = require('mongoose');
var Pages = mongoose.model('Pages');

module.exports = (function(){
  return{
    createPage: function(req, res){
/*      req.body.password = bcrypt.hashSync(req.body.password, salt);
      console.log('in users controller');
      console.log(req.body);
      var user = new User({username: req.body.username, password: req.body.password});
      user.save(function(err){
        if(err){
          res.json({err: err});
        } else {
          res.json(true);
        }
      })
*/  
            console.log("into create page");

          res.json({ message: 'hooray!!' });
    },
    getAllPages: function(req, res){
/*      User.find({}, function(err, results){
        if(err) {
         console.log(err);
        } else {
         res.json(results);
        }
      })*/
      
                res.json({message : "into get All Pages"});
    },
    addPage: function(req, res){
/*      User.findOne({_id: req.user.id}, function(err, user){
        user.friend.push(req.body);
        user.save(function(err){
          res.json(err);
        })
      console.log(req.user, 'current user in add Friend model');
      console.log(req.body, 'req in user model');
      })*/
      
        res.json({message : "into add pages"});
    },
    updatePage:  function(req, res){
/*      User.findOne({_id: req.user.id}, function(err, user){
        user.friend.push(req.body);
        user.save(function(err){
          res.json(err);
        })
      console.log(req.user, 'current user in add Friend model');
      console.log(req.body, 'req in user model');
      })
*/
        res.json({message : "into update page"});
    },
    deletePage :  function(req, res){
/*      User.findOne({_id: req.user.id}, function(err, user){
        user.friend.push(req.body);
        user.save(function(err){
          res.json(err);
        })
      console.log(req.user, 'current user in add Friend model');
      console.log(req.body, 'req in user model');
      })
*/
   res.json({message : "into delete page"});
    },
    
    getPagebyID :  function(req, res){
/*      User.findOne({_id: req.user.id}, function(err, user){
        user.friend.push(req.body);
        user.save(function(err){
          res.json(err);
        })
      console.log(req.user, 'current user in add Friend model');
      console.log(req.body, 'req in user model');
      })
*/
   res.json({message : "into get PAge by ID"});
    }
    
  }
})();
