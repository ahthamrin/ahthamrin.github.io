var progressText = "Loading...";

function loadGreeting(sUri, bAsync) {
	var done = function () {
		try {
			var xmlstring = xmlHttp.responseText;
/*			// code for IE
			if (window.ActiveXObject) {
				var xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async="false";
				xmlDoc.loadXML(xmlstring);
  			}
			// code for Mozilla, Firefox, Opera, etc.
			else {
				var parser=new DOMParser();
				var xmlDoc=parser.parseFromString(xmlstring,"text/xml");
			}
			var thecontent = xmlHttp.responseXML.getElementsByTagName('html');
			alert(thecontent.item(0));*/
			var pagecontent = xmlstring.replace(/<div id="pagecontent">/i,"");
			pagecontent = pagecontent.replace(/<\/div>/i,"");
//			var sidemenuStart = pagecontentStart.search('<div id="sidemenu">');
//			var pagecontentEnd = pagecontentStart.search('</div>');
/*			var pagecontentEndTemp = pagecontentEnd;
			var pagecontentIn = pagecontentStart.substr(pagecontentEnd);
			while (pagecontentEndTemp < sidemenuStart) {
				pagecontentEnd = pagecontentEndTemp;
				pagecontentEndTemp = pagecontentIn.search('</div>');
				pagecontentIn = pagecontentIn.substr(pagecontentEndTemp);
				pagecontentEndTemp = pagecontentEndTemp + pagecontentEnd;
			}
*/			
			
//			pagecontentStart = pagecontentStart.substring(pagecontentStart.search('>')+1,pagecontentEnd);
			document.getElementById("pagecontent").innerHTML = pagecontent;
		}
		catch (exc) {
			document.getElementById("pagecontent").innerHTML = "An error occured <br/>" +
				"Message: " + exc.message + "<br/>" +
				"File: " + exc.fileName + "<br/>" +
				"Line: " + exc.lineNumber + "<br/>" +
				"Name: " + exc.name;
		}
	};
	
	var xmlHttp = XmlHttp.create();
	sUri = sUri.replace(/\.html/,".xml");
	xmlHttp.open("GET", sUri, bAsync);
	if (bAsync) {
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 0 || xmlHttp.status == 200)
				  done();
				else
				  document.getElementById("pagecontent").innerHTML = "HTTP/404";
			}
		}
		document.getElementById("pagecontent").innerHTML = progressText;
	}
	xmlHttp.send(null);
	if (!bAsync) {
		done();
	}
}

function stripHtml(s) {
	return s.replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\t/g, "&nbsp;&nbsp;&nbsp;").replace(/\n/g, "<br />");
}


function doLoad(linkurl) {
	loadXmlFile(linkurl, true);
	return false;
}

