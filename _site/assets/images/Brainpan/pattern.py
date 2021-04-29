#!/usr/bin/env python3

import random

#make pattern without metasploit
#make an array for data

data = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',\
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',\
        '1','2','3','4','5','6','7','8','9','0']


pattern = ''

#user input
length = int(input("[+]Enter length of pattern to be created : "))

#loop

for i in range(0,length):
    pattern += data[random.randint(0,len(data)-1)]

print('[+]output :\n{}'.format(pattern))

# pattern search

x = input('[+]Patter search :')

length2 = len(x)

indexes = []
#abc defg hij

for i in range(0,len(pattern)):
    temp = pattern[i:i+length2]
    if temp == x:
        indexes.append(pattern.index(temp))

for i in indexes:
    print('[*]value ' , i)