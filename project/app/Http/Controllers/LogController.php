<?php

namespace App\Http\Controllers;

use App\Http\Requests\OperatinoLogRequest;
use App\Models\OperationLog;
use Illuminate\Http\Response;
use App\Service\Log\LogService;

// openapi
use App\OpenAPI;

class LogController extends Controller
{
    // 操作ログ更新
    public function operation(OperatinoLogRequest $request)
    {
        $request_body = new OpenAPI\Model\RequestOperationLog($request->all());
        $log_service = new LogService();
        $log_service->update_operation_log((int)$request_body->getOperationCd());
        return response()->json(
            [],
            Response::HTTP_CREATED
        );
    }
}
