from flask import Flask, render_template, jsonify, json, request

import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/labels/<nickname>/<repo_name>')
def labels(nickname, repo_name):
		return render_template('labels.html', n=nickname, r=repo_name)

@app.route('/get_issues')
def get_issues():
    nickname = request.args.get('n')
    repo_name = request.args.get('r')
    r = requests.get('https://api.github.com/repos/' + nickname + '/' + repo_name + '/issues')
    binary = r.content
    output = json.loads(binary)
    return render_template('get_issues.html', n=nickname, r=repo_name)

@app.route('/get_labels/<nickname>/<repo_name>')
def get_label(nickname, repo_name):
    r = requests.get('https://api.github.com/repos/' + nickname + '/' + repo_name + '/labels')
    binary = r.content
    output = json.loads(binary)
    return jsonify(output)

@app.route('/issue/<nick>/<repo>/<issue_id>')
def single_issue(nick, repo, issue_id):
    return render_template('single_issue.html', n=nick, r=repo, i=issue_id)
