$(function() {
  // click/select event listener and callback function.
  window.addEventListener("message", function(event) {
    changeRow(JSON.parse(event.data));
  }); 

});


function changeRow(data) {
  
  var table = $("<table id='detail-table' />");
  table.remove();

  var columns = Object.keys(data);
  var columnCount = columns.length;
  
  // first, the header row
  var row = $(table[0].insertRow(-1));
  for (var i = 0; i < columnCount; i++) {
    var headerCell = $("<th />");
    headerCell.html([columns[i]]);
    row.append(headerCell);
  }

  row = '<tr> data-id="' + data.Station_Name + '"<td>' + data.Station_Name + 
        '</td><td>' + data.Province + '</td><td>' + data.Date + 
        '</td><td>' + data.Mean_Temp + '</td><td>' + data.Highest_Monthly_Maxi_Temp + 
        '</td><td>' + data.Lowest_Monthly_Min_Temp + '</td></tr>';
  table.append(row);

  var detTable = $("#dvDetail");
  detTable.html("");
  detTable.append(table);  
}