<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestionResult extends Model
{

    protected $guarded = ['id']; // ブラックリスト

    // リレーション
    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
