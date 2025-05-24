function  registerUser(){

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const email = document.getElementById("email").value

    if( username && password && email){

        localStorage.setItem("username", username)
        localStorage.setItem("email", email)
        localStorage.setItem("password", password)

        alert("Utilisateur enregistré avec succès !")
        window.location.href = "login.html"
    }else{
        alert("Veuillez remplir tous les champs !")
    }
}