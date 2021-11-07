import React, {useEffect, useState} from 'react';

export function loadGroups(callback) {
    const xhr = new XMLHttpRequest()
    const method = 'GET' // "POST"
    const url = "http://localhost:8000/api/profile/my-notifications"
    const responseType = "json"
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function() {
      callback(xhr.response, xhr.status)
    }
    xhr.onerror = function (e) {
      console.log(e)
      callback({"message": "The request was an error"}, 400)
    }
    xhr.send()
  }
export default loadGroups