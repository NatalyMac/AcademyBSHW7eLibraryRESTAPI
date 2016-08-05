
    window.eLibrary =
  {
    Models: {},
    Collections: {},
    Views: {},
    Router: {},
    Controllers :{},


    start: function()
    {

        Backbone.View.prototype.close = function () {
            console.log('Closing view ' + this);
            if (this.beforeClose) {
                this.beforeClose();
            }
            this.remove();
            this.unbind();
        };


        user = new eLibrary.Models.User();
        users = new eLibrary.Collections.Users({model:user});
        users.fetch();

        book = new eLibrary.Models.Book();
        books = new eLibrary.Collections.Books({model:book});
        books.fetch();
        
        router = new eLibrary.Router();

        Backbone.history.start();
    }
}

