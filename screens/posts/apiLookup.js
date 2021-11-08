import {lookup} from '../lookup'

export function apiStatusCreate(newStatus, callback, token){
    lookup("POST", "/status-create", callback, token,{body: newStatus})
  }

export function apiStatusAction(statusId, action,token, callback){
    const data = {id: statusId, action: action}
    lookup("POST", "/status/action", callback,token, data)
}
  
export function apiStatusList(callback, token) {
    lookup("GET", "/feed", callback,token)
}
export function apiStatusDetail(statusId,token,callback) {
    lookup("GET", `/status/${statusId}`, token,callback)
}
export function apiGroupAction(groupId, action,token, callback){
    const data = {id: groupId, action: action}
    lookup("POST", "/groups/action", callback, token,data)

}