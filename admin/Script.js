$(".nav-link").click(function() {
    $(".nav-link").removeClass("active");
    this.className += " active";
});

const terminTemplate = document.querySelector("[termin-template]");
const showContainer = document.querySelector("[show-container]");
const modal = document.querySelector("[show-modal]");

window.onload = function() {

    getShows();
};



function getShows() {
    $.ajax
    ({
        type: "GET",
        url: "./backend/requestHandler.php",
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
                    show.date = dd + '.' + mm + '.' + yyyy;
                    addCard(show);
                });
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}


function addCard(pElement){
    const card = terminTemplate.content.cloneNode(true).children[0];
    const title = card.querySelector("[termin-title]");
    const date = card.querySelector("[termin-date]");
    const link = card.querySelector("[termin-link]");
    const btn = card.querySelector("[termin-button]");


    title.textContent = pElement.title;
    date.textContent = pElement.date;
    link.textContent = pElement.link;
    link.href = pElement.link;
    link.target = "_blank";
    card.id = "show" + pElement.id;

    let lId = pElement.id;

    let text = createElementWithClass("span", "");
    text.textContent = " Löschen";

    btn.append(text);

    btn.onclick = (function (lId) {
        return function () {
            deleteShow(lId)
        }
    })(lId);

    showContainer.append(card);
}

function editShow(show){
    const header = modal.querySelector("[modal-header]");
    header.textContent = "Edit Show";

    const title = modal.querySelector("[termin-title]");
    const date = modal.querySelector("[termin-date]");
    const link = modal.querySelector("[termin-link]");

}

function createElementWithClass(type, classes) {
    let retVal = document.createElement(type);
    retVal.className = classes;
    return retVal;
}

function deleteShow(pId) {
    let data = {func: "DeleteShow", id: pId};
    $.ajax({
        type: "POST",
        url: "./backend/requestHandler.php",
        data: JSON.stringify(data), // serializes the form's elements.
        success: function (data) {
            $('#show' + pId).remove();
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function addShow(){
    let lDate = $("#showDate").val();
    let lTitle = $("#title").val();
    let lLink = $("#link").val();

    if(lDate !== '' && lTitle !== '' && lLink !== ''){
        var myModalEl = document.getElementById('addShowModal')
        var myModal = bootstrap.Modal.getInstance(myModalEl)
        myModal.hide();
        let data = {func: "InsertShow", date: lDate, title: lTitle, link: lLink};
        $.ajax({
            type: "POST",
            url: "./backend/requestHandler.php",
            data: JSON.stringify(data), // serializes the form's elements.
            success: function(data)
            {


                let lData = {id: data, date: lDate, title: lTitle, link: lLink}
                addCard(lData);
                document.getElementById("showDate").value="";
                document.getElementById("title").value="";
                document.getElementById("link").value="";
            },
            error: function (request, status, error)
            {
                alert(request.responseText);
            }
        });
    }
}