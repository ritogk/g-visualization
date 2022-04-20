<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComparisonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comparisons', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->Integer('user_id');
            $table->string('title')->nullable();
            $table->string('memo')->nullable();
            $table->string('category');
            $table->string('video1_url');
            $table->float('video1_time_st', 16, 8);
            $table->string('video2_url');
            $table->float('video2_time_st', 16, 8);
            $table->Integer('release_kbn');
            $table->Integer('video_type');
            $table->timestamps();
            $table->softDeletes()->index();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comparisons');
    }
}
