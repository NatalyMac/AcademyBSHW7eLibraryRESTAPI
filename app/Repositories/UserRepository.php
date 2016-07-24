<?php

namespace App\Repositories;

use App\User;
use App\Lend;
use App\Book;
use DB;


class UserRepository
{
    /**
     * Get all of the tasks for a given user.
     *
     * @param  User  $user
     * @return Builder;
     */
    public function all()
    {
        $users = User::select();

        return $users;
    }

    public function get()
    {
        $users = User::select();

        return $users;
    }

    public function create(array $data){}

    public function update(array $data){}

    public function delete($id){}


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
            $user->books()->attach($book_id, ['date_getin_plan' => date('Y:m:d H:m:s', (time() + 60000))]);
            
            $book->setBookCharged();
            
            return $user->books()->wherePivot('book_id', $book_id)->get();
            
        } else return null;
    }


    public function unsetUserBook($user_id, $book_id)
    {
        $user = User::findorFail($user_id);
        $book = Book::findorFail($book_id);
        $result = 0;

        if ($book->isCharged())
           $result = $user->books()->wherePivot('date_getin_fact', null)
            ->updateExistingPivot($book_id,['date_getin_fact'=> date('Y:m:d H:m:s', (time()))]);

        if ($result) $book->setBookDisCharged();
        
        return $result;
        
    }


    public function getUserBookHistory($user_id)
    {
        $user = User::find($user_id);
        return $user->books;
    }


    public function allForUserRole(User $user)
    {
        if ($user->isReader())
            $users = DB::table('users')
                ->leftJoin('lends', function ($join){
                    $join->on('users.id', '=', 'lends.user_id')->whereNull('lends.date_getin_fact');
                  })
                ->select(DB::raw('users.*, count(lends.book_id) as book_count'))
                  ->where('users.id','=', $user->id);

        if ($user->isAdmin())
             $users = DB::table('users')
                 ->leftJoin('lends', function ($join){
                     $join->on('users.id', '=', 'lends.user_id')->whereNull('lends.date_getin_fact');
                 })
                 ->select(DB::raw('users.id, users.firstname, users.lastname, users.email, count(lends.book_id) as book_count'))
                 ->groupBy('users.id');

        return $users;
    }

}
