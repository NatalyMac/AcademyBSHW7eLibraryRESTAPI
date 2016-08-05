eLibrary.Router = Backbone.Router.extend({
    routes: {
        ''                   : 'home',
        'users'              : 'showUsers',
        'users/new'          : 'newUser',
        'users/edit/:id'     : 'editUser',
        'users/:id/detail'   : 'userDetail',
        'books'              : 'showBooks',
        'books/new'          : 'newBook',
        'books/edit/:id'     : 'editBook'
    },

    home :function() {
        router.navigate('', {
            trigger: true,
            replace: true
        });
    },

    showUsers : function() {
        var userController = new eLibrary.Controllers.Users();
        userController.showUsers();
    },

    newUser : function() {
        var userController = new eLibrary.Controllers.Users();
        userController.newUser();
    },

    editUser : function(id) {
        var userController = new eLibrary.Controllers.Users();
        userController.editUser(id);
    },

    userDetail : function(id) {
        var userController = new eLibrary.Controllers.Users();
        userController.userDetail(id);
    },


    showBooks : function() {
        var bookController = new eLibrary.Controllers.Books();
        bookController.showBooks();
    },

    newBook : function() {
        var bookController = new eLibrary.Controllers.Books();
        bookController.newBook();
    },

    editBook : function(id) {
        var bookController = new eLibrary.Controllers.Books();
        bookController.editBook(id);
    },
});

