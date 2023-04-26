<div class="dashboard-wrapper">
	<div class="footer" style="position: fixed;bottom: 0px; ">
		<div class="container-fluid">
		    <div class="row">
		        <div class="col-sm-12 col-12" >
		             Copyright @versha All rights reserved. 
		        </div>
		        
		    </div>
		</div>
	</div>
</div>

<!-- Optional JavaScript -->
<script src="{{ asset('elc_theme/assets/vendor_theme/jquery/jquery-3.3.1.min.js') }}" defer></script>
{{-- Laravel's default npm package already includes Twitter Bootstrap javascript. Now you're executing the same code twice, which may cause errors and break your dropdown, but also all other javascript on your page. bootstrap bundle js conflict with app.js
 <script src="{{ asset('elc_theme/assets/vendor_theme/bootstrap/js/bootstrap.bundle.js') }}" defer></script> --}}

<!-- slimscroll js-->
<script src="{{ asset('elc_theme/assets/vendor_theme/slimscroll/jquery.slimscroll.js') }}" defer></script>
<!-- chartjs js-->
<script src="{{ asset('elc_theme/assets/vendor_theme/charts/charts-bundle/Chart.bundle.js') }}" defer></script>
<script src="{{ asset('elc_theme/assets/vendor_theme/charts/charts-bundle/chartjs.js') }}" defer></script>

<!-- main js-->
<script src="{{ asset('elc_theme/assets/libs/js/main-js.js') }}" defer></script>
<!-- jvactormap js-->
<script src="{{ asset('elc_theme/assets/vendor_theme/jvectormap/jquery-jvectormap-2.0.2.min.js') }}" defer></script>
<script src="{{ asset('elc_theme/assets/vendor_theme/jvectormap/jquery-jvectormap-world-mill-en.js') }}" defer></script>
<!-- sparkline js-->
<script src="{{ asset('elc_theme/assets/vendor_theme/charts/sparkline/jquery.sparkline.js') }}" defer></script>
<script src="{{ asset('elc_theme/assets/vendor_theme/charts/sparkline/spark-js.js') }}" defer></script>


@if(\Route::currentRouteName() == 'home')
  <!-- dashboard sales js-->
<script src="{{ asset('elc_theme/assets/libs/js/dashboard-sales.js') }}" defer></script>

@endif
