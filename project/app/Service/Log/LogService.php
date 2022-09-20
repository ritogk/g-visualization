<?php

namespace App\Service\Log;

use App\Http\Controllers\Controller;
//use Illuminate\Support\Facades\Log;
use App\Models\AccessLog;
use App\Models\OperationLog;

/**
 * アンケートのサービスクラス
 */
class LogService extends Controller
{
    /**
     * アクセスログの更新を行います。
     *
     * @param string $ip
     * @return void
     */
    public function update_access_log(string $ip): void
    {
        $access_log = AccessLog::where('ip', $ip)->first();
        if ($access_log == null) {
            // ログ新規作成
            AccessLog::create(['ip' => $ip, 'access_cnt' => 1, 'last_accessed_at' => now()]);
        } else {
            // ログ更新
            $access_log->access_cnt = $access_log->access_cnt + 1;
            $access_log->last_accessed_at = now();
            $access_log->save();
        }
        return;
    }

    // 操作ログの更新を行います。
    public function update_operation_log(int $operation_cd): void
    {
        $operation_log = OperationLog::where('operation_cd', $operation_cd)->first();
        $operation_log->execution_cnt = $operation_log->execution_cnt + 1;
        $operation_log->save();
        return;
    }
}
