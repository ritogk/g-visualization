<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Mail;

class ContactsController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('/contacts');
    }

    // メール送信
    public function send(Request $request)
    {
        $text = "【お問い合わせ内容】" . "\n" . $request->hope . "\n" . "【メールアドレス】" . "\n" . $request->email;
        Mail::raw($text, function ($message) {
            $message->to(config('mail.from.address'))
                ->subject('【要望】');
        });
        return view('/contacts_complete');
    }
}
