eLibrary.Controllers.Users = Backbone.Router.extend({

    showUsers: function () {
        var usersView = new eLibrary.Views.Users({
            collection: users
        });
        usersView.render();
        $('.main-container').html(usersView.render().$el);
    },

    newUser :function() {
        var newUserForm = new eLibrary.Views.UserForm({
            model: new eLibrary.Models.User()
        });
        console.log(newUserForm);

        newUserForm.on('form:submitted', function (attrs) {
            console.log(attrs);

            var user = new eLibrary.Models.User();
            user.set(attrs);

            if (user.isValid()) {
                users.create(attrs);
                alert('Added succesfully');
                router.navigate('users', true);

            } else {
                alert(user.validationError);

            }
        });
        $('.main-container').html(newUserForm.render().$el);
    },

    editUser : function(id) {
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
    },
    
    userDetail :function(id) {
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
    }
});
