import {url} from '../urls'
const host = url()
export default function loadStatuss(callback) {
    const xhr = new XMLHttpRequest()
    const method = 'GET' // "POST"
    const url = `${host}/api/feed`
    
    const responseType = "json"
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.setRequestHeader('Authorization', `Token ${token}`)
    xhr.onload = function() {
      callback(xhr.response, xhr.status)
    }
    xhr.onerror = function (e) {
      console.log(e)
      callback({"message": "The request was an error"}, 400)
    }
    xhr.send()
  }

