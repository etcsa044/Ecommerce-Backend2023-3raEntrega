



const restoreRequest_frm = document.getElementById("restoreRequestFrm");
const message_p = document.getElementById('message');


restoreRequest_frm.addEventListener("submit", async evt => {
    evt.preventDefault();
    const data = new FormData(restoreRequest_frm);
    const obj = Object.fromEntries(data);
    
    const response = await fetch("/api/sessions/restoreRequest", {
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