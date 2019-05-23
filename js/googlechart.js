var csvData = new Array();
var participantList = ['Olivier', 'Hertog 1', 'Hertog 2', 'Hertog 3'];

var container = document.getElementById('google-charts-container');

//start & end minute:
var start_min = new Array(),
    end_min   = new Array(),
    start_sec = new Array(),
    end_sec   = new Array();

for (var i = 0; i < 4; i++) {
  start_min[i] = new Array();
  end_min[i] = new Array();
  start_sec[i] = new Array();
  end_sec[i] = new Array();
}

function csv2array(){
	var request = new XMLHttpRequest();
	//request.open("GET", "https://arthurgeel.com/air-quality-rating/data/presence.csv", false);
	request.open("GET", "data/presence.csv", false);
	request.send(null);

	var jsonObject = request.responseText.split(/\r?\n|\r/);
	for (var i = 0; i < jsonObject.length; i++) {
	  csvData.push(jsonObject[i].split('T').join(',').split('-').join(',').split(':').join(',').split(','));
	}
}

function startend_ts(){
  // Initialize all start- and ending functions
	var startRow_0 = 0,
	    endRow_0 = 0,
	    startRow_1 = 0,
	    endRow_1 = 0,
	    startRow_2 = 0,
	    endRow_2 = 0,
	    startRow_3 = 0,
	    endRow_3 = 0;

	if(csvData[1][1] == "true"){ //if the first data is true, record it as a startRow event
		start_min[0][startRow_0] = csvData[1][9];
		start_sec[0][startRow_0] = csvData[1][10];
		startRow_0 ++;
	}

	if(csvData[0][2] == "true"){ //if the fisrt data is true, record it as a startRow event
		start_min[1][startRow_1] = csvData[1][9];
		start_sec[1][startRow_1] = csvData[1][10];
		startRow_1 ++;
	}

	if(csvData[0][3] == "true"){ //if the fisrt data is true, record it as a startRow event
		start_min[2][startRow_2] = csvData[1][9];
		start_sec[2][startRow_2] = csvData[1][10];
		startRow_2 ++;
	}

	if(csvData[0][4] == "true"){ //if the fisrt data is true, record it as a startRow event
		start_min[3][startRow_3] = csvData[1][9];
		start_sec[3][startRow_3] = csvData[1][10];
		startRow_3 ++;
	}

	for (var i = 2; i < csvData.length; i++) { //"i = 2", skip the header and first line data

		//csvData[i][1] for Olivier:
		if((csvData[i][1] != csvData[i-1][1]) && (csvData[i][1] == "true")){ //startRow
			start_min[0][startRow_0] = csvData[i][9];
			start_sec[0][startRow_0] = csvData[i][10];
			startRow_0 ++;
		} else if((csvData[i][1] != csvData[i-1][1]) && (csvData[i][1] == "false")){ //endRow
			end_min[0][endRow_0] = csvData[i][9];
			end_sec[0][endRow_0] = csvData[i][10];
			endRow_0 ++;
		}

		//csvData[i][2] for Hertog #1:
		if((csvData[i][2] != csvData[i-1][2]) && (csvData[i][2] == "true")){ //startRow
			start_min[1][startRow_1] = csvData[i][9];
			start_sec[1][startRow_1] = csvData[i][10];
			startRow_1 ++;
		}else if((csvData[i][2] != csvData[i-1][2]) && (csvData[i][2] == "false")){ //endRow
			end_min[1][endRow_1] = csvData[i][9];
			end_sec[1][endRow_1] = csvData[i][10];
			endRow_1 ++;
		}

		//csvData[i][3] for Hertog #2:
		if((csvData[i][3] != csvData[i-1][3]) && (csvData[i][3] == "true")){ //startRow
			start_min[2][startRow_2] = csvData[i][9];
			start_sec[2][startRow_2] = csvData[i][10];
			startRow_2 ++;
		}else if((csvData[i][3] != csvData[i-1][3]) && (csvData[i][3] == "false")){ //endRow
			end_min[2][endRow_2] = csvData[i][9];
			end_sec[2][endRow_2] = csvData[i][10];
			endRow_2 ++;
		}

		//csvData[i][4] for Hertog #3:
		if((csvData[i][4] != csvData[i-1][4]) && (csvData[i][4] == "true")){ //startRow
			start_min[3][startRow_3] = csvData[i][9];
			start_sec[3][startRow_3] = csvData[i][10];
			startRow_3 ++;
		}else if((csvData[i][4] != csvData[i-1][4]) && (csvData[i][4] == "false")){ //endRow
			end_min[3][endRow_3] = csvData[i][9];
			end_sec[3][endRow_3] = csvData[i][10];
			endRow_3 ++;
		}
	}

	if(csvData[csvData.length-1][1] == "true"){ //if the last data is true, record it as a endRow event
		end_min[0][endRow_0] = csvData[csvData.length-1][9];
		end_sec[0][endRow_0] = csvData[csvData.length-1][10];
		endRow_0 ++;
	}
	if(csvData[csvData.length-1][2] == "true"){ //if the last data is true, record it as a endRow event
		end_min[1][endRow_1] = csvData[csvData.length-1][9];
		end_sec[1][endRow_1] = csvData[csvData.length-1][10];
		endRow_1 ++;
	}
	if(csvData[csvData.length-1][3] == "true"){ //if the last data is true, record it as a endRow event
		end_min[2][endRow_2] = csvData[csvData.length-1][9];
		end_sec[2][endRow_2] = csvData[csvData.length-1][10];
		endRow_2 ++;
	}
	if(csvData[csvData.length-1][4] == "true"){ //if the last data is true, record it as a endRow event
		end_min[3][endRow_3] = csvData[csvData.length-1][9];
		end_sec[3][endRow_3] = csvData[csvData.length-1][10];
		endRow_3 ++;
	}

}

