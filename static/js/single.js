String.prototype.escape = function() {
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',

    };
    return this.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });
};


let xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', 'https://api.github.com/repos/' + n + '/' + r + '/issues/' + i, false);
xmlhttp.send(null);
if (xmlhttp.status == 200) {
    let iss = JSON.parse(xmlhttp.responseText);
    let title = iss["title"];
    let image = iss["user"]["avatar_url"];
    let login = iss["user"]["login"];
    let user_link = iss["user"]["html_url"];
    let created_at = iss["created_at"];
    let labels = iss["labels"];
    let body = iss["body"];



    let lbl = `<a style="background-color: #654321" href="#" class="btn btn-xs" role="button">
                        <span class="glyphicon glyphicon-tag" aria-hidden="true"></span> Bug
                    </a>`

    let converter = new showdown.Converter()
    let template = `
        <div class="col-lg-offset-2 col-lg-1">
            <img src="` + image + `" alt="Avatar" style="width:100%">
        </div>
        <div class="panel panel-primary col-lg-7" style="padding:0">
          <div class="panel-heading">
            <h3 class="panel-title"> <a href="` + user_link + `">` + login + `</a> created at ` + created_at + `</h3>
          </div>
          <div class="panel-body">
            ` + title.escape() + `
          </div>
        </div>`;
    let n = document.createTextNode(template);
    document.getElementById("main").insertAdjacentHTML("beforeEnd", template);



}

let xmlhttp_1 = new XMLHttpRequest();
xmlhttp.open('GET', 'https://api.github.com/repos/' + n + '/' + r + '/issues/' + i + '/comments', false);
xmlhttp.send(null);
if (xmlhttp.status == 200) {
    let comments = JSON.parse(xmlhttp.responseText);
    for (let c of comments) {
        let image = c["user"]["avatar_url"];
        let login = c["user"]["login"];
        let user_link = c["user"]["html_url"];
        let created_at = c["created_at"];
        let body = c["body"];
        let converter = new showdown.Converter()
        let template = `
            <div class="col-lg-offset-2 col-lg-1">
                <img src="` + image + `" alt="Avatar" style="width:100%">
            </div>
            <div class="panel panel-default col-lg-7" style="padding:0">
              <div class="panel-heading">
                <h3 class="panel-title">`+ login +` commented at `+ created_at +`</h3>
              </div>
              <div class="panel-body">
                ` + converter.makeHtml(body) + `
              </div>
            </div>`;
        document.getElementById("main").insertAdjacentHTML("beforeEnd", template);
    }



}
