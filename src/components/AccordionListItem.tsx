import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type AccordionListItemProps = {
  onAccordionHeaderClick?: () => void,
  title: string,
  children: any,
  isAccordionOpen: boolean
};

export const AccordionListItem = ({
                                    onAccordionHeaderClick,
                                    title,
                                    children,
                                    isAccordionOpen = false
                                  }: AccordionListItemProps) => {

  return (
      <Accordion expanded={isAccordionOpen} >
        <AccordionSummary
          onClick={onAccordionHeaderClick}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{textAlign: 'initial'}}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
  );
}
