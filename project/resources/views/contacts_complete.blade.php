@extends('layouts.app')

@section('content')
<div class="container py-3">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('お問い合わせ完了') }}</div>
                <div class="card-body">
                    <p>お問い合わせいただきありがとうございました。</p>
                    <button onclick="location.href='{{ route('youyou') }}'" class="btn btn-primary">{{ __('戻る') }}</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
