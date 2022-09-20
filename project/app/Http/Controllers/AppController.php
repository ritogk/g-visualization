<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AccessLog;
use \Illuminate\Support\Facades\App;

use App\Service\Log\LogService;

class AppController extends Controller
{
    /**
     * show
     *
     * @return void
     */
    public function show()
    {
        $log_service = new LogService();
        $log_service->update_access_log($_SERVER['REMOTE_ADDR']);
        return view('app');
    }
}
