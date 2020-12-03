import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Highlighter from "react-highlight-words";

type AccordionListItemProps = {
  onAccordionHeaderClick?: () => void,
  title: string,
  children: any,
  isAccordionOpen: boolean,
  highlightText: string[]
};

export const AccordionListItem = (
  {
    onAccordionHeaderClick,
    title,
    children,
    isAccordionOpen = false,
    highlightText
  }: AccordionListItemProps) => {
  return (
      <Accordion expanded={isAccordionOpen} >
        <AccordionSummary
          onClick={onAccordionHeaderClick}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography style={{textAlign: 'initial'}}>
            <Highlighter
              searchWords={highlightText}
              autoEscape={true}
              textToHighlight={title}
            />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
  );
}
