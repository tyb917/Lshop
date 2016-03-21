@extends('member.layouts.master')

@section('content')
    <div class="box profile" id="crop-avatar">
        <div class="box-header with-border">
            <h3 class="box-title">{{ trans('member/navs.user.my_information') }}</h3>
            <div class="box-tools pull-right">
                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
        </div>
        <div class="box-body form-group">
                <!-- Current avatar -->
                {!! Form::model($user, ['route' => 'member.user.profile.update', 'class' => 'form-horizontal col-xs-5', 'method' => 'PATCH']) !!}

                <div class="form-group">
                    <div class="pull-left col-xs-offset-2">
                        <div class="avatar-view" title="上传头像">
                            <img src="{{url('avatar/'.$user->id.'/large')}}" class="user-profile-image" />
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    {!! Form::label('name', trans('validation.attributes.frontend.name'), ['class' => 'col-xs-2 control-label']) !!}
                    <div class="col-xs-5">
                        {!! Form::input('text', 'name', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.frontend.name')]) !!}
                    </div>
                </div>

                @if ($user->canChangeEmail())
                    <div class="form-group">
                        {!! Form::label('email', trans('validation.attributes.frontend.email'), ['class' => 'col-xs-2 control-label']) !!}
                        <div class="col-xs-5">
                            {!! Form::input('email', 'email', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.frontend.email')]) !!}
                        </div>
                    </div>
                @endif

                <div class="form-group">
                    <div class="col-xs-5 col-xs-offset-2">
                        {!! Form::submit(trans('labels.general.buttons.save'), ['class' => 'btn btn-primary']) !!}
                    </div>
                </div>

                {!! Form::close() !!}
        </div>
        <!-- Cropping modal -->
        <div class="modal fade" id="avatar-modal" aria-hidden="true" aria-labelledby="avatar-modal-label" role="dialog" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    {!! Form::model($user, ['route' => 'member.user.profile.avatar', 'class' => 'avatar-form', 'method' => 'POST']) !!}
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="avatar-modal-label">设置新头像</h4>
                    </div>
                    <div class="modal-body">
                        <div class="avatar-body">

                            <!-- Upload image and data -->
                            <div class="avatar-upload">
                                <input type="hidden" class="avatar-src" name="avatar_src">
                                <input type="hidden" class="avatar-data" name="avatar_data">
                                <input type="file" class="avatar-input" id="avatarInput" name="avatar_file">
                            </div>

                            <!-- Crop and preview -->
                            <div class="row">
                                <div class="col-md-9">
                                    <div class="avatar-wrapper"></div>
                                </div>
                                <div class="col-md-3">
                                    <div class="avatar-preview preview-lg"></div>
                                    180*180
                                    <div class="avatar-preview preview-md"></div>
                                    65*65
                                    <div class="avatar-preview preview-sm"></div>
                                    30*30
                                </div>
                            </div>

                            <div class="row avatar-btns">
                                <div class="col-md-9">
                                    <button type="button" class="btn btn-primary" data-method="rotate" data-option="-5" title="向左旋转">
                                        <span class="docs-tooltip" data-toggle="tooltip" data-method="rotate" data-option="-5" title="" data-original-title="向左旋转">
                                            <span class="fa fa-rotate-left" data-method="rotate" data-option="-5"></span>
                                        </span>
                                    </button>
                                    <button type="button" class="btn btn-primary" data-method="rotate" data-option="5" title="向右旋转">
                                        <span class="docs-tooltip" data-toggle="tooltip" data-method="rotate" data-option="5" title="" data-original-title="向右旋转">
                                            <span class="fa fa-rotate-right" data-method="rotate" data-option="5"></span>
                                        </span>
                                    </button>
                                </div>
                                <div class="col-md-3">
                                    <button type="submit" class="btn btn-primary btn-block avatar-save">完成</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!! Form::close() !!}
                </div>
            </div>
        </div><!-- /.modal -->

        <!-- Loading state -->
        <div class="loading" aria-label="Loading" role="img" tabindex="-1"></div>
    </div>
    @if (access()->user()->canChangePassword())
    <div class="box profile">
        <div class="box-header with-border">
            <h3 class="box-title">{{ trans('labels.frontend.user.passwords.change') }}</h3>
            <div class="box-tools pull-right">
                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
        </div>
        <div class="box-body">
            {!! Form::open(['route' => ['auth.password.update'], 'class' => 'form-horizontal col-xs-5']) !!}

            <div class="form-group">
                {!! Form::label('old_password', trans('validation.attributes.frontend.old_password'), ['class' => 'col-xs-2 control-label']) !!}
                <div class="col-xs-5">
                    {!! Form::input('password', 'old_password', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.frontend.old_password')]) !!}
                </div>
            </div>

            <div class="form-group">
                {!! Form::label('password', trans('validation.attributes.frontend.new_password'), ['class' => 'col-xs-2 control-label']) !!}
                <div class="col-xs-5">
                    {!! Form::input('password', 'password', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.frontend.new_password')]) !!}
                </div>
            </div>

            <div class="form-group">
                {!! Form::label('password_confirmation', trans('validation.attributes.frontend.new_password_confirmation'), ['class' => 'col-xs-2 control-label']) !!}
                <div class="col-xs-5">
                    {!! Form::input('password', 'password_confirmation', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.frontend.new_password_confirmation')]) !!}
                </div>
            </div>

            <div class="form-group">
                <div class="col-xs-5 col-xs-offset-2">
                    {!! Form::submit(trans('labels.general.buttons.update'), ['class' => 'btn btn-primary']) !!}
                </div>
            </div>

            {!! Form::close() !!}
        </div>
    </div>
    @endif
@stop
<link rel="stylesheet" href="/plugins/cropper/cropper.min.css">
<link rel="stylesheet" href="/plugins/cropper/main.css">
@section('js')
    <script src="/plugins/cropper/cropper.min.js"></script>
    <script src="/plugins/cropper/main.js"></script>
@stop