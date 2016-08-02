(function()
{
    window.eLibrary =
  {
    Models: {},
    Collections: {},
    Views: {},

    start: function()
    {
        var user = new eLibrary.Models.User();
        var users = new eLibrary.Collections.Users({model:user});
        users.fetch();

        var book = new eLibrary.Models.Book();
        var books = new eLibrary.Collections.Books({model:book});
        books.fetch();

        router = new eLibrary.Router();

        router.on('route:home', function() {
            router.navigate('', {
                trigger: true,
                replace: true
            });
        });

        router.on('route:showUsers', function() {
            var usersView = new eLibrary.Views.Users({
                collection: users
            });
            usersView.render();
            $('.main-container').html(usersView.render().$el);
        });

        router.on('route:newUser', function() {
            var newUserForm = new eLibrary.Views.UserForm({
                model: new eLibrary.Models.User()
            });

            newUserForm.on('form:submitted', function(attrs) {
                console.log(attrs);

                var user = new eLibrary.Models.User();
                user.set(attrs);

                if (user.isValid()) {
                    users.create(attrs);
                    alert('Added succesfully');
                    router.navigate('users', true);

                }else{
                    alert(user.validationError);

                }
            });

            $('.main-container').html(newUserForm.render().$el);
        });


        router.on('route:editUser', function(id) {
            var user = users.get(id),
                editUserForm;


            if (user) {
                editUserForm = new eLibrary.Views.UserForm({
                    model: user
                });

                editUserForm.on('form:submitted', function(attrs) {

                    user.set(attrs);

                    if (user.isValid()) {

                        user.save();

                        alert('Edit succesfully');

                        router.navigate('users', true);

                    }else {
                        alert(user.validationError);
                    }

                });

                $('.main-container').html(editUserForm.render().$el);
            } else {
                router.navigate('users', true);
            }
        });


        router.on('route:userDetail', function(id) {
            var user = users.get(id),
                detailUserForm;
            
            if (user) {
                detailUserForm = new eLibrary.Views.UserDetail({
                    model: user
                });

                console.log(user);
                console.log(user.books);

               // detailUserForm.render();

                $('.main-container').html(detailUserForm.render().$el);

            } else {
                router.navigate('users', true);
            }
        });


        /*************************************************************************************/

        router.on('route:showBooks', function() {
            var booksView = new eLibrary.Views.Books({
                collection: books
            });
            console.log('show');
            booksView.render();
            $('.main-container').html(booksView.render().$el);
        });

        router.on('route:newBook', function() {
            var newBookForm = new eLibrary.Views.BookForm({
                model: new eLibrary.Models.Book()
            });

            newBookForm.on('form:submitted', function(attrs) {
                console.log(attrs);

                var book = new eLibrary.Models.Book();
                book.set(attrs);

                if (book.isValid()) {
                    books.create(attrs);
                    alert('Added succesfully');
                    router.navigate('books', true);

                }else{
                    alert(book.validationError);

                }
            });

            $('.main-container').html(newBookForm.render().$el);
        });

        router.on('route:editBook', function(id) {
            var book = books.get(id),
                editBookForm;

            if (book) {
                editBookForm = new eLibrary.Views.BookForm({
                    model: book
                });

                editBookForm.on('form:submitted', function(attrs) {

                    book.set(attrs);

                    if (book.isValid()) {

                        book.save();

                        alert('Edit succesfully');

                        router.navigate('users', true);

                    }else {
                        alert(book.validationError);
                    }

                });

                $('.main-container').html(editBookForm.render().$el);
            } else {
                router.navigate('books', true);
            }
        });

        Backbone.history.start();
    }
  };
}());










































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



