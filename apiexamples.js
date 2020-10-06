//declare var fs,c,Promise; 
var gmicon,gmback,gmlock,gmfont,gmwidth,gmwidthreal,gloccopy;
var gwidth,gheight,ghmid,gy,gx,gt;
var gservpubkey,gpubkeymy,gkeymy,gpubkeymyhash,gnodename,gnodeselect,gnodemain,gnodemaster,gcustlist,gkeypmy,gpic,gpics,gscripts,gnodeloc,glocal,gappback;
var gchart,gchartline,gchartshop; 
//******************************* initialized blockchain *****************************************
//declare var fs,c;
var sip; // ip address of the node
function log(ss) { fs.log(ss); }
function fieldscreate() { //sdat=custfile|acc,6|name,30|address,30|amount,f|datetime,14|memo,m#acckey,acc|namekey,name,acc  //types=s d f=12 a=12 q=24 b=byte1 w=word2 i=integer4 l=long8
     var sb='';
     sb='customer|number,6|name,30|amount,f|memo,m#number,number|surname,name';
     sb=fs.dcreate(sip,sb); 
     document.getElementById("iddisp").innerHTML = sb;
}
function fieldswrite() { log('write.....');
     var hdc,kk=0;
     hdc=fs.dopen(sip,'customer'); log(hdc+'.....');
     for(var i=1001;i<=1020;i++) { 
       fs.dclear(hdc);
       fs.dnput(hdc,'number',i+'');                   
       fs.dnput(hdc,'name',i+'Name Coetzee');                   
       fs.dnput(hdc,'amount','1234.12');                   
       fs.dnput(hdc,'memo',i+'memo info.............'); kk++;
       fs.dinsert(hdc);
     }
     fs.dclose(hdc);
     document.getElementById("iddisp").innerHTML = kk+'>>>';
}
function fieldsread() {
     var sc,sb='',hdc,kk=0;
     hdc=fs.dopen(sip,'customer'); sb=fs.dinfo(hdc)+'<br>';
     if(fs.dfind(hdc,'number','','','',0)==true) { //sb='';
       fs.dfirst(hdc);
       for(;;) {
         if(fs.deof(hdc)==true) break;
          sb+=kk+'.'+fs.dn(hdc,'number')+fs.dn(hdc,'name')+fs.dn(hdc,'amount')+fs.dn(hdc,'memo')+'<br>'; kk++; 
          fs.dnext(hdc);
       }
     }
     if(fs.dfindid(hdc,'1006')==true) { sc=fs.drec(hdc)+'<br>'; }
     fs.dclose(hdc);
     document.getElementById("iddisp").innerHTML = sb+sc;
}
function fieldswritedoc() {
     var hdc,kk=0;
     hdc=fs.dopen(sip,'customer'); 
     for(var i=1021;i<=1040;i++) { 
       fs.dclear(hdc);
       fs.dnput(hdc,'number',i+'');                   
       fs.dnput(hdc,'name',i+'Name Coetzee');                   
       fs.dnput(hdc,'amount','1234.12');                   
       fs.dnput(hdc,'memo',i+'memo info.............'); kk++;
       fs.dinsertdoc(hdc,'file.txt','...... document info........');
     }
     fs.dclose(hdc);
     document.getElementById("iddisp").innerHTML = kk+'>>>';
}
function fieldsreaddoc() {
     var sc,sb='',hdc,kk=0;
     hdc=fs.dopen(sip,'customer');  
     if(fs.dfinddoc(hdc,'number','1021','','',0)==true) { sb=''; 
       fs.dfirst(hdc);
       for(;;) {
         if(fs.deof(hdc)==true) break;
          sb+=kk+'.'+fs.dn(hdc,'number')+fs.dn(hdc,'name')+fs.dn(hdc,'amount')+fs.dn(hdc,'memo')+'('+fs.xitemlast(fs.ddoc(hdc),1,':')+')('+fs.ditem(hdc)+')<br>'; kk++; 
          fs.dnext(hdc);
       }
     }
     if(fs.dfindiddoc(hdc,'1025')==true) {    sc=fs.dn(hdc,'name')+'>'+fs.drec(hdc)+'('+fs.ddoc(hdc)+')('+fs.ditem(hdc)+')<br>';      } //timestamp24,itemstamp64,isf,isdoc,adrto of transaction
     fs.dclose(hdc);
     document.getElementById("iddisp").innerHTML = sb+sc;
}


//*************************************** accounts *************************************************
function usercreate() {  
var username='meta4';
var userpassword='meta4password';
var key;
 key=fs.dbkey(userpassword);   gkeymy=key;
 if(fs.userexist(sip,username)=='') {  // username dont exist
    key=fs.dbkey(userpassword); alert(fs.xhexs(key.pub));  gkeymy=key;     //get key.pri key.pub
    if(fs.useraddress(sip,fs.xhexs(key.pub))=='no') {  // public address dont exist
        fs.userput(sip,userpassword,username); 
        document.getElementById("iddisp").innerHTML = 'create:'+username+':'+userpassword;
    } else {//sa.substr(64,32).trim() == username 
      document.getElementById("iddisp").innerHTML = 'Already exist:'+username+':'+userpassword;
    }
 } else { //user exist
      document.getElementById("iddisp").innerHTML = 'Address:'+username+':'+fs.userexist(sip,username);
 }
}  


