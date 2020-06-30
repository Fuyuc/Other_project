# -*- coding: utf-8 -*-
import pymysql
from kivy.core.window import Window
from kivy.utils import get_color_from_hex
from kivy.uix.stacklayout import StackLayout
from kivy.uix.widget import Widget
from kivy.app import App
from kivy.uix.videoplayer import VideoPlayer
from kivy.uix.button import Button
from kivy.uix.popup import Popup


class PopupButton(Button):
    pass


class System(App):

    def login_user(self):
        """用户登录界面"""

        #连接数据库
        connect = pymysql.connect(host='localhost', user='root', password='fycfycfyc123',
                                  database='camara', charset='utf8')
        cursor = connect.cursor()

        #找到对应的ID
        cursor.execute("select * from user where user_id = '%s'" % self.root.ids.user_id.text)

        #存储联系人信息元组
        information = cursor.fetchone()

        # 未输入账号，弹窗警告
        if self.root.ids.user_id.text == '':
            content = PopupButton(text='Please input your ID!', size_hint=(1, 1))
            popup = Popup(content=content, auto_dismiss=False, title='error', size_hint=(None, None), size=(400, 200))
            content.bind(on_press=popup.dismiss)
            popup.open()
            return

        # 账号不存在，弹窗警告
        if information is None:
            content = Button(text='The ID is not exist!', size_hint=(1, 1))
            popup = Popup(content=content, auto_dismiss=False, title='error', size_hint=(None, None), size=(400, 200))
            content.bind(on_press=popup.dismiss)
            popup.open()
            return

        # 未输入密码，弹窗警告
        if self.root.ids.user_password.text == '':
            content = Button(text='Please input your password!', size_hint=(1, 1))
            popup = Popup(content=content, auto_dismiss=False, title='error', size_hint=(None, None),
                          size=(400, 200))
            content.bind(on_press=popup.dismiss)
            popup.open()
            return

        # 账号密码不匹配，弹窗警告
        if information[1] != self.root.ids.user_password.text :
            content = Button(text='Password error!', size_hint=(1, 1))
            popup = Popup(content=content, auto_dismiss=False, title='error', size_hint=(None, None),
                          size=(400, 200))
            content.bind(on_press=popup.dismiss)
            popup.open()
            return

        #匹配密码,进入用户界面
        else:
            # 弹窗"登录成功"
            content = Button(text='Welcome!', size_hint=(1, 1))
            popup = Popup(content=content, auto_dismiss=False, title='success', size_hint=(None, None), size=(400, 200))
            content.bind(on_press=popup.dismiss)
            popup.open()

            #进入界面
            self.update_camera_list()
            self.root.current = 'choose_camera_view'

            # 清除登录页面输入框内容
            self.root.ids.user_password.text = ''
            self.root.ids.user_id.text = ''

    def update_camera_list(self):
        """更新摄像头列表"""

        #连接数据库
        connect = pymysql.connect(host='localhost', user='root', password='fycfycfyc123',
                                  database='camara', charset='utf8')
        cursor = connect.cursor()

        #获取摄像头信息
        cursor.execute("select * from camera")
        camera_information = cursor.fetchall()

        cursor.close()
        connect.close()

        #选中摄像头列表
        camera_list = self.root.ids['camera_list']

        #移除所有的子控件
        camera_list.clear_widgets()

        for i in range(len(camera_information)):
            text_camera = '    %s                                         %s                                   %s\n' % \
                           camera_information[i]

            #创建按钮
            button = Button(text=text_camera,size_hint=(1, None),height = 50)
            camera_list.add_widget(button)

    def update_file_list(self,text):
        """更新文件列表"""

        # 连接数据库
        connect = pymysql.connect(host='localhost', user='root', password='fycfycfyc123',
                                  database='camara', charset='utf8')
        cursor = connect.cursor()
        cursor.execute("select file_id,file_name,shooting_time from file where camera_id = '%s' order by file_id asc" % text)

        #找到摄像头编号匹配的视频文件
        file_information = cursor.fetchall()

        #判断元组是否为空
        self.one_line = cursor.fetchone()

        cursor.close()
        connect.close()

        # 选中文件列表
        file_list = self.root.ids['file_list']

        # 移除所有的子控件
        file_list.clear_widgets()

        for i in range(len(file_information)):
            text_file = '    %s                                         %s                                   %s\n' % \
                        file_information[i]

            # 创建按钮
            button = Button(text=text_file, size_hint=(1, None), height=50)
            file_list.add_widget(button)

    def search_file_button(self):
        """输入摄像头id 寻找文件"""

        self.update_file_list(self.root.ids.camera_list_id.text)

        # 未输入摄像头ID，弹窗警告
        if self.root.ids.camera_list_id.text == '':
            content = Button(text='Please choose Camera ID!', size_hint=(1, 1))
            popup = Popup(content=content, auto_dismiss=False, title='error', size_hint=(None, None), size=(400, 200))
            content.bind(on_press=popup.dismiss)
            popup.open()
            return

        # 清除输入框内容
        self.root.ids.camera_list_id.text = ''

        self.root.current = 'choose_file_view'

    def search_video_button(self):
        """输入文件id寻找文件并跳转到播放界面"""

        # 连接数据库
        connect = pymysql.connect(host='localhost', user='root', password='fycfycfyc123',
                                  database='camara', charset='utf8')
        cursor = connect.cursor()
        cursor.execute("select file_name from file where file_id = '%s'" % self.root.ids.file_list_id.text)

        # 找到与文件ID对应的文件名
        file_name = cursor.fetchone()

        cursor.close()
        connect.close()

        # 未输入文件ID，弹窗警告
        if self.root.ids.file_list_id.text == '':
            content = Button(text='Please choose File ID!', size_hint=(1, 1))
            popup = Popup(content=content, auto_dismiss=False, title='error', size_hint=(None, None), size=(400, 200))
            content.bind(on_press=popup.dismiss)
            popup.open()
            return

        #进入播放界面
        else:
            content = Button(text='Loading,please wait', size_hint=(1, 1))
            popup = Popup(content=content, auto_dismiss=False, title='success', size_hint=(None, None), size=(400, 200))
            content.bind(on_press=popup.dismiss)
            popup.open()

            # 清除输入框内容
            self.root.ids.file_list_id.text = ''

            #文件名
            video_name = 'Videos/' + file_name[0]
            self.view_player(video_name)
            self.root.current = 'video_view'

    def view_player(self,video_name):
        """更新播放器界面"""

        #创建videoplayer子控件
        self.vid = VideoPlayer(source=video_name, state='play',
                               options={'allow_stretch': False,
                                        'eos': 'loop'})
        self.root.ids['video'].add_widget(self.vid)

    def view_player_back_button(self):
        """返回choose_file_view按钮
            1、暂停播放
            2、回到页面"""

        #视频播放状态为stop
        self.vid.state = 'stop'

        # 移除所有的子控件
        self.root.ids['video'].clear_widgets()

        self.root.current = 'choose_file_view'



if __name__ == '__main__':
    Window.clearcolor = get_color_from_hex('#DCDCDC')
    System().run()
