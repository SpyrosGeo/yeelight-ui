from flask import Flask, jsonify
from flask_cors import CORS
from yeelight import Bulb
ylight = Bulb('192.168.8.23')
app = Flask(__name__)
CORS(app)


@app.route('/')
def get_json_data():
    data = Bulb.get_properties(ylight)
    power = data['power']
    return jsonify({"power": power,"color":data['rgb']})


@app.route('/on')
# @cross_origin()
def toggle_light():
    ylight.toggle()
    return jsonify({"power": "Null"})


@app.route('/color/<color_id>')
def change_light_color(color_id):
    print("color route!")
    #convert the hex to rgb
    color = tuple(int(color_id[i:i+2], 16) for i in (0, 2, 4))
    ylight.set_rgb(color[0],color[1],color[0])
    ylight.set_brightness(100)
    return jsonify({"color": color})

@app.route('/default')
def default_state():
    set_default_state()
    return jsonify({"default":"success"})

#reset to default state
def set_default_state():
    ylight.set_color_temp(4700)
    ylight.set_brightness(100)



if __name__ == '__main__':
    app.run
