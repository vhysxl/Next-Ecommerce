import Navbar from "./components/Navbar";
import Catalog from "./components/Catalog";

export default function Product() {
  return (
    <div className="bg-gray-300 min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="px-4 py-4">
        <Catalog />
      </div>
    </div>
  );
}
