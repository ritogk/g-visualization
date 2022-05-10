<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers;

Route::get('/ja/lp', [Controllers\LPController::class, 'show_ja'])->name('ja.lp');
Route::get('/en/lp', [Controllers\LPController::class, 'show_en'])->name('en.lp');


// spaのルートを「/」から「/app/*」に変えたのでリダイレクトを挟む。
Route::get('/', function () {
    return redirect('/app/g-analys');
});

// spaのルーティング
Route::get('/app/{any}', function () {
    return view('app');
})->where('any', '.*');
