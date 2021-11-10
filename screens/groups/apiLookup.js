import {lookup} from '../lookup'

export function apiGroupAction(groupId, action,token, callback){
    const data = {id: groupId, action: action}
    lookup("POST", "/api/groups/action", callback,token, data)
}
export function apiGroupPostCreate(newStatus,groupId, callback, token){
    lookup("POST", `/api/groups/${groupId}/new`, callback, token,{body: newStatus})
  }
export function apiGroupPostList(callback, groupId,token) {
    lookup("GET", `/api/groups/${groupId}/comments`, callback,token)
}