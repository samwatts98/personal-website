import tornado.websocket
import tornado.web
import tornado.httpserver
import tornado.ioloop
import urllib

import json

import os
import config as conf

import uuid


class SimpleWebSocket(tornado.websocket.WebSocketHandler):
    connections = set()

    def open(self):
        print("!---Successful connection---!")
        self.connections.add(self)
        self.log_total_connections()

    def on_message(self, message):
        print("Received:", message)
        self.send_to_all(message)

    def on_close(self):
        print("!---Closing connection---!")
        self.connections.remove(self)
        self.log_total_connections()

    def check_origin(self, origin):
        parsed_origin = urllib.parse.urlparse(origin)
        print("!---New connection attempt from:", parsed_origin.netloc,"---!")
        return parsed_origin.netloc in conf.CONNECTION_WHITELIST

    

    def log_total_connections(self) :
        print("Total connections:", len(self.connections))

    def send_to_all(self, message):
        [client.write_message(message) for client in self.connections]





def make_app():
    return tornado.web.Application([
        (r"/ws", SimpleWebSocket)
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(conf.PORT)
    print("Websocket waiting on port:",conf.PORT)
    tornado.ioloop.IOLoop.current().start()

