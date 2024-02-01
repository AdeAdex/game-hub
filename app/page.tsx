import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sidebar/SideBar";
import { links, links2 } from "./lib/SideBarLinks";

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

  return (
    <>
      <Navbar />
      <main className="w-100 h-screen flex flex-col md:flex-row w-full">
        {/* Side Bare */}
        <SideBar links={links} links2={links2} />
        <section className="bg-white mt-1">
          main
          <Footer />
        </section>
      </main>
    </>
  );
}
