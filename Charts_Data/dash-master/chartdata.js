var datosgraph;
var maxdata;
var mindata;
$(document).ready(function() {
    $.ajax({
        url: "../../../../dash/meters/client/production/postdate.php",
        success: function(result) {
            datosgraph = JSON.stringify(result);
            var chart_labels = 'asd';
            var chart_data = ['120', '127.5', '139.5'];
            console.log('result', result)
            chart_data = JSON.parse(result);
            chart_labels = chart_data[0]
            maxdata = Math.max.apply(null, chart_data[2]);
            maxdata = Math.ceil(maxdata);
            mindata = Math.min.apply(null, chart_data[2]);
            mindata = Math.floor(mindata);
            console.log(maxdata);
            var ctx = document.getElementById("chartBig1").getContext('2d');
            var gradientStroke = ctx.createLinearGradient(230, 230, 230, 50);
            var gradientStrokes = ctx.createLinearGradient(230, 230, 230, 50);
            
            gradientStroke.addColorStop(0.1, 'rgba(194, 255, 89, 0.02)');
            gradientStroke.addColorStop(0.9, 'rgba(194, 255, 89, 0.6');
            gradientStrokes.addColorStop(0.1, 'rgba(89, 255, 238, 0.02)');
            gradientStrokes.addColorStop(0.9, 'rgba(89, 255, 238, 0.6');

            var config = {
                type: 'line',
                data: {
                    labels: chart_labels,
                    datasets: [{
                        label: "Potencia Instantánea 01",
                        backgroundColor: gradientStrokes,
                        borderColor: "#59ffee",
                        
                        borderWidth: 1,

                        fill: true,
                        
                        
                        
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: '#59ffee',
                        pointBorderColor: 'rgba(255,255,255,0)',
                        pointHoverBackgroundColor: '#59ffee',
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 1,
                        data: chart_data[1],
                    },
		            {
		              label: "Potencia Instantánea 02",
		              fill: true,
		              backgroundColor: gradientStroke,
		              borderColor: "#c2ff59",
		              borderWidth: 1,
		              borderDash: [],
		              borderDashOffset: 0.0,
		              pointBackgroundColor: "#c2ff59",
		              pointBorderColor: "rgba(255,255,255,0)",
		              pointHoverBackgroundColor: "#c2ff59",
		              pointBorderWidth: 20,
		              pointHoverRadius: 4,
		              pointHoverBorderWidth: 15,
		              pointRadius: 1,
		              data: chart_data[2]
		            }
		          ]
                },
                options: gradientChartOptionsConfigurationWithTooltipPurple
            };
            var myChartData = new Chart(ctx, config);
        }
    });
});
gradientChartOptionsConfigurationWithTooltipPurple = {
            maintainAspectRatio: false,
            legend: {
              display: false,
              labels: {
                fontColor: '#ddd',  
                boxWidth:40
              }
            },
            tooltips: {
                  displayColors:false
            },  
            responsive: true,
            scales: {
                yAxes: [{
                    barPercentage: 1.6,
                    gridLines: {
                      display: true ,
                      color: "rgba(221, 221, 221, 0.08)"
                    },
                    ticks: {
                        suggestedMin: maxdata,
                        suggestedMax: maxdata,
                        padding: 30,
                        max: maxdata,
                        min: mindata,
                        fontColor: '#ddd'
                    }
                }],
                xAxes: [{
                    barPercentage: 1.6,
                    gridLines: {
                      display: true ,
                      color: "rgba(221, 221, 221, 0.08)"
                    },
                    ticks: {
                        padding: 20,
                        fontColor: '#ddd'
                    }
                }],
                annotation: {
                    annotations: [{
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y-axis-0',
                        value: 15000,
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 4,
                        label: {
                            enabled: true,
                            content: 'Potencia Contratada'
                        }
                    }]
                }
            }
        };