//****************************** Simple Chat *****************************************************
//****************************** Simple Chat *****************************************************
//****************************** Simple Chat *****************************************************
function chatsend() {    fs.chatput(sip,'chat','meta2','Hi -how ae you?');   } // 
function chatdocsend() { //chat + document 
    fs.chatputdoc(sip,'chat','meta2','Hi -how are you?','file.txt','document info...............');
}
function chatdocemail() { //chat + email document 
    fs.chatputdoc(sip,'chat','meta2','Hi -email  you..........................?','file.htmd','<b>document</b> info...............');
}
function chatlistsend() { //chat list
       for(var i=0;i<10;i++) {
         fs.chatput(sip,'chat','meta2','Hi -how ae you? '+i);
       } 
}
function chattwosend() { // send to two friends
    fs.chatput(sip,'chat','meta1^meta2','Hi -how are you - two?');
}
function chatread() { 
  var sb='',sa=fs.chatget(sip,'chat','meta1^meta2',100);  //fs.chatget(sip,'phillip','meta2^meta3',100);
  for(var i=0;i<sa.length;i++) { sb+=i+'.'+sa[i]+'<br>'; }
  document.getElementById("iddisp").innerHTML = sb;
}
function chatreaddoc() { 
  var sc='',sb='';
  var sa=fs.chatgetdoc(sip,'phillip','a1',100);  //fs.chatgetdoc(sip,'phillip','meta2^meta3^meta4',100);
  for(var i=0;i<sa.record.length;i++) { 
     if(sa.doc[i]=='') { sc=''; } else { sc=fs.datadoc(sa.doc[i]); }
     sb+=i+'.'+sa.record[i]+' ('+sc+')<br>'; 
  }
  document.getElementById("iddisp").innerHTML = sb;
}

//****************************** email send *****************************************************
//****************************** email send *****************************************************
//****************************** email send *****************************************************
//****************************** email send *****************************************************
function emailsendreal() { 
  var sa; 
  var sip=(window.location+'').split('/')[2]; 
  sa=fs.emailput(sip,'bmssoftware@gmail.com','Example Email','c:/az/initstart.txt','Hi - this is a basic email');
 document.getElementById("iddisp").innerHTML = sa;
}
function emailsendrealdata() { 
  var sa; 
  var sip=(window.location+'').split('/')[2]; 
  sa=fs.emailputdata(sip,'bmssoftware@gmail.com','Example Email','file.txt','document info...','Hi - this is a basic email');
 document.getElementById("iddisp").innerHTML = sa;
}


//****************************** Data List Write *****************************************************
//****************************** Data List Write *****************************************************
//****************************** Data List Write *****************************************************
//****************************** Data List Write *****************************************************

function datalist() { 
  var mess,sb;
  var sip=window.location+''; sip=sip.split('/')[2];     // get the ip
  //fs.dataput(sip,'chat^chat1','rat|bat','record info');  return;// 
  var datakeys='dog,cat,bear,lion,tiger,mice,rat,bug,bird,eagle,eat,ok,what,new,random,statement,say,final,result'
   for(var i=1;i<=fs.itemcount(datakeys);i++) {
    sb=fs.itemget(datakeys,i); //log(sb); //alert(sb);
    fs.dataput(sip,'phillipx','animal'+sb,'record info.......:'+sb); //ip,filename,key,record    (filename==PrivateKey)
   }
   document.getElementById("iddisp").innerHTML = i+'';
}
function dataread() {  
  var sb='';
  var datakeys='dog,cat,bear,lion,tiger,mice,rat,bug,bird,eagle';
  var key='animal'+fs.itemget(datakeys,fs.randomget(1,10)); log(key);
  var sa=fs.dataget(sip,'phillipx',key,0); log('>>>>>'+sa);
  for(var i=0;i<sa.length;i++) { sb+=i+'.'+sa[i]+'<br>'; }
  document.getElementById("iddisp").innerHTML = sb;
}

