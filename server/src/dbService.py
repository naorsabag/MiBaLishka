from datetime import datetime

class DBService:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.occupyMap = {}


    def update_cell(self, floor ,cell, occupy):
        if not floor or not floor in self.occupyMap:
            self.occupyMap[floor] = {}
            
        if not cell or not cell in self.occupyMap[floor]:
            self.occupyMap[floor][cell] = {}

        self.occupyMap[floor][cell] = {'state': occupy,'update-time': datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%f')}


    def get_floor(self, floor):
        if not(floor in self.occupyMap):
            return {}
        return  self.occupyMap[floor]
        
    def get_cell(self, floor, cell):
        if not(floor in self.occupyMap) or not(cell in self.occupyMap[floor]):
            return {}
        return  self.occupyMap[floor][cell]

    def get_all(self):
        return self.occupyMap