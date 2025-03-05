<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\itemModel;

class ItemQueryController extends Controller
{
    function itemsSelect(Request $request){
        $requestValidated = $request->validate([
            "name"=> "",
            "category"=> "",
            "description"=> "",
            "price"=> "",
        ]);
        $requestValidated = itemModel::RemoveZeroElements($requestValidated);
        $items_list = DB::table("items")->where($requestValidated)->get();
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
            "Bname"=> "required|string",
        ]);
        $requestAfter = $request->validate([
            "name"=> "",
            "category"=> "",
            "description"=> "",
            "price"=> ""
        ]);
        if (count(($requestAfter = itemModel::RemoveZeroElements($requestAfter))) == 0 ){
            return redirect("/");
        }
         
        DB::table("items")->where("name", "=" , $requestBefore["Bname"])->update($requestAfter);
        return redirect("/");
    }
    function deleteItem(Request $request){
        $requestBefore = $request->validate([
            "name"=> "required"
        ]);
        DB::table("items")->where("name","=", $requestBefore["name"])->delete();
        return redirect("/");
    }
}
