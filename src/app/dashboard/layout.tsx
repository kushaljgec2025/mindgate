import React from "react";
import Header from "../_components/Header/page";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
    
      {children}
    </div>
  );
}

export default layout;
