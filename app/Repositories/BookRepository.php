<?php
namespace App\Repositories;

use App\User;
use DB;
use App\Book;


class BookRepository
{
    /**
     * Get all of the tasks for a given user.
     *
     * @param  User  $user
     * @return Builder;
     */
    public function indexBooks()
    {
        $books = Book::select();

        return $books;


    }


    public function indexForUser(User $user)
    {
        if ($user->isReader())
            $books = DB::table('books')
                ->leftJoin('lends', function ($join){
                    $join->on('books.id', '=', 'lends.book_id')->whereNull('lends.date_getin_fact');})
                ->select('books.id','books.genre', 'books.title', 'books.author', 'books.year', 'lends.created_at',
                    'lends.date_getin_fact')
                ->where('lends.user_id','=', $user->id);

        if ($user->isAdmin())
             $books = DB::table('books')
                 ->leftJoin('lends', function ($join){
                            $join->on('books.id', '=', 'lends.book_id')->whereNull('lends.date_getin_fact');})
                 ->leftJoin('users', 'users.id', '=', 'lends.user_id')
                 ->select('books.*', 'users.firstname', 'users.lastname');

        return $books;


    }
    
    
}
