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





























/*App.Router = Backbone.Router.extend({
    routes: {
        ''             : 'home',
        'users/create'        : 'usersCreate',
        'users'               : 'usersIndex',
        'books/create'        : 'booksCreate',
        'books'               : 'booksIndex',
        '*other'              : 'default'

    },

    usersIndex: function() {
        console.log('index user');
        var userList = new App.Collections.UserList();
        userList.fetch();
        var viewUserList = new App.Views.UserList({collection : userList}).render();
    },

    booksIndex: function() {
        console.log('индекс book');
        var bookList = new App.Collections.BookList();
        bookList.fetch();
        var viewBookList = new App.Views.BookList({collection : bookList}).render();
    },

    usersCreate: function() {
        console.log('create user');
        var user = new App.Models.User();
        var userAddView = new App.Views.AddUser({model :user}).render();
    },

    booksCreate: function() {
        console.log('create book');
        var book = new App.Models.Book();
        var bookAddView = new App.Views.AddBook({model :book}).render();
    },
    home: function() {
        console.log( 'Стартовая страница' );
    },

    showUser: function(id) {
        vent.trigger('showUser:show', id);
    },

    showBook: function(id) {
        console.log('это роут page' + id + '!!!');
    },

    default: function(other) {
        alert('Хммм...вы уверены, что вы попали туда куда хотели? Вы находитесь на роуте ' + other);
    }
});
*/
