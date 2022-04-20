<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\Comparison
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $title
 * @property string|null $memo
 * @property string $category
 * @property string $video1_url
 * @property float $video1_time_st
 * @property string $video2_url
 * @property float $video2_time_st
 * @property int $release_kbn
 * @property int $video_type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comparison newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comparison newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comparison query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comparison whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comparison whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comparison whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comparison whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comparison whereMemo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comparison whereReleaseKbn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comparison whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comparison whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comparison whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comparison whereVideo1TimeSt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comparison whereVideo1Url($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comparison whereVideo2TimeSt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comparison whereVideo2Url($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comparison whereVideoType($value)
 * @mixin \Eloquent
 */
class Comparison extends Model
{
    protected $guarded = ['id']; // ブラックリスト

    // select2用データ
    public static function getSelect2Data($user_id, $video_type)
    {
        $data = array();
        $category = Comparison::select('category')
            ->where("user_id", "=", $user_id)
            ->where("video_type", "=", $video_type)
            ->groupBy('category')
            ->pluck('category');
        $data += array("" => ""); // 先頭に空白のoptionがないとプレースホルダが表示されない。
        foreach ($category as $key => $category_value) {
            $comparison = Comparison::where("category", "=", $category_value)
                ->where("user_id", "=", $user_id)
                ->where("video_type", "=", $video_type)
                ->pluck('title', 'id');
            $data += array($category_value => $comparison);
        }
        return $data;
    }

    // home用データ
    public static function categorySelDataGet($user_id)
    {
        $data = array();
        $category = Comparison::select('category')
            ->where("user_id", "=", $user_id)
            ->groupBy('category')
            ->pluck('category');
        return $data;
    }
}
