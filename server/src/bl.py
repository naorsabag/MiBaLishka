from dbService import DBService

class BL:
    def __init__(self, host, port):
        self.db = DBService(host, port)

    def update_occupy(self, floor, cell, state):
        self.db.update_cell(floor,cell,state)

    def get_state(self, floor, cell):
        if floor is None:
            return self.db.get_all()
        if cell is None:
            return self.db.get_floor(floor)
        return self.db.get_cell(floor,cell)
