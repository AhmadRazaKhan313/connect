import { Button } from '@mui/material';
import { THEME_COLOR_DARK } from 'utils/Constants';
import AnimateButton from './extended/AnimateButton';

function SimpleButton({ isValid, title, color = THEME_COLOR_DARK }) {
    return (
        <AnimateButton>
            <Button
                disableElevation
                disabled={isValid}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                style={{ backgroundColor: color, color: 'white' }}
            >
                {title}
            </Button>
        </AnimateButton>
    );
}

export default SimpleButton;
