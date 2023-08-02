
from flask import Flask, render_template, request, json, flash,  redirect, url_for, session
from scanner_modules.ARP_Scanner import *
from scanner_modules.Analyzer import *
from flask_cors import CORS
from scanner_modules.MalewareAnalysis import *
from scanner_modules.Sniffer import *




app = Flask(__name__)
df=''
CORS(app)
@app.route('/api')
def index():
 return {'status':'OK'}

@app.route('/save_scan')
def save_scan():
 json_to_csv("client\src\components\datatable\scan.json")
 return {'status':'OK'}
def _sniff(e,f):
    sniffed=sniff(stop_filter=lambda x:e.is_set(),filter=f)
    return sniffed
def make_pcap(res):
    download_thread = threading.Thread(target=wrpcap, args=('client/public/temp.pcap', res,))
    download_thread.start()
@app.route('/sniff', methods=['POST','GET'])
def live_sniff():
    

    json_data=request.get_json()
    #print(json_data)

    filter=''
    
    
   # proto=request.form['proto']
    '''
    start_sniff2=request.form['start_sniff']
    if(start_sniff2=='true'):
        start_sniff=True

    
    else:
        start_sniff=False
    
    print(type(start_sniff))
    '''
   # srcport=request.form['srcport']
    #dstport=request.form['dstport']
    #srcaddr=request.form['srcaddr']
    #dstaddr=request.form['dstaddr']
    #bpf=request.form['bpf']


    
    start_sniff=json_data.get('start_sniff')
    
    proto=json_data.get('proto')
    srcport=json_data.get('srcport')
    dstport=json_data.get('dstport')
    srcaddr=json_data.get('srcaddr')
    dstaddr=json_data.get('dstaddr')
    bpf=json_data.get('bpf')
    
    if(bpf!=''):
        filter=bpf
    else:
        
        existingfilter=False
        if proto != '':
            print(1)
            filter+=proto
            existingfilter=True
        if srcport != '':
            filter+=' and ' if existingfilter else ''

            filter+='src port '+srcport
            existingfilter=True
        if dstport != '':
            filter+=' or ' if existingfilter else ''
            filter+='dst port '+dstport
            existingfilter=True
        if srcaddr != '':
            filter+=' and ' if existingfilter else ''
            filter+='src host '+srcaddr
            existingfilter=True
        if dstaddr != '':
            filter+=' or ' if existingfilter else ''
            filter+='dst host '+dstaddr
            
    
    print(filter)
    pcaps=''
    print(start_sniff)
    if(start_sniff):
            global eve,twrv
            eve=Event()
            twrv = ThreadWithReturnValue(target=_sniff, args=(eve,filter,))
            twrv.start()
    else:
        eve.set()
        res=twrv.join()
        download_thread = threading.Thread(target=wrpcap, args=('client/build/pcaps/temp.pcap', res,))
        download_thread.start()
        #make_pcap(res)
        #download_thread = threading.Thread(target=make_pcap, args=(res,))
        #download_thread.start()
        #a=wrpcap("client/public/output.pcap",res)
        #print(a)

        df=create_df(res)
        pcaps=json.loads(get_pcap_fields(df))
       # pcaps=json.loads(get_pcap_fields(df))
       # pcaps=json.loads(get_pcap_fields(df))
       
        #wrpcap('client/public/temp.pcap', res)
        
        #del twrv
    print(pcaps)
    return {'status':'OK','pcaps':pcaps}

def startsys(file,proto):
    wrpcap("temp.pcap",file)
    if proto=='HTTP':
        new = ThreadWithReturnValue(target=ask_virustotal, args=(set(http("temp.pcap")),))
    elif proto=='DNS':
        new = ThreadWithReturnValue(target=ask_virustotal, args=(set(dns("temp.pcap")),))
    elif proto=='IP':
        new = ThreadWithReturnValue(target=ask_virustotal, args=(set(ip("temp.pcap")),))
    print(new.start())
    resp=new.join()
    print(resp)
    return resp
@app.route('/uploadMalware', methods=['POST'])
def fileUploadMalware():
    file = request.files['file']
    proto=request.form['proto']
    
    pcap=sniff(offline=file)
    response,malcount=startsys(pcap,proto)
    return {"response":response,"malcount":malcount}

