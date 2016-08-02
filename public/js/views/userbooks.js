eLibrary.Views.UserBooks = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#tpl-user-books').html()),

    events: {
        'click .return-book': 'onClickReturn'
    },

    initialize: function() {
        this.listenTo(this.model, 'remove', this.remove);
    },

    render: function() {
        var html = this.template(this.model.toJSON());
        this.$el.append(html);
        // TODO this view works after second push button ????
        return this;
    },

    onClickReturn: function(e) {
        e.preventDefault();
        var user_id = this.model.attributes.pivot.user_id;
        this.model.urlRoot = 'index.php/api/users/' + user_id + '/books';
        this.model.collection.remove(this.model);
        if (this.model.destroy()){
            alert('Returned succesfully');
        }
    }
});

