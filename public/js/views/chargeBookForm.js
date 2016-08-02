eLibrary.Views.ChargeBookForm = Backbone.View.extend({

    template: _.template($ ('#tpl-new-charge').html() ),

    events: {
        'submit .contract-form': 'onFormSubmit'
    },

    render: function() {

        var html = this.template(this.model.toJSON());
        this.$el.append(html);
        
        var books = new eLibrary.Collections.Books();

        books.fetch();
        //TODO collection is empty???

        books.each(this.renderOneBook, this);
        return this;
    },

    onFormSubmit: function(e) {
        e.preventDefault();

        this.trigger('form:submitted', {
            book_id: this.$('.book-id-input').val()
        });
    },

    renderOneBook: function(book) {
        console.log('select');
        var itemView = new eLibrary.Views.UserBooks({model: book, tagName: 'option value='});
        this.$('.select-book').append(itemView.render().$el);
    }

});
