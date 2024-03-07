from flask import Flask, request
import time, json

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home_page():
    data = {'Page': 'Home', 
            'Message': 'Successfully loaded the Home Page',
            'Time': time.time()
            }
    json_data = json.dumps(data)
    return json_data

@app.route('/user/', methods=['GET'])
def request_page():
    user_query = str(request.args.get('user')) # The endpoint will now be /user/?user={USERNAME}

    data = {'Page': 'Request', 
            'Message': f'Successfully got the request for {user_query}',
            'Time': time.time()
            }
    json_data = json.dumps(data)
    return json_data 

if __name__ == "__main__":
    app.run(debug=True)