var elixir = require('laravel-elixir');

elixir(function (mix) {
    mix
        .phpUnit()

        /**
         * Copy needed files from /node directories
         * to /public directory.
         */
        .copy(
            'node_modules/font-awesome/fonts',
            'public/build/fonts/font-awesome'
        )
        .copy(
            'node_modules/bootstrap-sass/assets/fonts/bootstrap',
            'public/build/fonts/bootstrap'
        )
        .copy(
            'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
            'public/js/vendor/bootstrap'
        )

        /**
         * Process frontend SCSS stylesheets
         */
        .sass([
            'frontend/app.scss',
            'plugin/toastr/toastr.scss',
            'plugin/sweetalert/sweetalert.scss'
        ], 'resources/assets/css/frontend/app.css')

        /**
         * Combine pre-processed frontend CSS files
         */
        .styles([
            'frontend/app.css',
        ], 'public/css/frontend.css')

        /**
         * Combine frontend scripts
         */
        .scripts([
            'plugins.js',
            'plugin/toastr/toastr.min.js',
            'plugin/sweetalert/sweetalert.min.js',
            'frontend/app.js'
        ], 'public/js/frontend.js')

        /**
         * Process member SCSS stylesheets
         */
        .sass([
            'member/app.scss',
            'plugin/icheck/all.scss',
            'plugin/toastr/toastr.scss',
            'plugin/select2/select2.scss',
            'plugin/sweetalert/sweetalert.scss',
            'plugin/datapicker/datepicker3.scss'
        ], 'resources/assets/css/member/app.css')

        /**
         * Combine pre-processed member CSS files
         */
        .styles([
            'member/app.css',
        ], 'public/css/member.css')

        /**
         * Combine member scripts
         */
        .scripts([
            'plugins.js',
            'plugin/toastr/toastr.min.js',
            'plugin/sweetalert/sweetalert.min.js',
            'member/app.js',
        ], 'public/js/member.js')

        /**
         * Process backend SCSS stylesheets
         */
        .sass([
            'backend/app.scss',
            'plugin/icheck/all.scss',
            'plugin/toastr/toastr.scss',
            'plugin/select2/select2.scss',
            'plugin/sweetalert/sweetalert.scss',
            'plugin/datapicker/datepicker3.scss'
        ], 'resources/assets/css/backend/app.css')

        /**
         * Combine pre-processed backend CSS files
         */
        .styles([
            'backend/app.css',
        ], 'public/css/backend.css')

        /**
         * Combine backend scripts
         */
        .scripts([
            'plugins.js',
            'plugin/icheck/icheck.min.js',
            'plugin/toastr/toastr.min.js',
            'plugin/select2/select2.min.js',
            'plugin/sweetalert/sweetalert.min.js',
            'plugin/datatables/jquery.dataTables.min.js',
            'plugin/datapicker/bootstrap-datepicker.min.js',
            'plugin/datapicker/bootstrap-datepicker.zh-CN.min.js',
            'backend/app.js',
            'backend/custom.js'
        ], 'public/js/backend.js')

        /**
         * Apply version control
         */
        .version(["public/css/frontend.css", "public/js/frontend.js", "public/css/member.css", "public/js/member.js", "public/css/backend.css", "public/js/backend.js"]);
});