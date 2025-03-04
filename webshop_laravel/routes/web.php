<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemQueryController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/uploadPage', function (){
    return view('uploadPage');
});
Route::get('/updatePage', function (){
    return view('updatepage');
});
Route::get('/', [ItemQueryController::class,"itemsSelect"]);
Route::get('/insert', [ItemQueryController::class, "uploadItem"]);
Route::get('/update', [ItemQueryController::class, "updateItem"]);
Route::get('/delete', [ItemQueryController::class, "deleteItem"]);

