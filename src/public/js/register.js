

const register_frm = document.getElementById("register_frm");


register_frm.addEventListener("submit", async evt => {
    evt.preventDefault();
    const data = new FormData(register_frm);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));
    const response = await fetch("/api/sessions/register", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const responseData = await response.json();
    console.log(responseData);

    if (responseData.status === "success") {

        try {
            alert("Registro Exitoso"); //Cambiar por Swalfire!
            window.location.replace("login");
        } catch (error) {
            console.error(error)
        }
    }

})