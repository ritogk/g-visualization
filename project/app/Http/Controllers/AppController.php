<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AccessLog;
use \Illuminate\Support\Facades\App;

class AppController extends Controller
{
    public function show()
    {
        // ip取得
        $ip = $_SERVER['REMOTE_ADDR'];
        // アクセスログ取得
        $access_log = AccessLog::where('ip', $ip)->first();
        if ($access_log == null) {
            AccessLog::create(['ip' => $ip, 'access_cnt' => 0, 'last_accessed_at' => now()]);
        } else {
            // アクセスログ更新
            $access_log->access_cnt = $access_log->access_cnt + 1;
            $access_log->last_accessed_at = now();
            $access_log->save();
        }
        return view('app');
    }
}
