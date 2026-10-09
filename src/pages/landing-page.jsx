import Nav from "../components/NavBar"
import Hero from "../components/Hero";
import About from "../components/About";
import Products from "../components/Products";
import Target from "../components/Target";
import Faq from "../components/Faq";
import Footer from "../components/Footer";


const LandingPage = () =>{
    return(
        <div>
            <Nav/>
            <Hero/>
            <About/>
            <Products/>
            <Target/>
            <Faq/>
            <Footer/>
            

        </div>
    )
}

export default LandingPage;