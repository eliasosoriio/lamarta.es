import React from 'react'
import { useEffect } from "react";

function ScrollArriba() {

   useEffect(() => {
      window.scrollTo({
         top: 0,
         behavior: "smooth"
      });
   }, []);

   return null;
}

export default ScrollArriba
