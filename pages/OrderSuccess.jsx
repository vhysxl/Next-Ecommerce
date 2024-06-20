import { useRouter } from "next/router"

export default function OrderSuccess(){
    const router = useRouter();

    const handleOk = () => {
        router.push("/")
    }

    return(
        <div>
            halo order kamu sukses
            <div>
                silahkan kembali
                <button className="bg-yellow-500 border-4 border-black" onClick={handleOk}>
                    Belanja lagi
                </button>
            </div>
        </div>
        
    )
}