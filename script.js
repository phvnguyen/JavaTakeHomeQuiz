// Code goes here
var detail_win = null;

$(function() {
  $("#upload").bind("click", function() {

    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    
    if (regex.test($("#fileUpload").val().toLowerCase())) {
      if (typeof(FileReader) != "undefined") {
        var reader = new FileReader();
        reader.onload = function(e) {
          var lines = e.target.result.split("\n");
          var result = [];

          var headers = lines[0].split(",").map(function(obj) {
            return obj.replace(/(?:\\[rn]|[\r\n]+)+/g, '');
          });
          
          for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");

            for (var j = 0; j < headers.length; j++) {
              obj[headers[j]] = currentline[j];
            }
            result.push(obj);
          }
          
          populateTable(result);
          window.detail_win = window.open("detail_page.html");
        };
        reader.readAsText($("#fileUpload")[0].files[0]);
      }
    }
  });
});

function showDetailPage(obj) {
  if (window.detail_win == null) {
    detail_win = window.open("detail_page.html");
  }
  var data = JSON.stringify(obj);
  window.detail_win.postMessage(data, "*");
}


function populateTable(finalObject) {
  var obj = finalObject;
  var table = $("<table id='my-table' />");
  
  var columns = Object.keys(obj[0]);
  var columnCount = columns.length;
  var row = $(table[0].insertRow(-1));

  for (var i = 0; i < columnCount; i++) {
    var headerCell = $("<th />");
    headerCell.html([columns[i]]);
    if ((i == 0) || (i == 2) || (i == 3)) {
      row.append(headerCell);
    }
  }

  var fromDate = $("#fromDate").val();
  var toDate   = $("#toDate").val();

  $.each(obj, function(i, obj) {

    if ((fromDate != "") && (toDate != "" )) {
      var FromThisDate = new Date(fromDate);
      var ToThisDate   = new Date(toDate);
      var myDate       = new Date(obj.Date);

      if ((FromThisDate <= myDate) && (myDate <= ToThisDate)) {
        row = '<tr> data-id="' + obj.Station_Name + '"<td>' + obj.Station_Name + '</td><td>' + obj.Date + '</td><td>' + obj.Mean_Temp + '</td></tr>';
        table.append(row);
      }
    } else {
      row = '<tr> data-id="' + obj.Station_Name + '"<td>' + obj.Station_Name + '</td><td>' + obj.Date + '</td><td>' + obj.Mean_Temp + '</td></tr>';
      table.append(row);      
    }
  });
  
  var dvTable = $("#dvCSV");
  dvTable.html("");
  dvTable.append(table);
  
  // Findout what cell is clicked.
  $('td').on('click',function() {
    var col = $(this).parent().children().index($(this));
    var row = $(this).parent().parent().children().index($(this).parent());
    if (col == 2) {
      // column Mean_Temp is clicked, go set up Detail page
      var SName    = table[0].rows[row].cells[0].innerHTML;
      var MeanTemp = table[0].rows[row].cells[2].innerHTML;
      $.each(obj, function(i, obj) {
        if ((obj.Station_Name == SName) && (obj.Mean_Temp == MeanTemp)) {
          showDetailPage(obj);
        }  
      })  
    }
  });
}