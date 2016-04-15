@extends ('backend.layouts.master')

@section ('title', trans('labels.backend.access.users.management'))

@section('content')
    <div class="box box-success">
        <div class="box-header with-border">
            <h3 class="box-title">{{ trans('labels.backend.access.users.active') }}</h3>
            <div class="box-tools pull-right">
                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
        </div>
        <!-- /.box-header -->

        <div class="box-body form-group user-list">
            <div class="table-container">
                <table class="table table-striped table-bordered table-hover" id="datatable_ajax">
                    <thead>
                    <tr role="row" class="heading">
                        <th width="2%">
                            <input type="checkbox" class="group-checkable">
                        </th>
                        <th width="5%">
                            Record&nbsp;#
                        </th>
                        <th width="15%">
                            Date
                        </th>
                        <th width="15%">
                            Customer
                        </th>
                        <th width="10%">
                            Ship&nbsp;To
                        </th>
                        <th width="10%">
                            Price
                        </th>
                        <th width="10%">
                            Amount
                        </th>
                        <th width="10%">
                            Status
                        </th>
                        <th width="10%">
                            Actions
                        </th>
                    </tr>
                    <tr role="row" class="filter">
                        <td>
                        </td>
                        <td>
                            <input type="text" class="form-control form-filter input-sm" name="order_id">
                        </td>
                        <td>
                            <div class="input-group date date-picker margin-bottom-5" data-date-format="dd/mm/yyyy">
                                <input type="text" class="form-control form-filter input-sm" readonly name="order_date_from" placeholder="From">
											<span class="input-group-btn">
											<button class="btn btn-sm default" type="button"><i class="fa fa-calendar"></i></button>
											</span>
                            </div>
                            <div class="input-group date date-picker" data-date-format="dd/mm/yyyy">
                                <input type="text" class="form-control form-filter input-sm" readonly name="order_date_to" placeholder="To">
											<span class="input-group-btn">
											<button class="btn btn-sm default" type="button"><i class="fa fa-calendar"></i></button>
											</span>
                            </div>
                        </td>
                        <td>
                            <input type="text" class="form-control form-filter input-sm" name="order_customer_name">
                        </td>
                        <td>
                            <input type="text" class="form-control form-filter input-sm" name="order_ship_to">
                        </td>
                        <td>
                            <div class="margin-bottom-5">
                                <input type="text" class="form-control form-filter input-sm" name="order_price_from" placeholder="From"/>
                            </div>
                            <input type="text" class="form-control form-filter input-sm" name="order_price_to" placeholder="To"/>
                        </td>
                        <td>
                            <div class="margin-bottom-5">
                                <input type="text" class="form-control form-filter input-sm margin-bottom-5 clearfix" name="order_quantity_from" placeholder="From"/>
                            </div>
                            <input type="text" class="form-control form-filter input-sm" name="order_quantity_to" placeholder="To"/>
                        </td>
                        <td>
                            <select name="order_status" class="form-control form-filter input-sm">
                                <option value="">Select...</option>
                                <option value="pending">Pending</option>
                                <option value="closed">Closed</option>
                                <option value="hold">On Hold</option>
                                <option value="fraud">Fraud</option>
                            </select>
                        </td>
                        <td>
                            <div class="margin-bottom-5">
                                <button class="btn btn-sm yellow filter-submit margin-bottom"><i class="fa fa-search"></i> Search</button>
                            </div>
                            <button class="btn btn-sm red filter-cancel"><i class="fa fa-times"></i> Reset</button>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>

            <div class="clearfix"></div>
        </div><!-- /.box-body -->
    </div><!--box-->
@stop

@section('js')
    @include('vendor.datatables.product_attribute')
@stop