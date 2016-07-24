<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;


class Book extends Model
{
   // public function lends()
   // {
   //     return $this->hasMany('App\Lend');
   // }


    public function users()
    {
        return $this->belongsToMany('App\User', 'lends')>withPivot('date_getin_plan','date_getin_fact')
            ->withTimestamps();
    }


    public function isCharged()
    {
        return $this->is_charged;
        //lends()->whereNull('date_getin_fact')->first();
    }

    public function isChargedByUser($user)
    {
        return $user->id === $this->lends()->whereNull('date_getin_fact')->first()->user()->first()->id;
    }

    public function getBookHolder()
    {
        return $this->lends()->whereNull('date_getin_fact')->first()->user()->first();
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
}
