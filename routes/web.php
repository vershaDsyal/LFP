<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::resource('orders',App\Http\Controllers\OrdersController::class);

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/show-orders', [App\Http\Controllers\OrdersController::class, 'showOrders'])->name('showOrders');
Route::get('/orders/{order}', [App\Http\Controllers\OrdersController::class, 'show'])->name('show');
Route::get('/show-users', [App\Http\Controllers\UsersController::class, 'showUsers'])->name('showUsers');
Route::get('/user', [App\Http\Controllers\UsersController::class, 'user']);


