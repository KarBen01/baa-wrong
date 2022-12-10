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


const terminTemplate = document.querySelector("[termin-template]");
const showContainer = document.querySelector("[show-container]");

window.onload = function() {
    getShows();
};



function getShows() {
    $.ajax
    ({
        type: "GET",
        url: "./admin/backend/requestHandler.php",
        data:
            {
                method: "FetchShows",
                param: null
            },
        cache: false,
        dataType: "json",
        success: function (data) {
            if (data !== "No Data") {
                $('#showContainer').empty();
                data.forEach(function (show) {

                    let format_date = new Date(show.date);
                    var dd = format_date.getDate();
                    var mm = format_date.getMonth() + 1; //January is 0!
                    var yyyy = format_date.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    show.date = dd + '.' + mm;
                    addCard(show, yyyy);
                });
            } else {
                $('#showContainer').empty();
                temp_p = document.createElement("p");
                temp_p.className = "text-center pt-2";
                temp_p.append("Derzeit sind keine Showtermine geplant");
                document.getElementById("showContainer").append(temp_p);
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}


function addCard(pElement, pYear){
    const card = terminTemplate.content.cloneNode(true).children[0];
    const title = card.querySelector("[termin-title]");
    const dateDAy = card.querySelector("[termin-date-day]");
    const dateYear = card.querySelector("[termin-date-year]");



    title.textContent = pElement.title;
    dateDAy.textContent = pElement.date;
    dateYear.textContent = pYear;
    card.href = pElement.link;
    showContainer.append(card);
}
