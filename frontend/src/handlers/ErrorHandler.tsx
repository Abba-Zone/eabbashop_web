import axios from "axios"

export const handleError = (error : any) => {
    if(axios.isAxiosError(error)){
        var err = error.response;
        if(Array.isArray(err?.data.errors)){
            for(let val of err?.data.errors){

            }
        }else if (typeof err?.data.errors == 'object'){
            for(let e in err?.data.errors){

            }
        } else if (err?.data){

        } else if (err?.status == 401){

            window.history.pushState({},"LoginPage", "/login");
        } else if (err){

        }
    }
}