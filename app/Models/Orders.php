<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;

     protected $fillable = ['id','customer_id', 'product_id', 'product_quantity', 'status'];
}
