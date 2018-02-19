export default class AuthServiceMock {
    constructor() { }

    signup(returnVal) { return returnVal; }

    login(returnVal) { return returnVal; }

    loggedIn(returnVal) { return returnVal; }

    isTokenExpired(returnVal) { return retrunVal; }

    setToken(idToken) { }

    getToken(returnVal) { return returnVal; }

    logout() { }

    getProfile(returnVal) { return returnVal; }

    fetch(url, body, headers, returnVal) { return returnVal; }

    _checkStatus(response) { }
}
