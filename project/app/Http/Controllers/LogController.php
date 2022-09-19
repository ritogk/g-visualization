<?php

namespace App\Http\Controllers;

use App\Http\Requests\OperatinoLogRequest;
use App\Models\OperationLog;
use Illuminate\Http\Response;
//use Illuminate\Support\Facades\Log;

// openapi
use App\OpenAPI;
//use App\Libs\OpenAPIUtility;

class LogController extends Controller
{
    // 操作ログ更新
    public function operation(OperatinoLogRequest $request)
    {
        $request_body = new OpenAPI\Model\RequestOperationLog($request->all());
        $operation_log = OperationLog::where('operation_cd', $request_body->getOperationCd())->first();
        $operation_log->execution_cnt = $operation_log->execution_cnt + 1;
        $operation_log->save();
        return response()->json(
            [],
            Response::HTTP_OK
        );
    }
}
