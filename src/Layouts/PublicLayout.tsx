import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const PublicLayout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-gray-950 h-screen text-white" id="public-container">
      {children}
    </div>
  );
};
