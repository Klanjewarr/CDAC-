#We can only pick 2 card and swap them

n=int(input())

for i in range(n): #to take input in the range of the given output
    str=input()
    if str=="abc"or str=="acb" or str=="cba" or str=="bac":#only this possible combination possible after picking 2 cards ans swithing them
        print("YES")
    else:
        print("NO")
    
    

