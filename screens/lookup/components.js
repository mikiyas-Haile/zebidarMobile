
export default function loadStatuss(callback) {
    const xhr = new XMLHttpRequest()
    const method = 'GET' // "POST"
    const url = "http://127.0.0.1:8000/api/status"
    const responseType = "json"
    xhr.responseType = responseType
    xhr.open(method, url)
    // xhr.setRequestHeader('Authorization', `Token 02f3ba811775a5e2a67e8dc9ad8b69c56d0aedbe4561c59ebe984b3a006cf3ed0548c11b5f64cd1b77d1776dfa73991b5baab9e328c9782e69e4d0d655a1f81c`)
    xhr.onload = function() {
      callback(xhr.response, xhr.status)
    }
    xhr.onerror = function (e) {
      console.log(e)
      callback({"message": "The request was an error"}, 400)
    }
    xhr.send()
  }

  