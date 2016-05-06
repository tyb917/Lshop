@extends ('backend.layouts.master')
@section('css')
    <link rel="stylesheet" href="{!! asset('css/bootstrap-extend/bootstrap-extend.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/backend/catalog/attributes.css') !!}">
    <link rel="stylesheet" href="{!! asset('js/backend/plugin/colorpicker/css/colorpicker.css') !!}">
@endsection
@section ('title', trans('backend/catalog/product/attribute.labels.management'))

@section('content')
    <div class="box box-success">
        <div class="box-header with-border">
            <h3 class="box-title">{{ trans('backend/catalog/product/attribute.labels.create') }}</h3>
            <div class="box-tools pull-right">
                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body form-group attribute-add">
            {!! Form::open(['route' => 'admin.catalog.product_attribute.store','id'=>'edit_form','class'=>'form-horizontal', 'method' => 'post']) !!}
                <div class="box-tools pull-right">
                    <a href="{{url('admin/catalog/product_attribute')}}" class="margin-bottom-10 btn btn-default">{{trans('backend/catalog/product/attribute.labels.back')}}</a>
                    <input type="button" class="margin-bottom-10 btn btn-default reset" value="{{trans('backend/catalog/product/attribute.labels.reset')}}">
                    <input type="button" class="margin-bottom-10 btn btn-primary save_and_continue_edit" value="{{trans('backend/catalog/product/attribute.labels.save_and_continue_edit')}}">
                    <input type="submit" class="margin-bottom-10 btn btn-danger" value="{{trans('backend/catalog/product/attribute.labels.save')}}">
                </div>
                <div class="clearfix"></div>
                <div class="nav-tabs-vertical">
                    <ul class="nav nav-tabs margin-right-25" data-plugin="nav-tabs" role="tablist">
                        <li class="active" ><a data-toggle="tab" href="#main" id="product_attribute_tabs_main">属性</a></li>
                        <li><a data-toggle="tab" href="#labels_content" id="product_attribute_tabs_labels">管理标签</a></li>
                        <li><a data-toggle="tab" href="#front_content" id="product_attribute_tabs_front">商店属性</a></li>
                      </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="main">
                            <legend class="admin__legend legend">
                                <h4 class="collapsible-title">属性参数</h4>
                            </legend>
                            <div class="entry-edit">
                                <fieldset class="fieldset">
                                    <div class="field form-group ">
                                        <label class="col-xs-2 control-label">默认标签</label>
                                        <div class="col-xs-6">
                                            {!! Form::text('frontend_label[0]',null,['id' => 'attribute_label','class' => 'form-control']) !!}
                                        </div>
                                    </div>
                                    <div class="field form-group">
                                        <label class="col-xs-2 control-label">输入类型</label>
                                        <div class="col-xs-4">
                                            {!! Form::select('frontend_input',['text'=>'文本框','textarea'=>'文本区域','date'=>'日期','boolean'=>'是/否','multiselect'=>'多选框','select'=>'下拉框','price'=>'价格','media_image'=>'媒体图片','swatch_visual'=>'视觉样本','swatch_text'=>'文本样本','weee'=>'固定产品税'],null,['id'=>'frontend_input','class' => 'form-control select2','title'=>'输入类型']) !!}
                                        </div>
                                    </div>
                                    <div class="field form-group">
                                        <label class="col-xs-2 control-label">是否必填项</label>
                                        <div class="col-xs-2">
                                            {!! Form::select('is_required',['1'=>'是','0'=>'否'],0,['id'=>'is_required','class' => 'form-control select2','title'=>'是否必填项']) !!}
                                        </div>
                                    </div>
                                    <div class="field form-group" id="preview-image">
                                        <label class="col-xs-2 control-label">更新产品预览图像</label>
                                        <div class="col-xs-2">
                                            {!! Form::select('update-product-preview-image',['1'=>'是','0'=>'否'],1,['id'=>'update_product_preview_image','class' => 'form-control select2','title'=>'更新产品预览图像']) !!}
                                        </div>
                                    </div>
                                    <div class="field form-group" id="for-swatch">
                                        <label class="col-xs-2 control-label">如果可能使用产品图片作为样本</label>
                                        <div class="col-xs-2">
                                            {!! Form::select('use-product-image-for-swatch',['1'=>'是','0'=>'否'],0,['id'=>'use_product_image_for_swatch','class' => 'form-control select2','title'=>'如果可能使用产品图片作为样本']) !!}
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <fieldset class="fieldset">
                                <legend class="legend"><h4 class="collapsible-title">管理样本（你的属性值）</h4></legend>
                                <div id="swatch-visual-options-panel">
                                    <table class="data-table clearfix" cellspacing="0">
                                        <thead>
                                        <tr id="swatch-visual-options-table">
                                            <th class="col-draggable"></th>
                                            <th class="col-default">是否默认</th>
                                            <th>样本</th>
                                            <th>默认存储视图</th>
                                            <th>管理员</th>
                                            <th class="col-delete">&nbsp;</th>
                                        </tr>
                                        </thead>
                                        <tbody data-role="swatch-visual-options-container" class="ignore-validate ui-sortable"></tbody>
                                        <tfoot>
                                        <tr>
                                            <th colspan="7">
                                                <input type="hidden" class="required-visual-swatch-entry" name="visual_swatch_validation">
                                            </th>
                                        </tr>
                                        <tr>
                                            <th colspan="7" class="col-actions-add">
                                                <button id="add_new_swatch_visual_option_button" title="添加样本" type="button" class="btn action- scalable add">
                                                    <span>添加样本</span>
                                                </button>
                                            </th>
                                        </tr>
                                        </tfoot>
                                    </table>
                                    <input type="hidden" id="swatch-visual-option-count-check" value="">
                                </div>
                                <script id="swatch-visual-row-template" type="text/x-magento-template">
                                    <tr>
                                        <td class="col-draggable">
                                            <div data-role="draggable-handle" class="draggable-handle" title="Sort Option"></div>
                                            <input data-role="order" type="hidden" name="optionvisual[order][<%- data.id %>]"  value="<%- data.sort_order %>" />
                                        </td>
                                        <td class="col-default">
                                            <input class="input-radio" type="<%- data.intype %>" name="defaultvisual[]" value="<%- data.id %>" <%- data.checked %>/>
                                        </td>
                                        <td class="swatch-window-col-<%- data.id %> col-default <%- data.empty_class %>">
                                            <input id="swatch_visual_value_<%- data.id %>" type="hidden" name="swatchvisual[value][<%- data.id %>]" value="<%- data.defaultswatch0 %>" />
                                            <div class="swatch_window" id="swatch_window_option_<%- data.id %>" style="<%- data.swatch0 %>"></div>
                                            <div class="swatch_sub-menu_container" id="swatch_container_option_<%- data.id %>">
                                                <div class="swatch_row position-relative">
                                                    <div class="swatch_row_name colorpicker_handler">
                                                        <p>选择颜色</p>
                                                    </div>
                                                </div>
                                                <div class="swatch_row">
                                                    <div class="swatch_row_name btn_choose_file_upload" id="swatch_choose_file_option_<%- data.id %>">
                                                        <p>上传文件</p>
                                                    </div>
                                                </div>
                                                <div class="swatch_row">
                                                    <div class="swatch_row_name btn_remove_swatch">
                                                        <P>清除</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="swatch-col-<%- data.id %>">
                                            <input name="optionvisual[value][<%- data.id %>][1]" value="<%- data.store1 %>" class="form-control" type="text" />
                                        </td>
                                        <td class="swatch-col-<%- data.id %>">
                                            <input name="optionvisual[value][<%- data.id %>][0]" value="<%- data.store0 %>" class="form-control required-option" type="text" />
                                        </td>
                                        <td id="delete_button_swatch_container_<%- data.id %>" class="col-delete">
                                            <input type="hidden" class="delete-flag" name="optionvisual[delete][<%- data.id %>]" value="" />
                                            <button title="Delete" type="button" class="action- scalable delete delete-option">
                                                <span>Delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                </script>
                            </fieldset>
                            <fieldset class="fieldset">
                                <legend class="legend"><span>管理样本（你的属性值）</span></legend>
                                <div id="swatch-text-options-panel">
                                    <table class="data-table clearfix" cellspacing="0">
                                        <thead>
                                        <tr id="swatch-text-options-table">
                                            <th class="col-draggable"></th>
                                            <th class="col-default">是否默认</th>
                                            <th class="col-swatch col-<%- data.id %>">样本</th>
                                            <th>默认存储视图</th>
                                            <th class="col-swatch col-<%- data.id %>">样本</th>
                                            <th>管理员</th>
                                            <th class="col-delete">&nbsp;</th>
                                        </tr>
                                        </thead>
                                        <tbody data-role="swatch-text-options-container" class="ignore-validate ui-sortable"></tbody>
                                        <tfoot>
                                        <tr>
                                            <th colspan="7">
                                                <input type="hidden" class="required-text-swatch-entry" name="text_swatch_validation">
                                            </th>
                                        </tr>
                                        <tr>
                                            <th colspan="7" class="col-actions-add">
                                                <button id="add_new_swatch_text_option_button" title="添加样本" type="button" class="btn action- scalable add">
                                                    <span>添加样本</span>
                                                </button>
                                            </th>
                                        </tr>
                                        </tfoot>
                                    </table>
                                    <input type="hidden" id="swatch-text-option-count-check" value="">
                                </div>
                                <script id="swatch-text-row-template" type="text/x-magento-template">
                                    <tr>
                                        <td class="col-draggable">
                                            <div data-role="draggable-handle" class="draggable-handle" title="Sort Option"></div>
                                            <input data-role="order" type="hidden" name="optiontext[order][<%- data.id %>]"  value="<%- data.sort_order %>" />
                                        </td>
                                        <td class="col-default">
                                            <input class="input-radio" type="<%- data.intype %>" name="defaulttext[]" value="<%- data.id %>" <%- data.checked %>/>
                                        </td>
                                        <td class="col-swatch col-<%- data.id %>">
                                            <input class="form-control swatch-text-field-1 " name="swatchtext[value][<%- data.id %>][1]" type="text" value="<%- data.swatch1 %>" />
                                        </td>
                                        <td class="swatch-col-<%- data.id %>">
                                            <input name="optiontext[value][<%- data.id %>][1]" value="<%- data.store1 %>" class="form-control" type="text" />
                                        </td>
                                        <td class="col-swatch col-<%- data.id %>">
                                            <input class="form-control swatch-text-field-0 required-option" name="swatchtext[value][<%- data.id %>][0]" type="text" value="<%- data.swatch0 %>" />
                                        </td>
                                        <td class="swatch-col-<%- data.id %>">
                                            <input name="optiontext[value][<%- data.id %>][0]" value="<%- data.store0 %>" class="form-control required-option" type="text" />
                                        </td>
                                        <td id="delete_button_swatch_container_<%- data.id %>" class="col-delete">
                                            <input type="hidden" class="delete-flag" name="optiontext[delete][<%- data.id %>]" value="" />
                                            <button title="Delete" type="button" class="action- scalable delete delete-option">
                                                <span>删除</span>
                                            </button>
                                        </td>
                                    </tr>
                                </script>

                            </fieldset>
                            <fieldset class="fieldset">
                                <legend class="legend"><span>管理选项（你的属性值）</span></legend>
                                <div id="manage-options-panel">
                                    <table class="admin__control-table">
                                        <thead>
                                        <tr id="attribute-options-table">
                                            <th class="col-draggable"></th>
                                            <th class="col-default control-table-actions-th">是否默认</th>
                                            <th>默认存储视图</th>
                                            <th>管理员</th>
                                            <th class="col-delete">&nbsp;</th>
                                        </tr>
                                        </thead>
                                        <tbody data-role="options-container" class="ignore-validate ui-sortable"></tbody>
                                        <tfoot>
                                        <tr>
                                            <th colspan="5" class="validation">
                                                <input type="hidden" class="required-dropdown-attribute-entry" name="dropdown_attribute_validation">
                                            </th>
                                        </tr>
                                        <tr>
                                            <th colspan="5" class="col-actions-add">
                                                <button id="add_new_option_button" title="添加选项" type="button" class="btn action- scalable add">
                                                    <span>添加选项</span>
                                                </button>
                                            </th>
                                        </tr>
                                        </tfoot>
                                    </table>
                                    <input type="hidden" id="option-count-check" value="">
                                </div>
                                <script id="row-template" type="text/x-magento-template">
                                    <tr>
                                        <td class="col-draggable">
                                            <div data-role="draggable-handle" class="draggable-handle" title="Sort Option"></div>
                                            <input data-role="order" type="hidden" name="option[order][<%- data.id %>]"  value="<%- data.sort_order %>" />
                                        </td>
                                        <td class="col-default control-table-actions-cell">
                                            <input class="input-radio" type="<%- data.intype %>" name="default[]" value="<%- data.id %>" <%- data.checked %>/>
                                        </td>
                                        <td class="col-<%- data.id %>"><input name="option[value][<%- data.id %>][1]" value="<%- data.store1 %>" class="form-control" type="text" /></td>
                                        <td class="col-<%- data.id %>"><input name="option[value][<%- data.id %>][0]" value="<%- data.store0 %>" class="form-control required-option" type="text" /></td>
                                        <td id="delete_button_container_<%- data.id %>" class="col-delete">
                                            <input type="hidden" class="delete-flag" name="option[delete][<%- data.id %>]" value="" />
                                            <button id="delete_button_<%- data.id %>" title="Delete" type="button" class="action- scalable delete delete-option">
                                                <span>删除</span>
                                            </button>
                                        </td>
                                    </tr>
                                </script>
                            </fieldset>
                            <legend class="admin__legend legend">
                                <h4 class="collapsible-title" data-toggle="collapse" href="#advanced_fieldset-wrapper">高级属性参数</h4>
                            </legend>
                            <div id="advanced_fieldset-wrapper">
                                <fieldset class="fieldset">
                                    <div class="field form-group ">
                                        <label class="col-xs-2 control-label">属性代码</label>
                                        <div class="col-xs-6">
                                            {!! Form::text('attribute_code',null,['id' => 'attribute_code','class' => 'form-control']) !!}
                                            <p class="help-block">系统内部使用。确保不要使用空格或多于30个字符</p>
                                        </div>
                                    </div>
                                    <div class="field form-group ">
                                        <label class="col-xs-2 control-label">作用范围</label>
                                        <div class="col-xs-3">
                                            {!! Form::select('is_global',['0'=>'商店视图','2'=>'网站','1'=>'全局'],0,['id'=>'is_global','class' => 'form-control select2','title'=>'作用范围']) !!}
                                        </div>
                                    </div>
                                    <div class="field form-group ">
                                        <label class="col-xs-2 control-label">默认值</label>
                                        <div class="col-xs-6">
                                            {!! Form::text('default_value_text',null,['id' => 'default_value_text','class' => 'form-control']) !!}
                                        </div>
                                    </div>
                                    <div class="field form-group ">
                                        <label class="col-xs-2 control-label">默认值</label>
                                        <div class="col-xs-3">
                                            {!! Form::select('default_value_yesno',['1'=>'是','0'=>'否'],0,['id'=>'default_value_yesno','class' => 'form-control select2','title'=>'默认值']) !!}
                                        </div>
                                    </div>
                                    <div class="field form-group ">
                                        <label class="col-xs-2 control-label">默认值</label>
                                        <div class="col-xs-6">
                                            {!! Form::text('default_value_date',null,['id' => 'default_value_date','class' => 'form-control datepicker']) !!}
                                            <div class="fa fa-calculator"></div>
                                        </div>
                                    </div>
                                    <div class="field form-group ">
                                        <label class="col-xs-2 control-label">默认值</label>
                                        <div class="col-xs-6">
                                            {!! Form::textarea('default_value_textarea',null,['id' => 'default_value_textarea','class' => 'form-control','rows'=>'5']) !!}
                                        </div>
                                    </div>
                                    <div class="field form-group ">
                                        <label class="col-xs-2 control-label">唯一的值</label>
                                        <div class="col-xs-3">
                                            {!! Form::select('is_unique',['1'=>'是','0'=>'否'],0,['id'=>'is_unique','class' => 'form-control select2','title'=>'唯一的值（不与其他产品共享）']) !!}
                                        </div>
                                    </div>
                                    <div class="field form-group ">
                                        <label class="col-xs-2 control-label">输入验证</label>
                                        <div class="col-xs-3">
                                            {!! Form::select('frontend_class',[''=>'无','validate-number'=>'十进制数','validate-digits'=>'整数','validate-email'=>'邮箱','validate-url'=>'Url链接','validate-alpha'=>'字母','validate-alphanum'=>'字母(a - z、A - Z)或数字(0 - 9)'],null,['id'=>'frontend_class','class' => 'form-control select2','title'=>'输入验证']) !!}
                                        </div>
                                    </div>
                                    <div class="field form-group ">
                                        <label class="col-xs-2 control-label">添加到列选项</label>
                                        <div class="col-xs-3">
                                            {!! Form::select('is_used_in_grid',['1'=>'是','0'=>'否'],1,['id'=>'is_used_in_grid','class' => 'form-control select2','title'=>'添加到列选项']) !!}
                                        </div>
                                    </div>
                                    <div class="field form-group ">
                                        <label class="col-xs-2 control-label">用在过滤选项</label>
                                        <div class="col-xs-3">
                                            {!! Form::select('is_filterable_in_grid',['1'=>'是','0'=>'否'],1,['id'=>'is_filterable_in_grid','class' => 'form-control select2','title'=>'用在过滤选项']) !!}
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="tab-pane" id="labels_content">
                            <h4 class="collapsible-title margin-bottom-20" data-toggle="collapse" href="#manage-titles-content" aria-expanded="true">管理标题(大小、颜色等)</h4>
                            <div id="manage-titles-content" class="collapse in" aria-expanded="true">
                                <fieldset class="fieldset">
                                    <table class="admin__control-table" id="attribute-labels-table">
                                        <thead>
                                        <tr>
                                            <th class="col-store-view">默认存储视图</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="col-store-view">
                                                <input class="form-control" type="text" name="frontend_label[1]" value="">
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </fieldset>
                            </div>
                            <hr>
                        </div>
                        <div class="tab-pane" id="front_content">

                            <fieldset class="fieldset admin__fieldset" id="front_fieldset">
                                <legend class="admin__legend legend">
                                    <h4 class="collapsible-title">店面属性</h4>
                                </legend>
                                <div class="messages">
                                </div>
                                <div class="field form-group">
                                    <label class="col-xs-2 control-label">使用搜索</label>
                                    <div class="col-xs-6">
                                        {!! Form::select('is_searchable',['1'=>'是','0'=>'否'],0,['id'=>'is_searchable','class' => 'form-control select2','title'=>'使用搜索']) !!}
                                    </div>
                                </div>
                                <div class="field form-group" style="display: none;">
                                    <label class="col-xs-2 control-label">搜索权重</label>
                                    <div class="col-xs-6">
                                        {!! Form::select('search_weight',['1'=>'1','2'=>'2','3'=>'3','4'=>'4','5'=>'5','6'=>'6','7'=>'7','8'=>'8','9'=>'9','10'=>'10'],null,['id'=>'search_weight','class' => 'form-control select2','style'=>'display:none','disabled'=>'','title'=>'搜索权重']) !!}
                                    </div>
                                </div>
                                <div class="field form-group" style="display: none;">
                                    <label class="col-xs-2 control-label">高级搜索可见</label>
                                    <div class="col-xs-6">
                                        {!! Form::select('is_visible_in_advanced_search',['1'=>'是','0'=>'否'],0,['id'=>'is_visible_in_advanced_search','class' => 'form-control select2','style'=>'display:none','disabled'=>'','title'=>'高级搜索可见']) !!}
                                    </div>
                                </div>
                                <div class="field form-group">
                                    <label class="col-xs-2 control-label">在店面可比较</label>
                                    <div class="col-xs-6">
                                        {!! Form::select('is_comparable',['1'=>'是','0'=>'否'],0,['id'=>'is_comparable','class' => 'form-control select2','title'=>'在店面可比较']) !!}
                                    </div>
                                </div>
                                <div class="field form-group">
                                    <label class="col-xs-2 control-label">使用分层导航</label>
                                    <div class="col-xs-6">
                                        {!! Form::select('is_filterable',['0'=>'否','1'=>'可过滤的（有结果）','2'=>'可过滤的 （没有结果）'],0,['id'=>'is_filterable','class' => 'form-control select2','title'=>'只能使用在分类输入下拉框,多选框和价格吗']) !!}
                                        <p class="help-block">只能使用在分类输入下拉框,多选框和价格吗</p>
                                    </div>
                                </div>
                                <div class="field form-group">
                                    <label class="col-xs-2 control-label">在搜索结果中使用分层导航</label>
                                    <div class="col-xs-6">
                                        {!! Form::select('is_filterable_in_search',['1'=>'是','0'=>'否'],0,['id'=>'is_filterable_in_search','class' => 'form-control select2','title'=>'只能使用在分类输入下拉框,多选框和价格吗']) !!}
                                        <p class="help-block">只能使用在分类输入下拉框,多选框和价格吗</p>
                                    </div>
                                </div>
                                <div class="field form-group">
                                    <label class="col-xs-2 control-label">位置</label>
                                    <div class="col-xs-6">
                                        <input id="position" name="position" value="" title="分层导航的位置" class="form-control" type="text" disabled="disabled">
                                        <p class="help-block">在分层导航块的位置属性</p>
                                    </div>
                                </div>
                                <div class="field form-group">
                                    <label class="col-xs-2 control-label">使用促销规则条件</label>
                                    <div class="col-xs-6">
                                        {!! Form::select('is_used_for_promo_rules',['1'=>'是','0'=>'否'],0,['id'=>'is_used_for_promo_rules','class' => 'form-control select2','title'=>'使用促销规则条件']) !!}
                                    </div>
                                </div>
                                <div class="field form-group" style="display: none;">
                                    <label class="col-xs-2 control-label">支持所见即所得</label>
                                    <div class="col-xs-6">
                                        {!! Form::select('is_wysiwyg_enabled',['1'=>'是','0'=>'否'],0,['id'=>'is_wysiwyg_enabled','class' => 'form-control select2','style'=>'display: none;','title'=>'支持所见即所得']) !!}
                                    </div>
                                </div>
                                <div class="field form-group" style="display: none;">
                                    <label class="col-xs-2 control-label">在店面允许HTML标记</label>
                                    <div class="col-xs-6">
                                        {!! Form::select('is_html_allowed_on_front',['1'=>'是','0'=>'否'],1,['id'=>'is_html_allowed_on_front','class' => 'form-control select2','style'=>'display: none;','title'=>'在店面允许HTML标记']) !!}
                                    </div>
                                </div>
                                <div class="field form-group field-is_visible_on_front">
                                    <label class="col-xs-2 control-label">在店面的目录页可见</label>
                                    <div class="col-xs-6">
                                        {!! Form::select('is_visible_on_front',['1'=>'是','0'=>'否'],0,['id'=>'is_visible_on_front','class' => 'form-control select2','style'=>'display: none;','title'=>'在店面的目录页可见']) !!}
                                    </div>
                                </div>
                                <div class="field form-group">
                                    <label class="col-xs-2 control-label">在产品列表中使用</label>
                                    <div class="col-xs-6">
                                        {!! Form::select('used_in_product_listing',['1'=>'是','0'=>'否'],0,['id'=>'used_in_product_listing','class' => 'form-control select2','title'=>'在产品列表中使用']) !!}
                                        <p class="help-block"> 依赖于主题设计</p>
                                    </div>
                                </div>
                                <div class="field form-group">
                                    <label class="col-xs-2 control-label">在产品列表排序中使用</label>
                                    <div class="col-xs-6">
                                        {!! Form::select('used_for_sort_by',['1'=>'是','0'=>'否'],0,['id'=>'used_for_sort_by','class' => 'form-control select2','title'=>'在产品列表中使用']) !!}
                                        <p class="help-block"> 依赖于主题设计</p>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
            {!! Form::close() !!}
        </div>
    </div><!--box-->
