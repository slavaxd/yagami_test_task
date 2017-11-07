String.prototype.escape = function() {
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '\r': '<br>'
    };
    return this.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });
};


        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', 'https://api.github.com/repos/'+ n +'/'+ r +'/issues', false);
        xmlhttp.send(null);
        if (xmlhttp.status == 200) {
            let issues = JSON.parse(xmlhttp.responseText);
            for (let iss of issues) {
                let title = iss["title"];
                let image = iss["user"]["avatar_url"];
                let login = iss["user"]["login"];
                let user_link = iss["user"]["html_url"];
                let created_at = iss["created_at"];
                let labels = iss["labels"];
                let i = iss["number"]
                let n1 = iss["repository_url"].split("/")[4]
                let r1 = iss["repository_url"].split("/")[5]
                let c = iss["comments"]
                console.log(issues.length)

								let lbl = `<a style="background-color: #654321" href="#" class="btn btn-xs" role="button">
                        <span class="glyphicon glyphicon-tag" aria-hidden="true"></span> Bug
                    </a>`
								let labels_template = `
                                <div class="col-lg-3">
                                    <div class="thumbnail" style="border-top: 2px solid #2a6092;padding:0">
                                        <div class="flex-container">`
                        for (let i of labels){
									labels_template += `<a style="background-color: #` + i["color"] + `" href="#" class="btn" role="button">
                        <span class="glyphicon glyphicon-tag" aria-hidden="true"></span> `+ i["name"] +`
                                </a>`
                                            }
                   labels_template +=`  </div>
                                     </div>
                                 </div>`
                let template = `
							<div class="issue col-lg-offset-1 col-lg-8 list-group-item" style="
    						border-top: 2px solid #2a6092;">
								<div class="col-lg-7">
                                    <div class="col-lg-1" style="line-height:3">
                                        <span style="position:absolute;right:30px;top:-4px">`+ c +`</span>
                                        <span class="glyphicon glyphicon-comment" aria-hidden="true"></span>
                                    </div>
                                    <div class="col-lg-11">
                                        <a href="/issue/`+ n1 + `/`+ r1 + `/` + i + `"><h4>` + title.escape() + `</h4>
                                        </a>
                                    </div>
								</div>
								<div class="col-lg-2">
								    <div>` + created_at + `</div>
								</div>
								<div class="col-lg-2">
										<div href="` + user_link + `">` + login + `</div>
								</div>
								<div class="col-lg-1">
										<img src="` + image + `" alt="Avatar" style="width:100%">
								</div>
							</div>`;
                let n = document.createTextNode(template);
                document.getElementById("main").insertAdjacentHTML("beforeEnd", template);
                document.getElementById("main").insertAdjacentHTML("beforeEnd", labels_template);

            }
        }
