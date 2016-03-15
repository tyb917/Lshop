@extends ('member.layouts.master')

@section ('title', trans('member/oceans.index'))

@section('content')
    <div class="box box-success">
        <div class="box-header with-border">
            <h3 class="box-title">{{ trans('member/oceans.index') }}</h3>
            <div class="box-tools pull-right">
                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
        </div>
        <!-- /.box-header -->

        <div class="box-body form-group user-list">
            <div class="box-tools pull-right">
                @permission('create-oceans')
                <a href="{{ url('member/ocean/create') }}"
                   class="btn btn-danger create-user">{{ trans('member/oceans.create') }}</a>
                @endauth
            </div>
            <div class="clearfix"></div>
            <div class="box-tools pull-right">
                <button class="btn btn-primary fliter-toggle" type="button" data-toggle="collapse"
                        data-target="#collapseExample">
                    <i class="fa fa-filter"></i>筛选
                </button>
            </div>
            <div class="clearfix"></div>
            {!! Form::open(['method' => 'POST','id' => 'user-search','class'=>'form-group']) !!}
            <div class="collapse filter" id="collapseExample">
                <div class="row">
                    <div class="form-group col-xs-3">
                        {!! Form::label('商品名称') !!}
                        {!! Form::text('title', null, ['class' => 'form-control']) !!}
                    </div>
                    <div class="form-group col-xs-3">
                        {!! Form::label('起始港') !!}
                        {!! Form::email('origin_port', null, ['class' => 'form-control']) !!}
                    </div>
                    <div class="form-group col-xs-3">
                        {!! Form::label('目的港') !!}
                        {!! Form::email('destination_port', null, ['class' => 'form-control']) !!}
                    </div>
                    <div class="form-group col-xs-3">
                        {!! Form::label('承运人') !!}
                        {!! Form::email('carrier', null, ['class' => 'form-control']) !!}
                    </div>
                    <div class="form-horizontal">
                        <div class="col-xs-3">
                            <label>ID</label>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">从</label>
                                <div class="col-xs-10">
                                    {!! Form::text('oceanid[from]', null, ['class' => 'form-control']) !!}
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">到</label>
                                <div class="col-xs-10">
                                    {!! Form::text('oceanid[to]', null, ['class' => 'form-control']) !!}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-horizontal">
                        <div class="col-xs-3">
                            <label>上传时间</label>
                            <div class="form-group input-daterange datepicker">
                                <label class="col-xs-2 control-label">从</label>
                                {!! Form::text('created_at[from]', null, ['class' => 'form-control','style' => 'width:83.3333333333%;margin-bottom:25px']) !!}
                                <label class="col-xs-2 control-label">到</label>
                                {!! Form::text('created_at[to]', null, ['class' => 'form-control','style' => 'width:83.3333333333%;margin-bottom:25px']) !!}
                            </div>
                        </div>
                    </div>
                    <div class="form-horizontal">
                        <div class="col-xs-3">
                            <label>有效期</label>
                            <div class="form-group input-daterange datepicker">
                                <label class="col-xs-2 control-label">从</label>
                                {!! Form::text('validity[from]', null, ['class' => 'form-control','style' => 'width:83.3333333333%;margin-bottom:25px']) !!}
                                <label class="col-xs-2 control-label">到</label>
                                {!! Form::text('validity[to]', null, ['class' => 'form-control','style' => 'width:83.3333333333%;margin-bottom:25px']) !!}
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="pull-right col-xs-4 text-right">
                        <button class="btn btn-default clearFilter" type="button" data-toggle="collapse" data-target="#collapseExample">
                            取消
                        </button>
                        <button class="btn btn-danger clearFilter" type="button">
                            重置
                        </button>
                        <input class="btn btn-primary" value="确认" type="submit">
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            {!! Form::close() !!}
            <table class="table table-striped table-bordered table-hover" id="users-table">
                <thead>
                <tr>
                    <th align="center" width="27">{{ trans('member/oceans.table.id') }}</th>
                    <th>{{ trans('member/oceans.table.title') }}</th>
                    <th>{{ trans('member/oceans.table.origin_port') }}</th>
                    <th>{{ trans('member/oceans.table.destination_port') }}</th>
                    <th>{{ trans('member/oceans.table.carrier') }}</th>
                    <th>20'GP</th>
                    <th>40'GP</th>
                    <th>40'HQ</th>
                    <th class="visible-lg">{{ trans('member/oceans.table.from_to') }}</th>
                    <th>{{ trans('labels.general.actions') }}</th>
                </tr>
                </thead>
            </table>

            <div class="clearfix"></div>
        </div><!-- /.box-body -->
    </div><!--box-->
@stop

@section('js')
    
@stop