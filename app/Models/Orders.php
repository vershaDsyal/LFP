<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Orders extends Model
{
    use HasFactory;

    protected $fillable = ['id','customer_id', 'product_id', 'product_quantity', 'status'];

    /*public function user()
    {
        return $this->belongsTo(User::class,'customer_id',);
    }*/
}
