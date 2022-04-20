<?php

namespace App\Http\Controllers\Ajax;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Analyze;
use Illuminate\Support\Facades\Log;

class AnalysisController extends Controller{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(){
        //$this->middleware('auth');
    }

    public function set(){
        Analyze::where('id', 1)->increment('multi_set');
    }
    public function reload(){
        Analyze::where('id', 1)->increment('multi_reload');
    }
    public function read(){
        Analyze::where('id', 1)->increment('multi_read');
    }
    public function save(){
        Analyze::where('id', 1)->increment('multi_save');
    }
    public function play(){
        Analyze::where('id', 1)->increment('multi_play');
    }
    public function stop(){
        Analyze::where('id', 1)->increment('multi_stop');
    }
    public function slow(){
        Analyze::where('id', 1)->increment('multi_slow');
    }
    public function fast(){
        Analyze::where('id', 1)->increment('multi_fast');
    }
    public function multiRelease(){
        Analyze::where('id', 1)->increment('multi_multiRelease');
    }
    public function tweat(){
        Analyze::where('id', 1)->increment('home_tweat');
    }
    public function delete(){
        Analyze::where('id', 1)->increment('home_delete');
    }
    
    public function access_youyou(){
        Analyze::where('id', 1)->increment('access_youyou');
    }
    public function access_locallocal(){
        Analyze::where('id', 1)->increment('access_locallocal');
    }
    public function access_youlocal(){
        Analyze::where('id', 1)->increment('access_youlocal');
    }
}
