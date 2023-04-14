import React from 'react'
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

// import css 
import { Carousel} from 'react-bootstrap';


// importing components 
import RectangularCard from '../components/RectangularCard';



import '../styles/home.css'
    
let slider1 =  '/images/imp/slider1.jpg';
let slider2 =  '/images/imp/slider2.jpg';
let section1 =  '/images/imp/section1.jpg';
let section2 =  '/images/imp/section2.jpg';
let section3 =  '/images/imp/section3.jpg';
let section4 =  '/images/imp/section4.jpg';





const Home = () => {

   
    let {loading,inTrendings,specialOffers} = useSelector((state)=>state.trendingAndSpecialOffersReducer);
    

  return (
        <div id="home">
            {/* top carousel  */}
            <Carousel>
                <Carousel.Item>
                    <img className="d-block w-100" src={slider1} alt="No Image"/>
                    <Carousel.Caption> 
                        <div className="font1 heading">
                        "Stay. Connect. Discover." <br/>
                        "Affordable. Social. Unforgettable."
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={slider2} alt="No Image"/>
                    <Carousel.Caption> 
                        <div className="font1 heading">
                        "Stay, Share, Shine"<br />
                        "Safe, Social, and Satisfying"
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

          

            
            {/* famous hostels area in kota  */}
            <div className="container-fluid my-5 d-flex rectangularCardBox">
               <RectangularCard link={'talwandi'} img={section1} text="Talwandi" />
               <RectangularCard link={'mahaveerNagar'} img={section2} text="Mahaveer Nagar" />
               <RectangularCard link={'indraVihar'} img={section3} text="Indra Vihar" />
               <RectangularCard link={'rajeevGandhiNagar'} img={section4} text="Rajeev Gandhi Nagar" />
            </div>

                
          
                
        </div>        
  )
}

export default Home