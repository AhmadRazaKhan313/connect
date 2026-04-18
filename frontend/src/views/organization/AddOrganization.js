import { Alert, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, Checkbox, FormControlLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import jwt from 'jwtservice/jwtService';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import SimpleButton from 'ui-component/SimpleButton';

function AddOrganization() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const initialValues = {
        name: '',
        email: '',
        mobile: '',
        address: '',
        subdomain: '',           // ✅ NEW
        primaryColor: '#1976d2',
        secondaryColor: '#424242',
        features: {
            smsAlerts: true,
            invoicing: true,
            expenses: true,
            extraIncome: true,
            staffManagement: true,
            ispManagement: true,
            dashboard: true
        },
        adminUser: {
            name: '',
            email: '',
            password: '',
            mobile: '',
            cnic: '',
            address: '',
            type: 'admin',
            share: 0
        }
    };

    const onSubmit = (values, { resetForm }) => {
        setIsLoading(true);
        jwt.createOrganization(values)
            .then(() => {
                setIsLoading(false);
                alert('Organization Created!');
                resetForm();
                navigate('/dashboard/all-organizations');
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.message);
                setIsError(true);
                setIsLoading(false);
            });
    };

    return (
        <>
            <h3>Add Organization</h3>
            {isError && <Alert severity="error">{errorMessage}</Alert>}
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>

                        {/* Organization Info */}
                        <h4>Organization Details</h4>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel>Organization Name</InputLabel>
                                    <OutlinedInput name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} label="Organization Name" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel>Email</InputLabel>
                                    <OutlinedInput name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} label="Email" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel>Mobile</InputLabel>
                                    <OutlinedInput name="mobile" value={values.mobile} onChange={handleChange} onBlur={handleBlur} label="Mobile" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel>Address</InputLabel>
                                    <OutlinedInput name="address" value={values.address} onChange={handleChange} onBlur={handleBlur} label="Address" />
                                </FormControl>
                            </Grid>

                            {/* ✅ NEW — Subdomain Field */}
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel>Subdomain</InputLabel>
                                    <OutlinedInput
                                        name="subdomain"
                                        value={values.subdomain}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Subdomain"
                                        inputProps={{ pattern: '[a-z0-9-]+' }}
                                    />
                                    <FormHelperText>
                                        Sirf lowercase letters, numbers aur hyphen (-). Example: bahawalpur, multan-city
                                    </FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel>Primary Color</InputLabel>
                                    <OutlinedInput name="primaryColor" value={values.primaryColor} onChange={handleChange} onBlur={handleBlur} label="Primary Color" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel>Secondary Color</InputLabel>
                                    <OutlinedInput name="secondaryColor" value={values.secondaryColor} onChange={handleChange} onBlur={handleBlur} label="Secondary Color" />
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* Feature Flags */}
                        <h4>Features</h4>
                        <Grid container spacing={1}>
                            {Object.keys(values.features).map((feature) => (
                                <Grid item xs={6} md={4} key={feature}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.features[feature]}
                                                onChange={(e) => setFieldValue(`features.${feature}`, e.target.checked)}
                                            />
                                        }
                                        label={feature}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        {/* Admin User */}
                        <h4>Admin User Details</h4>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel>Admin Name</InputLabel>
                                    <OutlinedInput name="adminUser.name" value={values.adminUser.name} onChange={handleChange} onBlur={handleBlur} label="Admin Name" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel>Admin Email</InputLabel>
                                    <OutlinedInput name="adminUser.email" value={values.adminUser.email} onChange={handleChange} onBlur={handleBlur} label="Admin Email" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel>Admin Password</InputLabel>
                                    <OutlinedInput type="password" name="adminUser.password" value={values.adminUser.password} onChange={handleChange} onBlur={handleBlur} label="Admin Password" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel>Admin Mobile</InputLabel>
                                    <OutlinedInput name="adminUser.mobile" value={values.adminUser.mobile} onChange={handleChange} onBlur={handleBlur} label="Admin Mobile" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel>Admin CNIC</InputLabel>
                                    <OutlinedInput name="adminUser.cnic" value={values.adminUser.cnic} onChange={handleChange} onBlur={handleBlur} label="Admin CNIC" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel>Admin Address</InputLabel>
                                    <OutlinedInput name="adminUser.address" value={values.adminUser.address} onChange={handleChange} onBlur={handleBlur} label="Admin Address" />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 2 }}>
                            <SimpleButton isValid={isLoading} title="Create Organization" />
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
}

export default AddOrganization;