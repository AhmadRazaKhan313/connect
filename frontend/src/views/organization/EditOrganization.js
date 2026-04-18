import { Alert, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, Checkbox, FormControlLabel, Switch } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import jwt from 'jwtservice/jwtService';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import SimpleButton from 'ui-component/SimpleButton';

function EditOrganization() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [initialValues, setInitialValues] = useState(null);

    // ─── Existing org data load karo ───────────────────────────────────────────
    useEffect(() => {
        jwt.getOrganization(id)
            .then((res) => {
                const org = res?.data;
                setInitialValues({
                    name:           org.name           || '',
                    email:          org.email          || '',
                    mobile:         org.mobile         || '',
                    address:        org.address        || '',
                    subdomain:      org.subdomain      || '',
                    primaryColor:   org.primaryColor   || '#1976d2',
                    secondaryColor: org.secondaryColor || '#424242',
                    status:         org.status         || 'active',
                    features: {
                        smsAlerts:       org.features?.smsAlerts       ?? true,
                        invoicing:       org.features?.invoicing       ?? true,
                        expenses:        org.features?.expenses        ?? true,
                        extraIncome:     org.features?.extraIncome     ?? true,
                        staffManagement: org.features?.staffManagement ?? true,
                        ispManagement:   org.features?.ispManagement   ?? true,
                        dashboard:       org.features?.dashboard       ?? true,
                    }
                });
                setIsFetching(false);
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.message || 'Organization load nahi hui');
                setIsError(true);
                setIsFetching(false);
            });
    }, [id]);

    // ─── Submit: PUT (org info) + PATCH (features) ─────────────────────────────
    const onSubmit = (values, { resetForm }) => {
        setIsLoading(true);

        const { features, ...orgData } = values;

        // Pehle org info update karo, phir features
        jwt.updateOrganization(id, orgData)
            .then(() => jwt.updateOrganizationFeatures(id, features))
            .then(() => {
                setIsLoading(false);
                alert('Organization Updated!');
                navigate('/dashboard/all-organizations');
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.message || 'Update failed');
                setIsError(true);
                setIsLoading(false);
            });
    };

    // ─── Loading state ──────────────────────────────────────────────────────────
    if (isFetching) return <h3>Loading...</h3>;
    if (isError && !initialValues) return <Alert severity="error">{errorMessage}</Alert>;

    return (
        <>
            <h3>Edit Organization</h3>
            {isError && <Alert severity="error">{errorMessage}</Alert>}

            <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
                {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>

                        {/* ── Organization Info ─────────────────────────────── */}
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

                            {/* Subdomain */}
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

                            {/* Colors */}
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

                            {/* Status Toggle */}
                            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={values.status === 'active'}
                                            onChange={(e) => setFieldValue('status', e.target.checked ? 'active' : 'inactive')}
                                            color="success"
                                        />
                                    }
                                    label={`Status: ${values.status === 'active' ? 'Active' : 'Inactive'}`}
                                />
                            </Grid>
                        </Grid>

                        {/* ── Feature Flags ─────────────────────────────────── */}
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

                        <Box sx={{ mt: 2 }}>
                            <SimpleButton isValid={isLoading} title="Update Organization" />
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
}

export default EditOrganization;