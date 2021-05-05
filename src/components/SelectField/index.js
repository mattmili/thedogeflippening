import { Select } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const SelectField = withStyles((theme) => ({
    root: {
        '& fieldset': {
            borderColor: theme.palette.divider,
        },
        '&:focus': {
            background: 'transparent'
        },
    },
    icon: {
        fill: theme.palette.text.primary,
    }
}))(({ children, classes, ...props }) => {
    return (
        <Select
            className={classes.root}
            inputProps={{
                classes: {
                    root: classes.root,
                    icon: classes.icon,
                }
            }}
            {...props}
        >
            {children}
        </Select>
    );
});

export default SelectField;