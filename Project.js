var sortbyProperty = function(property)
    {
        return function(a,b)
        {
            if(a[property] == b[property])
                {return 0}
            else if (a[property] < b[property])
                {return 1}
            else
                {return -1}
        }
    }

var majorPromise = d3.csv("project_use.csv");
majorPromise.then(function(majors)
{
    console.log("Major data",majors);
    majors.sort(sortbyProperty("property"))
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
    
    /*labels.append("text")
        .text("College Majors...")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("xAxis",margins.left+(graph.width/2))
        .attr("y0Axis",margins.top)*/
    
    /*labels.append("text")
        .text("College Major")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("xAxis",margins.left+(graph.width/2))
        .attr("y0Axis",screen.height)*/
    
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
		.selectAll("text")
		.style("text-anchor", "start")
		.attr("transform", "rotate(45)")
    
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top)+")")
        .call(y0Axis)
    axes.append("g")
        .attr("transform","translate("+(graph.width+margins.left)+","+(margins.top)+")")
        .call(y1Axis)
}

var getUnemp = function(majors)
{
    return majors.Cat_Unemp
}

var getMedian = function(majors)
{
    return majors.Cat_Median
}


                    
var drawLines = function(majors,graph,target,xScale,y0Scale)
{
	
    var lineGenerator = d3.line()
        .x(function(major)
		   {
			return xScale(major.Category_Use)
		})
        .y(function(major)
		   {
			return y0Scale(major.Cat_Unemp);
		})
    
	
	   d3.select(target)
        .select(".graph")
		.append("path")
		.attr("fill","none")
        .attr("stroke","red")
		.datum(majors)
		.attr("d",lineGenerator)
    
    

 // want to make a circle that follows the mouse too 
  /*d3.select(target)
        .select(".graph")
        .append("circle") 
        .attr("class", "y")
        .style("fill", "none") 
        .style("stroke", "blue")
        .attr("r", 4)*/


    .on("mouseover", function(major)
       {var xPosition = d3.event.pageX;
        var yPosition = d3.event.pageY;
            d3.select("#tooltip")
                .style("right", xPosition + "px")
                .style("top", yPosition+ "px")
                .select("#value")
    ///???           .text()
                
        d3.select("#tooltip").classed("hidden",false)
        
       }) 
    
    .on("mouseout", function()
       {
        d3.select("#tooltip").classed("hidden",true)
       })
}

var drawLines2 = function(majors,graph,target,xScale,y1Scale)
{
	    var lineGenerator2 = d3.line()
        .x(function(major)
		   {
			return xScale(major.Category_Use)
		})
        .y(function(major)
		   {
			return y1Scale(major.Cat_Median);
		})
		
		d3.select(target)
        .select(".graph")
		.append("path")
		.attr("fill","none")
        .attr("stroke","green")
		.datum(majors)
		.attr("d",lineGenerator2)
    

    
    
    .on("mouseover", function(major)
       {var xPosition = d3.event.pageX;
        var yPosition = d3.event.pageY;
            d3.select("#tooltip")
                .style("right", xPosition + "px")
                .style("top", yPosition+ "px")
                .select("#value")
    ///???            .text()
                
        d3.select("#tooltip").classed("hidden",false)
        
       }) 
    
    .on("mouseout", function()
       {
        d3.select("#tooltip").classed("hidden",true)
       })

    }
var firstgraph = function(target, majors)
{
    //the size of the screen
    var screen = {width:755, height:650};
    
    //how much space will be on each side of the graph
    var margins = {top:25,bottom:250,left:70,right:75};
    
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
    

    
    //create scales for all of the dimensions
    var xScale = d3.scalePoint()
        .range([0,graph.width])
        .domain(majors.map(function(major)
        {
        return major.Category_Use;
        }))
        .padding(.4)
       
    
    var maxUnemp = d3.max(majors, getUnemp)
    
    var y0Scale = d3.scaleLinear()
        .domain([0,maxUnemp])
        .range([graph.height,0])
   
    var maxMedian = d3.max(majors, getMedian)
    
    var y1Scale = d3.scaleLinear()
        .domain([0,maxMedian])
        .range([graph.height,0])
    
    
    createLabels(screen,margins,graph,target);
    createAxes(screen,margins,graph,target,xScale,y0Scale, y1Scale);
    drawLines(majors,graph,target,xScale,y0Scale);
	drawLines2(majors,graph,target,xScale,y1Scale);
    
    d3.select("#EarnersHigh").on("click", function()
        {
        sortEarnersHigh()
    })
                                 
    d3.select("#EarnersLow").on("click", function()
        {

    })
    d3.select("#EmployedHigh").on("click", function()
        {

    })
    d3.select("#EmployedLow").on("click", function()
        {

    })
    
    
    var sortEarnersHigh = function() {
         d3.select("path")
         .sort(function(a, b) {
         return d3.ascending(a, b);
         })
         .transition()
         .duration(1000)
         .attr("x", function(d, i) {
         return xScale(i);
         })
        }

    var sortEarnersLow = function() {
         d3.select("path")
         .sort(function(a, b) {
         return d3.decending(a, b);
         })
         .transition()
         .duration(1000)
         .attr("x", function(d, i) {
         return xScale(i);
         })
        }
    
    var sortEarnersHigh = function() {
         d3.select("path")
         .sort(function(a, b) {
         return d3.ascending(a, b);
         })
         .transition()
         .duration(1000)
         .attr("x", function(d, i) {
         return xScale(i);
         })
        }

    var sortEarnersHigh = function() {
         d3.select("path")
         .sort(function(a, b) {
         return d3.ascending(a, b);
         })
         .transition()
         .duration(1000)
         .attr("x", function(d, i) {
         return xScale(i);
         })
        }
    
    
    
    
}
    


                                 