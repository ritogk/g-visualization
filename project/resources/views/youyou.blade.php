@extends('layouts.app')

@section('twitterCard')
    <meta name="twitter:card" content="{{$read_data['twitter_card']->card}}" />
    <meta name="twitter:domain" content="{{$read_data['twitter_card']->domain}}" />
    <meta name="twitter:title" content="{{$read_data['twitter_card']->title}}" />
    <meta name="twitter:description" content="{{$read_data['twitter_card']->description}}" />
    <meta name="twitter:image" content="{{$read_data['twitter_card']->image}}" />
@endsection

@section('content')
     <div class="title">傾けるといい感じに音がなるやつ</div>
     <button id="sensorrequest" onclick="ClickRequestDeviceSensor()">ジャイロセンサーを有効にする</button><br>
     x<input id="g_x" disabled><br>
     y<input id="g_y" disabled><br>
     z<input id="g_z" disabled><br>

     <button id="sensorrequest" onclick="ClickDeviceMotionSensor()">加速度センサーを有効にする</button><br>
     x<input id="kasokudo_x" disabled><br>
     y<input id="kasokudo_y" disabled><br>
     z<input id="kasokudo_z" disabled><br>

     <canvas id="canvas" width="" height=""></canvas>
@endsection

@section('childScripts')
    <script src="{{ mix('js/zyairo.js') }}" defer></script>
@endsection

@section('childCss')
    <link href="{{ mix('css/video.css') }}" rel="stylesheet">
@endsection