@app.route('/getConnections', methods=['POST'])
def getConnections():
    file = request.files['file']
    params = request.form['params']
    pcap = sniff(offline=file) 
    df = create_df(pcap)
    connections = getSrcSpeakers(df, params).tolist()
    print("done")
    return {"this":connections}

    


@app.route('/upload', methods=['POST'])
def fileUpload():
    file = request.files['file'] 
    pcap = sniff(offline=file)
    print(pcap)
    key=[]
    val=[]
    layers_info=get_proto_layers(pcap)
    for layer in range(6):
        key.append(list(layers_info[layer].keys()))
        val.append(list(layers_info[layer].values()))
    df=create_df(pcap)
    src,dst=getTopSrcDstAddr(df)
    srcSpeakers=getSrcSpeakers(df,src)
    src_p,dst_p=getSrcDstPorts(df,src)
    PayloadData=getSourcePayload(df)
    payloadSrcKeys=list(PayloadData[0].keys())
    payloadSrcValues=list(PayloadData[0].values())
    payloadDstValues=list(PayloadData[1].values())
    payloadSrcPort=srcPortPayload(df)
    payloadDstPort=dstPortPayload(df)
    payload_by_time=payloadByTime(df,src)
    payload_by_timedst=payloadByTimeDst(df,src)
    #why u load the data two times????? u could use this variable 
    #for all operations
    pcaps=json.loads(get_pcap_fields(df))

    allSrc=allSrcDstAddr(df)[0]
    return {"keys":key,"values":val,"src":src,"dst":dst,"srcSpeakers":
    srcSpeakers.tolist(),"srcPort":src_p.tolist(),"dstPort":dst_p.tolist(),
    "allSrc":allSrc.tolist(),"payloadSrcKeys":payloadSrcKeys,"payloadSrcValues":payloadSrcValues,
    "payloadDstValues":payloadDstValues,"payloadSrcPortKey":payloadSrcPort[0],
    "payloadSrcPortValue":payloadSrcPort[1],
    "payloadDstPortKey":payloadDstPort[0],"payloadDstPortValue":payloadDstPort[1],"payload_by_timep":payload_by_time[0]
    , "payload_by_timev":payload_by_time[1],"payload_by_timepdst":payload_by_timedst[0]
    , "payload_by_timevdst":payload_by_timedst[1], "pcaps":pcaps}




@app.route('/delete', methods=['POST'])
def deleteID():
    json_data=request.get_json()
    id=int(json_data.get('id'))
    delete_JSON(id)
    #arp_scan_content=ICMP_Scanner(ip,srange,erange,timeout,save).scan()
    return json.dumps({'status':'ok'})


@app.route('/icmpScan', methods=['POST'])
def icmp_scan():
    json_data=request.get_json()
    ip,erange,srange,timeout,save=getParams(json_data)
    arp_scan_content=ICMP_Scanner(ip,srange,erange,timeout,save).scan()
    return json.dumps({'arp_scan_content':arp_scan_content})

@app.route('/tcpScan', methods=['POST'])
def tcp_scan():
    json_data=request.get_json()
    ip,erange,srange,timeout,save=getParams(json_data)
    arp_scan_content=TCP_Scanner(ip,srange,erange,timeout,save).scan()
    return json.dumps({'arp_scan_content':arp_scan_content})
@app.route('/udpScan', methods=['POST'])
def udp_scan():
    json_data=request.get_json()
    ip,erange,srange,timeout,save=getParams(json_data)
    arp_scan_content=UDP_Scanner(ip,srange,erange,timeout,save).scan()
    return json.dumps({'arp_scan_content':arp_scan_content})

@app.route('/arpScan', methods=['POST'])
def arp_scan():
    json_data=request.get_json()
    ip,erange,srange,timeout,save=getParams(json_data)
    arp_scan_content=ARP_Scanner(ip,srange,erange,timeout,save).scan()
    return json.dumps({'status':'OK','arp_scan_content':arp_scan_content})

def getParams(json_data):
     ip =  json_data.get('ip')
     erange = int(json_data.get('erange'))
     srange=int(json_data.get('srange'))
     timeout=int(json_data.get('timeout'))
     save=int(json_data.get('save'))
     return ip,erange,srange,timeout,save


if __name__ == '__main__':
  app.run(debug=True,threaded=True)