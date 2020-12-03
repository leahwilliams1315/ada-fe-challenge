import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import './App.css';
import { AppDrawer } from "./components/AppDrawer";
import { AccordionListItem } from "./components/AccordionListItem";
import { AppTextCard } from "./components/AppTextCard";
import { AppImageCard } from "./components/AppImageCard";
import Logo from './assets/starFleetLogo.png';
import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: `100%`,
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  emptyState: {
    backgroundImage: `url(${Logo})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  list: {
    width: '100%'
  }
}));

type ApiNode = {
  id: number,
  title: string
}

export type VariableObj = {
  id: string,
  name: string,
  scope: string
}

export type SelectedNode = {
  id: number,
  title: string,
  content: {
    type: string,
    body?: string,
    url?: string
  }[]
  connections: null | number[]
}

function App() {
  const classes = useStyles();
  const [nodes, updateNodes] = useState<ApiNode[]>([]);
  const [openDrawer, setDrawerState] = useState(false);
  const [selectedNodeContent, setSelectedNodeContent] = useState<Partial<SelectedNode>>({});
  const [searchString, updateCurrentSearchText] = useState<string>('');
  const [variablesData, setVariablesData] = useState<VariableObj[]>([]);

  const  variableRegexMatcher = /{(.*?\|.*?)}/g;

  const getAllVariables = () => {
    fetch(`/variables`)
      .then(data => data.json())
      .then(resp => {
        setVariablesData(resp);
      });
  }

  const getNodeContent = (nodeId: number) => {
    fetch(`/nodes/${nodeId}`)
      .then(data => data.json())
      .then(resp => {
        setSelectedNodeContent(resp[0]);
      });
  }

  const searchNodesContent = (query: string) => {
    fetch(`/nodes/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query})
    })
      .then(data => data.json())
      .then(resp => {
        updateNodes(resp);
      });
  }

  const getAllNodes = () => {
    fetch('/nodes')
      .then(data => data.json())
      .then(data => updateNodes(data));
  };

  useEffect(() => {
    getAllNodes();
    getAllVariables();
  }, [])

  return (
    <div className="app">
      <AppDrawer
        isOpen={openDrawer}
        appBarTitle={selectedNodeContent.title}
        onMenuClick={() => setDrawerState(true)}
        onChevronClick={() => setDrawerState(false)}
        onSearchChange={(searchStr) => {
          updateCurrentSearchText(searchStr);
          searchStr === '' ? getAllNodes() : searchNodesContent(searchStr);
        }}
      >
        {
          nodes.map(node =>
            <AccordionListItem
              key={node.id}
              title={node.title}
              highlightText={searchString.split(' ')}
              isAccordionOpen={selectedNodeContent?.id === node.id}
              onAccordionHeaderClick={() => {
                if(selectedNodeContent?.id === node.id){
                  setSelectedNodeContent({})
                } else {
                  getNodeContent(node.id);
                }
              }}
            >
              {
                selectedNodeContent?.id === node.id && Boolean(nodes.filter(n => selectedNodeContent?.connections?.includes(n.id)).length) &&
                <List className={classes.list}>
                  {(selectedNodeContent.connections || [])
                    .map(connection =>
                      <ListItem
                        key={connection}
                        onClick={() => getNodeContent(connection)}
                        button>
                        <ListItemText
                          primary={nodes.find(node => node.id === connection)?.title}/>
                      </ListItem>)}
                </List>
              }
            </AccordionListItem>
          )}
      </AppDrawer>
      <div className={clsx(classes.content, {
        [classes.contentShift]: openDrawer,
        [classes.emptyState]: !selectedNodeContent.id
      })}>
        {
          (selectedNodeContent.content || [])
            .filter(con => con.body || con.url)
            .filter(con => !(/<\/?[a-z][\s\S]*>/i.test(con.body|| '')))
            .map((con,index) =>
              (con.type === 'text') ?
                <AppTextCard
                  key={index}
                  body={con.body || ''}
                  variables={variablesData}
                  textRegexReplacer={variableRegexMatcher}
                /> :
                <AppImageCard
                  key={index}
                  url={con.url || ''}
                />
            )
        }
      </div>
    </div>
  );
}

export default App;
