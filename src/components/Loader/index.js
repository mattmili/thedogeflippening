import { Box, CircularProgress } from '@material-ui/core'

const Loader = () => {
    return (
        <Box
            display="flex"
            width="100%"
            height="100%">
            <Box m="auto">
                <CircularProgress size={24} />
            </Box>
        </Box>
    )
}

export default Loader;