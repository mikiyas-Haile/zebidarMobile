import {lookup} from '../lookup'

export function apiStatusCreate(newStatus, callback, token){
    lookup("POST", "/api/status-create", callback, token,{body: newStatus})
  }

export function apiStatusAction(statusId, action,token, callback){
    const data = {id: statusId, action: action}
    lookup("POST", "/api/status/action", callback,token, data)
}
  
export function apiStatusList(callback, token) {
    lookup("GET", "/api/status", callback,token)
}
export function apiFeedList(callback, token) {
    lookup("GET", "/api/feed", callback,token)
}
export function apiStatusDetail(statusId,token,callback) {
    lookup("GET", `/api/status/${statusId}`, token,callback)
}
export function apiGroupAction(groupId, action,token, callback){
    const data = {id: groupId, action: action}
    lookup("POST", "/api/groups/action", callback, token,data)

}