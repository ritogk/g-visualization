<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers;

Route::get('/lp/ja', [Controllers\LPController::class, 'show_ja'])->name('lp.ja');
Route::get('/lp/en', [Controllers\LPController::class, 'show_en'])->name('lp.en');

// spaのルートを「/」から「/app/*」に変えたのでリダイレクトを挟む。
Route::get('/', function () {
    return redirect('/app/index?lang=ja');
});

// spaのルーティング
Route::get('/app/{any}', function () {
    return view('app');
})->where('any', '.*');
