<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="_token" content="{{ csrf_token() }}" />

        <title>@yield('title', app_name())</title>

        <!-- Meta -->
        <meta name="description" content="@yield('meta_description', 'Default Description')">
        <meta name="author" content="@yield('meta_author', 'Anthony Rappa')">
        @yield('meta')

        <!-- Styles -->
        @yield('before-styles-end')
        {!! Html::style(elixir('css/member.css')) !!}
        @yield('after-styles-end')

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700" rel='stylesheet' type='text/css'>
    </head>
    <body id="app-layout" class="skin-{!! config('backend.theme') !!}">

        @include('member.includes.header')
        @include('member.includes.sidebar')

        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <section class="content-header">

                {{-- Change to Breadcrumbs::render() if you want it to error to remind you to create the breadcrumbs for the given route --}}
                {!! Breadcrumbs::renderIfExists() !!}
            </section>

            <!-- Main content -->
            <section class="content">
                @include('includes.partials.messages')
                @yield('content')
            </section><!-- /.content -->
        </div><!-- /.content-wrapper -->

        <!-- JavaScripts -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="{{asset('js/vendor/jquery/jquery-2.1.4.min.js')}}"><\/script>')</script>
        {!! Html::script('js/vendor/bootstrap/bootstrap.min.js') !!}

        @yield('before-scripts-end')
        {!! Html::script(elixir('js/member.js')) !!}
        @yield('after-scripts-end')
        @yield('js')
        @include('includes.partials.ga')
    </body>
</html>