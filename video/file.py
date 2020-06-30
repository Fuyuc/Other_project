import pymysql

class File():
    def __init__(self,information):
        self.camera_id = information[0]
        self.file_id = information[1]
        self.file_name = information[2]
        self.video_length = information[3]
        self.shooting_time = information[4]

