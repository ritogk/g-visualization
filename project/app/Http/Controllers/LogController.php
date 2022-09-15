<?php

namespace App\Http\Controllers;

use App\Http\Requests\OperatinoLogRequest;

use App\Models\OperationLog;

class LogController extends Controller
{
    // 操作ログ更新
    public function operation(OperatinoLogRequest $request)
    {
        $operation_log = OperationLog::where('operation_cd', $request->operation_cd)->first();
        $operation_log->execution_cnt = $operation_log->execution_cnt + 1;
        $operation_log->save();
        return $operation_log;
    }
}
