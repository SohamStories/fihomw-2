import Authside from "@/components/auth/authside";
import LoginForm from "@/components/auth/login-form";

const LoginPage = () => {

    return (
<div className=" grid grid-cols-1 lg:grid-cols-2 ">

        <div className=" h-screen flex items-center justify-center bg-gradient-to-b  from-gray-300  to-gray-100">
                <LoginForm/>
        </div>
        <div>
            <Authside/>
        </div>
</div>
    )
}

export default LoginPage ;