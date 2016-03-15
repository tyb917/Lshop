$(function() {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "400",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    //iCheck for checkbox and radio inputs
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    });
    //Red color scheme for iCheck
    $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
        checkboxClass: 'icheckbox_minimal-red',
        radioClass: 'iradio_minimal-red'
    });
    //Flat red color scheme for iCheck
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass: 'iradio_flat-green'
    });
    //Enable check and uncheck all functionality
    $('.checkbox-toggle').on('ifToggled', function(event){
        var clicks = $(this).data('clicks');
        if (clicks) {
            //Uncheck all checkboxes
            $("input[type='checkbox']").iCheck("uncheck");
        } else {
            //Check all checkboxes
            $("input[type='checkbox']").iCheck("check");
        }
        $(this).data("clicks", !clicks);
    });
    $('.select2').select2({
        minimumResultsForSearch: Infinity
    })
    $('.datepicker').datepicker({
        clearBtn: true,
        autoclose: true,
        format: "yyyy-mm-dd",
        multidateSeparator: true,
        todayHighlight: true,
        orientation: "bottom auto",
        language: "zh-CN"
    });
});