<?php

use App\Http\Controllers\ItemQueryController;
use Illuminate\Support\Facades\Route;
Route::get('/uploadPage', function (){
    return view('uploadPage');
});
Route::get('/updatePage', function (){
    return view('updatepage');
});
Route::get('/deletePage', function (){
    return view('deletepage');
});
Route::get('/', [ItemQueryController::class,"itemsSelect"]);
Route::get('/insert', [ItemQueryController::class, "uploadItem"]);
Route::get('/update', [ItemQueryController::class, "updateItem"]);
Route::get('/delete', [ItemQueryController::class, "deleteItem"]);
