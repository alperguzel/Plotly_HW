function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var url = `/metadata/${sample}`;
  d3.json(url).then(function(response){
    var data = response;
    // Use d3 to select the panel with id of `#sample-metadata`
    var area_selected = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    area_selected.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    for([key,value] of Object.entries(data)){
      area_selected.append("p")
      .text(`${key}:${value}`);
    };
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  });


    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

  var url = `/samples/${sample}`;
  d3.json(url).then(function(response){
    // @TODO: Build a Bubble Chart using the sample data
    // data = data.sort((first, second) => first - second);

    // data = data.slice(0, 10);

    // console.log(typeOf(response));
    xValues = response["otu_ids"];
    yValues = response["sample_values"];


    var trace_chart = {
      "x": xValues,
      "y": yValues,
      mode: "markers",
      marker: {
        size: response["sample_values"]
      }
    };

    var data = [trace_chart];

    var layout = {
      title: "TOP TEN SAMPLES CHART",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "VALUES" }
    };

    Plotly.newPlot("bubble", data, layout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    // var sliced_data = response["sample_values"].sort((first, second) => second - first).slice(0,10);

    // var sliced_data = sorted_data.slice(0,10);

    // console.log(sliced_data);

    var data_pie = {
      values: xValues.slice(0, 10),
      labels: yValues.slice(0, 10),
      // text: sliced_data["otu_labels"],
      type: "pie"
    };

    var data_pie = [data_pie];

    var layout_pie = {
      title: "my pie"
    };

    Plotly.newPlot("pie", data_pie, layout_pie);

  });

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  // d3.event.preventDefault();

  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    console.log(sampleNames);
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log(firstSample)
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
