<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

@include('partials.header')

<body>
    <!-- main wrapper -->
    <div class="dashboard-main-wrapper">

        <!-- Top Navigation -->
        @include('partials.topnav')

        <!-- Left Navigation -->
        @include('partials.leftnav')

        <!-- wrapper  -->
        <!-- ============================================================== -->
        <div class="dashboard-wrapper">
            
            <!-- show page content start-->
             @yield('content')
            <!-- show page content end-->
         </div>
        <!-- ============================================================== -->
        <!-- end wrapper  -->
            
    </div>
       <!-- end main wrapper  -->

    <!-- Footer -->
    @include('partials.footer')
</body>

</html>