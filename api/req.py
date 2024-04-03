from flask import Flask, request, render_template
import time, json
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/', methods=['GET'])
def home_page():
    data = {'Page': 'Home', 
            'Message': 'Successfully loaded the Home Page',
            'Time': time.time()
            }
    json_data = json.dumps(data)
    return json_data

@app.route('/get/users/', methods=['GET'])
def index():
    conn = get_db_connection()
    students = conn.execute('SELECT * FROM Students').fetchall()
    conn.close()
    return render_template('index.html', posts=students)

if __name__ == "__main__":
    app.run(debug=True)