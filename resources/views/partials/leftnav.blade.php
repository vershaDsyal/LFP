<!-- left sidebar -->
<!-- ============================================================== -->
<div class="nav-left-sidebar sidebar-dark">
     @if(\Auth::user())
    <div class="menu-list">
        <nav class="navbar navbar-expand-lg navbar-light">
            <a class="d-xl-none d-lg-none" href="javascript: void(0);">Dashboard</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav flex-column">
                    <li class="nav-divider">
                        Hi, {{ \Auth::user()->name}}
                    </li>
                     

                    <li class="nav-item ">
                        <a class="nav-link dash" href="@if(\Auth::user()) {{ route('home') }} @endif"><i class="fa fa-fw fa-user-circle"></i>Dashboard -> Products<span class="badge badge-success">6</span></a>
                        
                    </li>
                    @if(\Auth::user())
                    <li class="nav-item ">
                        <a class="nav-link" href=" {{ route('showOrders') }} "><i class="fa fa-fw fa-user-circle"></i>Orders <span class="badge badge-success">6</span></a>
                        
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link" href=" {{ route('showUsers') }} "><i class="fa fa-fw fa-user-circle"></i>users <span class="badge badge-success">6</span></a>
                        
                    </li>
                    @endif
                  
                    <li>
                        <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();"><i class="fas fa-power-off mr-2"></i>Logout</a>
                        <form id="logout-form1" action="{{ route('logout') }}" method="POST" class="d-none">
                            @csrf
                        </form>
                    </li>
                   
                </ul>
            </div>
        </nav>
    </div>
    @endif
</div>
<!-- ============================================================== -->
<!-- end left sidebar -->
