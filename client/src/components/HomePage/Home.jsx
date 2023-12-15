import React, { useEffect, useState } from 'react';
import './Home.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from '../../axios'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const {refresh} = useSelector((state) => state);
const [result, setresult] = useState([])
const navigate=useNavigate()
useEffect(() => {
  console.log("Hellpp");
  axios.get('/admin/allservices')
    .then((response) => {
      if (!response.data.err) {
        setresult(response.data.result);
      }
    })
    .catch(() => {
      navigate('/error');
    });
}, [navigate, refresh]); 

const imgUrl='https://server.autoaid.online/uploads/' 
const openMap=(name)=>{
  navigate('/location', { state: { serviceName: name } });

}
  return (
   <>
      <div className='background'>
        <div style={{ width: '50%' }}>
          <img className='background-img' src="https://autoaid.in/wp-content/uploads/2023/10/auto-aid-logo.png" alt="logo" />
          <h1>
            <span className="animated-text">Drive with confidence, your virtual garage is just a tap away</span>
          </h1>
        </div>
        <div style={{ width: '50%' }}>
          <h1 className='home-quotes'>&emsp;Any Time <br/> &nbsp; &nbsp;Any Where <br/> Aid For Vehicle</h1>
        </div>
      </div>
      <div className='secondPage'>
        <h1 className='services'>Our Services</h1>
     
  <div className='cards'>
  {result.map((card, index) => (
    <Card key={index}  className='card-size' style={{ borderRadius: '15px' }}>
      <CardActionArea>
        {card.image.map((img, imgIndex) => (
          <CardMedia
          onClick={()=>openMap(card.serviceName)}
            key={imgIndex}
            component="img"
           className='card-image'
            
            image={imgUrl+img.filename}
            alt={card.serviceName}
          />
        ))}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: 'Monomaniac One, sans-serif', textAlign: 'center' }}>
            {card.serviceName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ))}
</div>
      </div>
      <div className='Third-page'>
        <h2 className='whyAutoAid'> Why AutoAid ?</h2>
        <p className=' home-para'  > Auto Aid, as the name suggests, acts as a helping hand for Automobile users. 
          It is an app to help users connect to Automotive Service Providing firms and skilled mechanics.</p>
          <p className=' home-para'  >Using Auto Aid, users can search for the best and reasonable, timely service provider at their desired locations.
             They need to choose their nearby area from the Active Service <br/> Providers List.</p>
          <p className=' home-para'  >In short, the user can carry a garage on his phone. 
              Helping our users to enjoy a hassle-free voyage across Kerala is the primary intention behind the development of Auto Aid.</p>
      </div>
      <div className='footer'></div>
    </>
   
  );
}

export default Home;
