import Footer from "./components/Footer"
import LoginForm from "./components/LoginForm"
import Navbar from "./components/Navbar"

export default function Login(){
    return(
        <>
        <header className="sticky top-0 overflow-x-hidden overflow-y-hidden">
            <Navbar/>
        </header>
            <LoginForm/>

        <footer>
            <Footer/>
        </footer>
            
        </>
        
    )
}