<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Redirect, Session};
use Validator;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Repositories\BookRepository;
use App\Book;


class BookController extends Controller
{
    protected $books;

    /**
     * BookController constructor.
     * @param BookRepository $books
     */
    public function __construct(BookRepository $books)
    {
        $this->books = $books;
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        $books = $this->books->indexBooks()->paginate(10);
        return response()->json($books);
    }


    /**
     * @param Request $request
     * @return mixed
     */
    public function store(Request $request)
    {
        $rules = ['genre'  => 'required|alpha',
                  'author' => 'required|alpha',
                  'title'  => 'required',
                  'year'   => 'required|numeric',];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails())
            return response()->json($validator->messages(), 406);

        $book = new Book();
        $book->genre = $request->get('genre');
        $book->title = $request->get('title');
        $book->author = $request->get('author');
        $book->year = $request->get('year');
        $book->save();

        return response()->json($book, 201);

    }

    /**
     * @param $id
     * @return mixed
     */
    public function show($id)
    {
        $user = null;
        $book = Book::findOrFail($id);
        return response()->json($book);
    }


    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function update(Request $request, $id)
    {
        $book = Book::findOrFail($id);

        $rules = ['genre'  => 'required|alpha',
                  'author' => 'required|alpha',
                  'title'  => 'required',
                  'year'   => 'required|numeric',];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails())
            return response()->json($validator->messages(), 406);

        $book->genre = $request->genre;
        $book->title = $request->title;
        $book->author = $request->author;
        $book->year = $request->year;

        $book->save();

        return response()->json($book);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function destroy($id)
    {
        $book = Book::findOrFail($id);

        $book->delete();
        return response()->json(['message'=>'Record deleted'], 204);
    }

}
