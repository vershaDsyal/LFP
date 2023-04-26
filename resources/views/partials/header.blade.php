<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
 
    <title>{{ config('app.name', 'LFP') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{{ asset('elc_theme/assets/images/favi.png') }}">
    
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Default -->
    {{-- <link href="{{ asset('css/app.css') }}" rel="stylesheet"> --}}

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="{{ asset('elc_theme/assets/vendor_theme/bootstrap/css/bootstrap.min.css') }}">
    <link href="{{ asset('elc_theme/assets/vendor_theme/fonts/circular-std/style.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('elc_theme/assets/libs/css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('elc_theme/assets/vendor_theme/fonts/fontawesome/css/fontawesome-all.css') }}">
    <link rel="stylesheet" href="{{ asset('elc_theme/assets/vendor_theme/vector-map/jqvmap.css') }}">
    <link rel="stylesheet" href="{{ asset('elc_theme/assets/vendor_theme/jvectormap/jquery-jvectormap-2.0.2.css') }}">
    <link rel="stylesheet" href="{{ asset('elc_theme/assets/vendor_theme/fonts/flag-icon-css/flag-icon.min.css') }}">
    
</head>