import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Image from "next/image";

export default function Aboutus() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="bg-white h-fit pt-6">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 pt-6">
          <Image
            src="/aboutus3.jpg"
            width={350}
            height={400}
            alt="Picture of the author"
            className="border-4 border-black lg:block"
          />
          <Image
            src="/aboutus2.jpg"
            width={285}
            height={300}
            alt="Picture of the author"
            className="border-4 border-black hidden lg:block"
          />
        </div>
        <div className="text-black text-center px-6 pt-6">
          <h1 className="text-3xl font-bold mb-4">Tentang Kami</h1>
          <div className=" md:w-3/4 pb-32 lg:w-2/4 mx-auto">
            <p className="text-lg text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
              malesuada. Nullam ac erat ante. Proin viverra et magna et
              facilisis. Suspendisse potenti. Phasellus eu justo quis elit
              tincidunt facilisis. Nulla facilisi. Curabitur convallis interdum
              sem, non vehicula orci fermentum in. Sed nec dapibus eros. Duis
              efficitur, risus ut facilisis auctor, nunc turpis elementum
              ligula, eget tempor urna arcu in nunc.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
