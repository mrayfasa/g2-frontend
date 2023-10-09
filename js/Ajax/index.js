function AjaxRequest(url, method, body, callback){
    var xhttp = new XMLHttpRequest();
    const TOKEN = getCookie("token");
    xhttp.open(method, url, true); 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Authorization", "Bearer " + TOKEN);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Response
            callback(JSON.parse(this.responseText));
        } else if (this.readyState == 4 && this.status == 401){
            // if token expire or invalid delete token
            setCookie('token', '', -1)
        }
    };
    xhttp.send(JSON.stringify(body));
}