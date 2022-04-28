function apagarUsuario(id) {
  var remove = confirm(
    "Are you sure you want to remove this user? This action cannot be undone."
  );

  if (remove == true) {
    return (window.location.href = `/user/deletar?id=${id}`);
  }
}
