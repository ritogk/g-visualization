<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnalyzesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('analyzes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('access_youyou')->default(0);
            $table->bigInteger('access_locallocal')->default(0);
            $table->bigInteger('access_youlocal')->default(0);
            $table->bigInteger('multi_set')->default(0);
            $table->bigInteger('multi_reload')->default(0);
            $table->bigInteger('multi_read')->default(0);
            $table->bigInteger('multi_save')->default(0);
            $table->bigInteger('multi_play')->default(0);
            $table->bigInteger('multi_stop')->default(0);
            $table->bigInteger('multi_slow')->default(0);
            $table->bigInteger('multi_fast')->default(0);
            $table->bigInteger('multi_multiRelease')->default(0);
            $table->bigInteger('home_tweat')->default(0);
            $table->bigInteger('home_delete')->default(0);
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
        Schema::dropIfExists('analyzes');
    }
}
