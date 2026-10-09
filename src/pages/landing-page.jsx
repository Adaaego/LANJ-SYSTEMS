import Nav from "../components/NavBar"
import Hero from "../components/Hero";
import About from "../components/About";
import Products from "../components/Products";
import Target from "../components/Target";


const LandingPage = () =>{
    return(
        <div>
            <Nav/>
            <Hero/>
            <About/>
            <Products/>
            <Target/>
            

        </div>
    )
}

export default LandingPage;