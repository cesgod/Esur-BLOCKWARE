var datosgraph;
var maxdata;
var mindata;
var datap=15000;
$(document).ready(function() {
  $.ajax({
    url: "../../../../dash/meters/client/production/postdatebw.php",
    success: function(result) {
      
      var chart_data = ["120", "127.5", "139.5"];
      console.log("result", result);
      chart_data = JSON.parse(result);
      datap=chart_data[2];
      datap=parseInt(datap);
      console.log("datap", datap);
      var chart_labels = chart_data[0];
      maxdata = Math.max.apply(null, chart_data[1]);
      maxdata=parseInt(maxdata);
      if (maxdata>datap) {
        if (maxdata<10) {
          maxdata = maxdata+3;
          maxdata = parseInt(maxdata/3)*3;
          mindata = Math.min.apply(null, chart_data[1]);
          mindata = Math.floor(mindata/3)*3;
        }else if (maxdata <100 && maxdata > 50) {
          maxdata = maxdata+10;
          maxdata = parseInt(maxdata/10)*10;
          mindata = Math.min.apply(null, chart_data[1]);
          mindata = Math.floor(mindata/10)*10;
        }else if (maxdata <1000 && maxdata > 100) {
          maxdata = maxdata+100;
          maxdata = parseInt(maxdata/100)*100;
          mindata = Math.min.apply(null, chart_data[1]);
          mindata = Math.floor(mindata/100)*100;
        }else if (maxdata >1000) {
          maxdata = maxdata+100;
          maxdata = parseInt(maxdata/100)*100;
          mindata = Math.min.apply(null, chart_data[1]);
          mindata = Math.floor(mindata/100)*100;
          console.log("maxdata up",maxdata);
        }else if (maxdata <10000 && maxdata > 1000) {
          maxdata = maxdata+1000;
          maxdata = parseInt(maxdata/1000)*1000;
          mindata = Math.min.apply(null, chart_data[1]);
          mindata = Math.floor(mindata/1000)*1000;
        }else if (maxdata > 10000) {
          maxdata = maxdata+1000;
          maxdata = parseInt(maxdata/1000)*1000;
          mindata = Math.min.apply(null, chart_data[1]);
          mindata = Math.floor(mindata/1000)*1000;
        }
      }else if (maxdata< datap) {
        if (datap<50) {
          maxdata = datap+10;
          maxdata = parseInt(maxdata/10)*10;
          mindata = Math.min.apply(null, chart_data[1]);
          mindata = Math.floor(mindata/10)*10;
        }else if (datap <100 && datap > 50) {
          maxdata = datap+10;
          maxdata = parseInt(maxdata/10)*10;
          mindata = Math.min.apply(null, chart_data[1]);
          mindata = Math.floor(mindata/10)*10;

        }else if (datap <1000 && datap > 100) {
          maxdata = datap+100;
          maxdata = parseInt(maxdata/100)*100;
          mindata = Math.min.apply(null, chart_data[1]);
          mindata = Math.floor(mindata/100)*100;
        }else if (datap <10000 && datap > 1000) {
          maxdata = datap+1000;
          maxdata = parseInt(maxdata/1000)*1000;
          mindata = Math.min.apply(null, chart_data[1]);
          mindata = Math.floor(mindata/1000)*1000;
        }else if (datap >= 1000) {
          maxdata = datap+500;
          console.log("maxdatalow",maxdata);
          maxdata = parseInt(maxdata/1000)*1000;
          console.log("maxdatalowr",maxdata);
          mindata = Math.min.apply(null, chart_data[1]);
          mindata = Math.floor(mindata/1000)*1000;
        }
      }
      console.log("maxdata",maxdata);

      var ctx = document.getElementById("chartBig1").getContext("2d");

      var gradientStroke = ctx.createLinearGradient(230, 230, 230, 50);

      //gradientStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
      //gradientStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
      //gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors
      //gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      //gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      //gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
      gradientStroke.addColorStop(0.1, 'rgba(194, 255, 89, 0.02)');
      gradientStroke.addColorStop(0.9, 'rgba(194, 255, 89, 0.6');

      gradientChartOptionsConfigurationWithTooltipPurple = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          { 
            display: true,
            barPercentage: 1.6,
            gridLines: {
              drawBorder: true,
              color: "rgba(221, 221, 221, 0.08)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: mindata,
              suggestedMax: maxdata,
              padding: 30,
              max: maxdata,
              min: mindata,
              fontColor: "#9a9a9a"
            },
            scaleLabel: {
              display: true,
              labelString: 'Energía Activa kWh'
            }
          }
        ],

        xAxes: [
          {
            display: false,
            barPercentage: 1.6,
            gridLines: {
              drawBorder: true,
              borderWidth: 1,
              color: "rgba(221, 221, 221, 0.08)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ]
      },
      annotation: {
        annotations: [
          {
            type: "line",
            mode: "horizontal",
            scaleID: "y-axis-0",
            value: datap,
            borderColor: "red",
            borderWidth: 3,
            label: {
              enabled: false,
              content: "Potencia Contratada"
            }
          }
        ]
      }
    };

      var config = {
        type: "bar",

        data: {
          labels: chart_labels,
          datasets: [
            {
              label: "Energía Activa kWh ",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#c2ff59",
              borderWidth: 1,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#c2ff59",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#c2ff59",
              pointBorderWidth: 10,
              pointHoverRadius: 2,
              pointHoverBorderWidth: 7,
              pointRadius: 2,
              data: chart_data[1]
            }
          ]
        },
        options: gradientChartOptionsConfigurationWithTooltipPurple
      };
      var myChartData = new Chart(ctx, config);
    }
  });
});

