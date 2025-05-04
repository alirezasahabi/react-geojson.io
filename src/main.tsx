// import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import '@/assets/index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
