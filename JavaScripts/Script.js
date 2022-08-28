

$(".nav-item").click(function() {
    $(".nav-item").removeClass("active");
    this.className += " active";
});