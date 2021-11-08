import {lookup} from '../lookup'

export function apiGroupAction(groupId, action,token, callback){
    const data = {id: groupId, action: action}
    lookup("POST", "/groups/action", callback,token, data)
}