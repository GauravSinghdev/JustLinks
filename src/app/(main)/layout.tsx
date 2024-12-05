import Footer from "./Footer";
import Navbar from "./Navbar";
import Providers from "./provider";
import { Toaster } from "react-hot-toast";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="flex flex-col  tracking-wider">
        <div className="min-h-screen">
          <Navbar />
          <div className="flex flex-col grow gap-5 py-5">
            {children}
          </div>
        </div>
        <Footer />
      </div>
      <Toaster position="top-center" reverseOrder={false}  toastOptions={{duration: 1500,}} />
    </Providers>
  );
}
