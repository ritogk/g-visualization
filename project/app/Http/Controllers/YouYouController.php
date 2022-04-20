<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Libs\Model\TwitterCard;
use App\Model\Comparison;
use Auth;

class YouYouController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('/youyou', [
            'read_data' => $this->read_disp_data(), 'save_data' => $this->save_data()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = new Comparison;
        $comparison = $data->create($request->all());
        return redirect(route('youyou.read', ['id' => $comparison->id]));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Comparison::find($id);
        $data->delete();
        return redirect('/youyou');
    }

    /**
     * ツイートから遷移してきた場合の処理
     *
     * @param Request $request
     * @return void
     */
    public function tweat(Request $request)
    {
        $comparsion_data = Comparison::find($request->id);

        // 「非公開」又は存在しないidの場合は初期ページを表示
        if (empty($comparsion_data) || $comparsion_data->release_kbn == 1) {
            return $this->index();
        }


        if ($comparsion_data->release_kbn == 1) {
            return view('/youyou', ['read_data' => $this->read_disp_data(), 'save_data' => $this->save_data()]);
        } else {
            return view('/youyou', ['read_data' => $this->read_disp_data(), 'save_data' => $this->save_data(), 'comparsion_data' => $comparsion_data]);
        }
    }

    // 読み込み用
    public function read($id)
    {
        $comparsion_data = Comparison::find($id);
        $user_id = Auth::id();

        // 登録したユーザーと違う場合は、トップページへ飛ぶ
        if ($user_id != $comparsion_data->user_id) {
            return view('/youyou', ['read_data' => $this->read_disp_data(), 'save_data' => $this->save_data()]);
        } else {
            return view('/youyou', ['read_data' => $this->read_disp_data(), 'save_data' => $this->save_data(), 'comparsion_data' => $comparsion_data]);
        }
    }

    // 画面の表示で使用するデータ
    public function read_disp_data()
    {
        $twitterCardModel = new TwitterCard(
            'RunCheck(ここをクリックで再生!!)',
            '完全無料',
            config('app.url') . \Storage::url('site/icon.png')
        );
        return [
            'twitter_card' => $twitterCardModel->get_object(),
            'select2_comparison_data' => Comparison::getSelect2Data(Auth::id(), 1)
        ];
    }

    // 保存データ
    public function save_data()
    {
        return Comparison::select('category')
            ->where("user_id", "=", Auth::id())
            ->groupBy('category')
            ->pluck('category', 'category');
    }

    // １件取得(ajax用)
    public function find_comparsion($id)
    {
        return Comparison::where("id", "=", $id)->first();
    }
}
