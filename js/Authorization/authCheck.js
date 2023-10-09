function authCheck(){
    const TOKEN = getCookie('token')
    if (!TOKEN){
        window.location = 'account-page.html'
    }
}
authCheck()
