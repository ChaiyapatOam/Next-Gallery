import Link from "next/link";
import React from "react";
import { MyDialog } from "./MyDialog";
import {
  ChangeGalleryCover,
  createData,
  getImageByGallery,
  getImageFolder,
} from "../lib/Supabase";
import { UploadGallery } from "./UploadGallery";
import Image from "next/image";
import { NewGallery } from "./NewGallery";

export const NavBar = () => {
  return (
    <nav className="">
      {/* <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a> */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 items-center">
            <Link href="/" legacyBehavior>
              <a
                className="inline-flex items-center leading-6 font-medium transition ease-in-out duration-75 cursor-pointer text-zinc-200 rounded-md p-1"
                aria-label="Logo"
              >
                <div>
                  <Image
                    src={"/vercel.svg"}
                    alt="Vercel Logo"
                    width={280}
                    height={60}
                    style={{
                      maxWidth: "100%",
                      width: "auto",
                      height: "auto",
                    }}
                  />
                </div>
                {/* <img src="/vercel.svg" alt="vercel" /> */}
              </a>
            </Link>
            <nav className="space-x-2 ml-6 hidden lg:block">
              {/* <Link href="/" legacyBehavior>
                <a className="inline-flex items-center leading-6 font-medium transition ease-in-out duration-75 cursor-pointer text-zinc-200 rounded-md p-1">
                  Pricing
                </a>
              </Link>
              <Link href="/account" legacyBehavior>
                <a className="inline-flex items-center leading-6 font-medium transition ease-in-out duration-75 cursor-pointer text-zinc-200 rounded-md p-1">
                  Account
                </a>
              </Link> */}
            </nav>
          </div>
          <div className="flex flex-1 justify-end space-x-8">
            <NewGallery/>
            <UploadGallery />
          </div>
        </div>
      </div>
    </nav>
  );
};
