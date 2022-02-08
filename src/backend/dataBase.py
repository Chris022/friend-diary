import sqlite3

from dataTypes import * 



con = sqlite3.connect('data.db')

cur = con.cursor()

cur.execute('''CREATE TABLE IF NOT EXISTS days
               (id integer primary key autoincrement, date text unique, dataChris text, dataKay text);''')
cur.execute('''CREATE TABLE IF NOT EXISTS todo
               (id integer primary key autoincrement, toDo text);''')

def getEntry(date):
    cur.execute("SELECT date,dataChris,dataKay,id FROM days WHERE date = ?",[date])
    obj = cur.fetchone()
    if(obj == None):
        return {}
    obj = Day(*obj)
    return obj

def addEntry(day:list):
    # Insert a row of data
    cur.execute("INSERT INTO days (date,dataChris,dataKay) VALUES (:date,:dataChris,:dataKay)", day)
    # Save (commit) the changes
    con.commit()

def updateOrCreateEntry(day:list):
    cur.execute("INSERT OR REPLACE INTO days (id, date,dataChris,dataKay) VALUES(:id, :date, :dataChris, :dataKay);",day)
    
    # Save (commit) the changes
    con.commit()

def getToDo():
    cur.execute("SELECT id,toDo FROM todo")
    objs = cur.fetchall()
    retObjs = []
    for obj in objs:
        retObjs.append({"id":obj[0],"toDo":obj[1]})
    print(retObjs)
    return retObjs

def updateOrCreateToDo(todo:list):
    print(todo)
    cur.execute("INSERT OR REPLACE INTO todo (toDo) VALUES(:toDo);",todo)
    con.commit()
    cur.execute("SELECT last_insert_rowid()")
    lastId = cur.fetchone()
    return lastId
    # Save (commit) the changes



def removeToDo(toDo:list):
    cur.execute("DELETE FROM todo WHERE id=:id;",toDo)
    
    # Save (commit) the changes
    con.commit()






# We can also close the connection if we are done with it.
# Just be sure any changes have been committed or they will be lost.
#con.close()