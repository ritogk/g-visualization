<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\Analyze
 *
 * @property int $id
 * @property int $access_youyou
 * @property int $access_locallocal
 * @property int $access_youlocal
 * @property int $multi_set
 * @property int $multi_reload
 * @property int $multi_read
 * @property int $multi_save
 * @property int $multi_play
 * @property int $multi_stop
 * @property int $multi_slow
 * @property int $multi_fast
 * @property int $multi_multiRelease
 * @property int $home_tweat
 * @property int $home_delete
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereAccessLocallocal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereAccessYoulocal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereAccessYouyou($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereHomeDelete($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereHomeTweat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereMultiFast($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereMultiMultiRelease($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereMultiPlay($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereMultiRead($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereMultiReload($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereMultiSave($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereMultiSet($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereMultiSlow($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereMultiStop($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Analyze whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Analyze extends Model{
    protected $guarded = ['id']; // ブラックリスト
}
