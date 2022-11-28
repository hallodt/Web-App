function Login() {
    let data = new Object();
    data.email = $('#lgn-email').val();
    data.password = $('#lgn-password').val();
   /* console.log(data);*/

    $.ajax({
        url: `https://localhost:7068/api/Account/Login`,
        method: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (e) {
            /*console.log("Berhasil")*/
            sessionStorage.setItem("token", e.token);
            /*console.log(sessionStorage.getItem("token"));*/
            window.location.replace("../Departement/Index");
        }
    });
}