function privaFunc() {
    if (sessionStorage.USER_CARGO == "Tecnico") {
        body.innerHTML = `<h1>ERRO</h1>`;
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Esta página não exite!',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location = "../cadastroUnidade.html"
            }
        })
    }
}



