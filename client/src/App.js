import { Outlet } from 'react-router-dom';
import './App.css';
import { ReactRouterAppProvider } from "@toolpad/core/react-router"

import { NAVIGATION } from "./components/libs/consts/navigation"
import floraflowLogo from "./media/images/logos/floraflowLogo.png"
import { createTheme } from "@mui/material"

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { 
        light: true,
        dark: false 
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});

function App() {
  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src={floraflowLogo} alt="FloraFlow logo with greenleaf" />,
        title: "",
        homeUrl: "/dashboard"
      }}
      theme={demoTheme}
    >
      <Outlet />
    </ReactRouterAppProvider>
  );
}

export default App;
