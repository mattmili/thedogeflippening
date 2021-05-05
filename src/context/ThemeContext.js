import {
    useContext,
    useState,
    createContext,
    useEffect
} from 'react';
import { ThemeProvider } from '@material-ui/core/styles'
import getTheme from '../theme/base';

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export function useTheme() {
    return useContext(ThemeContext)
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext)
}

const CustomThemeProvider = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(false)

    useEffect(() => {
        const currentTheme = localStorage.getItem('isDark') != undefined ? (localStorage.getItem('isDark') === 'true') : false
        setDarkTheme(currentTheme)
    }, [])

    const toggleTheme = () => {
        setDarkTheme(darkTheme => !darkTheme)
        localStorage.setItem('isDark', !darkTheme)
    }

    const theme = getTheme(darkTheme);

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </ThemeUpdateContext.Provider >
        </ThemeContext.Provider >
    );
}

export default CustomThemeProvider;