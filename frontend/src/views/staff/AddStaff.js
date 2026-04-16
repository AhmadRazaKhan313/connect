import { Alert, FormControl, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Field, Formik } from 'formik';
import jwt from 'jwtservice/jwtService';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import SimpleButton from 'ui-component/SimpleButton';
import { STAFF_TYPES } from 'utils/Constants';

import { AddStaffValidationSchema } from '../../utils/ValidationSchemas';

function AddStaff() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const initialValues = {
        fullname: '',
        email: '',
        password: '',
        cnic: '',
        mobile: '',
        address: '',
        sendWelcomeMessage: true
    };

    const onSubmit = (values, { resetForm }) => {
        setIsLoading(true);
        jwt.addStaff(values)
            .then((res) => {
                setIsLoading(false);
                alert('Staff Added');
                resetForm();
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.message);
                setIsError(true);
                setIsLoading(false);
            });
    };

    const handleStaffChange = (event, setFieldValue) => {
        setFieldValue('type', event.target.value);
        event.target.value === STAFF_TYPES.staff && setFieldValue('share', 0);
    };

    return (
        <>
            <h3>Add Staff Details</h3>
            {isError && <Alert severity="error">{errorMessage}</Alert>}
            <Formik initialValues={initialValues} validationSchema={AddStaffValidationSchema} onSubmit={onSubmit}>
                {({ values, errors, isValid, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel> Full Name </InputLabel>
                                    <OutlinedInput
                                        id="fullname"
                                        name="fullname"
                                        type="text"
                                        value={values.fullname}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Full Name"
                                    />
                                    {errors.fullname && (
                                        <FormHelperText error id="standard-weight-helper-text-name">
                                            {errors.fullname}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel> Email </InputLabel>
                                    <OutlinedInput
                                        id="email"
                                        name="email"
                                        type="text"
                                        value={values.email}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Full Name"
                                    />
                                    {errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-name">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel> Password </InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="User Id"
                                    />
                                    {errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-bandwidth">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel> CNIC </InputLabel>
                                    <OutlinedInput
                                        id="cnic"
                                        name="cnic"
                                        type="text"
                                        value={values.cnic}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="User Id"
                                    />
                                    {errors.cnic && (
                                        <FormHelperText error id="standard-weight-helper-text-bandwidth">
                                            {errors.cnic}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel> Mobile </InputLabel>
                                    <OutlinedInput
                                        id="mobile"
                                        name="mobile"
                                        type="text"
                                        value={values.mobile}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Mobile"
                                    />
                                    {errors.mobile && (
                                        <FormHelperText error id="standard-weight-helper-text-bandwidth">
                                            {errors.mobile}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel> Address </InputLabel>
                                    <OutlinedInput
                                        id="address"
                                        name="address"
                                        type="text"
                                        value={values.address}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="address"
                                    />
                                    {errors.address && (
                                        <FormHelperText error id="standard-weight-helper-text-purchase-rate">
                                            {errors.address}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel> Select Staff Type </InputLabel>
                                    <Select
                                        id="type"
                                        name="type"
                                        value={values.type}
                                        onBlur={handleBlur}
                                        onChange={(event) => handleStaffChange(event, setFieldValue)}
                                        label="Staff Type"
                                        sx={{ paddingTop: '10px' }}
                                    >
                                        <MenuItem value="partner">Partner</MenuItem>
                                        <MenuItem value="staff">Staff</MenuItem>
                                    </Select>
                                    {errors.type && (
                                        <FormHelperText error id="standard-weight-helper-text-name">
                                            {errors.type}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel> Share </InputLabel>
                                    <OutlinedInput
                                        id="share"
                                        name="share"
                                        type="number"
                                        value={values.share}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="share"
                                        disabled={values.type === STAFF_TYPES.staff}
                                    />
                                    {errors.share && (
                                        <FormHelperText error id="standard-weight-helper-text-name">
                                            {errors.share}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <label htmlFor="sendWelcomeMessage">
                            <Field id="sendWelcomeMessage" name="sendWelcomeMessage" type="checkbox" checked={values.sendWelcomeMessage} />
                            Send Welcome Message
                        </label>
                        <Box sx={{ mt: 2 }}>
                            <Grid sx={{ width: '100%' }}>
                                <SimpleButton isValid={!isValid} title="Add Staff" />
                            </Grid>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
}

export default AddStaff;
