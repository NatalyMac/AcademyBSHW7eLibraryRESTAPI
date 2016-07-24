<?php
namespace App\Repositories;

use App\Book;

class BookRepository extends AbstractRepository
{
    function model()
    {
        return 'App\Book';
    }

    public function isCharged($id)
    {
        $book = Book::findOrFail($id);
        return $book->isCharged();
    }


    public function getRules()
    {
        return Book::getRules();
    }
}
