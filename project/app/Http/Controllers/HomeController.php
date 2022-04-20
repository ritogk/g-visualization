<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Model\Comparison;
use Illuminate\Support\Facades\Log;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $user_id = Auth::id();
        $comparsion_data = Comparison::where("user_id", "=", $user_id)
            ->orderBy('category')
            ->orderBy('video_type')
            ->get();
        $category_data = Comparison::select('category')
            ->where("user_id", "=", $user_id)
            ->groupBy('category')
            ->pluck('category', 'category')->toArray();
        return view('/home', ['comparsion_data' => $comparsion_data, 'category_data' => array_merge(['' => ''], $category_data)]);
    }

    // ツイートから飛んできた用
    public function tweat($id)
    {
        return view('/youyou');
        $comparsion_data = Comparison::find($id);
        // 非公開データ
        if ($comparsion_data->release_kbn == 1) {
            return view('/youyou');
        } else {
            return view('/youyou', ['comparsion_data' => $comparsion_data]);
        }
    }

    // 削除
    public function destroy($id)
    {
        $data = Comparison::find($id);
        $data->delete();
        return redirect('/home');
    }

    // 削除
    public function release_update($id)
    {
        $user_id = Auth::id();
        $data = Comparison::find($id);
        if ($user_id == $data->user_id) {
            $data->release_kbn = 2;
            $data->save();
        }
    }
}
