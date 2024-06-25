import { useRouter } from "next/router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function OrderSuccess() {
  const router = useRouter();

  const handleOk = () => {
    router.push("/");
  };

  return (
    <div className="overflow-hidden">
      <Navbar />

      <div className="bg-white text-black h-screen flex flex-row justify-center items-center">
        <div className="flex flex-col justify-center items-center text-justify">
          <div className="md:w-2/4 border-4 p-4 m-2">
            <h1 className="text-2xl">
              Order kamu telah{" "}
              <span className="text-green-500 font-bold">sukses</span> Silakan
              lakukan pembayaran berupa transfer ke rekening BCA berikut sesuai
              dengan total Harga, Lalu kirimkan bukti pembayaran ke whatsapp
              kami untuk di verifikasi admin. Terima Kasih
            </h1>
          </div>
          <div className="md:w-2/4 border-4 p-4 m-2">
            <h1 className="text-2xl">
              No Rek : ----
              Atas Nama : ----
            </h1>
          </div>
          <div>
            <button
              className="bg-green-500 border-2 rounded-md h-fit m-4 p-4 border-black text-2xl text-white"
              onClick={handleOk}
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
