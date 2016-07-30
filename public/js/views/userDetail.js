eLibrary.Views.UserDetail = Backbone.View.extend({
    tagName: 'div',
    
    template: _.template($('#tpl-user-detail').html()),

    render: function() {
        //var html = this.template(this.model.toJSON());

        var html = this.template(_.extend(this.model.toJSON(), {
            books: this.model.books
        }));

        this.$el.append(html);
        return this;
    }
});
