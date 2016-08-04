//(function()
//{
    window.eLibrary =
  {
    Models: {},
    Collections: {},
    Views: {},
    Router: {},
    Controllers :{},


    start: function()
    {

        Backbone.View.prototype.close = function () {
            console.log('Closing view ' + this);
            if (this.beforeClose) {
                this.beforeClose();
            }
            this.remove();
            this.unbind();
        };


        user = new eLibrary.Models.User();
        users = new eLibrary.Collections.Users({model:user});
        users.fetch();

        book = new eLibrary.Models.Book();
        books = new eLibrary.Collections.Books({model:book});
        books.fetch();
        
        router = new eLibrary.Router();

        Backbone.history.start();
    }
}
//());










































/*(function() {
    window.App = {
        Models: {},
        Views: {},
        Collections: {},
        Router: {}
    };

    window.vent = _.extend({}, Backbone.Events);
    
    //App.template = function(id) {
    //    return Handlebars.compile( $('#' + id).html() );
    //};

    App.template = function(id) {
        return _.template( $('#' + id).html() );
    };


    //window.template = function(id) {
    //    return _.template( $('#' + id).html() );
    //};

   /* var user = new App.Models.User({id:1});
    user.fetch();
    user.toJSON();
    var userView = new App.Views.User({model:user});
    $(document.body).append(userView.render().el);

    console.log(user);
    user.fetch();
    console.log(user.fetch());
*/
   // var userList = new App.Collections.UserList();
   // console.log(userList);
  //  console.log(userList.fetch());
  //  userList.toJSON();
  //  var userListView = new App.Views.UserList({collection: userList});

    //$(document.body).append(userListView.render().el);
   // $('.users').html(userListView.render().el);
    //var addUserView = new App.Views.AddUser({ collection: userList });
    //new App.Views.ShowUser({collection:userList});
    //new App.Router();
   // Backbone.history.start();

//}());



