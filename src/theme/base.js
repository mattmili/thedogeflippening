import light from './light'
import dark from './dark'

export default function getTheme(isDarkTheme) {
    return (isDarkTheme ? dark : light)
}