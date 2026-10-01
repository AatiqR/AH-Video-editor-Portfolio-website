import Hero from "../components/Hero";
import Client from "../components/client";
import Shot from "../components/shot";
import Workflow from "../components/workflow";
import Service from "../components/Service";
import Testimoial from "../components/Testimomial";
import Faqs from "../components/Faqs";
import Booking  from "../components/Booking";
import Footer from "../components/Footer";
import Feature from "../components/feature";



export default function Home() {
  return (
    <>
    <Hero/>
    <Client/> 
    <Shot/>
    <Service/>
    <Workflow/>
    <Feature/>
    <Testimoial/>
    <Faqs/>
    <Booking/>
    <Footer/>

    </>
  );
}
