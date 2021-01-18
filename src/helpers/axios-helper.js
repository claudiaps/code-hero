import axios from 'axios'
import md5 from 'md5'

const URL_API = 'http://gateway.marvel.com/v1/public/';
const API_PUBLIC_KEY = 'ee18dddfb0620eb5262bec5e8efefded';
const API_PRIVATE_KEY = '1e71512c636b84069d84a2703b54db5def2784da';
const TIME_STAMP = 1;
const REQUEST_LIMIT = 10;

const apiHash = md5(TIME_STAMP + API_PRIVATE_KEY + API_PUBLIC_KEY)

axios.defaults.baseURL = URL_API;

axios.defaults.params = {
    apikey: API_PUBLIC_KEY,
    hash: apiHash,
    ts: TIME_STAMP,
    limit: REQUEST_LIMIT,
}
