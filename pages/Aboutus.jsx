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
              Usaha Baru adalah perusahaan yang bergerak di bidang penyediaan
              jasa pembuatan rolling door dan folding gate. Perusahaan ini
              didirikan pada tahun 2007 dan setahun kemudian, pindah ke daerah
              Mustika Jaya. Selama bertahun-tahun, perusahaan ini terus
              menyediakan jasa pembuatan rolling door dan folding gate hingga
              tahun 2020. Pada tahun tersebut, Usaha Baru memutuskan untuk
              memperluas layanan mereka dengan menjual aksesori yang diperlukan
              untuk pembuatan folding gate dan rolling door. Sejak saat itu,
              perusahaan perlahan-lahan mengurangi fokus pada jasa pembuatan dan
              beralih ke penjualan aksesori.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
