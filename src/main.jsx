import {createRoot} from 'react-dom/client'
import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import App from './components/App/App.jsx'
import './index.css'
import theme from "./theme.js";


createRoot(document.getElementById('root')).render(
    <>
        <ColorModeScript/>
        <ChakraProvider theme={theme} toastOptions={{defaultOptions: {position: 'top'}}}>
            <App/>
        </ChakraProvider>
    </>
)
