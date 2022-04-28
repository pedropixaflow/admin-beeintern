$('.dropdown').on('show.bs.dropdown', function () {
    let scrolltable = document.getElementById("scrolltable")

    if (scrolltable) scrolltable.style.overflowY = "inherit"
})

$('.dropdown').on('hide.bs.dropdown', function () {
    let scrolltable = document.getElementById("scrolltable")

    if (scrolltable) scrolltable.style.overflowY = "auto"
})