let changeRol_btn = document.getElementsByClassName("changeRol_btn");
let delete_btn = document.getElementsByClassName("delete_btn")
let deleteInactives_btn = document.getElementById("deleteInactives_btn")


changeRol_btn = Array.from(changeRol_btn);
delete_btn = Array.from(delete_btn);

changeRol_btn.map(async e => {
    e.addEventListener("click", async evt => {
        evt.preventDefault();
        const id = e.id;
        await fetch(`/api/sessions/premium/${id}`, {
            method: 'put',
            headers: {
                'content-type': "aplication/json"
            }
        }).then(response => {
            if (response.status === 200) {
                Toastify({
                    text: "Role successfully changed",
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
                window.location.reload();
            }
        })
    })
})

delete_btn.map(async e => {
    e.addEventListener("click", async evt => {
        evt.preventDefault();
        const id = e.id;

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`/api/sessions/delete/${id}`, {
                    method: 'delete',
                    headers: {
                        'content-type': "aplication/json"
                    }
                });

                if (response.status === 200) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'User successfully deleted',
                        showConfirmButton: false,
                        timer: 1900
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);

                }
            } catch (error) {
                console.error(error);
            }

        }
    });
});

deleteInactives_btn.addEventListener('click', async evt => {
    evt.preventDefault();

    try {
        const response = await fetch('/api/sessions/delete', {
            method: 'delete',
            headers: {
                'content-type': "aplication/json"
            }
        })

    } catch (error) {
        
    }
    
})