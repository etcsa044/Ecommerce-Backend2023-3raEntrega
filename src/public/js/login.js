



const login_frm = document.getElementById("login_frm");


login_frm.addEventListener("submit", async evt => {
    evt.preventDefault();
    const data = new FormData(login_frm);
    const obj = Object.fromEntries(data);
    
    const response = await fetch("/api/sessions/login", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
        
    })
        const responseData = await response.json();
        if (responseData.status === "success"){
            window.location.replace("/");
        }
        // if(responseData.error.length >= 5){
        //     window.location.replace("/maxattempts")
        // };
        
})