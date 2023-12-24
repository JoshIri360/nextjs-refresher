"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { Baby } from "lucide-react";
import { BuiltInProviderType } from "next-auth/providers/index";

const Nav = () => {
  const isUserLoggedIn = true;
  const [toggleDropDown, setToggleDropDown] = useState<Boolean>(false);
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggleDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={40}
          height={40}
          alt="Logo"
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5 flex-center">
            <Link href="/create-prompt">
              <button className="black_btn">Create Something</button>
            </Link>
            <button
              onClick={() => signOut()}
              type="button"
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Baby />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    className="outline_btn"
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}

      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Baby
              onClick={() => setToggleDropDown((prevState) => !prevState)}
            />
            {toggleDropDown && (
              <div
                ref={dropdownRef}
                className="text-nowrap text-right absolute top-10 right-0 bg-white shadow-md rounded-md p-4 flex flex-col gap-1"
              >
                <Link
                  href="/create-prompt"
                  onClick={() => setToggleDropDown(false)}
                >
                  <button className="dropdown_link">Create Prompt</button>
                </Link>
                <Link href="/profile" onClick={() => setToggleDropDown(false)}>
                  <button className="dropdown_link">Profile</button>
                </Link>
                <button
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  type="button"
                  className="outline_btn mt-2"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    className="outline_btn"
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
