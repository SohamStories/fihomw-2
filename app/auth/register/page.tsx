import Authside from "@/components/auth/authside"
import RegisterForm from "@/components/auth/register-form"

const RegisterPage = () => {

    return (
<div className="  grid grid-cols-1 lg:grid-cols-2  ">

        <div className=" h-screen flex items-center justify-center bg-gradient-to-b  from-gray-300  to-gray-100">
                <RegisterForm/>
        </div>
        <div className="">

       
<Authside/>

        </div>
</div>
    )
}

export default RegisterPage 