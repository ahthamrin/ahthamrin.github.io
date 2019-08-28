var progressText = "Loading...";

function loadContent(sUri, idtag, bAsync) {
	var done = function () {
		try {
			var xmlstring = xmlHttp.responseText;
			document.getElementById(idtag).innerHTML = xmlstring;
		}
		catch (exc) {
			document.getElementById(idtag).innerHTML = "An error occured <br/>" +
				"Message: " + exc.message + "<br/>" +
				"File: " + exc.fileName + "<br/>" +
				"Line: " + exc.lineNumber + "<br/>" +
				"Name: " + exc.name;
		}
	};
	
	var xmlHttp = XmlHttp.create();
	sUri = sUri.replace(/\.html/,".xml");
	try {
	xmlHttp.open("GET", sUri, bAsync);
	if (bAsync) {
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState == 4)
				if (xmlHttp.status == 0 || xmlHttp.status == 200)
					done();
		}
		document.getElementById(idtag).innerHTML = progressText;
	}
	xmlHttp.send(null);
	if (!bAsync) {
		done();
	}
	}
	catch (e) {
		document.getElementById(idtag).innerHTML = "Sorry, " + sUri + " doesn't exist in the server.";
	}
}

function stripHtml(s) {
	return s.replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\t/g, "&nbsp;&nbsp;&nbsp;").replace(/\n/g, "<br />");
}


function doLoad(linkurl) {
	loadXmlFile(linkurl, true);
	return false;
}

