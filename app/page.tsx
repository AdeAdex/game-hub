import Image from "next/image";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sidebar/SideBar";
import { links, links2 } from "./lib/SideBarLinks";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { FaRandom } from "react-icons/fa";

export default function Home() {
  const apiKey = "1e9aeace29d666f7dbd95b5484c48ec120e9dea2";
  const guid = "[GUID_HERE]";

  // fetch(`https://www.giantbomb.com/api/games/?api_key=${apiKey}`)
  // fetch(`https://www.giantbomb.com/api/game/${guid}/?api_key=${apiKey}`)
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     // Handle the data here
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     // Handle errors here
  //     console.error('There was a problem with the fetch operation:', error);
  //   });

  const cards = Array.from({ length: 10 }).map((_, index) => (
    <div
      key={index}
      className="w-full md:w-[30%] lg:w-[19%] h-[300px] bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      <div className="relative w-100 h-[70%]">
        <Image
          src="/images/404_error-h_half_column_mobile.png"
          alt="logo"
          fill
          quality={100}
          className=""
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
          // priority
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl  font-semibold">Beautiful Card</h2>
        <p className="text-gray-600">Lorem ipsum dolor</p>
        {/* <div className="flex justify-between items-center mt-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
            Learn More
          </button>
        </div> */}
      </div>
    </div>
  ));

  return (
    <>
      <Navbar />
      <main className="w-100 h-screen flex flex-col md:flex-row w-full pt-[50px] md:pt-[75px] relative">
        {/* Side Bare */}
        <SideBar links={links} links2={links2} />
        <section className="mt-1 w-full md:w-[83%] bg-[#F4F4F4] md:ml-[16.6%]">
          <div className="flex flex-wrap justify-between gap-[25px] md:gap-[0px] bg-white py-[30px] px-[30px]">
            {cards}
            <div className="flex flex-col md:flex-row gap-[15px] text-[14px] justify-center w-full mt-[30px] text-center">
              <span className="my-auto">Don&apos;t see anything you like? </span>
              <Link
                href=""
                className="border border-red-500 py-[6px] px-3 text-red-500 rounded-sm flex gap-[10px] justify-center"
              >
               <span> View all games</span> <IoArrowForward className="my-auto"/>
              </Link>
              <Link
                href=""
                className="border border-red-500 py-[6px] px-3 text-red-500 rounded-sm flex gap-[10px] justify-center"
              >
                <span>View something random</span> <FaRandom className="my-auto"/>
              </Link>
            </div>
          </div>
          <Footer />
        </section>
      </main>
    </>
  );
}