csv2array();
startend_ts();

google.charts.load("current", {packages: ["timeline"]});

function drawChart() {
  // Define the chart to be drawn.
  var container = document.getElementById('google-charts-container');
  var data = new google.visualization.DataTable();

  // let blankStyle = "opacity: 0";

  data.addColumn({ type: 'string', id: 'Name'    });
  data.addColumn({ type: 'string', role: 'style' });
  data.addColumn({ type: 'date',   id: 'Start'   });
  data.addColumn({ type: 'date',   id: 'End'     });

  for (var participant = 0; participant < participantList.length; participant++){
    // Loop through all participants, add a min-width, invisible row to make sure they display even if there is no data.
    data.addRow([
      participantList[participant],
      null,
      new Date(0, 0, 0, 22, 0),
      new Date(0, 0, 0, 22, 0)
    ]);

    // Loop through all participant's data, adding the real entries
    for (var i = 0; i < start_min[participant].length; i++){
      data.addRows([
        [participantList[participant],
        null,
        new Date(0, 0, 0, start_min[participant][i], start_sec[participant][i]),
        new Date(0, 0, 0, end_min[participant][i], end_sec[participant][i])],
      ]);
    }
  }

  var options = {
    title: 'Lorem ipsum dolor sit amet',
    colors: ['#3fa7a7'],
    width: 900,
    height: 330,
    hAxis: {
      format: 'HH:mm',
      minValue: new Date(0, 0, 0, 10, 0),
      maxValue: new Date(0, 0, 0, 22, 00),
    },
    timeline: {
      barLabelStyle: {
        fontSize: 20,
      },
      rowLabelStyle: {
        fontName: 'Futura',
        fontSize: 16,
      },

      animation:{

      }

    }
  };

  // Instantiate and draw the chart.
  var chart = new google.visualization.Timeline(document.getElementById('google-charts-container'));
  chart.draw(data, options);
}

google.charts.setOnLoadCallback(drawChart);
