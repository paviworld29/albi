
import { Dimensions } from "react-native"

export const wp =(Value)=>{
    return Dimensions.get('window').width/100*Value
}
export const hp =(Value)=>{
    return Dimensions.get('window').height/100*Value
}