<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionnaireAnswers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questionnaire_answers', function (Blueprint $table) {
            $table->id();
            $table->integer('questionnaire_type')->comment('アンケート種別');
            $table->string('sub_key')->comment('※ipかuser_idが入る想定');
            $table->boolean('is_canceled')->comment('回答キャンセルフラグ');
            $table->json('json_answer')->nullable()->comment('回答 ※json');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questionnaire_answers');
    }
}
