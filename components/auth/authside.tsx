 import Image from "next/image"
 
 const Authside = () => {

    return (
<div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-950 to-blue-400 font-mono">
  <div className="text-center">

  <Image
        src="/images/tt.png" // Path relative to the `public` folder
        alt="Description of the image"
        width={250} // Set desired width
        height={250} // Set desired height
        className="rounded-lg shadow-black"
      />

    <h1 className="text-4xl font-bold text-white mb-4 ">
    FIN-HOME
    </h1>
    <p className="text-lg  text-white  ">
      Your Homeground for Finance
    </p>
  </div>
</div>
    )
}


export default Authside;