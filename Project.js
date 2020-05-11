var majorPromise = d3.csv("all-ages.csv");
majorPromise.then(function(majors)
{
    console.log("Major data",majors);
   firstgraph("#graph1",majors);
   
},
function(err)
{
   console.log("Error Loading data:",err);
});




var createLabels = function(screen,margins,graph,target)
{
    console.log("hi")
    var labels= 
        d3.select(target)
            .append("g")
            .classed("labels",true)
    
    labels.append("text")
        .text("College Majors...")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("xAxis",margins.left+(graph.width/2))
        .attr("y0Axis",margins.top)
    
    labels.append("text")
        .text("College Major")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("xAxis",margins.left+(graph.width/2))
        .attr("y0Axis",screen.height)
    
    labels.append("g")
        .attr("transform","translate(20, "+(margins.top+(graph.height/2))+")")
        .append("text")
        .text("Unemployment Rate")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
    
    labels.append("g")
        .attr("transform","translate(740, "+(margins.top+(graph.height/2))+")")
        .append("text")
        .text("Median Earnings >25 yrs age")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
    
    
    
}

var createAxes = function(screen,margins,graph,target,xScale,y0Scale,y1Scale)
{
    var xAxis = d3.axisBottom(xScale);
    var y0Axis = d3.axisLeft(y0Scale);
    var y1Axis = d3.axisRight(y1Scale)
    
    var axes = 
        d3.select(target)
            .append("g")
    axes.append("g")
        .attr("transform","translate("+margins.left+","
             +(margins.top+graph.height)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top)+")")
        .call(y0Axis)
    axes.append("g")
        .attr("transform","translate("+graph.width+","+(margins.top)+")")
        .call(y1Axis)
}

var getUnemp = function(major)
{
    return major.Unemployment_rate
}

var getMedian = function(major)
{
    return major.Median
}


                    

var drawLines = function(majors,graph,target,xScale,y0Scale,y1Scale)
{
    var lineGenerator = d3.line()
        .x(function(majors) 
            { 
            return majors.Major;
            })
        .y(function(majors)   
            { 
            return y0Scale(majors.Unemployment_rate);
            })

    
    var lines = 
        d3.select("target")
        .select("#graph1")
        .selectAll("g")
        .data(majors)
        .enter()
        .append("g")
        .classed("line",true)
        .attr("fill","none")
        .attr("stroke",function(majors) 
        { 
            return majors.Unemployment_rate;
        })
    }

var firstgraph = function(target, majors)
{
    //the size of the screen
    var screen = {width:750, height:650};
    
    //how much space will be on each side of the graph
    var margins = {top:25,bottom:40,left:70,right:15};
    
    //generated how much space the graph will take up
    var graph = 
    {
        width:screen.width-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom,
    }
    

    //set the screen size
    d3.select(target)
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    //create a group for the graph
    var g = d3.select(target)
        .append("g")
        .classed("graph",true)
        .attr("transform","translate("+margins.left+","+
             margins.top+")");
    
    var Majorlist = function(majors)
    {
    var Majormap = majors.Major.map(function(Majors)
        {
        return Major
        })
    
    return Majormap
    }
    
    //create scales for all of the dimensions
    var xScale = d3.scaleBand()
        .range([0,graph.width])
        .domain(Majorlist)
        .padding(.4)
    
    var maxUnemp = d3.max(majors, getUnemp)
    
    var y0Scale = d3.scaleLinear()
        .domain([0,maxUnemp])
        .range([graph.height,0])
   
    var maxMedian = d3.max(majors, getMedian)
    
    var y1Scale = d3.scaleLinear()
        .domain([0,maxMedian])
        .range([graph.height,0])
    
    createLabels(screen,margins,graph,target)
    createAxes(screen,margins,graph,target,xScale,y0Scale, y1Scale);
    drawLines(majors,graph,target,xScale,y0Scale,y1Scale)
    
    
}

