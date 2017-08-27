var data = [
    ['Generation', 'No. of Actions']
]

google.charts.load('current', {
    packages: ['line'],
});
// google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Define the chart to be drawn.
    var d = google.visualization.arrayToDataTable(data);

    var options = {
        legend: {
            position: 'none'
        },
        chart: {
            curveType: 'function',
            title: ' '
        },
    };

    // Instantiate and draw the chart.
    var chart = new google.charts.Line(document.getElementById('myChart'));
    chart.draw(d, options);
}