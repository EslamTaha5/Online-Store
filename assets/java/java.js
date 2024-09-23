function logout(){
    fetch('/logout', {
        method: 'POST',
        credentials: 'same-origin'
    }).then(response => {
        if (response.ok) {
            window.location.href = '/'; // Redirect or refresh after logout
        }
    });
}
