<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class itemModel extends Model
{
    public static function RemoveZeroElements ($elem){
        foreach($elem as $key => $value){
            if ($elem[$key] == ""){
                unset($elem[$key]);
            } 
        }
        return $elem;
    }

}
