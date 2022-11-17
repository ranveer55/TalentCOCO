import PropTypes from 'prop-types';
import { useState } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useSelector } from 'react-redux';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Avatar, TextField, Typography, Autocomplete, Chip } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';




const AutocompleteStyle = styled('div')(({ theme }) => ({
    '& .MuiAutocomplete-root': {
        minWidth: 280,
        marginLeft: theme.spacing(0),
        '&.Mui-focused .MuiAutocomplete-inputRoot': {
            boxShadow: theme.customShadows.z8,
        },
    },
    '& .MuiAutocomplete-inputRoot': {
        transition: theme.transitions.create('box-shadow', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
        }),
        '& fieldset': {
            borderWidth: `1px !important`,
            borderColor: `${theme.palette.grey[500_32]} !important`,
        },
    },
}));

// ----------------------------------------------------------------------

CompanyAutoComplete.propTypes = {
    onAddCompanies: PropTypes.func,
};

export default function CompanyAutoComplete({  value, onAddCompanies }) {
    const [query, setQuery] = useState('');
    const { masterdata } = useSelector((s) => s.app)
   
    const companies = masterdata && masterdata.company ? masterdata.company : []
    const handleAddCompanies = (val) => {
        setQuery('');
        onAddCompanies(val);
    };

    return (
            <AutocompleteStyle>
                <Autocomplete
                    // size="small"
                    disablePortal
                    popupIcon={null}
                    noOptionsText={<SearchNotFound searchQuery={query} />}
                    onChange={(event, val) => handleAddCompanies(val)}
                    onInputChange={(event, value) => setQuery(value)}
                    options={companies}
                    getOptionLabel={(company) => company.name}
                    renderOption={(props, company, { inputValue, selected }) => {
                        const { name, poster } = company;
                        const matches = match(name, inputValue);
                        const parts = parse(name, matches);
                        return (
                            <Box component="li" sx={{ p: '12px !important' }} {...props}>
                                <Box
                                    sx={{
                                        mr: 1.5,
                                        width: 32,
                                        height: 32,
                                        overflow: 'hidden',
                                        borderRadius: '50%',
                                        position: 'relative',
                                    }}
                                >
                                    <Avatar alt={name} src={poster} />
                                    <Box
                                        sx={{
                                            top: 0,
                                            opacity: 0,
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            position: 'absolute',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                                            transition: (theme) =>
                                                theme.transitions.create('opacity', {
                                                    easing: theme.transitions.easing.easeInOut,
                                                    duration: theme.transitions.duration.shorter,
                                                }),
                                            ...(selected && {
                                                opacity: 1,
                                                color: 'primary.main',
                                            }),
                                        }}
                                    >
                                        <Iconify icon="eva:checkmark-fill" width={20} height={20} />
                                    </Box>
                                </Box>

                                {parts.map((part, index) => (
                                    <Typography key={index} variant="subtitle2" color={part.highlight ? 'primary' : 'textPrimary'}>
                                        {part.text}
                                    </Typography>
                                ))}
                            </Box>
                        );
                    }}
                    renderTags={(value, getTagProps) =>
                        value.map((company, index) => {
                            const { id, name, poster } = company;
                            return (
                                <Chip
                                    {...getTagProps({ index })}
                                    key={id}
                                    size="small"
                                    label={name}
                                    color="info"
                                    poster={<Avatar alt={name} src={poster} />}
                                />
                            );
                        })
                    }
                    value={value}
                    renderInput={(params) => <TextField {...params} placeholder={value && value.length === 0 || !value ? 'Company' : ''} />}
                />
            </AutocompleteStyle>
    );
}
