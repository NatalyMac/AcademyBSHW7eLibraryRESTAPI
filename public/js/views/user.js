eLibrary.Views.User = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#tpl-contact').html()),

    events: {
        'click .delete-user': 'onClickDelete'
    },

    initialize: function() {
        this.listenTo(this.model, 'remove', this.remove);
    },

    render: function() {
        var html = this.template(this.model.toJSON());
        this.$el.append(html);
        return this;
    },

    onClickDelete: function(e) {
        e.preventDefault();

        this.model.collection.remove(this.model);

        if (this.model.destroy()){
            alert('Deleted succesfully');
        }

    }
});







































/*
App.Views.AddUser = Backbone.View.extend({
    
    el: "#addUser",
    
    events: {
        'submit' : 'addUser'
    },

    template: App.template('createUser'),

    addUser: function(e) {
        e.preventDefault();

        //this.collection.create(user);
        this.model.set(
            {firstname: this.$('#firstname').val(),
            lastname: this.$('#lastname').val(),
            email: this.$('#email').val(),
            password: this.$('#password').val(),
            role: this.$('#role').val()
        });

        if (!this.model.isValid()) {
            alert(this.model.validationError);
        }
        this.model.save();
        this.clearInps();

        //this.remove();
        //Backbone.history.navigate('/users', {
        //    trigger: true
        //});
    },

    clearInps: function(){
            this.$('#firstname').val('');
            this.$('#lastname').val('');
            this.$('#email').val('');
            this.$('#password').val('');
            this.$('#role').val('');
},

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }

});

*/
/*
App.Views.UserList = Backbone.View.extend({

    el: '#userListTable',

    template: App.template('users-template'),

    initialize: function() {
        this.collection.on('add', this.addOne, this );
    },

    render: function() {
        this.collection.each( this.addOne, this );

        return this;
    },

    addOne: function(user) {

        var userView = new App.Views.User({ model: user });

        console.log( userView.render().el );

        this.$el.append(userView.render().el);
    }
});


App.Views.User = Backbone.View.extend({

    tagName: 'tr',

    template: App.template('user-template'),

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }

});



App.Views.BookList = Backbone.View.extend({

    el: '#bookListTable',

    template: App.template('books-template'),

    initialize: function() {
        this.collection.on('add', this.addOne, this );
    },

    render: function() {
        this.collection.each( this.addOne, this );

        return this;
    },

    addOne: function(book) {

        var bookView = new App.Views.Book({ model: book });

        console.log( bookView.render().el );

        this.$el.append(bookView.render().el);
    }
});


App.Views.Book = Backbone.View.extend({

    tagName: 'tr',

    template: App.template('book-template'),

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }

});


App.Views.AddBook = Backbone.View.extend({

    el: "#addBook",

    events: {
        'submit' : 'addBook'
    },

    template: App.template('createBook'),

    addBook: function(e) {
        e.preventDefault();

        this.model.set(
            {genre : this.$('#genre').val(),
             title : this.$('#title').val(),
             author: this.$('#author').val(),
             year  : this.$('#year').val(),
            });

        if (!this.model.isValid()) {
            alert(this.model.validationError);
        }
        this.model.save();
        this.clearInps();

    },

    clearInps: function(){
            this.$('#genre').val(''),
            this.$('#title').val(''),
            this.$('#author').val(''),
            this.$('#year').val('')
    },

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }

});



*/





/*
App.Views.User = Backbone.View.extend({

    tagName: 'li',

    template: template('userTemplate'),

    initialize: function () {
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.remove, this);
    },
    render: function() {
        var template = this.template(this.model.toJSON());
        this.$el.html( template );
        return this;
    },
    events:{
        'click .edit': 'editUser',
        'click .delete': 'destroy'
    },
    editUser: function  () {
        console.log(this.model);
        var newUserFirstName = prompt('Имя', this.model.get('firstname'));

        this.model.set('firstname', newUserFirstName);
        //{validate: true})

        if (!this.model.isValid()) {
            alert(this.model.get("firstname") + " " + this.model.validationError);
        }

        this.model.save();
    },
    destroy: function  () {
        this.model.destroy();
    },
    remove: function  () {
        this.$el.remove();
    }
});


App.Views.UserList = Backbone.View.extend({

    tagName: 'ul',

    initialize: function() {
        this.collection.on('add', this.addOne, this );
    },
    render: function() {
        this.collection.each(this.addOne, this);
        return this;
    },
    addOne:function (user) {
        var userView = new App.Views.User({model: user});
        this.$el.append(userView.render().el);
    }

});



App.Views.AddUser = Backbone.View.extend({

    el: '#addUser',

    events: {
        'submit' : 'submit'
    },
    initialize: function() {
    },

    submit: function(e) {
        e.preventDefault();

        var newUserFirstName =  $(e.currentTarget).find('input[type=text]').val();
        var newUser = new App.Models.User();
        newUser.set('firstname', newUserFirstName, {validate: true});
        this.collection.add(newUser);
    }
});

App.Views.ShowUser = Backbone.View.extend({
    initialize: function () {
        vent.on('showUser:show', this.show, this);
    },
    show: function (id) {
        var user = this.collection.get('id');
        var userView = new App.Views.ShowUser({model:user});
        $(document.body).append(userView.render().el);

        console.log('Покажем задачу с id ' + id);
    }
});

*/