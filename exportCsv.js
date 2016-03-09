/**
 * Created by miao on 2015-08-20.
 */

function C(JSONData, ReportTitle, titleCN, titleEN) {
	JSONToCSVConvertor(null, JSONData, ReportTitle, titleCN, titleEN);
}

function JSONToCSVConvertor(dataTop, JSONData, ReportTitle, titleCN, titleEN) {
	JSONToCSVConvertor(dataTop, JSONData, ReportTitle, titleCN, titleEN, null);
}

function JSONToCSVConvertor(dataTop, JSONData, ReportTitle, titleCN, titleEN, dataEnd) {
	//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
	var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
	var CSV = '';
	CSV += ReportTitle + '\r\n';
	for (var i in dataTop) {
//		CSV += dataTop[i] + ',,,';
		CSV += dataTop[i] + '\r\n';
	}
	CSV += '\r\n\n';
	var rowTop = "";
	if(titleCN.selector != undefined){
		titleCN.find('th').each(function (thindex, thitem) {
			rowTop += $(thitem).text() + ',';
	    });
	}else{
		for ( var index in titleCN) {
			rowTop += titleCN[index] + ',';
		}
	}
	rowTop = rowTop.slice(0, -1);
	CSV += rowTop + '\r\n';
	for (var i = 0; i < arrData.length; i++) {
		var rowData = "";
		if(titleEN == null){
	        for (var index in arrData[i]) {
				if(arrData[i][index] == null || arrData[i][index] == 'null'){
					rowData += '"' + '' + '",';
				}else{
					rowData += '"' + "'" + arrData[i][index] + '",';
				}
	        }
		}else{
			for ( var index2 in titleEN) {
				if("_increment_num" == titleEN[index2]){
					rowData += '"' + "'" + (parseInt(i)+parseInt(1)) + '",';
				}else{
					for (var index in arrData[0]) {
						if(index == titleEN[index2]){
							if(arrData[i][index] == null || arrData[i][index] == 'null'){
								rowData += '"' + '' + '",';
							}else{
								rowData += '"' + "'" + arrData[i][index] + '",';
							}
							break;
						}
					}
				}
			}
		}
		rowData.slice(0, rowData.length - 1);
		CSV += rowData + '\r\n';
	}
	//dataEnd
	if(dataEnd != undefined && null != dataEnd){
		if(dataEnd.selector != undefined){
			dataEnd.find('tr').each(function (thindex, tritem) {
				var rowEnd = "";
				$(tritem).find('td').each(function (thindex, tditem) {
					rowEnd += $(tditem).text() + ',';
			    });
				rowEnd.slice(0, rowEnd.length - 1);
				CSV += rowEnd + '\r\n';
		    });
		}else{
			var rowEnd = "";
			for ( var index in dataEnd) {
				rowEnd += dataEnd[index] + ',';
			}
			rowEnd.slice(0, rowEnd.length - 1);
			CSV += rowEnd + '\r\n';
		}
	}
	
	if (CSV == '') {
		alert("Invalid data");
		return;
	}
	var date = new Date();
	var fileName = '' + date.getFullYear() + '' + (date.getMonth()+1) + '' + date.getDate() + '' + 
			date.getHours() + '' + date.getMinutes();
	fileName += ReportTitle.replace(/ /g, "_");

	var uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(CSV);

	var link = document.createElement("a");
	link.href = uri;

	link.style = "visibility:hidden";
	link.download = fileName + ".csv";

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
