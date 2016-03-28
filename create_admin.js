var config = require('./config/config')();
var mongoose = require('./config/database')(config.db);
var User = require('./app/models/user')();

var admin_user = {
  username: "admin",
  password: "admin"
  email: "admin@admin.com",
  is_admin: true
};

User.findOne({
    username: admin_user.username
  })
  .exec()
  .then((user) => {
    if (user) {
      console.log("Admin user alredy exists!");
      mongoose.disconnect();
      return;
    }
    User.create(admin_user)
      .then(() => {
        console.log("Created admin user!");
        mongoose.disconnect();
      })
      .onReject((error) => {
        console.log(error);
        mongoose.disconnect();
      });
  }).onReject((error) => {
    console.error(error)
    mongoose.disconnect();
  });
