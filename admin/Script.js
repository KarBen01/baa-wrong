$(".nav-link").click(function () {
    $(".nav-link").removeClass("active");
    this.className += " active";
});

$("#newShowBtn").click(function () {
    document.getElementById("showDate").value = "";
    document.getElementById("title").value = "";
    document.getElementById("link").value = "";

    $("#save-btn")[0].onclick = (function () {
        return function () {
            addShow()
        }
    })();
});

const terminTemplate = document.querySelector("[termin-template]");
const showContainer = document.querySelector("[show-container]");
const modal = document.querySelector("[show-modal]");

let shows = [];

window.onload = function () {

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
                shows = data;
                shows.forEach(function (show) {
                    addCard(show);
                });
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}


function addCard(pElement) {
    const card = terminTemplate.content.cloneNode(true).children[0];
    const title = card.querySelector("[termin-title]");
    const date = card.querySelector("[termin-date]");
    const link = card.querySelector("[termin-link]");
    const btn = card.querySelector("[termin-button]");
    const edit_btn = card.querySelector("[edit-termin-button]");

    title.textContent = pElement.title;

    date.textContent = formatDate(pElement.date);

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

    edit_btn.onclick = (function (lId) {
        return function () {
            editShow(lId)
        }
    })(lId);

    showContainer.append(card);
}

function editShow(showId) {
    var show = shows.find(item => item.id === showId);
    const header = modal.querySelector("[modal-header]");

    header.textContent = "Edit Show";


    $("#save-btn")[0].onclick = (function (lId) {
        return function () {
            updateShow(lId)
        }
    })(show.id);

    document.getElementById("showDate").value = show.date;
    document.getElementById("title").value = show.title;
    document.getElementById("link").value = show.link;


    var myModal = bootstrap.Modal.getOrCreateInstance(modal);
    myModal.show();

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
            shows = shows.filter((obj) => obj.id !== pId);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function updateShow(pId) {
    let lDate = $("#showDate").val();
    let lTitle = $("#title").val();
    let lLink = $("#link").val();

    if (lDate !== '' && lTitle !== '' && lLink !== '') {
        var myModal = bootstrap.Modal.getInstance(modal)
        myModal.hide();
        let data = {func: "UpdateShow", id: pId, date: lDate, title: lTitle, link: lLink};
        $.ajax({
            type: "POST",
            url: "./backend/requestHandler.php",
            data: JSON.stringify(data), // serializes the form's elements.
            success: function (data) {
                let lData = {id: data + "", date: lDate, title: lTitle, link: lLink}
                var foundIndex = shows.findIndex(x => x.id === pId);
                shows[foundIndex] = lData;


                var show = $('#show' + pId)[0];
                const title = show.querySelector("[termin-title]");
                const date = show.querySelector("[termin-date]");
                const link = show.querySelector("[termin-link]");

                title.textContent = lData.title;
                date.textContent = formatDate(lData.date);
                link.textContent = lData.link;
            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
    }
}

function addShow() {
    let lDate = $("#showDate").val();
    let lTitle = $("#title").val();
    let lLink = $("#link").val();

    if (lDate !== '' && lTitle !== '' && lLink !== '') {
        var myModal = bootstrap.Modal.getInstance(modal)
        myModal.hide();
        let data = {func: "InsertShow", date: lDate, title: lTitle, link: lLink};
        $.ajax({
            type: "POST",
            url: "./backend/requestHandler.php",
            data: JSON.stringify(data), // serializes the form's elements.
            success: function (data) {
                let lData = {id: data, date: lDate, title: lTitle, link: lLink}
                shows.push(lData);
                addCard(lData);
            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
    }
}

function formatDate(lDate) {
    let format_date = new Date(lDate);
    var dd = format_date.getDate();
    var mm = format_date.getMonth() + 1; //January is 0!
    var yyyy = format_date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '.' + mm + '.' + yyyy;
}