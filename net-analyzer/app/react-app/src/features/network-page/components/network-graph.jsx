import { Text, Title, Stack, Container, Box } from '@mantine/core';
import graph_image from '../../../assets/network.png';
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph';
import { UserRisks } from './user-risks.jsx';  

HighchartsNetworkgraph(Highcharts);

export const NetworkGraph = ({graphData, isLoaded, isLoading, influencers, bridges}) => {

    return (
        <>
        {isLoaded && 
          <NetworkDisplay style={{ height: '100%', width: '100vw' }} 
              graphData={graphData} influencers={influencers} bridges={bridges}/>}
        {isLoading && <NetworkLoading/>}
        {(!isLoading && !isLoaded) && <NetworkEmptyPage/>}
        </>
    );
};

export const NetworkEmptyPage = () => {
    return(
        <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="xl"
        >
            <Stack gap="xs">
                <Title order={1}>Welcome to NET-ANALYZER</Title>
                <Text size="sm">To start analyzing, select a Dataset and click on Load Network.</Text>
            </Stack>
            <img src= {graph_image} alt="Network Like Image" style={{ opacity: 0.25 }}   />
        </Stack>
    );
};

export const NetworkDisplay = ({graphData, influencers, bridges}) => {
   
  const [showUserRisks, setShowUserRisks] = useState(false);
  const [clickedNode, setClickedNode] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  

    const data = {
        chart: {
          type: 'networkgraph',
          zoomType: 'xy', // Enable zooming
          panning: true,  // Enable panning
          panKey: 'shift', // Hold shift to pan
        },
        title: {
          text: 'Loading Graph...',
        },
        plotOptions: {
          networkgraph: {
            layoutAlgorithm: {
              enableSimulation: false,
              initialPositions: 'specified', // Start from random positions
            },
          },
          point: {
            events: {
              click: function (event) {
                const chart = this.series.chart;
                const chartX = chart.pointer.chartPosition.left + this.plotX;
                const chartY = chart.pointer.chartPosition.top + this.plotY;
  
                setClickedNode(this);
                setPopoverPosition({ x: chartX, y: chartY });
                setShowUserRisks(true);
              },
            },
          },
        },
        series: [{
          data: [
            ['Node1', 'Node2'],
            ['Node2', 'Node3'],
            ['Node3', 'Node1'],
          ],
        }],
      };
      const [options, setOptions] = useState(data);

      useEffect(() => {
        if(graphData === undefined) setOptions();
        else {
          //setOptions(graphData);
          const updatedOptions = {
            ...graphData,
            plotOptions: {
              networkgraph: {
                layoutAlgorithm: {
                  enableSimulation: false,
                  initialPositions: 'specified', // Start from random positions
                },
                point: {
                  events: {
                    click: function (event) {
                      const chart = this.series.chart;
                      const chartX = chart.pointer.chartPosition.left + this.plotX;
                      const chartY = chart.pointer.chartPosition.top + this.plotY;
        
                      // Update the state with node info and popover position
                      setClickedNode(this);
                      setPopoverPosition({ x: chartX, y: chartY });
                      setShowUserRisks(true);  // Show the UserRisks component
                    },
                  },
                }
              },
            },
          };
          setOptions(updatedOptions);
        }
      }, [graphData]);
      
    
    
    return options ? (
        <Container fluid style={{ height: '90vh',  minWidth: '900px'}}>
          <Box style={{ height: '90%', minWidth: '900px' }}>
          {showUserRisks && clickedNode && (
            <div
              style={{
                position: 'absolute',
                left: popoverPosition.x,
                top: popoverPosition.y,
                zIndex: 1000,  // Ensure it floats above other content
              }}>
              <UserRisks 
                user_id={clickedNode.id} 
                is_influencer={influencers.some(node => node.id === clickedNode.id)} 
                is_bridge={bridges.some(node => node.id === clickedNode.id)} />
            </div>
          )}
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              containerProps={{ style: { height: '100%', width: '900px' } }}
            />
          </Box>
        </Container>
      ) : (
        <div>Loading graph...</div>
      );
};

export const NetworkLoading = () => {
    return (
        <Title order={1}>Loading...</Title>
    );
};