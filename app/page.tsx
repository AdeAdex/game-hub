import Link from "next/link";
import Hero from "./components/homePage/Hero";
import Section from "./components/sidebar/Section";
import { links, links2 } from "./lib/SideBarLinks";

export default function Home() {
  return (
    <main className="w-100 h-screen flex flex-col md:flex-row w-full">
      <section className="bg-[#F4F4F4] w-[16.6%] px-[15px] pt-[15px] overflow-y-auto">
        <Section title="popular tags" links={links} />
        <Link href="" className="text-[14px] capitalize leading-[28px]">browse all tags</Link>

        <div className="mt-[30px] flex flex-col gap-y-[30px]">
          <Section title="browse" links={links2} />
          <Section title="browse" links={links2} />
          <Section title="browse" links={links2} />
          <Section title="browse" links={links2} />
        </div>
      </section>
      <section className="bg-white">main</section>
    </main>
  );
}
