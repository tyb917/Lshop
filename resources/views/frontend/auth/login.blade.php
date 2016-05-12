@extends('frontend.layouts.master')

@section('content')

    <div class="row">

        <div class="col-md-8 col-md-offset-2">

            <div class="panel panel-default">
                <div class="panel-heading">{{ trans('labels.auth.login_box_title') }}</div>

                <div class="panel-body">

                    {!! Form::open(['url' => 'login', 'class' => 'form-horizontal']) !!}

                        <div class="form-group">
                            {!! Form::label('email', trans('validation.attributes.email'), ['class' => 'col-md-4 control-label']) !!}
                            <div class="col-md-6">
                                {!! Form::input('email', 'email', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.email')]) !!}
                            </div><!--col-md-6-->
                        </div><!--form-group-->

                        <div class="form-group">
                            {!! Form::label('password', trans('validation.attributes.password'), ['class' => 'col-md-4 control-label']) !!}
                            <div class="col-md-6">
                                {!! Form::input('password', 'password', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.password')]) !!}
                            </div><!--col-md-6-->
                        </div><!--form-group-->

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <div class="checkbox">
                                    <label>
                                        {!! Form::checkbox('remember') !!} {{ trans('labels.auth.remember_me') }}
                                    </label>
                                </div>
                            </div><!--col-md-6-->
                        </div><!--form-group-->

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                {!! Form::submit(trans('labels.auth.login_button'), ['class' => 'btn btn-primary', 'style' => 'margin-right:15px']) !!}

                                {!! link_to('password/reset', trans('labels.passwords.forgot_password')) !!}
                            </div><!--col-md-6-->
                        </div><!--form-group-->

                    {!! Form::close() !!}

                    <div class="row text-center">
                        {!! $socialite_links !!}
                    </div>
                </div><!-- panel body -->

            </div><!-- panel -->

        </div><!-- col-md-8 -->

    </div><!-- row -->

@endsection

@section('js')
    @include('vendor.jsvalidation.global')
    {!! JsValidator::formRequest('App\Http\Requests\Frontend\Auth\LoginRequest') !!}
@stop