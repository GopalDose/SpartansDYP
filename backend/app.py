from flask import *;


app = Flask();
app.name(__name__)



if __name__ == '__main__':
    app.run(debug=True)
