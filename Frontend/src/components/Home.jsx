import React, { useEffect, useState } from 'react';
import './Home.css';
import homePic1 from '../assets/Home_Pic_1.webp';
import homePic2 from '../assets/Home_Pic_2.webp';
import homePic3 from '../assets/Home_Pic_3.webp';
import metroMap from '../assets/metro_map.webp'; 
import metroPic from '../assets/Metro_Pic.webp';

const Home = () => {
  useEffect(() => {
    const typedText = document.getElementById('typed-text');
    const texts = [" safe  ", " timely  ", " enjoyable  ", " smooth  ", " efficient  ", " relaxing  ", " memorable  ", " seamless  ", " relaxing  "];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = "";

    function type() {
      if (isDeleting) {
        currentText = texts[index].substring(0, charIndex--);
      } else {
        currentText = texts[index].substring(0, charIndex++);
      }

      typedText.innerHTML = "Make your journey " + currentText + "<span class='cursor'>|</span>";

      if (!isDeleting && charIndex === texts[index].length) {
        isDeleting = true;
        setTimeout(type, 200);         // Pause deleting
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % texts.length;
        setTimeout(type, 150);         // Pause typing 
      } else {
        setTimeout(type, isDeleting ? 100 : 150);
      }
    }

    setTimeout(type, 1000); // Initial start delay
  }, []);

  const [showMap, setShowMap] = useState(false); // Show Map visibility

  const handleButtonClick = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="home-container">
      <h1>Welcome to Islamabad Metro</h1>
      <h2 id="typed-text" className="typed-text">Make your journey <span className="cursor">|</span></h2>
      <p className="animated-paragraph">Experience the best way to travel in Islamabad with our Metro bus service. Fast, reliable, and comfortable.</p>

      <div className="row mt-4">
        <div className="col-md-4">
          <img src={homePic1} alt="Metro Station" className="img-fluid" />
          <p className="animated-paragraph">Our metro stations are equipped with modern facilities to make your journey comfortable.</p>
        </div>
        <div className="col-md-4">
          <img src={homePic2} alt="Metro Map" className="img-fluid" />
          <p className="animated-paragraph">Check out the metro map to plan your route efficiently.</p>
        </div>
        <div className="col-md-4">
          <img src={homePic3} alt="Metro Bus" className="img-fluid" />
          <p className="animated-paragraph">Our fleet of metro buses ensures timely and safe travel across the city.</p>
        </div>
      </div>

      
      <div className="metro-ticket-section">
        <h2>Metro Ticketing System</h2>
        <p className="metro-description">
          Welcome to Metro Ticketing System – your gateway to seamless and efficient metro travel. Our intuitive system provides you with easy access to metro routes, schedules, and ticketing options, ensuring a hassle-free journey across the city. Explore the vibrant and detailed map of our Metro, showcasing the route from Pak Secretariat to Saddar, with 24 strategically located stations to meet your commuting needs. Enjoy the benefits of reduced travel time, cost-effective ticketing, and a reliable transportation system designed for your convenience. Let MetroTicket simplify your daily commute, making urban travel faster, safer, and more enjoyable.
        </p>
        {!showMap && <button className="route-map-button" onClick={handleButtonClick}>Route Map</button>}
        {showMap && <img src={metroMap} alt="Metro Map" className="metro-map-img" />}
        <div>
          <img src={metroPic} alt="Metro Pic" className="metro-pic-img"/>
        </div>
      </div>
    </div>
  );
};

export default Home;