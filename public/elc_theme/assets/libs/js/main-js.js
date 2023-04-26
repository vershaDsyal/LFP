
jQuery(document).ready(function($) {
    'use strict';

    // ============================================================== 
    // Notification list
    // ============================================================== 
    if ($(".notification-list").length) {

        $('.notification-list').slimScroll({
            height: '250px'
        });

    }

    // ============================================================== 
    // Menu Slim Scroll List
    // ============================================================== 


    if ($(".menu-list").length) {
        $('.menu-list').slimScroll({

        });
    }

    // ============================================================== 
    // Sidebar scrollnavigation 
    // ============================================================== 

    if ($(".sidebar-nav-fixed a").length) {
        $('.sidebar-nav-fixed a')
            // Remove links that don't actually link to anything

            .click(function(event) {
                // On-page links
                if (
                    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                    location.hostname == this.hostname
                ) {
                    // Figure out element to scroll to
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    // Does a scroll target exist?
                    if (target.length) {
                        // Only prevent default if animation is actually gonna happen
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: target.offset().top - 90
                        }, 1000, function() {
                            // Callback after animation
                            // Must change focus!
                            var $target = $(target);
                            $target.focus();
                            if ($target.is(":focus")) { // Checking if the target was focused
                                return false;
                            } else {
                                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                                $target.focus(); // Set focus again
                            };
                        });
                    }
                };
                $('.sidebar-nav-fixed a').each(function() {
                    $(this).removeClass('active');
                })
                $(this).addClass('active');
            });

    }

    // ============================================================== 
    // tooltip
    // ============================================================== 
    if ($('[data-toggle="tooltip"]').length) {
            
            $('[data-toggle="tooltip"]').tooltip()

        }

     // ============================================================== 
    // popover
    // ============================================================== 
       if ($('[data-toggle="popover"]').length) {
            $('[data-toggle="popover"]').popover()

    }
     // ============================================================== 
    // Chat List Slim Scroll
    // ============================================================== 
        

        if ($('.chat-list').length) {

            $('.chat-list').slimScroll({
            color: 'false',
            width: '100%'


        });
        }
    // ============================================================== 
    // dropzone script
    // ============================================================== 

 //     if ($('.dz-clickable').length) {
 //            $(".dz-clickable").dropzone({ url: "/file/post" });
 // }

     var current = location.pathname;
    if(current!='/home')
    {
        $('ul.navbar-nav.flex-column li a').each(function(){
            var $this = $(this);
            if($this.attr('href').indexOf(current) !== -1){
                $this.addClass(' active');

            }
        })
    }else{
      $('ul.navbar-nav.flex-column li a.dash').addClass(' active');
    }

    $("button.pafDocs").on('click', function(event) {   
       
        $('div.documentslist').toggle();
    });

    $("button.changeStatus").on('click', function(event) {   
         var $this = $(this);
        
       $this.next().next('form.updateStatus').show();
    });

    $("button.cancelStatus").on('click', function(event) {   
         var $this = $(this);
       $this.next('form.updateStatus').hide();
    });

    $("button.saveStatus").on('click', function(event) {   
         var $this = $(this);
        var formData = $this.closest('form.updateStatus').serializeArray();
       
        $.ajax({
            url : "/update-approver-status",
            type: "POST",
            data : formData,
            beforeSend: function() {
               $this.next('span.dashboard-spinner.spinner-xs').show();
            },
            success: function(data)
            {
               if(data.success){
                    $('p.text-success').text(data.message);
               }else{
                     $('p.text-danger').text(data.message);
               }
               window.setTimeout(function(){location.reload()},1500)

            },
            error: function(xhr) { // if error occured
                console.log("Error occured.please try again");
                //$(placeholder).append(xhr.statusText + xhr.responseText);
                //$(placeholder).removeClass('loading');
            },
            complete: function() {
              $this.next('span.dashboard-spinner.spinner-xs').hide();
            },
        });

    });

}); // AND OF JQUERY


// $(function() {
//     "use strict";


    

   // var monkeyList = new List('test-list', {
    //    valueNames: ['name']

     // });
  // var monkeyList = new List('test-list-2', {
    //    valueNames: ['name']

   // });



   
   

// });

