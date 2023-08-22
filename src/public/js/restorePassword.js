



const restorePassword_frm = document.getElementById("restorePasswordFrm");
const message_p = document.getElementById('message');
const urlParams = new Proxy(new URLSearchParams(window.location.search),{
    get: (searchParams, prop) => searchParams.get(prop)
});

restorePassword_frm.addEventListener("submit", async evt => {
    evt.preventDefault();
    const data = new FormData(restorePassword_frm);
    const obj = Object.fromEntries(data);
    obj.token = urlParams.token;
    
    const response = await fetch("/api/sessions/restorePassword", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
        
    })
        const responseData = await response.json();
        if (responseData.status === "success"){
            message_p.innerText = responseData.message
            window.location.replace('login');
        }else{
            message_p.innerText = responseData.error;
        }
        
})