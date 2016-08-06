eLibrary.Collections.Books = Backbone.Collection.extend({

    model: eLibrary.Models.Book,

    url: 'index.php/api/books'});