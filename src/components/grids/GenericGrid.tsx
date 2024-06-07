//external imports
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
//local imports
import AddApplicationForm from '../form/forms/AddApplicationForm';
import {
  AddAppSchema,
  add_app_schema,
  defaultValues,
} from '../form/scehmas/addAppSchema';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface Props {
  type: string | undefined;
  formLabel: string;
}

const GenericGrid = ({ type, formLabel }: Props) => {
  //TODO: depending on the type, we should use different schemas for useForm to maintain the reusability of this grid
  const methods = useForm<AddAppSchema>({
    mode: 'all',
    resolver: zodResolver(add_app_schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Grid container spacing={0} sx={{ padding: '25px', marginTop: '100px' }}>
        <Grid container item spacing={2.5} className="">
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h6" className="label" gutterBottom>
              {formLabel}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Item className="temporary" sx={{ border: 'none' }}>
              {type === 'add' ? (
                <AddApplicationForm />
              ) : (
                'This container is temporary, implmentation is out of scope for now'
              )}
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default GenericGrid;
