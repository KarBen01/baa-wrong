$(window).scroll(function(){
    var scrollTop = $(document).scrollTop();
    var anchors = $('body').find('section');

    for (var i = 0; i < anchors.length; i++){
        if (scrollTop > $(anchors[i]).offset().top - 57 && scrollTop < $(anchors[i]).offset().top + $(anchors[i]).height() - 57) {
            $(".nav-item").removeClass("active");
            $('#navbarNav ul li a[href="#' + $(anchors[i]).attr('id') + '"]').parent().addClass('active');

        }
        if(scrollTop === 0){
            $(".nav-item").removeClass("active");
            $('#navbarNav ul li a[href="#"]').parent().addClass('active');
        }
    }
});


$(".nav-item").click(function() {
    $(".nav-item").removeClass("active");
    this.className += " active";
    $('#navbarNav').collapse('hide');
});

