import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RegisterForm from "./components/RegisterForm";

export default function Register(){
    return(
        <>
        <header className="sticky top-0 overflow-x-hidden overflow-y-hidden">
            <Navbar/>
        </header>
        <RegisterForm/>
        <footer>
            <Footer/>
        </footer>
        </>
       
    )
}