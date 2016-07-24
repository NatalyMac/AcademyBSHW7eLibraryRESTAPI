<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Redirect, Session};

use App\Http\Requests;
use App\{Book, User, Lend};
use App\Repositories\UserRepository;


class LendController extends Controller
{
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    /**
     * @param $book_id
     * @return mixed
     */
    
    public function index(Request $request, $user_id)
    {
        $chargedBooks = $this->users->getUserChargedBook($user_id);

        return response()->json($chargedBooks);
    }

    /*

    public function show(Request $request, $id1, $id2)
    {
        return $id2;
    }
    
    public function create($book_id)
    {
        $lend = new Lend();

       // $this->authorize('create', $lend);

        $readers = User::getReaders();
        $book = Book::find($book_id);

        return view('lend/create', ['book'=>$book, 'readers'=>$readers]);
    }

    /**
     * @param Request $request
     * @return mixed
     */

    public function store(Request $request)
    {
        $book = Book::find($request->book_id);

        if (!$book->is_charged) {

            $lend = new Lend();
            $lend->user_id = $request->reader;
            $lend->book_id = $request->book_id;
            $lend->date_getin_plan = date('Y:m:d H:m:s', (time() + 60000));

           // $this->authorize('store', $lend);

            $lend->save();

            $book->is_charged = true;
            $book->save();

            Session::flash('message', 'Successfully charged '. $book->title);

            return (Redirect::to('books'));

        } else {

            Session::flash('message', 'This books has been charged');

            return (Redirect::to('books'));
        }
    }
    
    /**
     * @param Request $request
     * @return mixed
     */
    public function update(Request $request, $user_id, $book_id)
    {
        $charged_book = $this->users->setUserBook($user_id, $book_id);

        if ($charged_book)
            return response()->json($charged_book);
        else return  response()->json(['message'=>"This book ID".$book_id." has been charged "], 406);

    }

    public function destroy(Request $request, $user_id, $book_id)
    {
        $result = $this->users->unsetUserBook($user_id, $book_id);

        if ($result) return response()->json(['message'=>'Book is discharged'], 200);
           else return response()->json(['message'=>'Book is not charged'], 406);
    }
}
