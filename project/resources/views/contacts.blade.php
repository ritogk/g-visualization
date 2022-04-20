@extends('layouts.app')

@section('content')
<div class="container py-3">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('お問い合わせ') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('contact.send') }}">
                        @csrf
                        <p>ご質問、ご要望がありましたら、お気軽にお問い合わせください。</p>
                        <div class="form-group row">
                            <label for="handle_name" class="col-md-4 col-form-label text-md-right">{{ __('ハンドルネーム') }}</label>
                            <div class="col-md-6">
                                <input id="handle_name" name="handle_name" type="text" class="form-control" autofocus>
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('メールアドレス') }}</label>
                            <div class="col-md-6">
                                <input id="email" name="email" type="email" class="form-control" autofocus>
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <label for="hope" class="col-md-4 col-form-label text-md-right">{{ __('お問い合わせ内容') }}</label>
                            <div class="col-md-6">
                                <textarea id="hope" name="hope" class="form-control" rows="5"></textarea>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">{{ __('送信') }}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