function datalistread() { 
  var sb='';
  var sa=fs.datafrom(sip,'phillipx','animal','animal','',0);
  for(var i=0;i<sa.length;i++) { sb+=i+'.'+sa[i]+'<br>'; }
  document.getElementById("iddisp").innerHTML = sb;
}
function datalistreadall() { 
  var sb='';
  var sa=fs.datafromall(sip,'phillipx','animal','animal','',0);
  for(var i=0;i<sa.length;i++) { sb+=i+'.'+sa[i]+'<br>'; }
  document.getElementById("iddisp").innerHTML = sb;
}
//*********************************************** send with a document **********************************************************
//*********************************************** send with a document **********************************************************
//*********************************************** send with a document **********************************************************
//*********************************************** send with a document **********************************************************
//*********************************************** send with a document **********************************************************
function datalistdoc() { 
  var mess,sb,docname,doc;
  var datakeys='dog,cat,bear,lion,tiger,mice,rat,bug,bird,eagle,eat,ok,what,new,random,statement,say,final,result'
   for(var i=1;i<=fs.itemcount(datakeys);i++) {
    sb=fs.itemget(datakeys,i);
    docname='file'+i+'.txt'; doc='.............document info........';
    fs.dataputdoc(sip,'phillipx','animal'+sb,'record info.......:'+sb,docname,doc); //ip,filename,key,record,docname,docinfo    (filename==PrivateKey)
   }
}
function datareaddoc() { 
  var sb='',sc='';
  var datakeys='dog,cat,bear,lion,tiger,mice,rat,bug,bird,eagle';
  var key='animal'+fs.itemget(datakeys,fs.randomget(1,10)); 
  var sa=fs.datagetdoc(sip,'phillipx',key,0);
  for(var i=0;i<sa.record.length;i++) { 
     if(sa.doc[i]=='') { sc=''; } else { sc=fs.datadoc(sa.doc[i]); }
     sb+=i+'.'+sa.record[i]+' ('+sc+')<br>'; 
  }
  document.getElementById("iddisp").innerHTML = sb;
}
function datalistreaddoc() { 
  var sb='',sc='';
  var sa=fs.datafromdoc(sip,'phillipx','animal','animal','',0); 
  for(var i=0;i<sa.record.length;i++) { 
     if(sa.doc[i]=='') { sc=''; } else { sc=fs.datadoc(sa.doc[i]); }
     sb+=i+'.'+sa.record[i]+' ('+sc+')<br>'; 
  }
  document.getElementById("iddisp").innerHTML = sb;
}
function datalistreadalldoc() { 
  var sb='',sc='';
  var sa=fs.datafromalldoc(sip,'phillipx','animal','animal','',0);
  for(var i=0;i<sa.record.length;i++) { 
     if(sa.doc[i]=='') { sc=''; } else { sc=fs.datadoc(sa.doc[i]); }
     sb+=i+'.'+sa.record[i]+' ('+sc+')<br>'; 
  }
  document.getElementById("iddisp").innerHTML = sb;
}
//********************************** more indexes ***************************************************************************************
//********************************** more indexes ***************************************************************************************
//********************************** more indexes ***************************************************************************************
//********************************** more indexes ***************************************************************************************
function datalistindex() { 
  var mess,sb;
  var datakeys='dog,cat,bear,lion,tiger,mice,rat,bug,bird,eagle,eat,ok,what,new,random,statement,say,final,result'
   for(var i=1;i<=fs.itemcount(datakeys);i++) {
    sb=fs.itemget(datakeys,i); 
    fs.dataput(sip,'phillipx','animal'+sb+'#zoo'+sb,'record info.......:'+sb); //ip,filename,key,record    (filename==PrivateKey)
   }
}
function datareadindex() { 
  var key,sa,sb='';
  var datakeys='dog,cat,bear,lion,tiger,mice,rat,bug,bird,eagle';
  var rkey=fs.itemget(datakeys,fs.randomget(1,10));
  key='animal'+rkey; 
  sa=fs.dataget(sip,'phillipx',key,0);
  sb='animal<br>'; for(var i=0;i<sa.length;i++) { sb+=i+'.'+sa[i]+'<br>'; }
  key='zoo'+rkey; 
  sa=fs.dataget(sip,'phillipx',key,0);
  sb+='zoo<br>'; for(var i=0;i<sa.length;i++) { sb+=i+'.'+sa[i]+'<br>'; }
  document.getElementById("iddisp").innerHTML = sb;
}

function datalistindexex() { 
  var mess,sb;
  var datakeys='dog,cat,bear,lion,tiger,mice,rat,bug,bird,eagle,eat,ok,what,new,random,statement,say,final,result'
   for(var i=1;i<=fs.itemcount(datakeys);i++) {
    sb=fs.itemget(datakeys,i); 
    fs.dataput(sip,'phillipx^phillipy','animal'+sb+'|zoo'+sb,'record info.......:'+sb); //ip,filename,key,record    (filename==PrivateKey)
   }
}
function datareadindexex() { 
  var key,sa,sb='';
  var datakeys='dog,cat,bear,lion,tiger,mice,rat,bug,bird,eagle';
  var rkey=fs.itemget(datakeys,fs.randomget(1,10));
  key='animal'+rkey; 
  sa=fs.dataget(sip,'phillipx',key,0);
  sb='animal<br>'; for(var i=0;i<sa.length;i++) { sb+=i+'.'+sa[i]+'<br>'; }
  key='zoo'+rkey; 
  sa=fs.dataget(sip,'phillipy',key,0);
  sb+='zoo<br>'; for(var i=0;i<sa.length;i++) { sb+=i+'.'+sa[i]+'<br>'; }
  document.getElementById("iddisp").innerHTML = sb;
}



//*********************************************************************************************************************************
//***********************************************fields****************************************************************************
//*********************************************************************************************************************************
//*********************************************************************************************************************************
//*********************************************************************************************************************************
//*********************************************************************************************************************************
//*********************************************************************************************************************************
function fielddata() {  
 var sb='',sc,s7='',hdc;
 //var sa=fs.datafrom(sip,'gfile','','','',0);
 var sa=fs.dataget(sip,'gfile','ZZDCUST',0);
 //var sa=fs.dataget(sip,'gfile','ZZDITEM',0);
 for(var j=0;j<sa.length;j++) { 
   sb=fs.dcreate(sip,sa[j],1); 
   sc=fs.xos(sb);
   s7+=sc.list_filename+'<br>';
 } 
 //hdc=fs.dopen(sip,'dcust'); alert('>>>>>>>>>>>>>>>>');
 //fs.dclose(hdc);
   document.getElementById("iddisp").innerHTML = j+'>>>'+sb;
}



