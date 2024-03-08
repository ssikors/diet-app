"use client"

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: ReactNode;
};

const Provider = (props: Props) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};

export default Provider;
