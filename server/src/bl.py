from dbService import DBService

class BL:
    def __init__(self, host, port):
        self.db = DBService(host, port)

    def update_occupy(self, floor, cell, state):
        print("request", flush=True)
        print(floor, flush=True)
        print(cell, flush=True)
        print(state, flush=True)
        self.db.update_cell(floor,cell,state)

    def get_state(self, floor, cell):
        if floor is None:
            x = self.db.get_all()
            print(x, flush=True)
            return x
        if cell is None:
            return self.db.get_cell(floor)
        return self.db.get_cell(floor,cell)
