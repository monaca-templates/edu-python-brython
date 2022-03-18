from browser import document
from browser import alert
from browser import prompt
from browser import window

# Pythonのprint関数をbrowserの処理に読み替える
def print(*msgs, end='<br>' ):
    i = 0
    message = ''
    while i < len(msgs):
        message = message + str(msgs[i]) + ' '
        i += 1
    oldContents = document['contents'].innerHTML
    document['contents'].innerHTML = oldContents + message + end

# Pythonのinput関数をbrowser.promptに読み替える
def input(msg):
    return prompt(msg)

####################################################
# この行より下にPythonプログラムを書いてください
####################################################