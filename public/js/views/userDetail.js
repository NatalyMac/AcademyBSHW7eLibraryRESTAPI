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
        //this.$el.append(chargeView.render().$el);
        $('.charge-container').html(chargeView.render().$el);

        chargeView.on('form:submitted', function (attrs) {
            console.log('test');
            console.log(attrs);
            //TODO rest request
            chargeView.remove();
        });
    },
    
    render: function() {

        var html = this.template(this.model.toJSON());

        this.$el.append(html);

        this.model.books.fetch().then(function(books){
            var collbooks = new eLibrary.Collections.Books(new eLibrary.Models.Book);
            collbooks.set(books);
            var userBooksView = new eLibrary.Views.UserBooks({collection : collbooks});
            $('.detail-container').html(userBooksView.render().$el);
        });return this;
    }
});
