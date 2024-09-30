import React from 'react';
import { Title, Text, AppShell, AppShellAside} from '@mantine/core';
import {ActionSidebar} from './action-sidebar'
import {NetworkGraph} from './network-graph'
import { useState } from 'react';
import { getGraph } from '../api/graph';

export const NetworkPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [graphData, setGraphData] = useState();
  const [influencerList, setInfluencerList] = useState();
  const [bridgeList, setBridgeList] = useState();

  const handleOnLoadGraph = () => {
    setIsLoading(true);
    //console.log("ENTER THE LOAD GRAPH");
    getGraph('demo_hatespeech').then(data => {
      // Use the options to render the graph
      //console.log("ENTER PETITION");
      if(data !== undefined && data.length === 3) {
        //console.log("Data OK", data);
        console.log("PRE-SETUP");
        setIsLoading(false);
        setGraphData(data[0]);
        setInfluencerList(data[1]);
        setBridgeList(data[2]);
        setIsLoaded(true);
        console.log("POST-SETUP");
      }
      else{
        //console.log("Data NO_OK");
        setIsLoaded(false);
        setIsLoading(false); 
        setGraphData();
        setInfluencerList();
        setBridgeList();
      }
    })
    .catch(error => {
      console.log("Graph load Exception");
      // Handle any errors
      setIsLoaded(false);
      setIsLoading(false);
      setGraphData();
    });
    
    console.log("EXIT THE LOAD GRAPH");
  };



  return (
    <div>
    <AppShell
      aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
      padding="md">

      <AppShell.Section>
        <NetworkGraph 
          graphData={graphData} isLoaded={isLoaded} isLoading={isLoading}
          influencers={influencerList} bridges={bridgeList}/>
      </AppShell.Section>
      
      <AppShellAside >
        <ActionSidebar onLoadGraph={handleOnLoadGraph}/>
      </AppShellAside>

    </AppShell>
    </div>
  );
};
