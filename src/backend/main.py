import bottle
from bottle import Bottle, run, request,static_file,response,default_app, response
from bottle_cors_plugin import cors_plugin
from datetime import date, time, datetime
from dateutil import parser, tz

from dataTypes import *
from dataBase import *

import json as jsonF


application = Bottle()
application.install(cors_plugin("*"))

dateDone = date(year=2021, month=7, day=7)

@application.route('/<:re:.*>', method='OPTIONS')
def cors():
    pass

@application.get('/')
def server_static():
    return static_file("index.html", root='./../frontend/build')

@application.get('/<filepath>')
def server_static(filepath):
    return static_file(filepath, root='./../frontend/build')

@application.get('/static/js/<filepath>')
def server_static(filepath):
    return static_file(filepath, root='./../frontend/build/static/js')

@application.get('/days/<datein>')
def getDay(datein):
    l = datein.split("-")
    return jsonF.dumps(getEntry(date(year=int(l[0]), month=int(l[1]), day=int(l[2]))))

@application.get('/today')
def getToday():
    today = date.today()
    return jsonF.dumps(getEntry(today))

@application.get('/daysLeft')
def getDaysLeft():
    today = date.today()
    return jsonF.dumps({"daysleft":f"{(dateDone-today).days}"})

@application.post('/days')
def post():
    data = {"id":request.json.get('id'),"date":str(request.json.get('date')),"data1":request.json.get('data1'),"data2":request.json.get('data2')}
    updateOrCreateEntry(data)

@application.get('/toDo')
def postToDo():
    return jsonF.dumps(getToDo())

@application.post('/toDo')
def postToDo():
    data = {"id":request.json.get('id'),"toDo":request.json.get('toDo')}
    return jsonF.dumps({"id":updateOrCreateToDo(data)[0]})

@application.delete('/toDo')
def deleteToDo():
    data = {"id":request.json.get('id')}
    removeToDo(data)
    

run(application, host='localhost', port=8080)