function fielddataccust() {
     var sb='',kk=0,sc,sd,sm,sf,sinx,sfname,fld,s1,s2,s3,s4,s5,s6='',s7='',ss='',cm,ln,hdc,hdd;
     fs.stick();
     //var sa=fs.dataget(sip,'dcust',fs.lcase('x00A00001'),1);
//     alert('>'+sa+'<'); 
//     alert(sa.length+'>>>');
//     return;
     //var sa=fs.datafrom(sip,'dcust','x00','x00','',0);
     hdc=fs.dopen(sip,'dcust');// alert(fs.dinfo(hdc));
     //alert(fs.dfields(hdc));
  //   alert(fs.dinfo(hdc));
     if(fs.dfind(hdc,'x00','','','',0)==true) {
//     if(fs.dfindid(hdc,'A00001')==true) {
       fs.dfirst(hdc);
      for(;;) {
        if(fs.deof(hdc)==true) break;
         kk++; sb+=kk+'.'+fs.dn(hdc,'led')+'>>>'+fs.dn(hdc,'acc')+'>>>'+fs.drec(hdc)+'<br>'; //fs.dn(hdc,'acc')+fs.dn(hdc,'name')+fs.dn(hdc,'d30')+'>>'+fs.dn(hdc,'dtotal')+'>>>'+fs.dn(hdc,'memo')+'>>'+fs.dn(hdc,'memofil')+'<br>';
           //fs.dinsertex(hdc);
           //fs.dinsert(hdc);
         fs.dnext(hdc);
      }
    //  fs.dnput(hdc,'name','Smith'); fs.dnput(hdc,'dtotal','100.12');
    //  fs.dnput(hdc,'memo','***hi******'); 
    //  sd=fs.dn(hdc,'acc')+fs.dn(hdc,'name')+fs.dn(hdc,'d30')+'>>'+fs.dn(hdc,'dtotal')+'>>>'+fs.dn(hdc,'memo')+'>>'+fs.dn(hdc,'memofil')+'<br>';
     
     }
     fs.dclose(hdc);
     document.getElementById("iddisp").innerHTML = fs.etick()+'>>>'+sb+sd;
}
function fielddataid() {
     var sb='',sc,k=0,sd,sm,sf,sinx,sfname,fld,s1,s2,s3,s4,s5,s6,s7='',ss='',cm,ln,hdc,hdd;
     hdc=fs.dopen(sip,'dcust'); 
     fs.dclear(hdc);
     fs.dnput(hdc,'acc','1001');
     fs.dnput(hdc,'name','Coetzee');
     fs.dnput(hdc,'rep','1001');
     fs.dnput(hdc,'memo','bbbccccccbbbxxxbbbbbbbbbb');
     //fs.dnput(hdc,'memo','bbbbbbxxxbbbbbbbbbb');
     //alert(fs.drec(hdc));
     //fs.dinsert(sip,hdc);
      //if(fs.dfindid(sip,hdc,'1005')==true) { sb=fs.drec(hdc); }
     if(fs.dfind(hdc,'number','','','',0)==true) {
        //  sm=fs.drecs(hdc); k=0;
        //  for(var i=0;i<sm.length;i++) { k++;
        //      sb+=k+'.'+sm[i]+'<br>';
        //  }
        fs.dfirst(hdc); k=0;
        for(;;) {
            if(fs.deof(hdc)==true) break;
            //k++;sb+=k+'.'+fs.dn(hdc,'ledger')+'>>>'+fs.drec(hdc)+'<br>';
//            k++;
//            sb+=k+'.'+fs.drec(hdc)+'<br>';
            //k++; sb+=k+'.'+fs.dn(hdc,'rep')+'>>>'+fs.dn(hdc,'acc')+'>>>'+fs.dn(hdc,'sort1')+'>>>'+fs.dn(hdc,'name')+':'+fs.drec(hdc)+'<br>';
            k++; sb+=k+'.'+fs.dn(hdc,'led')+'>>>>'+fs.drec(hdc)+'<br>';
            fs.dinsert(hdc);
            fs.dnext(hdc);
        }
        //  fs.dlast(hdc); k=0; 
        //  for(;;) {
        //      if(fs.deof(hdc)==true) break;
        //      k++; 
        //      sb+=k+'.'+fs.drec(hdc)+'<br>'; 
        //      fs.dprev(hdc);
        //  }
        
     }
     fs.dclose(hdc);
     document.getElementById("iddisp").innerHTML = sb+sd;
    
}
function fileinfo() {
     var hdc,sb='',sc,k=0,sd,sm,sf,sinx,sfname,fld,s1,s2,s3,s4,s5,s6,s7='',ss='',cm,ln,hdc,hdd;
     hdc=fs.dopen(sip,'dcust')
     sm=fs.dinfo(hdc);
     fs.dclose(hdc);
     document.getElementById("iddisp").innerHTML = sm; //fs.strrep(sm,'\n','<br>');
    //  hdc=fs.dopen(sip,'dcust'); 
    //  if(fs.dfindid(sip,hdc,'A00001')==true) {
    //      sb=fs.drec(hdc); sc=fs.dkey(hdc,fs.dindexno(hdc,7));
    //  }
    //  fs.dclose(hdc);
    //  document.getElementById("iddisp").innerHTML = sc+'>>>'+sb; //fs.strrep(sm,'\n','<br>');

}
function fileinfo1() {
     var sb='',sc,k=0,sd,sm,sf,sinx,sfname,fld,s1,s2,s3,s4,s5,s6,s7='',ss='',cm,ln,hdc,hdd;
     hdc=fs.dopen(sip,'dcust'); 
     if(fs.dfind(hdc,'x00','','','',0)==true) {
        fs.dfirst(hdc); k=0;
        for(;;) {
            if(fs.deof(hdc)==true) break;
            k++;sb+=k+'.'+fs.dn(hdc,'ledger')+'>>>'+fs.drec(hdc)+'<br>';
           // fs.dinsert(hdc);
            fs.dnext(hdc);
        }
     }
     fs.dclose(hdc);
     document.getElementById("iddisp").innerHTML = sb;
//  </td><td><textarea id="iddisp" style="width:800px;nowrap;height:800px" ></textarea></td></tr>

}
function fileinfo2() {
     var sb='',sc,k=0,sd,sm,sf,sinx,sfname,kk=0,fld,s1,s2,s3,s4,s5,s6,s7='',ss='',cm,ln,hdc,hdd;
//..     fs.stick();
//      var sa=fs.datafrom(sip,'ditem','x00','x00','',500);
//         for(var i=0;i<sa.length;i++) {
//          sb+=sa[i]+'<br>';
//       //fs.dinsert(hdc);
//       }
//      document.getElementById("iddisp").innerHTML = sb.length+'>>>'+sb;
// return;
      hdc=fs.dopen(sip,'ditem');
      if(fs.dfindall(hdc,'x00','','','',500)==true) {  
        fs.dfirst(hdc); 
        for(;;) {
            if(fs.deof(hdc)==true) break;
            kk++; sb+=kk+'.'+fs.dn(hdc,'datetime')+'>>+'+fs.dn(hdc,'period')+fs.dn(hdc,'branch')+'+>>'+fs.drec(hdc)+'<br>';
            //fs.dinsert(hdc);
            fs.dnext(hdc);
        }
        fs.dclose(hdc);
      }
     
     document.getElementById("iddisp").innerHTML = sb.length+'>>>'+sb;
}
function fileinfo3() {
     var sb='',sc,k=0,kk=0,j=0,cnt,sd,sm,skey='',sf,sinx,sfname,fld,s1,s2,s3,s4,s5,s6,s7='',ss='',cm,ln,hdc,hdd,da=0.0;
     hdc=fs.dopen(sip,'ditem'); cnt=1000; fs.stick();
     for(;;) { k=0; j++; //if(j>2) break;
     if(fs.dfind(hdc,'x00',skey,'','',cnt)==true) { 
        fs.dfirst(hdc); 
        for(;;) {
            if(fs.deof(hdc)==true) break;
            k++; kk++;   
            if((k==1)&&(j>1)) { } else {    
              sb+=kk+'.'+fs.drec(hdc)+'<br>'; da+=fs.xds(fs.dn(hdc,'total'))
              skey=fs.dn(hdc,'seq'); 
              }
            fs.dnext(hdc);
        }
        if(k<cnt) break; else {  // document.getElementById("iddisp").innerHTML = kk+'>>>'+fs.etick(); 
        continue; } 
     }
     } //for
     fs.dclose(hdc);
     
     document.getElementById("iddisp").innerHTML = da+'>>>'+kk+'>>>'+fs.etick()+'>>>'+sb;
}
function fileinfo4() {
     var sa,sb='',sc,skey='',cnt,k=0,kk=0,sd,sm,sf,sinx,sfname,fld,s1,s2,s3,s4,s5,s6,s7='',ss='',cm,ln,hdc,hdd;
     cnt=500; fs.stick();
//   for(;;) {
     sa=fs.datafrom(sip,'ditem','x00'+skey,'x00','',cnt);
      for(var i=0;i<sa.length;i++) { kk++;
        sd=fs.drec(hdc,sa[i])+'<br>'; skey=fs.left(sd,11); sb+=sd;
      }
     // document.getElementById("iddisp").innerHTML = kk+'>>>'+fs.etick()
  //    if(sa.length<cnt) break;
//    }
     
     document.getElementById("iddisp").innerHTML = kk+'>>>'+fs.etick()+'>>>'+sb;
}
function fileinfo5() {
     var sa,sb='',sc,skey='',cnt,k=0,kk=0,sd,sm,sf,sinx,sfname,fld,s1,s2,s3,s4,s5,s6,s7='',ss='',cm,ln,hdc,hdd;
     hdc=fs.dopen(sip,'dcust'); 
     if(fs.dfindid(hdc,'A00008',0)==true) {
        fs.dfirst(hdc); k=0;
        for(;;) {
            if(fs.deof(hdc)==true) break;
            k++;sb+=k+'.'+fs.dnno(hdc,1)+'>>>'+fs.drec(hdc)+'<br>';
            fs.dnext(hdc);
        }
     }
     fs.dclose(hdc);
     document.getElementById("iddisp").innerHTML = sb;
     

}
function fileinfo6() { alert('1111');
     var sa,sb='',sc,skey='',cnt,k=0,kk=0,sd,sm,sf,sinx,sfname,fld,s1,s2,s3,s4,s5,s6,s7='',ss='',cm,ln,hdc,hdd,kk=0;
     sb='test|acc,6|name,30|amount,f|aamount,a|qamount,q|amt,e|amtl,l|amtw,w|amtb,b|memo,m#number,acc|surname,name|iamount,amt|bamount,amtb|qamount,qamount';
     sb=fs.dcreate(sip,sb); 
     document.getElementById("iddisp").innerHTML = sb;
}
function fileinfo7() {
     var sa,sb='',sc,skey='',cnt,k=0,kk=0,sd,sm,sf,sinx,sfname,fld,s1,s2,s3,s4,s5,s6,s7='',ss='',cm,ln,hdc,hdd,kk=0,j,jj=1;
     hdc=fs.dopen(sip,'test');  j=20;
     for(var i=1001;i<=1020;i++) { fs.dclear(hdc);
       fs.dnput(hdc,'acc',i+'');                   
       fs.dnput(hdc,'name',i+'Name Coetzee');                   
       fs.dnput(hdc,'amount','1234.12');                   
       fs.dnput(hdc,'aamount','123.12554');                   
       fs.dnput(hdc,'qamount',(22/7*1000000000000*(jj)*i)+'');  if(jj==1) jj=(-1); else jj=1;                 
       fs.dnput(hdc,'amt',(22/7)*10000000000000*i);                    
       fs.dnput(hdc,'amtl',j);                    
       fs.dnput(hdc,'amtw',j);                    
       fs.dnput(hdc,'amtb',j); 
       j--;
       fs.dnput(hdc,'memo',i+'memo info'); kk++;
       fs.dinsertex(hdc);
     }
     fs.dclose(hdc);
           document.getElementById("iddisp").innerHTML = kk+'>>>';
}
function fileinfo8() {
     var sa,sb='',sc,skey='',cnt,k=0,kk=0,sd,sm,sf,sinx,sfname,fld,s1,s2,s3,s4,s5,s6,s7='',ss='',cm,ln,hdc,hdd,kk=0;
     hdc=fs.dopen(sip,'test'); 
     //alert((22/7*100000000000*(-1))+'>>>>>')
     if(fs.dfind(hdc,'iamount','','','',0)==true) { sb='';
       fs.dfirst(hdc);
       for(;;) {
         if(fs.deof(hdc)==true) break;
//          kk++; sb+=kk+'.'+fs.dn(hdc,'amt')+'>>>'+fs.drec(hdc)+'<br>'; 
          kk++; sb+=kk+'.'+(fs.dn(hdc,'amt')+'').length+'>>>'+fs.dn(hdc,'amt')+'>>'+fs.dn(hdc,'qamount')+'>>>'+fs.dn(hdc,'amtl')+'>>>'+fs.dn(hdc,'amtw')+'>>>'+fs.dn(hdc,'amtb')+'>>>'+fs.drec(hdc)+'<br>'; 
//          kk++; sb+=kk+'.'+'>>>'+fs.dn(hdc,'amt')+'>>>'+fs.dn(hdc,'amtw')+'>>>'+'>>>'+fs.drec(hdc)+'<br>'; 
    //       //fs.dinsertex(hdc);
    //       //fs.dinsert(hdc);
          fs.dnext(hdc);
       }
     }
     fs.dclose(hdc);
           document.getElementById("iddisp").innerHTML = sb;


}



