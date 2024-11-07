import { throws } from "assert";
import axios from "axios"

export const handleError = (error : any) => {
    if(axios.isAxiosError(error)){
        var err = error.response;
        if(Array.isArray(err?.data.errors)){
            for(let val of err?.data.errors){
                throw new Error(val.discription);
            }
        }else if (typeof err?.data.errors === 'object'){
            for(let e in err?.data.errors){
                throw new Error(err.data.errors[e][0]);
            }
        } else if (err?.data){
            throw new Error(err.data);
        } else if (err?.status == 401){
            window.history.pushState({},"LoginPage", "/login");
            throw new Error("Please login");
        } else if (err){
            throw new Error(err?.data);
        }
    }
}