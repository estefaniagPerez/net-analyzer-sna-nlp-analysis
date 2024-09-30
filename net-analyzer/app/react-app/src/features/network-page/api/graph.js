import axios from 'axios';

axios.defaults.baseURL = "http://" + location.host ;
export function getGraph(dataset) {

    // Fetch graph data from the backend API
    return axios.get('/api/graph/' + dataset)
    .then(response => {
        const result = response.data;
        var data = undefined;
        if (!result || result.status !== 1 || !result.graph_data) {
            console.log(result);
            return undefined;
        }

        data = result.graph_data;
        //console.log("GRAPH", result.graph_data);
        // Prepare nodes for Highcharts
        //const scalingFactor = 500; 
       /*let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

        const margin = 50; // Adjust as needed
        const desiredMinX = -250 + margin;
        const desiredMaxX = 250 - margin;
        const desiredMinY = -250 + margin;
        const desiredMaxY = 250 - margin;
        const scaleX = (desiredMaxX - desiredMinX) / (maxX - minX);
        const scaleY = (desiredMaxY - desiredMinY) / (maxY - minY);
*/
        const nodes = data.nodes.map(node => ({
            id: node.id,
            //x: desiredMinX + (node.x - minX) * scaleX,
            //y: desiredMinY + (node.y - minY) * scaleY,
            x: node.x,
            y: node.y,
            marker: {
                radius: node.degree_centrality * 10 + 3,
            },
            color: node.is_bridge && node.degree_centrality <= 0.1? '#FF4191':'#9DBDFF',
        }));

        const bridges = data.nodes.filter( node => node.is_bridge);
        const influencers = data.nodes.filter( node => node.degree_centrality > 0.1);

        console.log("STEP 2");
        // Prepare edges for Highcharts
        const edges = data.edges ? data.edges.map(edge => ({
            from: edge.source,
            to: edge.target,
            color: '#808080',
            width: 1,
          })) : []; 


        console.log("STEP 3");
        // Set Highcharts options
        var options = {
            chart: {
                type: 'networkgraph',
                zoomType: 'xy', // Enable zooming
                panning: true,  // Enable panning
                panKey: 'shift', // Hold shift to pan
            },
            title: {
                text: '',
            },
            plotOptions: {
                networkgraph: {
                //keys: ['from', 'to'],
                layoutAlgorithm: {
                    enableSimulation: false,
                    initialPositions: 'specified', // Start from random positions
                },
                },
            },
            series: [{
                data: edges,
                nodes: nodes,
                dataLabels: {
                    enabled: false,
                    linkFormat: '',
                    allowOverlap: true,
                    style: {
                        textOutline: false,
                    },
                },
            }],
        };

        console.log("STEP 4");
        return [options, influencers, bridges];
    })
    .catch(error => {
        console.error('Error fetching graph data:', error);
        return {};
    });
    
}