function fieldskeyreaddoc() {
     var sc='',sb='',hdc,kk=0;
     hdc=fs.dopen(sip,'customer');  
//     if(fs.dfindalldoc(hdc,'number','1021','1021','',0)==true) { sb=''; 
     if(fs.dfindkeydoc(hdc,'1021',0)==true) { sb=''; 
       fs.dfirst(hdc);
       for(;;) {
         if(fs.deof(hdc)==true) break;
          sb+=kk+'.'+fs.dn(hdc,'number')+fs.dn(hdc,'name')+fs.dn(hdc,'amount')+fs.dn(hdc,'memo')+'('+fs.xitemlast(fs.ddoc(hdc),1,':')+')('+fs.ditem(hdc)+')<br>'; kk++; 
          fs.dnext(hdc);
       }
     }
//        fs.dfindkeydoc(hdc,'meta1^meta2',0);
     fs.dclose(hdc);
     document.getElementById("iddisp").innerHTML = sb+sc;


}
//******************************************************* chat lines ********************************************************************
//******************************************************* chat lines ********************************************************************
function fieldscreatechat() {
    var sb='';
     sb='chat|no,13|memo,m';
     sb=fs.dcreate(sip,sb); 
     document.getElementById("iddisp").innerHTML = sb;
}
function fieldswritechat() {
     var hdc,kk=0;
     hdc=fs.dopen(sip,'chat'); 
      for(var i=1001;i<1003;i++) {
       fs.dclear(hdc);
       fs.dnput(hdc,'no',fs.chrb(4)+''+i);                   
       fs.dnput(hdc,'memo','Hello this isxx my message:'+i);                   
       fs.dinsertdoc(hdc,'file.txt','...... document info........'+i,'meta1^meta2','0111');
     }
     fs.dclose(hdc);
     document.getElementById("iddisp").innerHTML = kk+'>>>';
}
function fieldsreadchat() {
     var hdc,kk=0,i,sb='',sf;
     hdc=fs.dopen(sip,'chat'); 
     sf=fs.friendaddress('meta1');  sf=fs.xshex(sf);
     //if(fs.dfindalldoc(hdc,'',sf,sf,'',0)==true) { sb=''; 
     if(fs.dfindkeydoc(hdc,'meta1^meta2',0)==true) { sb=''; 
       fs.dfirst(hdc);
       for(;;) {
         if(fs.deof(hdc)==true) break;
          sb+=kk+'.'+fs.drec(hdc)+'>>>:'+fs.ddoc(hdc)+':>>:to='+fs.did(hdc)+'('+fs.itemget(fs.ditem(hdc),3)+')from(chat):'+fs.itemget(fs.ditem(hdc),5)+'<br>'; kk++; //fs.did(hdc)+
          fs.dnext(hdc);
       }
     }
     fs.dclose(hdc);
     document.getElementById("iddisp").innerHTML = sb;

}

