import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../urls'
const host = url()


export default function loadStatuss(token,callback) {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Token')
      if (value !== 'undefined'){
        var token = value.replace('"', '').replace('"', '')
        console.log(token)
      }else{
      }
    } catch(e) {
      console.log(e)
    }
  }
  getData()
    const xhr = new XMLHttpRequest()
    const method = 'GET' // "POST"
    const url = `${host}/api/status`
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

