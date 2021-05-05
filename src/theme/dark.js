import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Inter',
            'Arial'
        ].join(','),
    },
    palette: {
        common: {
            white: '#FFFFFF',
            black: '#000000'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#929AA5'
        },
        primary: {
            main: '#15C8B1'
        },
        secondary: {
            light: '#a7aeb7',
            main: '#929AA5',
            dark: '#666b73',
            contrastText: '#000'
        },
        red: {
            main: '#ff6363',
            highlight: '#ff7c7c'
        },
        green: {
            main: '#17c089',
            highlight: '#3be8b0'
        },
        background: {
            paper: '#000',
            default: '#000',
            highlight: '#252626'
        },
        text: {
            primary: '#e8e6e3',
            secondary: '#b3b6b3'
        },
        divider: '#2F3135'
    },
    overrides: {
        MuiAppBar: {
            colorDefault: {
                backgroundColor: '#2f3542',
            }
        },
        MuiListItemIcon: {
            root: {
                color: '#666766'
            }
        }
    }
});



export default theme
