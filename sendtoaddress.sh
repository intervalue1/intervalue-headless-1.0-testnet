#!/bin/bash
START=`date +%s%N`;
echo $START
for ((i=1; i<=500; i++))
do 
	curl --data '{"jsonrpc":"2.0", "id":1, "method":"sendtoaddress", "params":["V75LBJES2LGYGLTK2VTEJICLHDSJ4RNA", 1] }' http://127.0.0.1:6332;
done
END=`date +%s%N`;
time=$((END-START))
time=`expr $time / 1000000`
echo $time 

