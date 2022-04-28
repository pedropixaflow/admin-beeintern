(function () {
    if (document.getElementById('msg')) {
        var data = new Date()

        var dia = data.getDate()
        var dia_sem = data.getDay()
        var mes = data.getMonth()
        var ano2 = data.getYear()
        var ano4 = data.getFullYear()
        var hora = data.getHours()
        var min = data.getMinutes()
        var seg = data.getSeconds()
        var mseg = data.getMilliseconds()
        var tz = data.getTimezoneOffset()

        var str_msg = ''

        if (hora >= 6 && hora < 12) str_msg = 'Tenha um bom dia.'
        else if (hora >= 12 && hora < 18) str_msg = 'Tenha uma ótima tarde.'
        else str_msg = 'Boa noite.'

        var msg = str_msg
        if ($('#msg')) $('#msg').text(msg)
    }
})()