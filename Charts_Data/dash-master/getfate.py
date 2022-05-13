#!/usr/bin/env python3
from zeep import Client
from zeep import xsd
from datetime import date, datetime, timedelta
import datetime
import json



with open('/var/www/html/Charts_Data/dash-master/ste.json', 'r') as f:
    rangeib = json.load(f)
nlim=len(rangeib)
for i in range(nlim):
    day1 	= int(rangeib['range02']['day1'])
    day1s 	= int(rangeib['range02']['day1s'])
    month1 	= int(rangeib['range02']['month1'])
    month1s = int(rangeib['range02']['month1s'])
    year1 	= int(rangeib['range02']['year1'])
    year1s	= int(rangeib['range02']['year1s'])
    day2 	= int(rangeib['range02']['day2'])
    month2 	= int(rangeib['range02']['month2'])
    year2 	= int(rangeib['range02']['year2'])
    meterd 	= rangeib['range02']['meter']

print(day1, month1, year1, meterd, day2, month2, year2)


f_date = date(year1, month1, day1)
l_date = date(year2, month2, day2)
delta = l_date - f_date
print("days in between: ", delta.days)
meter = meterd
bwsdl = "http://clvmweb.clyfsa.com:81/SEP2WebServices/DataService.svc?singleWsdl"
bclient = Client(bwsdl)
minute="00"
hour=0
sminute=""
alldvcs=[]
hcount=0
months=month1
days=0
#if (day1!= 1):
	#days=day1-1
#else:
	#days=30
	#months=month1-1

hib=0
mlen=len(minute)
cc=0

month1s=str(month1s)
if (len(month1s)==1):
	month1s="0"+month1s
#hlen=len(hour)
day1s=str(day1s)
day1=str(day1)
month1=str(month1)
if (len(day1s)==1):
	day1s="0"+day1s
if (len(month1)==1):
	month1="0"+month1
