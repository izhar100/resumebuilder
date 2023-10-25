import { ADD_PERSONAL_DETAILS, ADD_REQ } from "./actionType"

export const personalDetails=(data)=>(dispatch)=>{
    dispatch({type:ADD_REQ})
    dispatch({type:ADD_PERSONAL_DETAILS,payload:data})
}