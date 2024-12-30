import { useGoogleLogin } from "@react-oauth/google";

const GoogleLoginBtn:React.FC = () => {

    const loginButtonOnClick = useGoogleLogin({
        onSuccess: async (response:any) => {
            console.log("here")
            console.log(response.type)
            console.log("end")
            await console.log(response.access_token);
        },
        onError: (error:any) => {
            console.log(error);
        },
    });

    return (
        <button onClick={() => loginButtonOnClick()} >
            <span>Continue with Google</span>
        </button>
    );
}
export default GoogleLoginBtn;