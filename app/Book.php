<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Book extends Model
{

    protected $fillable = ['genre', 'title', 'author', 'year',];

    
    protected $rules = ['genre'  => 'required|alpha',
                        'author' => 'required|alpha',
                         'title'  => 'required',
                         'year'   => 'required|numeric',];
        
    
    public function users()
    {
        return $this->belongsToMany('App\User', 'lends')>withPivot('date_getin_plan','date_getin_fact')
            ->withTimestamps();
    }
    
    public function isCharged()
    {
        return $this->is_charged;
    }

    public function setBookCharged()
    {
        $this->is_charged = true;
        $this->save();
    }

    public function setBookDisCharged()
    {
        $this->is_charged = false;
        $this->save();
    }
    
    public static function getRules()
    {
        $_this = new self;
        return $_this->rules;
    }


}
