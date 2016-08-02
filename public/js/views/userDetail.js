eLibrary.Views.UserDetail = Backbone.View.extend({
    tagName: 'div',
    
    template: _.template($('#tpl-user-detail').html()),

    events: {
        'click .charge-book': 'onClickChargeBook'
    },


    initialize: function() {
        this.model.books.on('add', this.renderOne, this );

    },

    onClickChargeBook: function(e) {
        e.preventDefault();

        var chargeView = new eLibrary.Views.ChargeBookForm({model: this.model});
       
        this.$el.append(chargeView.render().$el);

        chargeView.on('form:submitted', function (attrs) {
            console.log('test');
            //TODO rest request
            chargeView.remove();
        });
    },
    
    render: function() {

        var html = this.template(this.model.toJSON());

        this.$el.append(html);

        this.model.books.fetch();
        console.log(this.model.books);

        this.model.books.each(this.renderOneBook, this);

        return this;
    },


    renderOneBook: function(book) {
        var itemView = new eLibrary.Views.UserBooks({model: book});
        this.$('.users-book-container').append(itemView.render().$el);
    }

});
