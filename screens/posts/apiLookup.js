import {lookup} from '../lookup'

export function apiStatusCreate(newStatus, callback){

    lookup("POST", "/status-create", callback, {body: newStatus})
  }

export function apiStatusAction(statusId, action, callback){
    const data = {id: statusId, action: action}
    lookup("POST", "/status/action", callback, data)
}
  
export function apiStatusList(callback) {
    lookup("GET", "/feed", callback)
}
export function apiStatusDetail(statusId,callback) {
    lookup("GET", `/status/${statusId}`, callback)
}
export function apiGroupAction(groupId, action, callback){
    const data = {id: groupId, action: action}
    lookup("POST", "/groups/action", callback, data)

}