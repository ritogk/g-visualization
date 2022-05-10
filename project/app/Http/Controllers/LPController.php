<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use \Illuminate\Support\Facades\App;

class LPController extends Controller
{
    public function show_ja()
    {
        App::setLocale('ja');
        return view('lp');
    }

    public function show_en()
    {
        App::setLocale('en');
        return view('lp');
    }
}
