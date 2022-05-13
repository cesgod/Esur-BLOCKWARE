#!/usr/bin/env python3
from zeep import Client
from zeep import xsd
from datetime import date, datetime, timedelta
import datetime
import json
#import numpy as np

with open('/var/www/html/dash/meters/client/production/stebw.json', 'r') as f:
    rangeib = json.load(f)
nlim=len(rangeib)
for i in range(nlim):
    day1 	= int(rangeib['range01']['day1'])
    day1s 	= int(rangeib['range01']['day1s'])
    month1 	= int(rangeib['range01']['month1'])
    month1s = int(rangeib['range01']['month1s'])
    year1 	= int(rangeib['range01']['year1'])
    year1s	= int(rangeib['range01']['year1s'])
    day2 	= int(rangeib['range01']['day2'])
    month2 	= int(rangeib['range01']['month2'])
    year2 	= int(rangeib['range01']['year2'])
    meterd 	= rangeib['range01']['meter']

print(day1, month1, year1, meterd, day2, month2, year2)

maxdata=0;
timestamp=""
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
month2=str(month2)
if (len(month2)==1):
	month2="0"+month2
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


#month2
month2=str(month2)
if (len(month2)==1):
	month2="0"+month2
#hlen=len(hour)
day2=str(day2)
if (len(day2)==1):
	day2="0"+day2

initiald = "2021-01-01T03:00:00"
startdate = str(year1s)+"-"+month1s+"-"+day1s+"T03:00:00"
sminute = str(year2)+"-"+month2+"-"+day2+"T03:00:00"
print(startdate)
print(sminute)
print(mlen)
print(day1, len(day1))
wlimit=(delta.days+1)*96
print("limite: ",wlimit)

meter = meterd
bwsdl = "http://clvmweb.clyfsa.com:81/SEP2WebServices/DataService.svc?singleWsdl"
bclient = Client(bwsdl)
brequest_data ={
    "measurementPointResultTypes": {
        "MeasurementPointResultTypeReferences": {
        "MeasurementPointName": meter,
        "AgencyId": "0",
        #"ResultTypeNames":  "ActivePowerComb(|+A|+|-A|)_INST_LP1",
        "ResultTypeNames": "AbsoluteEnergy_T0_BP1"
        }
    },
    "intervalStart": initiald,
    "intervalEnd": startdate,
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
crequest_data ={
    "measurementPointResultTypes": {
        "MeasurementPointResultTypeReferences": {
        "MeasurementPointName": meter,
        "AgencyId": "0",
        #"ResultTypeNames":  "ActivePowerComb(|+A|+|-A|)_INST_LP1",
        "ResultTypeNames": "AbsoluteEnergy_T0_BP1"
        }
    },
    "intervalStart": initiald,
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
cresponse = bclient.service.QueryResults(**crequest_data)
print(bresponse)
print(cresponse)
allmts=[]
if (bresponse[0]['ResultsByResultType']['ResultTypeResults'][0]['Results'] is not None):
    lastlimit=len(bresponse[0]['ResultsByResultType']['ResultTypeResults'][0]['Results']['Result'])
    print(lastlimit)
    maxdata=0
    timestamp=""
    for i in range(lastlimit):
        allmts.append((bresponse[0]['ResultsByResultType']['ResultTypeResults'][0]['Results']['Result'][i]['Timestamp'] - timedelta(hours=3)).strftime("%d-%m-%Y %H:%M"))
        allmts.append(bresponse[0]['ResultsByResultType']['ResultTypeResults'][0]['Results']['Result'][i]['Value']['Value'])
        if (float(bresponse[0]['ResultsByResultType']['ResultTypeResults'][0]['Results']['Result'][i]['Value']['Value'])> float(maxdata)):
            maxdata=bresponse[0]['ResultsByResultType']['ResultTypeResults'][0]['Results']['Result'][i]['Value']['Value']
            timestamp=((bresponse[0]['ResultsByResultType']['ResultTypeResults'][0]['Results']['Result'][i]['Timestamp']- timedelta(hours=3)).strftime("%m/%d/%Y %H:%M:%S"))
        allmts.append((cresponse[0]['ResultsByResultType']['ResultTypeResults'][0]['Results']['Result'][i]['Timestamp'] - timedelta(hours=3)).strftime("%d-%m-%Y %H:%M"))
        allmts.append(cresponse[0]['ResultsByResultType']['ResultTypeResults'][0]['Results']['Result'][i]['Value']['Value'])
        if (float(cresponse[0]['ResultsByResultType']['ResultTypeResults'][0]['Results']['Result'][i]['Value']['Value'])> float(maxdata)):
            maxdata=cresponse[0]['ResultsByResultType']['ResultTypeResults'][0]['Results']['Result'][i]['Value']['Value']
            timestamp=((cresponse[0]['ResultsByResultType']['ResultTypeResults'][0]['Results']['Result'][i]['Timestamp']- timedelta(hours=3)).strftime("%m/%d/%Y %H:%M:%S"))
    
print(allmts)


allmax=[]	
allmax.append(maxdata)
allmax.append(timestamp)
print('Max Data: ', maxdata, ' Timestamp: ', timestamp)
print(allmax)
#alldvcs.append(aresponse[0]['Attributes']['AttributeInfo'][7]['Value']['Value'])
#with open('/var/www/html/dash/meters/client/production/maxdatabill.json', 'w', encoding='utf-8') as f:
#    json.dump(allmax, f, ensure_ascii=False, indent=4)

with open('/var/www/html/dash/meters/client/production/dummycompbill.json', 'w', encoding='utf-8') as f:
    json.dump(allmts, f, ensure_ascii=False, indent=4)

