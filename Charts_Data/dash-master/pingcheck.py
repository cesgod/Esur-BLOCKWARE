#!/usr/bin/env python3
import os
from zeep import Client
from zeep import xsd
from datetime import date, datetime
import json

wsdl = "http://clvmweb.clyfsa.com:81/SEP2WebServices/ManagementService.svc?singleWsdl"
client = Client(wsdl)

request_data ={
    "groupReference": {
      "Name": "Active-MT880",
    }
  }
response = client.service.QueryGroupMembers(**request_data)
#print (response)
#Here 'request_data' is the request parameter dictionary.
#Assuming that the operation named 'sendData' is defined in the passed wsdl.

#print (response)
lim = len(response["Devices"]["DeviceReference"])
alldvcs=[]
#print(lim)
#lim=20
#def myconverter(o):
#    if isinstance(o, datetime.datetime):
#        return o.__str__()
 

ddd=0
for x in range (lim):
	ddd=ddd+1
	#print("cantidad", ddd)
	#print("medidor", response["Devices"]["DeviceReference"][x]["Name"])
	arequest_data ={
        "deviceReference": {
          "Name": (response["Devices"]["DeviceReference"][x]["Name"]),
        },
        "queryAll": "false",
        "attributeReferences": {
          "AttributeReferencesByGroup": [
            {
              "AttributeGroupType": "DeviceParameters",
              "AttributeReferences": {
                "AttributeReference": {
                  "Name": "DeviceID"
                }
              },
              "AllAttributes": "false"
            },
            {
              "AttributeGroupType": "CommunicationParameters0",
              "AttributeReferences": {
                "AttributeReference": {
                  "Name": "ServerIP"
                }
              },
              "AllAttributes": "false"
            }
          ]
        }
      }
	aresponse = client.service.QueryDeviceAttributes(**arequest_data)
	print(aresponse)
	#alldvcs.append(aresponse[0]['Attributes']['AttributeInfo'][0]['Value']['Value'])
	alldvcs.append(aresponse[1]['Attributes']['AttributeInfo'][0]['Value']['Value'])
	#alldvcs.append(response["Devices"]["DeviceReference"][x]["Name"])
	#alldvcs.append(aresponse[0])
	#print(alldvcs)
	host=aresponse[1]['Attributes']['AttributeInfo'][0]['Value']['Value']
	#print(host)
	hostname = host #example
	#responsep = os.system("ping -c 1 " + hostname)

	#and then check the response...
	#if responsep == 0:
	 #alldvcs.append('zmdi-assignment-check text-success')
	 #print (hostname, 'is up!')
	#else:
	 #alldvcs.append('zmdi zmdi-block-alt text-danger')
	 #print (hostname, 'is down!')

#print (alldvcs)

with open('/var/www/html/Charts_Data/dash-master/checkping.json', 'w', encoding='utf-8') as f:
 json.dump(alldvcs, f, ensure_ascii=False, indent=4)




