const sweetAlert = (result, alertClass, alertMessage) => {
    const formAlert = document.createElement("p");
    formAlert.className += `swal-${alertClass}`;
    formAlert.innerHTML = alertMessage; 
    
    if (result === "error") {
        return window.swal({
            content: formAlert,
            buttons: false,
            icon: "warning",
            timer: "1500"
        });
    } else if (result === "success") {
        return window.swal({
            content: formAlert,
            timer: "2000"
        });
    }
}

export default sweetAlert;