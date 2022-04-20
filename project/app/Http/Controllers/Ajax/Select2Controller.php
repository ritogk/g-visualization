<?php

namespace App\Http\Controllers\Ajax;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Comparison;
use Illuminate\Support\Facades\Log;

class Select2Controller extends Controller{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(){
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function select2_comparison($id){
        $list = Comparison::find($id)->pluck('title', 'id');
        Log::debug(json_encode($list));
        return json_encode($list);
    }
}