function fieldsreadchatone() { 
  var sb='',sc='';
  var sa=fs.datafromalldoc(sip,'chat','dogs','dogs','',0);
  for(var i=0;i<sa.record.length;i++) { 
     if(sa.doc[i]=='') { sc=''; } else { sc=fs.datadoc(sa.doc[i]); }
     sb+=i+'.'+fs.decode(sa.record[i].substr(17,sa.record[i].length-17))+'>'+sa.key[i]+' ('+sc+')<br>'; //sa.doc[i] sa.item[i] sa.key[i]
  }
  document.getElementById("iddisp").innerHTML = sb;
}

//**************************************** account creates ***************************************************************
function acccreate() {
    var sb='';
     sb='accounts|sort,20|address,32|name,50|cat,5|group,5|del,1|memo,m#address,address|name,sort';
     sb=fs.dcreate(sip,sb); 
     document.getElementById("iddisp").innerHTML = sb;
}
function accnew() {
     var hdc,kk=0,skey,sb='',pkey='new1',fr=[{name:'meta1',address:'a7f0c809e117049add9052df75434489fcdf78af051b8b5f7d0fba27b0c0e509',pubkey:'nothing'}];
     hdc=fs.dopen(sip,'accounts'); 
     
      for(var i=1001;i<1010;i++) { 
        skey=fs.dbkey(pkey+i); 
        fs.dclear(hdc);
        fs.dnput(hdc,'address',skey.pub); //alert(pkey+i+'>>'+fs.xhexs(skey.pub));
        sb+=fs.xhexs(skey.pub)+'<br>';
        //sb+=fs.xhexs(fs.dn(hdc,'address'))+'<br>';
        fs.dnput(hdc,'name',pkey+i); //fs.dnput(hdc,'sort',fs.dn(hdc,name));
        fs.dnput(hdc,'sort',pkey+i);
        fs.dnput(hdc,'memo',fs.xso(fr));                   
        fs.dinsert(hdc);
       }
      fs.dclose(hdc);
     document.getElementById("iddisp").innerHTML = sb;
}
function acccallup() {
     var hdc,kk=0,i,sb='',sa,sc,sd,skey,pkey='new11004';
     hdc=fs.dopen(sip,'accounts'); sc=fs.dbkey(pkey);// sb+=fs.xhexs(sc.pub)+'<br>';// sc=fs.xhexs(sc.pub);//sc=fs.xhexs(pkey);
//     if(fs.dfinddoc(hdc,'x02','','','',0)==true) { 
//     if(fs.dfind(hdc,fs.dindexno(hdc,1),sc.pub,'','',1)==true) { 
     //if(fs.dfind(hdc,'x01',sc.pub,sc.pub,'',0)==true) { 
    if(fs.dfindiddoc(hdc,sc.pub,0)==true) { 
       fs.dfirst(hdc);
       for(;;) {
         if(fs.deof(hdc)==true) break;
          sb+=fs.xhexs(fs.dn(hdc,'address'))+'>>'+fs.dn(hdc,'name')+'('+fs.ditem(hdc)+')'+fs.dn(hdc,'memo')+'<br>'; kk++; 
//          sb+=fs.dn(hdc,'name')+fs.xhexs(fs.dn(hdc,'address'))+fs.dn(hdc,'memo')+'<br>'; kk++; 
          fs.dnext(hdc);
       }
     }
     fs.dclose(hdc);
     document.getElementById("iddisp").innerHTML = sb;


}
function accmenu() { 
var username='meta6';
var userpassword='meta6password';
   gnodename=username;
   gnodeselect=sip;
   gstart='androidx';
   fs.themeset(3);
   c.nstyle('idbody','padding','0px');
   c.nstyle('idbody','margin','0px');
   c.nstyle('idbody','background-color',fs.theme(2));
   gmwidth=800; gmsize=1;
   gmaata='maata';
   gloccopy=false;
   fs.useradd(sip,username,userpassword);   gkeymy=fs.dbkey(userpassword);
   //usercreate();

   fs.run('root','accmenu',userpassword,'apiexamples');
}
function initfirst() { 
 var s1,s2,ss,s3,s4,s5,s6,s7,s8,s9;
 
 ss=c.table(  c.at(c.cellspacing(0),c.cellpadding(0)),
 

    c.tr(c.td(c.table(c.at(c.cellspacing(0),c.cellpadding(0)),
     c.tr(c.td('---------------------------------')),
     c.tr(c.td(c.at(c.onclick('accmenu()'),c.att(c.cursor('default'))),             'Accounting') ),
     
     c.tr(c.td('---------------------------------')),
     c.tr(c.td(c.at(c.onclick('fieldscreate()'),c.att(c.cursor('default'))),             'Fields create') ),
     c.tr(c.td(c.at(c.onclick('fieldswrite()'),c.att(c.cursor('default'))),             'Fields write') ),
     c.tr(c.td(c.at(c.onclick('fieldsread()'),c.att(c.cursor('default'))),             'Fields read') ),
     c.tr(c.td(c.at(c.onclick('fieldswritedoc()'),c.att(c.cursor('default'))),             'Fields write doc') ),
     c.tr(c.td(c.at(c.onclick('fieldsreaddoc()'),c.att(c.cursor('default'))),             'Fields read doc') ),
//     c.tr(c.td(c.at(c.onclick('fieldskeyreaddoc()'),c.att(c.cursor('default'))),             'Key read doc') ),
     c.tr(c.td('---------------------------------')),
     c.tr(c.td(c.at(c.onclick('usercreate()'),c.att(c.cursor('default'))),             'User create') ),
     c.tr(c.td('---------------------------------')),
     c.tr(c.td(c.at(c.onclick('chatsend()'),c.att(c.cursor('default'))),             'Chat') ),
     c.tr(c.td(c.at(c.onclick('chatdocsend()'),c.att(c.cursor('default'))),           'Chat + doc') ),
     c.tr(c.td(c.at(c.onclick('chatdocemail()'),c.att(c.cursor('default'))),          'Chat + email') ),
     c.tr(c.td(c.at(c.onclick('chatlistsend()'),c.att(c.cursor('default'))),          'Chat list') ),
     c.tr(c.td(c.at(c.onclick('chattwosend()'),c.att(c.cursor('default'))),           'Chat two friends') ),
     c.tr(c.td(c.at(c.onclick('chatread()'),c.att(c.cursor('default'))),              'Chat read') ),
     c.tr(c.td(c.at(c.onclick('chatreaddoc()'),c.att(c.cursor('default'))),           'Chat read + doc') ),
     c.tr(c.td('---------------------------------')),
     c.tr(c.td(c.at(c.onclick('emailsendreal()'),c.att(c.cursor('default'))),             'Normal Email + file') ),
     c.tr(c.td(c.at(c.onclick('emailsendrealdata()'),c.att(c.cursor('default'))),         'Normal Email + data') ),
     c.tr(c.td('---------------------------------')),


     c.tr(c.td(c.at(c.onclick('datalist()'),c.att(c.cursor('default'))),             'Data List') ),
     c.tr(c.td(c.at(c.onclick('dataread()'),c.att(c.cursor('default'))),             'Data Read') ),
     c.tr(c.td(c.at(c.onclick('datalistread()'),c.att(c.cursor('default'))),         'Data List Read') ),
     c.tr(c.td(c.at(c.onclick('datalistreadall()'),c.att(c.cursor('default'))),      'Data List Read all') ),
     c.tr(c.td('---------------------------------')),
     c.tr(c.td(c.at(c.onclick('datalistdoc()'),c.att(c.cursor('default'))),             'Data List + doc') ),
     c.tr(c.td(c.at(c.onclick('datareaddoc()'),c.att(c.cursor('default'))),             'Data Read + doc') ),
     c.tr(c.td(c.at(c.onclick('datalistreaddoc()'),c.att(c.cursor('default'))),         'Data List Read + doc') ),
     c.tr(c.td(c.at(c.onclick('datalistreadalldoc()'),c.att(c.cursor('default'))),      'Data List Read all + doc') ),
     c.tr(c.td('---------------------------------')),
     c.tr(c.td(c.at(c.onclick('datalistindex()'),c.att(c.cursor('default'))),             'Data List + index') ),
     c.tr(c.td(c.at(c.onclick('datareadindex()'),c.att(c.cursor('default'))),             'Data Read + index') ),
     c.tr(c.td(c.at(c.onclick('datalistindexex()'),c.att(c.cursor('default'))),         'Data List Read + index ext') ),
     c.tr(c.td(c.at(c.onclick('datareadindexex()'),c.att(c.cursor('default'))),      'Data List Read all + index ext') ),
     c.tr(c.td('---------------------------------')),
     c.tr(c.td(c.at(c.onclick('acccreate()'),c.att(c.cursor('default'))),             'Account create') ),
     c.tr(c.td(c.at(c.onclick('accnew()'),c.att(c.cursor('default'))),             'Account new') ),
     c.tr(c.td(c.at(c.onclick('acccallup()'),c.att(c.cursor('default'))),             'Account callup') ),
     c.tr(c.td('---------------------------------')),
     c.tr(c.td(c.at(c.onclick('fieldscreatechat()'),c.att(c.cursor('default'))),             'Fields create + chat') ),
     c.tr(c.td(c.at(c.onclick('fieldswritechat()'),c.att(c.cursor('default'))),             'Fields write + chat') ),
     c.tr(c.td(c.at(c.onclick('fieldsreadchat()'),c.att(c.cursor('default'))),             'Fields read + chat') ),
     c.tr(c.td(c.at(c.onclick('fieldsreadchatone()'),c.att(c.cursor('default'))),             'One read + chat') ),

   ) //table
   ), //td
        c.td(
          c.div( c.at(c.id('iddisp'),c.valign('top'),c.att(c.overflow_y('auto'),c.white_space('nowrap'),c.width(800),c.height(700))    ))
         ),
    ) // tr


  );
return(ss);     
 }


function initapi(siploc) { sip=siploc; 
  fs.initcryptoscript(sip); // Load crypto routines
  fs.initmetric(sip);       // init the blockchain para
  c.html('root',initfirst()); 
}
