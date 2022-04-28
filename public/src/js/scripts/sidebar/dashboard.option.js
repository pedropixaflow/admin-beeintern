$(function () {
    var current = location.pathname

    $('.menu .dashboard-option').each(function () {

        var item = $(this)
        if (item.attr('href').indexOf(current) !== -1) {
            item.addClass('active')
        }
    })
})