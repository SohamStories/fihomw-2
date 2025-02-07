import Link from "next/link"
import Image from "next/image"


export const Headerlogo = () => {

return (
    <Link href="/">
        <div className="items-center hidden lg:flex">
             <Image
                   src="/images/tt.png" // Path relative to the `public` folder
                   alt="Description of the image"
                   width={30} // Set desired width
                   height={30} // Set desired height
                   className="rounded-lg shadow-black"
                 />
                 <p className="font-semibold text-white text-2xl ml-2.5">
                    FinHome
                 </p>
        </div>

    </Link>
)
}