@stop

@section('js')
    <script type="text/javascript" src="{{ asset('vendor/jsvalidation/js/jsvalidation.js')}}"></script>
    @if(session()->get('locale'))<script type="text/javascript" src="{{ asset('vendor/jsvalidation/js/'.session()->get('locale').'.js')}}"></script>
    @else
        <script type="text/javascript" src="{{ asset('vendor/jsvalidation/js/zh-CN.js')}}"></script>
    @endif
    <script type="text/javascript" src="{{ asset('js/backend/plugin/colorpicker/js/colorpicker.js')}}"></script>
    <script>
        $().ready(function(){
            $('#advanced_fieldset-wrapper').addClass('collapse').collapse('hide');
            var $validator = $("#edit_form").validate({
                errorElement: 'span',
                errorClass: 'help-block error-help-block',

                errorPlacement: function(error, element) {
                    if (element.parent('.input-group').length ||
                            element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
                        error.insertAfter(element.parent());
                        // else just place the validation message immediatly after the input
                    } else {
                        error.insertAfter(element);
                    }
                },
                highlight: function(element) {
                    $(element).closest('.form-group').addClass('has-error'); // add the Bootstrap error class to the control group
                },
                success: function(element) {
                    $(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // remove the Boostrap error class from the control group
                },
                rules: {
                    'frontend_label[0]': {
                        required: true,
                        email: true,
                        minlength: 3
                    }
                }
                ,
                ignore:[],
                invalidHandler: function(e, validator){
                    if(validator.errorList.length)
                        $('.nav-tabs a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show')
                }
            });
        })
        var config = {
            attributesData:[],
            isSortable:1,
            isReadOnly:0,
            FORM_KEY:'{{csrf_token()}}',
            uploadActionUrl:"{{url('admin/catalog/product_attribute/swatches')}}",
        }
    </script>
    <script src="{!! asset('js/backend/catalog/underscore.js') !!}"></script>
    <script src="{!! asset('js/backend/catalog/attribute.js') !!}"></script>
    <script src="{!! asset('js/backend/catalog/text.js') !!}"></script>
    <script src="{!! asset('js/backend/catalog/visual.js') !!}"></script>
    <script src="{!! asset('js/backend/catalog/options.js') !!}"></script>
    <script src="{!! asset('js/backend/catalog/type-change.js') !!}"></script>
    <script src="{!! asset('js/backend/catalog/product-attribute.js') !!}"></script>
    <script src="{!! asset('js/backend/plugin/sortable/sortable.min.js') !!}"></script>
    {{--{!! JsValidator::formRequest('App\Http\Requests\MyFormRequest') !!}--}}
@stop