<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// 操作ログ送信
Route::post('/log/operation', [Controllers\LogController::class, 'operation']);

// 特定のアンケートの状態を取得
Route::get('/questionnaires/{questionnaire_type}/status', [Controllers\QuestionnaireController::class, 'questionnaire_status']);
