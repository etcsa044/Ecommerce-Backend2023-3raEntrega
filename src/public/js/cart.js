


let buy_btn = document.getElementById('buy_btn')

buy_btn.addEventListener('click', evt => {
    evt.preventDefault();
        fetchData();
})

async function fetchData() {
    try {
        const response = await fetch(`/api/tickets/`, {
            method : "POST",
            headers:{
                'content-type':"aplication/json"
            }
        });
        const data = await response.json();
        const tid = data.payload._id;
        if (response.status === 200) {
            window.location.href = `/ticket/${tid}`;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

