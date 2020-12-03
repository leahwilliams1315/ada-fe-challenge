import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

type AppVariableSelectorProps = {
  selectedValue: string,
  values: string[],
  handleChange: (selectValue: string) => void
};

export const AppVariableSelector = ({selectedValue, values, handleChange}: AppVariableSelectorProps) => {

  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <Select
        value={selectedValue || values[0]}
        onChange={(e) => handleChange(e.target.value as string)}
      >
        {values.map(val => <MenuItem key={val} value={val}>{val}</MenuItem>)}
      </Select>
    </FormControl>
  )
};

