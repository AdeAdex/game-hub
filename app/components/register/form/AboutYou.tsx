import React from "react";
import Link from "next/link";

const AboutYou = () => {
  return (
    <main className="flex flex-col gap-[25px]">
        {/* About you */}
      <div className="border rounded-sm border-[#CDCDCD] py-3 px-4 flex flex-col gap-[10px]">
        <h3>About you</h3>
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          <span className="my-auto">
            I'm interested in playing or downloading games on adex
          </span>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          <span className="my-auto">
            I'm interested in distributing content on adex.co
          </span>
        </div>
        <div>
          You can change your responses to these questions later, they are used
          to hint adex.co in how it should present itself to you.
        </div>
      </div>

      {/* Terms and condition */}
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          <span className="my-auto">
            Sign me up for the bi-monthly adex digest newsletter
          </span>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          <div className="my-auto flex gap-1">
            <span className="my-auto">I accept the </span>
            <Link href="" className="text-red-500 my-auto underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutYou;
