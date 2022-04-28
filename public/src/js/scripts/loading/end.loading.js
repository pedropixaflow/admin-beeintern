setTimeout(() => {
  var load_screen = document.getElementById("load_screen");
  document.body.removeChild(load_screen);

  $("#body").removeClass("display-none");
}, 1000);
