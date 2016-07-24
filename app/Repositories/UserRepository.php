<?php

namespace App\Repositories;

use App\User;
use App\Book;

class UserRepository extends AbstractRepository
{

    function model()
    {
        return 'App\User';
    }
    
    public function getUserChargedBook($user_id)
    {
        $user = User::findorFail($user_id);
            return $user->books()->wherePivot('date_getin_fact', null)->get();
    }

    public function setUserBook($user_id, $book_id)
    {
        $user = User::findorFail($user_id);
        $book = Book::findorFail($book_id);

        if (!$book->is_charged)
        {
            $user->books()->attach($book_id, 
                  ['date_getin_plan' => date('Y:m:d H:m:s', (time() + 60000))]);
            
            $book->setBookCharged();
            
            return $user->books()->wherePivot('book_id', $book_id)
                        ->wherePivot('date_getin_fact', null)->get();
            
        } else return null;
    }

    public function unsetUserBook($user_id, $book_id)
    {
        $user = User::findorFail($user_id);
        $book = Book::findorFail($book_id);
        $result = 0;

        if ($book->isCharged())
           $result = $user->books()->wherePivot('date_getin_fact', null)
                          ->wherePivot('book_id', $book_id)
                          ->updateExistingPivot($book_id,
                                       ['date_getin_fact'=> date('Y:m:d H:m:s', (time()))]);

        if ($result) 
            $book->setBookDisCharged();
        
        return $result;
    }
    
    public function getUserBookHistory($user_id)
    {
        $user = User::findorFail($user_id);
        return $user->books;
    }

    public function isBookHolder($user_id)
    {
        $user = User::findorFail($user_id);
        return $user->books()->wherePivot('date_getin_fact', null)->get();
    }

    public function getCreateRules()
    {
        return User::getCreateRules();
    }

    public function getUpdateRules()
    {
        return User::getUpdateRules();
    }
}
