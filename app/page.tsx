import SideBar from "./components/sidebar/SideBar";
import { links, links2 } from "./lib/SideBarLinks";

export default function Home() {
  return (
    <main className="w-100 h-screen flex flex-col md:flex-row w-full">
      {/* Side Bare */}
      <SideBar links={links} links2={links2} />
      <section className="bg-white mt-1">
        main
        </section>
    </main>
  );
}
