const svg = d3.select('.canvas')
    .append('svg')
        .attr('width',1400)
        .attr('height',600);

//Create margins and dimensions
const margin = {top:20, bottom:20, right:20, left:20};
const graphWidth = 1400 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform',`translate(${margin.left},${margin.top})`);

const update = (data) => {

    const y = d3.scaleLinear()
        .domain([0,750])
        .range([graphHeight,0]);
    
    const x = d3.scaleBand()
        .domain(data.map((d,i) => i))
        .range([0,1400])
        .paddingInner(0.2)
        .paddingOuter(0.2);

    const rects = graph.selectAll('rect')
        .data(data)
    
    rects.attr('width',x.bandwidth)
        .attr('height', (d,i) => graphHeight - y(d))
        .attr('fill', 'blue')
        .attr('x', (d,i) => x(i))
        .attr('y', (d,i) => y(d));

    //append the enter selection
    rects.enter()
        .append('rect')
            .attr('width',x.bandwidth)
            .attr('height', (d,i) => graphHeight - y(d))
            .attr('fill', 'blue')
            .attr('x', (d,i) => x(i))
            .attr('y', (d,i) => y(d));
}

const data = [];
for (let i = 0; i < 500; i++) {
    data.push(randomIntFromInterval(5, 730));
    console.log(data[i]);
}

update(data);

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}