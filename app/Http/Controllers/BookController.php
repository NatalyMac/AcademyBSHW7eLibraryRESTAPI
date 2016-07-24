<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

use App\Http\Requests;
use App\Repositories\BookRepository;


class BookController extends Controller
{

    protected $books;


    public function __construct(BookRepository $books)
    {
        $this->books = $books;
    }

    public function index()
    {
        $books = $this->books->paginate(15);
        return response()->json($books);
    }

    public function show($id)
    {
        $book = $this->books->get($id);
        return response()->json($book);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->books->getRules());

        if ($validator->fails())
            return response()->json($validator->messages(), 406);

        $book = $this->books->add($request->all());
            return response()->json($book, 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), $this->books->getRules());

        if ($validator->fails())
            return response()->json($validator->messages(), 406);

        if ($this->books->update($request->all(), 'id', $id))
            return response()->json($this->books->get($id));
    }

    public function destroy($id)
    {
        if ($this->books->isCharged($id))
            return response()->json(['message' => 'Can not delete. Book ID' . $id . ' is charged'], 406);
        else  {
             $this->books->delete($id);
             return response()->json(['message' => 'Record deleted'], 204);
        }
    }

}
