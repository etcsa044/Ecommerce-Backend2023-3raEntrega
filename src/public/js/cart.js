

let buy_btn = document.getElementById('buy_btn')

buy_btn.addEventListener('click', evt => {
    evt.preventDefault();
        fetchData();
})

async function fetchData() {
    try {
        const response = await fetch('http://localhost:8080/api/tickets/', {
            method : "POST",
            headers:{
                'content-type':"aplication/json"
            }
        });
        const data = await response.json();
        const tid = data.payload._id;
        console.log(tid)
        if (response.status === 200) {
            window.location.href = `http://localhost:8080/ticket/${tid}`;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}