import os
import requests

f = open('links.txt', 'r')
lines = f.readlines()

for line in lines:
    r = requests.get(line.strip())
    filename = line.split('/')[-1].strip()[26:]
    location = os.path.join(os.getcwd(),os.path.join('folder',filename))
    #print(location)
    open(location,'wb').write(r.content)
