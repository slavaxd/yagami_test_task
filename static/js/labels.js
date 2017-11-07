let xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', 'https://api.github.com/repos/'+ n +'/'+ r +'/labels', false);
xmlhttp.send(null);
if (xmlhttp.status == 200) {
	let labels = JSON.parse(xmlhttp.responseText);
	for (let l of labels){
		let name = l["name"]
		let color = l["color"]
		let lt = `<a style="margin-bottom:5px;background-color: #`+ color +`" href="#" class="btn btn-lg" role="button">
                <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>`+ name +`
            </a>`

		document.getElementById("labels-cont").insertAdjacentHTML("beforeEnd", lt);

	}

}
