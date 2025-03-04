<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;

class ItemQueryController extends Controller
{
    function itemsSelect(){
        $items_list = DB::table("items")->get();
        return view("mainPage", ["items_list" => $items_list]);
    }
    function uploadItem(Request $request){
        $requestValidated = $request->validate([
            "name"=> "required",
            "category"=> "",
            "description"=> "",
            "price"=> "required",
        ]);
        DB::table("items")->insert($requestValidated);
        return redirect("/");
    }
    function updateItem(Request $request){
        $requestBefore = $request->validate([
            "Bname"=> "required",
            
        ]);
        $requestAfter = $request->validate([
            "name"=> "",
            "category"=> "",
            "description"=> "",
            "price"=> ""
        ]);
        DB::table("items")->where("name", "=" , $requestBefore["Bname"])->update($requestAfter);
    }
    function deleteItem(Request $request){

    }
}
