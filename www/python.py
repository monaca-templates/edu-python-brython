from browser import document
from browser import alert
from browser import prompt
from browser import window

# プレビュー表示用のprint関数とinput関数を定義
def print(*msgs, end='<br>' ):
    message = ''
    for value in msgs:
        message = message + str(value) + ' '
    document['contents'].innerHTML = document['contents'].innerHTML  + message + end
def input(msg):
    return window.prompt(msg)

####################################################
# この行より下にPythonプログラムを書いてください
####################################################