startdate = str(year1s)+"-"+month1s+"-"+day1s+"T00:00:00"
print(startdate)
print(mlen)
print(day1, len(day1))
wlimit=(delta.days+1)*96
print("limite: ",wlimit)
for x in range(wlimit):
	#if (hour == 23):
	if (hcount ==4):
		hour=hour+1
		minute="0"
		hcount=0	
	if cc==96:
		cc=0
		day1=int(day1)+1
		day1=str(day1)
		hour = 0

	cc=cc+1
	if (len(day1)==1):
			day1="0"+day1
	print(day1, "lenght: ", len(day1))		
	print("Count: ",cc)
	#if (hib==96):
	#	days=days+1
	#	hib=0
	
	if (len(str(hour))==1):
		
		
		if (mlen==1):
			minute=int(minute)+15
			print("c minute ",minute)
			sminute=str(year1)+"-"+str(month1)+"-"+day1+"T0"+str(hour)+":"+str(minute)+":00"
			print("minute ",sminute)
			print("hour ",hour)
			brequest_data ={
			    "measurementPointResultTypes": {
			      "MeasurementPointResultTypeReferences": {
			        "MeasurementPointName": meter,
			        "AgencyId": "0",
			        "ResultTypeNames":  "ActivePowerComb(|+A|+|-A|)_INST_LP1",
			        
			      }
			    },
			    "intervalStart": startdate,
			    "intervalEnd": sminute,
			    "statusFilter": "null",
			    "sourceFilter": {
			      "Measured": "true",
			      "Manual": "false",
			      "Aggregated": "false",
			      "Imported": "false",
			      "Estimated": "false"
			    },
			    "resultOrigin": "PreferRaw",
			    "lastResultOnly": "true"
			  }
		

			bresponse = bclient.service.QueryResults(**brequest_data)
			alldvcs.append(sminute)
			alldvcs.append(bresponse[0]['ResultsByResultType']['ResultTypeResults'][0]['Results']['Result'][0]['Value']['Value'])
			hcount=hcount+1
			hib=hib+1
			mlen=len(minute)
			#if (minute==45):
			#	minute="0"
		else:
			if len(str(minute)) == 2:
				sminute=str(year1)+"-"+str(month1)+"-"+str(day1)+"T0"+str(hour)+":"+str(minute)+":00"
			else:
				sminute=str(year1)+"-"+str(month1)+"-"+str(day1)+"T0"+str(hour)+":0"+str(minute)+":00"
			print("sec minute ",minute)
			print("time ",sminute)
			print("hour ",startdate)
			minute=int(minute)+15
			print("c minute ",minute)
			brequest_data ={
			    "measurementPointResultTypes": {
			      "MeasurementPointResultTypeReferences": {
			        "MeasurementPointName": meter,
			        "AgencyId": "0",
			        "ResultTypeNames":  "ActivePowerComb(|+A|+|-A|)_INST_LP1",
			        
			      }
			    },
			    "intervalStart": startdate,
			    "intervalEnd": sminute,
			    "statusFilter": "null",
			    "sourceFilter": {
			      "Measured": "true",
			      "Manual": "false",
			      "Aggregated": "false",
			      "Imported": "false",
			      "Estimated": "false"
			    },
			    "resultOrigin": "PreferRaw",
			    "lastResultOnly": "true"
			  }
		

			bresponse = bclient.service.QueryResults(**brequest_data)
			alldvcs.append(sminute)
			alldvcs.append(bresponse[0]['ResultsByResultType']['ResultTypeResults'][0]['Results']['Result'][0]['Value']['Value'])
			hcount=hcount+1
			hib=hib+1
			#if (minute==45):
			#	minute=0
			#print(alldvcs)
			#print(hcount)
	else:
		if (mlen==1):
			minute=int(minute)+15
			sminute=str(year1)+"-"+str(month1)+"-"+str(day1)+"T"+str(hour)+":"+str(minute)+":00"
			print("minute ",sminute)
			print("hour ",hour)
			brequest_data ={
			    "measurementPointResultTypes": {
			      "MeasurementPointResultTypeReferences": {
			        "MeasurementPointName": meter,
			        "AgencyId": "0",
			        "ResultTypeNames":  "ActivePowerComb(|+A|+|-A|)_INST_LP1",
			        
			      }
			    },
			    "intervalStart": startdate,
			    "intervalEnd": sminute,
			    "statusFilter": "null",
			    "sourceFilter": {
			      "Measured": "true",
			      "Manual": "false",
			      "Aggregated": "false",
			      "Imported": "false",
			      "Estimated": "false"
			    },
			    "resultOrigin": "PreferRaw",
			    "lastResultOnly": "true"
			  }
		

			bresponse = bclient.service.QueryResults(**brequest_data)
			alldvcs.append(sminute)
			alldvcs.append(bresponse[0]['ResultsByResultType']['ResultTypeResults'][0]['Results']['Result'][0]['Value']['Value'])
			hcount=hcount+1
			hib=hib+1
			#if (minute==45):
			#	minute="0"
		else:
			if len(str(minute)) == 2:
				sminute=str(year1)+"-"+str(month1)+"-"+str(day1)+"T"+str(hour)+":"+str(minute)+":00"
			else:
				sminute=str(year1)+"-"+str(month1)+"-"+str(day1)+"T"+str(hour)+":0"+str(minute)+":00"
			print("sec minute ",minute)
			print("time ",sminute)
			print("hour ",hour)
			minute=int(minute)+15
			brequest_data ={
			    "measurementPointResultTypes": {
			      "MeasurementPointResultTypeReferences": {
			        "MeasurementPointName": meter,
			        "AgencyId": "0",
			        "ResultTypeNames":  "ActivePowerComb(|+A|+|-A|)_INST_LP1",
			        
			      }
			    },
			    "intervalStart": startdate,
			    "intervalEnd": sminute,
			    "statusFilter": "null",
			    "sourceFilter": {
			      "Measured": "true",
			      "Manual": "false",
			      "Aggregated": "false",
			      "Imported": "false",
			      "Estimated": "false"
			    },
			    "resultOrigin": "PreferRaw",
			    "lastResultOnly": "true"
			  }
		

			bresponse = bclient.service.QueryResults(**brequest_data)
			alldvcs.append(sminute)
			alldvcs.append(bresponse[0]['ResultsByResultType']['ResultTypeResults'][0]['Results']['Result'][0]['Value']['Value'])
			hcount=hcount+1
			hib=hib+1
			#minute=0
			#print(alldvcs)
			#print(hcount)
	
print(alldvcs)

#alldvcs.append(aresponse[0]['Attributes']['AttributeInfo'][7]['Value']['Value'])

with open('/var/www/html/Charts_Data/dash-master/dummycomp.json', 'w', encoding='utf-8') as f:
    json.dump(alldvcs, f, ensure_ascii=False, indent=4)






#print(arr)
