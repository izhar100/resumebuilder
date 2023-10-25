import { ADD_EDUCATION, ADD_EXPERIENCE, ADD_PERSONAL_DETAILS, ADD_PROJECT, ADD_REQ, ADD_SKILLS } from "./actionType"

const initState={
    personalData:{},
    educations:[],
    experiences:[],
    skills:{},
    projects:[],
    loading:false
}

export const reducer=(state=initState,{type,payload})=>{
    switch(type){
        case ADD_REQ:{
            return {
                ...state,loading:true
            }
        }
        case ADD_PERSONAL_DETAILS:{
            return {
                ...state,loading:false,personalData:payload
            }
        }
        case ADD_EDUCATION:{
            return {
                ...state,loading:false,educations:payload
            }
        }
        case ADD_EXPERIENCE:{
            return {
                ...state,loading:false,experiences:payload
            }
        }
        case ADD_SKILLS:{
            return {
                ...state,loading:false,skills:payload
            }
        }
        case ADD_PROJECT:{
            return {
                ...state,loading:false,projects:payload
            }
        }
        
        default:{
            return state
        }
    }
}