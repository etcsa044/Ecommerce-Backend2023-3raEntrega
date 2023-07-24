
let add_btn = document.getElementsByClassName("add_btn");
let cartId = document.getElementById("cartId")
add_btn = Array.from(add_btn);

add_btn.map( e => {
    e.addEventListener('click', async evt => {
        evt.preventDefault();
        const cid = cartId.innerText;
        const pid = e.id;
        
        await fetch(`api/carts/${cid}/product/${pid}`,{
            method:'PUT',
            headers:{
                'content-type':"aplication/json"
            }
        }).then( response => {
            if(response.status===200){
                alert('Added') //move to swalfire.
            }
        })

    })
})

