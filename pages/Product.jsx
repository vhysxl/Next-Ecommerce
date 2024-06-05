import Navbar from "./components/Navbar";
import Catalog from "./components/Catalog";
import Footer from "./components/Footer";

export default function Product() {
  return (
    <>
    <header className="sticky top-0 overflow-x-hidden overflow-y-hidden z-50">
      <Navbar/>
    </header>
    <div className="bg-gray-100 p-4">
      <Catalog/>    
    </div>
    <footer>
      <Footer/>
    </footer>
    </>
  );
}
