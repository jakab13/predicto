$(document).ready(function() {

	$("#slider").slider({
		slide : function(event, ui) {
			$('#sliderVal').html(ui.value);
		}
	});
	$("#deadline").datepicker();
	$("#deadline").datepicker();
	$("button").click(function() {
		makeDocument();
		var time = $('#runningClock').html();
		var name = $('#name').val();
		var prediction = $("#prediction").val();
		var fromDate = $("#deadline").val();
		var deadline = $("#deadline").val();
		if (deadline === "" || prediction === "" || name === "") {
			alert("Please fill out your prediction.");
		} else {
			var currentHtml = $("#feedback").html();
			$("#feedback").html(currentHtml + "At " + time + ", " + name + " predicted that " + prediction + " until " + deadline + "<br>");
		}
	});

	function extendFields(elem) {
		$("#flexSpace").css("height", "20%");
		$("#formContainer").css("height", "150px");
		$(elem).fadeOut(400, function() {
			$(".additionField").fadeIn();
		});

		extendedValues = true;
	}

});

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	// add a zero in front of numbers<10
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('runningClock').innerHTML = h + ":" + m + ":" + s;
	t = setTimeout(function() {
		startTime()
	}, 500);
}

function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

function makeDocument() {
	var frame = document.getElementById("theFrame");

	var doc = document.implementation.createHTMLDocument("New Document");
	var p = doc.createElement("p");
	p.innerHTML = "This is a new paragraph.";

	try {
		doc.body.appendChild(p);
	} catch(e) {
		console.log(e);
	}

	// Copy the new HTML document into the frame

	var destDocument = frame.contentDocument;
	var srcNode = doc.documentElement;
	var newNode = destDocument.importNode(srcNode, true);

	destDocument.replaceChild(newNode, destDocument.documentElement);
}