type = ["primary", "info", "success", "warning", "danger"];

demo = {
  initPickColor: function() {
    $(".pick-class-label").click(function() {
      var new_class = $(this).attr("new-class");
      var old_class = $("#display-buttons").attr("data-class");
      var display_div = $("#display-buttons");
      if (display_div.length) {
        var display_buttons = display_div.find(".btn");
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr("data-class", new_class);
      }
    });
  },

  initDocChart: function() {
    chartColor = "#FFFFFF";

    // General configuration for the charts with Line gradientStroke
    gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            display: 0,
            gridLines: 0,
            ticks: {
              display: false
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false
            }
          }
        ],
        xAxes: [
          {
            display: 0,
            gridLines: 0,
            ticks: {
              display: false
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false
            }
          }
        ]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    ctx = document.getElementById("lineChartExample").getContext("2d");

    gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#80b6f4");
    gradientStroke.addColorStop(1, chartColor);

    gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    myChart = new Chart(ctx, {
      type: "line",
      responsive: true,
      data: {
        labels: [
          "00:00",
          "00:15",
          "00:30",
          "00:45",
          "01:00",
          "01:15",
          "01:30",
          "01:45",
          "02:00",
          "02:15",
          "02:30",
          "02:45",
          "03:00",
          "03:15",
          "03:30",
          "03:45",
          "04:00",
          "04:15",
          "04:30",
          "04:45",
          "05:00"
        ],
        datasets: [
          {
            label: "Active Users",
            borderColor: "#f96332",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#f96332",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 2,
            data: [
              120,
              127.5,
              139.5,
              142.5,
              100,
              80,
              50,
              130,
              128,
              148,
              143,
              138,
              135,
              139,
              142,
              140,
              135,
              129,
              124,
              115,
              100
            ]
          }
        ]
      },
      options: gradientChartOptionsConfiguration
    });
  },

  initDashboardPageCharts: function() {
    gradientChartOptionsConfigurationWithTooltipBlue = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 30,
              max: 30,
              padding: 20,
              fontColor: "#2380f7"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#2380f7"
            }
          }
        ]
      }
    };


    gradientChartOptionsConfigurationWithTooltipOrange = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 110,
              max: 30,
              padding: 20,
              fontColor: "#ff8a76"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(220,53,69,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#ff8a76"
            }
          }
        ]
      }
    };

    gradientChartOptionsConfigurationWithTooltipGreen = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 125,
              max: 30,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(0,242,195,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    };

    gradientBarChartConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 120,
              max: 25,
              min: 0,
              padding: 10,
              fontColor: "#9e9e9e"
            }
          }
        ],

        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    };

    var ctx = document.getElementById("chartLinePurple").getContext("2d");

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(72,72,176,0.2)");
    gradientStroke.addColorStop(0.2, "rgba(72,72,176,0.0)");
    gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

    /*var data = {
      labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      datasets: [{
        label: "Data",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#d048b6',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#d048b6',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#d048b6',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: [80, 100, 70, 80, 120, 80],
      }]
    };*/

    /*var myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: gradientChartOptionsConfigurationWithTooltipPurple
    });


    var ctxGreen = document.getElementById("chartLineGreen").getContext("2d");

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
    gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
    gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

    var data = {
      labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
      datasets: [{
        label: "Potencia Instantánea",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#00d6b4',
        borderWidth: 2,
        borderDash: [],
        bo        annotation: {
          annotations: [
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: 1500,
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 4,
              label: {
                enabled: true,
                content: "Test label"
              }
            }
          ]
        }rderDashOffset: 0.0,
        pointBackgroundColor: '#00d6b4',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#00d6b4',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: [90, 27, 60, 12, 80],
      }]
    };*/

    /*var myChart = new Chart(ctxGreen, {
      type: 'line',
      data: data,
      options: gradientChartOptionsConfigurationWithTooltipGreen

    });*/

    $("#0").click(function() {
      var data = myChartData.config.data;
      data.datasets[0].data = chart_data;
      data.labels = chart_labels;
      myChartData.update();
    });
    $("#1").click(function() {
      var chart_data = [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120];
      var data = myChartData.config.data;
      data.datasets[0].data = chart_data;
      data.labels = chart_labels;
      myChartData.update();
    });

    $("#2").click(function() {
      var chart_data = [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130];
      var data = myChartData.config.data;
      data.datasets[0].data = chart_data;
      data.labels = chart_labels;
      myChartData.update();
    });

    var ctx = document.getElementById("CountryChart").getContext("2d");

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    var myChart = new Chart(ctx, {
      type: "bar",
      responsive: true,
      legend: {
        display: false
      },
      data: {
        labels: ["Contratada", "Distribuida"],
        datasets: [
          {
            label: "Potencia MW",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [21.5, 20.6]
          }
        ]
      },
      options: gradientBarChartConfiguration
    });
  },

  initGoogleMaps: function() {
    var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
    var mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
      styles: [
        {
          elementType: "geometry",
          stylers: [
            {
              color: "#1d2c4d"
            }
          ]
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#8ec3b9"
            }
          ]
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1a3646"
            }
          ]
        },
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#4b6878"
            }
          ]
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#64779e"
            }
          ]
        },
        {
          featureType: "administrative.province",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#4b6878"
            }
          ]
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#334e87"
            }
          ]
        },
        {
          featureType: "landscape.natural",
          elementType: "geometry",
          stylers: [
            {
              color: "#023e58"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#283d6a"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#6f9ba5"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1d2c4d"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#023e58"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#3C7680"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              color: "#304a7d"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#98a5be"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1d2c4d"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [
            {
              color: "#2c6675"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#9d2a80"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#9d2a80"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#b0d5ce"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#023e58"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#98a5be"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1d2c4d"
            }
          ]
        },
        {
          featureType: "transit.line",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#283d6a"
            }
          ]
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [
            {
              color: "#3a4762"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#0e1626"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#4e6d70"
            }
          ]
        }
      ]
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
      position: myLatlng,
      title: "Hello World!"
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
  },

  showNotification: function(from, align) {
    color = Math.floor(Math.random() * 4 + 1);

    $.notify(
      {
        icon: "tim-icons icon-bell-55",
        message:
          "Welcome to <b>Black Dashboard</b> - a beautiful freebie for every web developer."
      },
      {
        type: type[color],
        timer: 8000,
        placement: {
          from: from,
          align: align
        }
      }
    );
  }
};
