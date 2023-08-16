



const restorePassword_frm = document.getElementById("restorePasswordFrm");
const message_p = document.getElementById('message');


restorePassword_frm.addEventListener("submit", async evt => {
    evt.preventDefault();
    const data = new FormData(restorePassword_frm);
    const obj = Object.fromEntries(data);
    
    const response = await fetch("/api/sessions/restorePassword", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
        
    })
        const responseData = await response.json();
        if (responseData.status === "success"){
            message_p.innerText = "The verification email has been successfully delivered."
        }else{
            message_p.innerText = responseData.error;
        }
        
})