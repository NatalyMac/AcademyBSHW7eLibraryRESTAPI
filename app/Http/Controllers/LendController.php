<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;


class LendController extends Controller
{
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    public function index($user_id)
    {
        $chargedBooks = $this->users->getUserChargedBook($user_id);

        return response()->json($chargedBooks);
    }

    public function update($user_id, $book_id)
    {
        $charged_book = $this->users->setUserBook($user_id, $book_id);

        if ($charged_book)
            return response()->json($charged_book);
        else return  response()->json(['message'=>"This book ID".$book_id." has been charged "], 406);

    }

    public function destroy($user_id, $book_id)
    {
        $result = $this->users->unsetUserBook($user_id, $book_id);
        if ($result) return response()->json(['message'=>'Book ID'.$book_id.' is discharged'], 200);
           else return response()->json(['message'=>'Book ID'. $book_id. ' is not charged by user ID'.$user_id], 406);
    }
}
