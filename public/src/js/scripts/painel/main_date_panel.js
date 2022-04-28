(function () {
    const current_date_lbl = $('#data_atual')
    let current_date = new Date()
    var options = { weekday: 'long', month: 'long', day: 'numeric' }

    current_date_lbl.text(current_date.toLocaleString('pt-BR', options))
})()