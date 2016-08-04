eLibrary.Controllers.Books = Backbone.Router.extend({

    showBooks :function() {
        var booksView = new eLibrary.Views.Books({
            collection: books
        });
        console.log('show');
        booksView.render();
        $('.main-container').html(booksView.render().$el);
    },

    newBook :function() {
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
    },

    editBook :function(id) {
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
    }

});

