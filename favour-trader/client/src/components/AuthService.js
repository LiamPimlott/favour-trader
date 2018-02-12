import jwt_decode from 'jwt-decode';
import axios from 'axios';

export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        this.fetch = this.fetch.bind(this); // React binding stuff
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    signup(firstName,lastName,streetNumber,streetName,postalCode,city,state,email,password){
        return this.fetch('/api/users/register',{
            "email": email,
            "password": password,            
            "firstName": firstName,
            "lastName": lastName,
            "streetNumber": streetNumber,
            "streetName": streetName,
            "postalCode": postalCode,
            "city": city,
            "state": state,                                  
        },{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.getToken(),
        }).then(res => {
            if (res.success && res.token) {
                this.setToken(res.token); // Setting the token in localStorage
            }
            return Promise.resolve(res);
        });
    }
    
    login(email, password) {
        // Get a token from api server using the fetch api
        return this.fetch(`/api/users/login`, {
            'email': email,
            'password': password,
        }, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.getToken(),
        }).then(res => {
            if (res.success && res.token) {
                this.setToken(res.token); // Setting the token in localStorage
            }
            return Promise.resolve(res);
        });
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = jwt_decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return jwt_decode(this.getToken());
    }

    fetch(url, body, headers) {
        return axios.post(url,
            body,
            headers,
        )
        .then(this._checkStatus)
        .then(response => response.data);
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}
