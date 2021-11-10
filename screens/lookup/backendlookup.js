import {url} from '../urls'
const host = url()

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  
export function lookup(method, endpoint, callback, token,data) {
  let jsonData;
  if (data){
    jsonData = JSON.stringify(data)
  }
  const xhr = new XMLHttpRequest()
  const url = `${host}${endpoint}`
  xhr.responseType = "json"
  const csrftoken = getCookie('csrftoken');
  xhr.open(method, url)
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.setRequestHeader('Authorization', `Token ${token}`)
  xhr.onload = function() {
    if (xhr.status === 403){
      alert("You are not logged in. Please Login to Zebidar.")
      window.location.reload()
    }else if (xhr.status === 404){
      alert("Page wasn't found.")
    }else if(xhr.status === 500){
      alert("There is an internal server error. Please try again later.")
    }
    callback(xhr.response, xhr.status)
  }
  xhr.send(jsonData)
}
