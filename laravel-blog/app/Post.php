<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;
use App\User;

class Post extends Model
{
    public function user() {
        return $this->belongsTo('App\User');
    }
    public function comments() {
        return $this->hasMany('App\Comment');
    }
    public function postLikes()
    {
        return $this->belongsToMany('App\User');
    }
    public function newPost($request)
    {
        $user = Auth::User();
        $this->content = $request->content;
        $this->photo = $request->photo;
        $this->user_id = $user->id;
		$this->save();
    }
    public function updateContent($request)
    {
        if($reques->content)
        {
            $this->content = $request->content;
        }
        if($request->photo)
        {
            $this->photo = $request->photo;
        }
        $this->save();
    }
}
