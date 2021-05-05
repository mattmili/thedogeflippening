import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, lighten } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const CustomLinearProgress = withStyles({
    root: {
        height: 15,
        backgroundColor: lighten('#ff6c5c', 0.5),
    },
    bar: {
        backgroundColor: '#ff6c5c',
    },
})(LinearProgress);

function LinearProgressWithLabel(props) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <CustomLinearProgress variant="determinate" {...props} value={props.value >= 100 ? 100 : props.value} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

export default LinearProgressWithLabel