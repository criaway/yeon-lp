import React from "react";
import NavigationHeader from "./NavigationHeader";
import Footer from "./Footer";
import { LanguageProvider } from "@/context/LanguageContext";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-yeon-dark-bg text-white flex flex-col">
      <NavigationHeader />
      <div className="container px-4 py-8 pt-20 flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

const WithLanguageProvider: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <PageLayout>{children}</PageLayout>
    </LanguageProvider>
  );
};

export default WithLanguageProvider;
