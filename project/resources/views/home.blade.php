@extends('layouts.app')

@section('content')
<div class="title">マイページ</div>
<div class="container py-2">
    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
    @endif
    
    <div class="py-2">
        <div class="form-inline">
            <div>比較対象：</div>
            {{ Form::select('serach_video_type', ['' => '', '1' => 'Youtube - Yutube', '2' => 'Local - Local', '3' => 'Youtube - Local',], '', ['class' => 'form-control', 'id' => 'serach_video_type', 'style' => 'width:100%']) }}
        </div>
        <div class="form-inline">
            <div>タグ：</div>
            {{ Form::select('serach_category', $category_data, '', ['class' => 'form-control', 'id' => 'serach_category', 'style' => 'width:100%']) }}
        </div>
    </div>
    @foreach ($comparsion_data as $record)
        <div class="card comparison_group shadow my-2" style="width:100%;">
            <div class="card-body">
                @if ($record->video_type == 1)
                <h5 class="card-title font-weight-bold"><a href="{{ route('youyou.read', [$record->id]) }}">{{ $record->title }}</a></h5>
                @elseif ($record->video_type == 2)
                <h5 class="card-title font-weight-bold"><a href="{{ route('locallocal.read', [$record->id]) }}">{{ $record->title }}</a></h5>
                @elseif ($record->video_type == 3)
                <h5 class="card-title font-weight-bold"><a href="{{ route('youlocal.read', [$record->id]) }}">{{ $record->title }}</a></h5>
                @endif
                <h6 class="card-subtitle">{{ $record->memo }}</h6>
                <h6 class="pt-1"><?= $record->category. '['. getVideoTypeNm($record->video_type). ']' ?></h6>

                <button type="button" id="home_tweat"class="btn btn-info" onclick="btnClick_ReadTweat({{ $record->id }}, '{{ $record->title }}')" style="color:#fff" {{ $record->video_type == 1 ?: 'hidden'}}>ツイート</button>
                <button type="button" id="home_delete" class="btn btn-danger" onclick="if(deleteConfirm('{{ $record->title }}')) btnClick_ReadDelete({{ $record->id }})">削除</button>
                <!-- 絞り込み検索用 -->
                <input type="hidden" class="video_type_value" value="{{ $record->video_type }}">
                <input type="hidden" class="card-text" value="{{ $record->category }}">
            </div>
        </div>
    @endforeach
</div>
@endsection

@section('childScripts')
    <script src="{{ mix('js/home.js') }}" defer></script>
@endsection

<?php
    // 対象動画名称取得
    function getVideoTypeNm($id){
        $nm = "";
        switch ($id) {
            case 1:
                $nm = 'Youtube - Youtube';
                break;
            case 2:
                $nm = 'Local - Local';
                break;
            case 3:
                $nm = 'Youtube - Local';
                break;
        }
        return $nm;
    }
?>