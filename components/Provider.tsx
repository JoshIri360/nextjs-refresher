"use client";
import React, { ReactNode } from "react";

import { SessionProvider } from "next-auth/react";

type ProviderProps = {
  session?: any; // session is now optional
  children: ReactNode;
};

const Provider: React.FC<ProviderProps> = ({ session, children }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
