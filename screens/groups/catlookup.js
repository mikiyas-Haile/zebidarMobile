import React, {useEffect, useState} from 'react';

export function loadGroups(callback, token) {
    const xhr = new XMLHttpRequest()
    const method = 'GET' // "POST"
    const url = "https://zebidar-api-v2.herokuapp.com/api/groups/"
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
export default loadGroups