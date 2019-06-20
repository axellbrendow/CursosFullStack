<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Balance;
use App\Models\Historic;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'image',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function balance()
    {
        // define 1 to 1 relation between User and Balance
        return $this->hasOne(Balance::class);
    }
    
    public function historics()
    {
        // define 1 to N relation between User and Historics
        return $this->hasMany(Historic::class);
    }
    
    public function getReceiver($receiver_info)
    {
        // as porcentagens '%' no operator LIKE servem como caractere curinga
        return $this->where('name', 'LIKE', "%$receiver_info%")
            ->orWhere('email', $receiver_info)
            ->get()
            ->first();
    }
}
