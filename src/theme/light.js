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
        primary: {
            light: '#3d3f40',
            main: '#0d0f11',
            dark: '#090a0b'
        },
        error: {
            main: '#ff7c7c',
        },
        warning: {
            main: '#da841e',
        },
        success: {
            main: '#3be8b0',
        },
        red: {
            main: '#ff6363',
            highlight: '#ffdede'
        },
        green: {
            main: '#17c089',
            highlight: '#7ff0cc'
        },
        // WHITE
        background: {
            paper: '#FFFFFF',
            default: '#FFFFFF',
            highlight: '#ededed'
        },
        text: {
            primary: '#000',
            secondary: 'rgb(0,0,0,0.75)'
        }
    },
    overrides: {
        MuiAppBar: {
            colorDefault: {
                backgroundColor: '#FFF',
            }
        }
    }
});

export default theme
