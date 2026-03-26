import React from 'react'
import Companies from "../components/Companies/Companies";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import GetStarted from "../components/GetStarted/GetStarted";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import HeroVideoBackdrop from "../components/HeroVideoBackdrop/HeroVideoBackdrop";
import Residencies from "../components/Residencies/Residencies";
import Value from "../components/Value/Value";


const Website = () => {
  return (
    <div className="App">
    <div className="hero-block">
      <HeroVideoBackdrop />
      <div className="white-gradient" aria-hidden="true" />
      <Hero />
    </div>
    <Companies />
    <Value/>
    <Residencies/>
    <Contact/>
    <GetStarted/>
  </div>
  )
}
export default Website
