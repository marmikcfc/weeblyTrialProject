// TODO change the Thing name here and in the models folder to follow the name Object you are creating

//var User = require('../models/user');  // load the User mongoose model for passport.js authentication



var pages = require('../models/pages');  // load the thing mongoose model - change as needed
var users = require('../controllers/users');
//var pages = require('../controllers/pages');
var mongoose = require('mongoose');
var Pages = mongoose.model('Pages');

var passport = require('passport');
var jwt = require('jsonwebtoken');

module.exports = function(app) {
  app.post('/users', users.createUser);
  //OAUTH routes
  app.get("/auth/facebook", passport.authenticate("facebook"));
  app.get("/auth/facebook/callback",
    passport.authenticate("facebook",
      { failureRedirect: "/", successRedirect:"/" }));

  app.get("/auth/google",
        passport.authenticate("google",
          { scope: ["https://www.googleapis.com/auth/plus.login",
                    'https://www.googleapis.com/auth/userinfo.email']
  }));
  app.get("/auth/google/callback",
    passport.authenticate("google",
      { failureRedirect: "/", successRedirect:"/" }));
      
  //local auth route
  app.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info){
      if(err){return next(err);}
      if(!user) {
        console.log('incorrect user pass combo!');
        return res.json({err: 'Invalid username and/or password combination!'});
      }
      req.logIn(user, function(err){
        if(err){ return next(err);}
        
        var token = jwt.sign(user, 'shhhhh', {
          expiresIn: 6000 // expires in 600 Mins
        });
        
        console.log('success');
        console.log(req.isAuthenticated());
        console.log(req.user);
        console.log('req session:', req.session);
        return res.json({data:user, token: token});
      });
    })(req,res,next);
  });

  app.post('/logout', function(req,res){
    console.log('logging out ', req.session.passport.user);
    req.logOut();
    console.log('are they still logged in?', req.isAuthenticated());
    res.send(200);
  })

  //route to test if the user is logged in or not
  app.get('/loggedin', function(req, res){
    console.log('loggedin?', req.isAuthenticated());
    return res.json(req.isAuthenticated() ? req.user : null);
  });

  app.get('/getAllUsers', users.getAllUsers);
  app.post('/addFriend', users.addFriend);

//create pages
  app.post('/api/pages', function(req, res) {
      	
var token = req.body.token || req.query.token || req.headers['x-access-token'];

      	console.log("token   "+token);
      	 // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, 'shhhhh', function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });   
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    

		
		   	    console.log("into create page and token is authenticated");

					console.log("user name    "+ req.query.username);
					console.log("pagename   "+ req.query.pagename);
					console.log("pageImageURL   "+ req.query.pageimageurl);
					console.log("pageText   "+ req.query.pagetext);
	
	
		      var page = new Pages({username: req.query.username, pages: {
		      	 pageName: req.query.pagename,
  					 pageImageURL: req.query.pageimageurl,
  					 pageText: req.query.pagetext,
		      }});
		      
      page.save(function(err){
        if(err){
          res.json({err: err});
        } else {
          res.json(page);
        }
      })
				
      //  res.json({ message: 'hooray!! API is authenticated' });

      }
    });

  }

  else{
  	return res.json({ success: false, message: 'Failed to authenticate token.' });    
  }
  });
  
/*//get pages
  app.get('/api/pages', pages.getAllPages());
  
//update pages
  app.post('/api/pages/:id', pages.updatePage());
  
//get pages by ID
  app.get('/api/pages/:id', pages.getPagebyID());

//delete page
	app.delete('/api/pages/:id', pages.deletePage() );
*/
};

/*module.exports = function(app, passport) {
	// api ---------------------------------------------------------------------
	// create thing
	app.post('/api/things', function(req, res) {
		Thing.create({
			// TODO populate the obj
		}, function(err, thing) {
			if (err) {
				res.send(err);
			}
			res.json(thing);
		});
	});

	// get all things
	app.get('/api/things', function(req, res) {
		// use mongoose to get all things from the db
		Thing.find(function(err, things) {
			// if err, send it
			if (err) {
				res.send(err);
			}
			res.json(things);
		});
	});

	// get thing by parameter
	app.get('/api/things/:parameter', function(req, res) {
		// use mongoose to get all the things using a paramater
		// TODO Populate the search obj with the needed parameter
		Thing.find({}, function(err, things) {
			// if err, send it
			if (err) {
				res.send(err);
			}
			res.json(things);
		});
	});

	// get thing by id
	app.get('/api/thing/:id', function(req, res) {
		// use mongoose to find the thing by id requested
		Thing.findById(req.params.id, function(err, thing) {
			if(err) {
				res.send(err);
			}
			res.json(thing);
		});
	});

	// update a thing by id
	app.post('/api/things/:id', function(req, res) {
		Thing.findById(req.body._id, function(err, thing) {
			if(err) {
				res.send(err);
			}
			// TODO make changes to thing
			// save
			thing.save(function (err) {
				if (err) {
					res.send(err);
				}
				res.json(thing);
			});
		});
	});

	// delete a thing by id
	app.delete('/api/things/:id', function(req, res) {
		Thing.remove({
			_id : req.params.id
		},
		function(err, thing) {
			if (err) {
				res.send(err);
			}
			res.send();
		});
	});
};
*/

/*
	// process the login form
	// Express Route with passport authentication and custom callback
	app.post('/api/login', function(req, res, next) {
		passport.authenticate('local-login', function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (user === false) {
				res.status(401).send(req.flash('loginMessage'));
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(500).send("There has been an error");
					} else {
						res.status(200).send("success!");
					}
				});
			}
		})(req, res, next);
	});

	// process the signup form
	// Express Route with passport authentication and custom callback
	app.post('/api/signup', function(req, res, next) {
		passport.authenticate('local-signup', function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (user === false) {
				res.status(401).send(req.flash('signupMessage'));
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(500).send("There has been an error");
					} else {
						res.status(200).send("success!");
					}
				});
			}
		})(req, res, next);
	});

	// check if the user is logged in an retrieve a different user obj based on the status
	app.get('/loggedin', function(req, res) {
		res.json(isLoggedIn(req));
	});

	// log the user out and redirect to /
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	isLoggedIn = function(req) {
		if (req.isAuthenticated()) {
			var user = JSON.parse(JSON.stringify(req.user));
			// hide sensible information
			delete user.local.password;
			return user;
		}
		return null;
	}*/