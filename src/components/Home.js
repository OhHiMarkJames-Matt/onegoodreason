import styles from './Home.module.css'
import { useState, useEffect } from 'react';

const COLORS = [
    {
      r: 250, 
      g: 194, 
      b: 255
    },
    {
      r: 146, 
      g: 148, 
      b: 224
    },
    {
      r: 210, 
      g: 242, 
      b: 244
    },
    {
      r: 180, 
      g: 224, 
      b: 184
    },
    {
      r: 252, 
      g: 250, 
      b: 184
    },
  ]

export default function Home(){
    const [rgb, setRgb] = useState({
      r: COLORS[0].r,
      g: COLORS[0].g,
      b: COLORS[0].b
    })
    const [nextRgb, setNextRgb] = useState({
      r: COLORS[1].r,
      g: COLORS[1].g,
      b: COLORS[1].b
    })
    const [index, setIndex] = useState(1);
    const [color, setColor] = useState(rgb);
  
    //Color interval -- runs new interval on every color breakpoint.
    useEffect(()=>{
      let isRedFinished, isGreenFinished, isBlueFinished;
      isRedFinished = isGreenFinished = isBlueFinished = false;
  
      const colorInterval = setInterval(()=>{
        rgb.r > nextRgb.r ? rgb.r-- : rgb.r++;
        if(rgb.r === nextRgb.r) isRedFinished = true;
        rgb.g > nextRgb.g ? rgb.g-- : rgb.g++;
        if(rgb.g === nextRgb.g) isGreenFinished = true;
        rgb.b > nextRgb.b ? rgb.b-- : rgb.b++;
        if(rgb.b === nextRgb.b) isBlueFinished = true;
        
        if(isRedFinished && isGreenFinished && isBlueFinished){
          index < COLORS.length - 1 ? setIndex((prevValue)=> prevValue += 1) : setIndex(0);
          setRgb({...COLORS[index]});
          setNextRgb(()=> COLORS[index + 1] ? {...COLORS[index + 1]} : {...COLORS[0]});
        }
        setColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)
      },200);
        
      return ()=> clearInterval(colorInterval);
    },[rgb, nextRgb]);
  
  
    return (
      <main 
        className={styles.main}
        style={{
          backgroundColor: color,
        }}
      >
          <div className={styles.center}>Landing Page</div>
          <button
            onClick={() => document.location.replace('/list')}
          >
            Go to list
          </button>
          <div id='good-vibes'></div>
      </main>
    )
  }