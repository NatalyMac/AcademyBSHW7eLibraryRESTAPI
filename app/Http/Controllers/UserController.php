<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\{Redirect, Session};

use Validator;

use App\Repositories\UserRepository;
use App\Http\Requests;
use App\User;


class UserController extends Controller
{
    protected $users;

    /**
     * UserController constructor.
     * @param UserRepository $users
     */
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        $users = $this->users->all()->paginate(10);

        return response()->json($users);
    }


    /**
     * @param Request $request
     * @return mixed
     */
    public function store(Request $request)
    {
        
        $rules = ['firstname' => 'required|alpha',
            'lastname'  => 'required|alpha',
            'email'     => 'required|email|unique:users',
            'password'  => 'required',
            'role'      => 'required'];


        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails())
            return response()->json($validator->messages(), 406);
       
        $user = new User();
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->email = $request->email;
        $user->password =  bcrypt($request->password);
        $user->role = $request->role;

        $user->save();

        return response()->json($user, 201);
    }

    /**
     * @param $id
     * @param Request $request
     * @return mixed
     */
   
    public function show($id)
    {
        $user = User::findOrFail($id);

        return response()->json($user);
    }


    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);


        $rules = ['firstname' => 'required|alpha',
                  'lastname'  => 'required|alpha',
                  'email'     => 'required|email'];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails())
            return response()->json($validator->messages(), 406);

        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->email = $request->email;
        $user->role = $request->role;

        $user->save();

        return response()->json($user);
    }

    /**
     * @param $id
     * @return mixed
     */
    
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message'=>'Record deleted'], 204);
    }
}
