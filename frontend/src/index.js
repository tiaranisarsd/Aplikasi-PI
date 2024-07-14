import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import "bulma/css/bulma.css";
import axios from "axios";
import "../src/style.css";
import 'buffer';
import 'process';

axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

let slideIndex = 0

export const showSlides = (n) => {
  let i;
  let slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  slides[slideIndex - 1].style.display = "block";
}

export const currentSlide = (n) => {
  showSlides(slideIndex = n);
}

export const plusSlides = (n) => {
  showSlides(slideIndex += n);
}

export const initializeSlider = () => {
  showSlides(slideIndex);
  setInterval(function() {
    plusSlides(1);
  }, 3000);
}
