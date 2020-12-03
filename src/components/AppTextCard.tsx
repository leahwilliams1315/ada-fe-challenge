import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import reactStringReplace from 'react-string-replace';
import { VariableObj } from "../App";
import { AppVariableSelector } from "./AppVariableSelector";
import { useState } from "react";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: '20px'
  },
  title: {
    fontSize: 14,
  },
});

type AppTextCardProps = {
  body: string,
  textRegexReplacer: RegExp,
  variables: VariableObj[]
};

export const AppTextCard = ({body, textRegexReplacer, variables}: AppTextCardProps) => {
  const classes = useStyles();

  const [selectedValues, updateSelectedValues] = useState<any>({});

  const bodyParser = (str: string) => {
    return reactStringReplace(str, textRegexReplacer, (match, i) => {
      const splitByPipeRegex = /(.*?)\|(.*)/g;
      const [[fullString, variableId, fallbackValue]] = Array.from(match.matchAll(splitByPipeRegex));
      return <AppVariableSelector
        key={variableId + i}
        selectedValue={selectedValues[variableId]}
        handleChange={(value) => updateSelectedValues({...selectedValues, [variableId]: value })}
        values={[variables.find(v => v.id === variableId)?.name || '',fallbackValue].filter(Boolean)}/>;
    })
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {bodyParser(body)}
        </Typography>
      </CardContent>
    </Card>
  );
}
