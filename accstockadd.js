// declare var fs,c,Promise,alog,$; 
// declare var gmicon,gmback,gmlock,gmfont,gmwidth,gmwidthreal,gloccopy;
// declare var gwidth,gheight,ghmid,gy,gx,gt;
// declare var gstart,gservpubkey,gnodename,gpubkeymy,gkeymy,gpubkeymyhash,gnodeselect,gnodemain,gnodemaster,gcustlist,gkeypmy,gpic,gpics,gscripts,gnodeloc,glocal,gappback;
var gbackstockadd,loc,gicallup=false;
//************************************** main routine *********************************************************************

function accmenu(sarg,sdat,sback,sbuf,spic) {
var gwidth,gheight,ghmid,gwr,ghr,glay={},gx,gy,gba=false,sip,comm,buf={},lname,lpass,lpasspic,lpassnail,lpasshtml;
var lmode,bmess=false,llogin,llock,lupdate='',lfile='stockex',lpicname='',lpicdata='',lpicnamenail='',lpicdatanail='',lhtmlname='',lhtmldata='';
var lmax=300000*1.5,lmaxnail=5000*1.5,lbapic=false,lbabuf=false;
var lpic='<svg  id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><style>.cls-1{fill:#9c9b9b;}</style></defs><path class="cls-1" d="M75,48.08V25a25,25,0,0,0-50,0V48.08H11.54V100H88.46V48.08ZM28.85,25a21.15,21.15,0,0,1,42.3,0V48.08H28.85ZM84.62,96.15H15.38V51.92H84.62Z"/></svg>';
function log(ss) {  fs.log(ss);  }
function logx(ss) {  fs.logip('192.168.0.104:9000',ss);  }
function show(ss) { if(gstart=='android') { alog(ss); } else { alert(ss); } }
function keyconv(ss) {     return(fs.keyconvert(sip,ss,gkeymy)); }    

function initgen(sdat,ss,sbuf,spic) { if((ss==undefined)||(ss=='')) { } else {  gbackstockadd=ss; } sip=gnodeselect;    
 if(typeof(sdat)=='object') {  comm=sdat;  sdat=''; }
 lfile=keyconv('stockex'); 
 lname=fs.dkeyhalf(sip,gnodename);  
 lpass='shop'+lname;
 lpasspic='shop'+lname+'pic';
 lpassnail='shop'+lname+'nail';
 lpasshtml='shop'+lname+'html';
if(sbuf==undefined) { lbabuf=false; } else {      sdat=''; lbabuf=true;   }
if(spic==undefined) { lbapic=false; } else {      lbapic=true;   }
 return(sdat);
}

//************************************ global access *****************************************
accmenu.prototype.but3click = function (n) { 
            if(n==1) {  fs.run('root','maathelp','accstockadd,Stock Add');  }
       else if(n==2) {  fs.run('root',gbackstockadd,comm);  }
       else if(n==3) {  fs.run('root','accstock','','accmenu');}
       else if(n==9) {  fs.run('root','accpiclist',comm,'accstockadd',buf);}
       else if(n==10) {  pictureadd();  } 
       else if(n==11) {  htmladd();  } 
       else if(n==12) {  fanelimport(1);  } 
       else if(n==32) {  butcat();  } 
       else if(n==20) {  setupkeyadd();  }
       else if(n==99) {  custdel();  }
}


function butfill() { 
      var sa='',sb,snam,sext; buf=sbuf;
      for (var i in buf) {  
           if(i.substr(0,2)=='xx') { 
             sa=i.substr(2,i.length-2);
             if(fs.itemnum('lhtmlname,lhtmldata,lpicname,lpicdata,lpicnamenail,lpicdatanail,code,update',sa)>0) { continue; }
             c.val('id'+sa,buf[i])
           }
      } 
      c.val('idsearch',buf['xxcode']);
      lupdate=buf['xxupdate']; 
      if(lbapic==true) {
       snam=fs.xitemget(spic,1,':'); sext=fs.lcase(fs.xitemgetback(snam,1,'.'));
       sdat=fs.xitemlast(spic,1,':');
       if(fs.itemnum('cat',sext)>0) {
           c.val('idcat',snam.substr(0,snam.length-4));
         lpicname=buf['xxlpicname'];
         lpicdata=buf['xxlpicdata']; 
         lpicnamenail=buf['xxlpicname'];
         lpicdatanail=buf['xxlpicdatanail'];
         lhtmlname=buf['xxlhtmlname'];
         lhtmldata=buf['xxlhtmldata']; 
       }
       else if(fs.itemnum('htmd,html',sext)>0) {
         lhtmlname=snam; 
         lhtmldata=sdat;
       lpicname=buf['xxlpicname'];
       lpicdata=buf['xxlpicdata']; 
       lpicnamenail=buf['xxlpicname'];
       lpicdatanail=buf['xxlpicdatanail'];
         
       } else {
        lpicname=snam; 
        lpicdata=sdat;
        lpicnamenail=snam;
        lpicdatanail=sdat;
        lhtmlname=buf['xxlhtmlname'];
        lhtmldata=buf['xxlhtmldata']; 
        
       }
      } else {
       lhtmlname=buf['xxlhtmlname']; 
       lhtmldata=buf['xxlhtmldata']; 
       lpicname=buf['xxlpicname'];
       lpicdata=buf['xxlpicdata']; 
       lpicnamenail=buf['xxlpicname'];
       lpicdatanail=buf['xxlpicdatanail'];
      }
      if(lupdate=='') { c.nstyle('iddel','display','none'); } else {  c.nstyle('iddel','display','block'); }
      setTimeout(function() {  buthtmlshow(); butimageshow(function(sx) { butimageshownail();    }); },10);
}    
function pictureadd() {
   var sb,sfld='desc,cat,stockcode,onhand,cost,price,memo';           
   if(gstart=='android')  { 
       buf['xxlpicdatanail']=lpicdatanail;       
       buf['xxlpicnamenail']=lpicnamenail;       
       buf['xxlpicdata']=lpicdata;       
       buf['xxlpicname']=lpicname;       
       buf['xxlhtmldata']=lhtmldata;       
       buf['xxlhtmlname']=lhtmlname;       
       buf['xxcode']=c.val('idsearch');       
       buf['xxupdate']=lupdate;
       for(var i=1;i<=fs.itemcount(sfld); i++) {
          sb=fs.itemget(sfld,i);
          buf['xx'+sb]=c.val('id'+sb);
       }
       loc.but3click(9); 
       return;
       
   }
   c.trigger('idup','click');
}
function htmladd() {
   var sb,sfld='desc,cat,stockcode,onhand,cost,price,memo';           
   if(gstart=='android')  { 
       buf['xxlpicdatanail']=lpicdatanail;       
       buf['xxlpicnamenail']=lpicnamenail;       
       buf['xxlpicdata']=lpicdata;       
       buf['xxlpicname']=lpicname;       
       buf['xxlhtmldata']=lhtmldata;       
       buf['xxlhtmlname']=lhtmlname;       
       buf['xxcode']=c.val('idsearch');       
       buf['xxupdate']=lupdate;
       for(var i=1;i<=fs.itemcount(sfld); i++) {
          sb=fs.itemget(sfld,i);
          buf['xx'+sb]=c.val('id'+sb);
       }
       loc.but3click(9); 
       return;
       
   }
   c.trigger('idup','click');
}

function butcat() {
   var sb,sfld='desc,cat,stockcode,onhand,cost,price,memo';           
       buf['xxlpicdatanail']=lpicdatanail;       
       buf['xxlpicnamenail']=lpicnamenail;       
       buf['xxlpicdata']=lpicdata;       
       buf['xxlpicname']=lpicname;       
       buf['xxlhtmldata']=lhtmldata;       
       buf['xxlhtmlname']=lhtmlname;       
       buf['xxcode']=c.val('idsearch');       
       buf['xxupdate']=lupdate;
       for(var i=1;i<=fs.itemcount(sfld); i++) {
          sb=fs.itemget(sfld,i);
          buf['xx'+sb]=c.val('id'+sb);
       }
       fs.run('root','acccatlook',comm,'accstockadd',buf);
}




function custno(n,m) { if(lbabuf==true) return('');
var sb='1000',k;
if(m==undefined) { } else { sb=m+''; }
var sa=fs.dataget(sip,lfile+'no','number',1); 
 for(var i=0;i<sa.length;i++) { sb=sa[i]; break; }
 k=fs.xis(sb)+1; if(n==1) fs.dataput(sip,lfile+'no','number',k+'');   
 return(k+'');
}


function fanelimport(nn) { 
    var sb,sa,sdir,sn,sm,hd,hdm,hdpic,hdnail,hdhtml,spicname,spic,icnt=0,sprice,smemo,s1,s2,scode,icode,sdesc,scat;
function subcat() { log(sn.length+'...');
    var s3,s4='';
function subcatcat(sdat)    { if(s4=='') return(true);
    var s6=fs.lcase(sdat),s5=s4.split('\n');
    for(var j=0;j<s5.length;j++) {
      if(fs.lcase(s5[j])==s6)  return(false);  
    }
    return(true);    
}
    for(var i=0;i<sn.length;i++) {
        s3=sn[i]; if(s3=='') continue;
        sm=s3.split(',');
        scat='';
        if(sm[2]!='') scat=sm[2];
        else if(sm[1]!='') scat=sm[1];
        else if(sm[0]!='') scat=sm[0];
        if(subcatcat(scat)==true) {  } else { continue; }
        s4+=scat+'\n';
    }
    s4=s4.split('\n').sort().join('\n');    
    c.val('idmemo',s4);
}
function subimport() { icnt++; 
//   if(icnt>=100) {
//      fs.dclose(hd);
//      fs.dclose(hdm);
//      fs.dclose(hdpic);
//      fs.dclose(hdnail);
//      fs.dclose(hdhtml);
//      fs.dataput(sip,lfile+'no','number',(icnt+1000)+'');  log('finish:'+(icnt+1000)+'')
//      return;
//   }
   if(icnt>=sn.length) {
     fs.dclose(hd);
     fs.dclose(hdm);
     fs.dclose(hdpic);
     fs.dclose(hdnail);
     fs.dclose(hdhtml);
     fs.dataput(sip,lfile+'no','number',(icnt+1000)+''); log('finish:'+(icnt+1000)+'')  
     return;
   }
      sb=sn[icnt]; if(sb=='') { subimport(); return; }
      sm=sb.split(',');
      spicname=sm[3]
      spic=fs.filereaddir(gnodeloc,sdir+spicname+'.gif');
      if(spic=='') { subimport(); return; }
    sprice=sm[7].trim(); sprice=fs.xright(sprice);
    if(sm[8]==undefined) sm[8]='';
    if(sm[9]==undefined) sm[9]='';
    smemo='<b>Case:</b>'+sm[6]+'<br>\n'+'<b>Brand:</b>'+sm[8]+'<br>\n'+sm[9];
    sdesc=sm[5].trim(); sdesc=fs.strout(sdesc,'"');
    scat='';
    if(sm[2]!='') scat=sm[2];
    else if(sm[1]!='') scat=sm[1];
    else if(sm[0]!='') scat=sm[0];
    icode++; scode=icode+'';
    fs.dclear(hd);
    fs.dnput(hd,'code',scode);
    fs.dnput(hd,'desc',sdesc);
    fs.dnput(hd,'cat',scat);
    fs.dnput(hd,'stockcode',sm[4]);
    fs.dnput(hd,'onhand','1');
    fs.dnput(hd,'price',sprice);
    fs.dnput(hd,'memo',smemo);
    fs.dnput(hd,'del',' ');
    fs.dinsert(hd);
//*****************************************************
     fs.dclear(hdm);
     fs.dnput(hdm,'code',scode);
     fs.dnput(hdm,'cost',sprice);
     fs.dnput(hdm,'memo','');
     fs.dnput(hdm,'del',' ');
     fs.dinsert(hdm);
//**************************************************************
        fs.dclear(hdhtml);
        fs.dnput(hdhtml,'code',scode);
        fs.dnput(hdhtml,'memo','file.htmd:');
        fs.dnput(hdhtml,'del',' ');
        fs.dinsert(hdhtml);
      c.val('idsearch',scode);
      butimagechange(spicname,spic,lmax,function(sx) {  
          log(icnt+':'+spicname+':'+spic.length+'=='+sx.length);
        fs.dclear(hdpic);
        fs.dnput(hdpic,'code',scode);
        fs.dnput(hdpic,'memo',spicname+':'+sx);
        fs.dnput(hdpic,'del',' ');
        fs.dinsert(hdpic);
        butimagechange(spicname,spic,lmaxnail,function(sxx) {  
            fs.dclear(hdnail);
            fs.dnput(hdnail,'code',scode);
            fs.dnput(hdnail,'memo',spicname+':'+sxx);
            fs.dnput(hdnail,'del',' ');
            fs.dinsert(hdnail);
            subimport();
        });      
      });
}
//***************************************************************************

    sdir='G:/1700/fanelpic/doc/';    sa=fs.filereaddir(gnodeloc,sdir+'fanel.csv');    if(sa=='') return;
    sn=sa.split('\n');
    if(nn==2) { subcat(); return; }
    hd=fs.dopen(sip,lfile,lpass); 
    hdm=fs.dopen(sip,keyconv('stock'));
    hdpic=fs.dopen(sip,keyconv('stockpic'),lpasspic); 
    hdnail=fs.dopen(sip,keyconv('stocknail'),lpassnail); 
    hdhtml=fs.dopen(sip,keyconv('stockhtml'),lpasshtml); 
    
    icode=1001;
    subimport();

}

function fanelimportxxxxx(nn) { 
    var sb,sa,sdir,sn,sm,hd,hdm,hdpic,hdnail,hdhtml,spicname,spic,icnt=0,sprice,smemo,s1,s2,scode,icode,sdesc,scat;
function subcat() { log(sn.length+'...');
    var s3,s4='';
function subcatcat(sdat)    { if(s4=='') return(true);
    var s6=fs.lcase(sdat),s5=s4.split('\n');
    for(var j=0;j<s5.length;j++) {
      if(fs.lcase(s5[j])==s6)  return(false);  
    }
    return(true);    
}
    for(var i=0;i<sn.length;i++) {
        s3=sn[i]; if(s3=='') continue;
        sm=s3.split(',');
        scat='';
        if(sm[2]!='') scat=sm[2];
        else if(sm[1]!='') scat=sm[1];
        else if(sm[0]!='') scat=sm[0];
        if(subcatcat(scat)==true) {  } else { continue; }
        s4+=scat+'\n';
    }
    s4=s4.split('\n').sort().join('\n');    
    c.val('idmemo',s4);
}
async function subimport() { icnt++; 
//   if(icnt>=1000) {
//      fs.dclose(hd);
//      fs.dclose(hdm);
//      fs.dclose(hdpic);
//      fs.dclose(hdnail);
//      fs.dclose(hdhtml);
//      fs.dataput(sip,lfile+'no','number',(icnt+1000)+'');  log('finish:'+(icnt+1000)+'')
//      return;
//   }
   if(icnt>=sn.length) {
     fs.dclose(hd);
     fs.dclose(hdm);
     fs.dclose(hdpic);
     fs.dclose(hdnail);
     fs.dclose(hdhtml);
     fs.dataput(sip,lfile+'no','number',(icnt+1000)+''); log('finish:'+(icnt+1000)+'') ; 
     return;
   }
      sb=sn[icnt]; if(sb=='') { subimport(); return; }
      sm=sb.split(',');
      spicname=sm[3]
      spic=fs.filereaddir(gnodeloc,sdir+spicname+'.gif');
      if(spic=='') { subimport(); return; }
      
      
    sprice=sm[7].trim(); sprice=fs.xright(sprice);
    if(sm[8]==undefined) sm[8]='';
    if(sm[9]==undefined) sm[9]='';
    smemo='<b>Case:</b>'+sm[6]+'<br>\n'+'<b>Brand:</b>'+sm[8]+'<br>\n'+sm[9];
    sdesc=sm[5].trim(); sdesc=fs.strout(sdesc,'"');// sdesc=fs.left(sdesc,22);
    scat='';
    if(sm[2]!='') scat=sm[2];
    else if(sm[1]!='') scat=sm[1];
    else if(sm[0]!='') scat=sm[0];
    icode++; scode=icode+'';
    //if(fs.dfind(hd,'desc',sdesc,sdesc,'',1)==true)   { } else { log(sdesc+':'+scat+':'+scode);  }
    if(await fs.wfindid(hd,scode,1)==true) { c.val('idsearch','*'+scode); subimport(); return;
        //logx('\n*'+fs.dn(hd,'code')+':'+fs.dn(hd,'cat')+':'+fs.dn(hd,'desc')+':'+icnt+'\n+'+scode+':'+scat+':'+sdesc); 
        
    } else { logx(sdesc+':'+scat+':'+scode);  }
    
    
    fs.dclear(hd);
    fs.dnput(hd,'code',scode);
    fs.dnput(hd,'desc',sdesc);
    fs.dnput(hd,'cat',scat);
    fs.dnput(hd,'stockcode',sm[4]);
    fs.dnput(hd,'onhand','1');
    fs.dnput(hd,'price',sprice);
    fs.dnput(hd,'memo',smemo);
    fs.dnput(hd,'del',' ');
    fs.dinsert(hd);
//*****************************************************
     fs.dclear(hdm);
     fs.dnput(hdm,'code',scode);
     fs.dnput(hdm,'cost',sprice);
     fs.dnput(hdm,'memo','');
     fs.dnput(hdm,'del',' ');
     fs.dinsert(hdm);
//**************************************************************
        fs.dclear(hdhtml);
        fs.dnput(hdhtml,'code',scode);
        fs.dnput(hdhtml,'memo','file.htmd:');
        fs.dnput(hdhtml,'del',' ');
        fs.dinsert(hdhtml);
      c.val('idsearch',scode);
      butimagechange(spicname,spic,lmax,function(sx) {  
         // log(icnt+':'+spicname+':'+spic.length+'=='+sx.length);
        fs.dclear(hdpic);
        fs.dnput(hdpic,'code',scode);
        fs.dnput(hdpic,'memo',spicname+':'+sx);
        fs.dnput(hdpic,'del',' ');
        fs.dinsert(hdpic);
        butimagechange(spicname,spic,lmaxnail,function(sxx) {  
            fs.dclear(hdnail);
            fs.dnput(hdnail,'code',scode);
            fs.dnput(hdnail,'memo',spicname+':'+sxx);
            fs.dnput(hdnail,'del',' ');
            fs.dinsert(hdnail);
            subimport();
        });      
      });
}
//***************************************************************************

    sdir='G:/1700/fanelpic/doc/';    sa=fs.filereaddir(gnodeloc,sdir+'fanel.csv');    if(sa=='') return;
    sn=sa.split('\n');
    if(nn==2) { subcat(); return; }
    hd=fs.dopen(sip,lfile,lpass); 
    hdm=fs.dopen(sip,keyconv('stock'));
    hdpic=fs.dopen(sip,keyconv('stockpic'),lpasspic); 
    hdnail=fs.dopen(sip,keyconv('stocknail'),lpassnail); 
    hdhtml=fs.dopen(sip,keyconv('stockhtml'),lpasshtml); 
    
    icode=1001;
    subimport();

}



//***************************************** add pictures ************************************************
function butimagewh(sdat,sfn) {
    var img = new Image();
    img.onload = function() {
      sfn(img.width,img.height);
    }
    img.onerror = function() { sfn(0,0);  }
   img.src =sdat;
}
function butimageconvert(sdat,iw,ih,sfn) { 
       var image = new Image();
       image.onload = function () {
          var canv = c.ncreate('canvas'); //document.createElement('canvas');
          canv.width = iw; 
          canv.height = ih;
          var ctx=canv.getContext('2d');
          ctx.drawImage(image,0,0,canv.width,canv.height); 
          var img2 =  canv.toDataURL('image/jpeg'); //image/png ,0.667
          img2=fs.xs64(fs.itemlast(img2,1));
          sfn(img2); return;
      };
      image.src = sdat;
}
function butimagechange(sn,ss,n,sfn) {  
 var s1,s2,sext,iww,ihh,imax=n*1.5;  //2.65 =350k(772)  1.5=200k(580)
 sext=fs.lcase(fs.xitemgetback(sn,1,'.'));  
 if(sext=='svg') { sfn(ss); return; } 
 if(ss.length<=n) { sfn(ss); return; }
 s2='data:image/jpg;base64,'+fs.x64s(ss); 
 butimagewh(s2,function(iw,ih) { 
     if((iw==0)&&(ih==0)) { sfn(s2); return;  }
     if((iw*ih)<=n) { iww=iw; ihh=ih; } else {
        if(ih>iw) { iww=Math.ceil(Math.sqrt(imax/(ih/iw))); ihh=Math.ceil(iww*(ih/iw)); }
             else { ihh=Math.ceil(Math.sqrt(imax/(iw/ih))); iww=Math.ceil(ihh*(iw/ih)); }
     }   
     
     butimageconvert(s2,iww,ihh,function(sn) {  sfn(sn); return; });
 });
 
} 

function buthtmlshow() {
 var sext,sn,sa;
   //log(lhtmlname+':'+lhtmldata.length+'.....xxxx');
     //sext=fs.lcase(fs.xitemgetback(lhtmlname,1,'.'));
     //if(sext=='htmd') { sn=lhtmldata;  } else { sn=lhtmldata; }
     c.html('idhtml',lhtmldata);
}


function butimageshow(sfn) {
 var sext,sn,sa;
function subshow(ss,sfn) {
     var iww,ihh;
     butimagewh(ss,function(iw,ih) { 
        iww=(gwr-20)*gx; ihh=(iww*ih)/iw;  // log(iw+':'+ih+'>>>'+iww+':'+ihh);
         c.nstyle('idimg','width',iww+'');
         c.nstyle('idimg','height',ihh+'');
         c.attr('idimg','src',ss);    sfn('ok');
     });
}     
     sext=fs.lcase(fs.xitemgetback(lpicname,1,'.'));
     if(sext=='svg') { sn='data:image/svg+xml;base64,'+fs.x64s(lpicdata);  subshow(sn,function(sx) { sfn('ok'); }); } 
     else { 
         
         butimagechange(lpicname,lpicdata,lmax,function(sn) { 
           //log(lpicdata.length+':'+sn.length) ;    
           sa='data:image/png;base64,'+fs.x64s(sn); lpicdata=sn
           subshow(sa,function(sx) { sfn('ok'); });
         });         
     }
}
function butimageshownail() {
 var sext,sn,sa;
function subshow(ss) {
     var iww,ihh;
     butimagewh(ss,function(iw,ih) { 
        iww=(gwr-20)*gx; iww=iww/4; ihh=(iww*ih)/iw;  // log(iw+':'+ih+'>>>'+iww+':'+ihh);
         c.nstyle('idimgnail','width',iww+'');
         c.nstyle('idimgnail','height',ihh+'');
         c.attr('idimgnail','src',ss);    
     });
}     
     sext=fs.lcase(fs.xitemgetback(lpicnamenail,1,'.'));
     if(sext=='svg') { sn='data:image/svg+xml;base64,'+fs.x64s(lpicdatanail);  subshow(sn); } 
     else { 
         butimagechange(lpicnamenail,lpicdatanail,lmaxnail,function(sn) { 
         // log(lpicdatanail.length+':'+sn.length+'aaaaaaaaaaaa') ;    
          sa='data:image/png;base64,'+fs.x64s(sn); lpicdatanail=sn
          subshow(sa);
         });         
     }
}


accmenu.prototype.butuploadc = function(ss) {
 var sa,sb,sc,sn,saa,ba=false,iww,ihh;   // jval('idsave','Wait...') timer()
 var files = c.tag('idup').files; //files.length files[i].name+ files[i].type+'..'+ files[i].size
 sa=files[0].name; sc=sa; saa=sa; //log(saa+'......');
 sb=fs.lcase(fs.xitemgetback(sa,1,'.')); // if(sa==sb) { sa='txt'; } else { sa=sb; sc=fc.xitemget(sc,1,'.'); }
 if(fs.itemnum('jpg,jpeg,png,gif,svg,htmd,html',sb)>0) { } else { return; }
 var reader = new FileReader();
 reader.onload = function(e) { 
     if(fs.itemnum('htmd,html',sb)>0) { 
         lhtmlname=sa;   lhtmldata=e.target.result; 
         buthtmlshow();
     } else {
      lpicname=sa;   lpicdata=e.target.result; 
      lpicnamenail=sa;   lpicdatanail=e.target.result; 
      butimageshow(function(sx){ butimageshownail();  });  
     }
      
     return;
 }  
 reader.onerror = function(e) {  return;  };
 reader.readAsBinaryString(files[0]) 

}

function butfileboxadd() {
  var s1= c.input(c.at( c.ntype('file'),c.id('idup'),c.onchange('loc.butuploadc(this)'),c.att(c.display('none'))                  )); // input
  c.html('idforfile',s1);    
}

//************************************ database routines *******************************************
function setupkeyadd() {
    var skey,sdat,sb,hd,stem,ba;
//********************************************************************
    skey=c.val('idsearch'); if(skey=='') { c.val('idsearch',''); return; }
    if(lupdate=='') { ba=true; }   else { 
      ba=false; 
      for (var i in buf) {  
          if(fs.left(i,2)=='xx') continue;
          if((i=='imgnail')||(i=='html')) continue;
          if(buf[i]==c.val('id'+i)) { } else { ba=true; }      
      } 
    }
    //log(ba+'..main');
   if(ba==true) {
    hd=fs.dopen(sip,lfile,lpass);  if(hd==0) { loc.but3click(2); return; }
    if(lupdate=='') {    if(fs.dfindid(hd,skey,1)==true) { c.val('idsearch',''); c.attr('idsearch','placeholder',skey+' already exist'); fs.dclose(hd); return;      }}
    fs.dclear(hd);
    fs.dnput(hd,'code',c.val('idsearch'));
    fs.dnput(hd,'desc',c.val('iddesc'));
    fs.dnput(hd,'cat',c.val('idcat'));
    fs.dnput(hd,'stockcode',c.val('idstockcode'));
    fs.dnput(hd,'onhand',c.val('idonhand'));
    fs.dnput(hd,'price',c.val('idprice'));
    fs.dnput(hd,'memo',c.val('idmemo'));
    fs.dnput(hd,'del',' ');
    //fs.dinsertdoc(hd,lpicname,lpicdata);
    fs.dinsert(hd);
    fs.dclose(hd);
//****************************************************************
    hd=fs.dopen(sip,keyconv('stock')); if(hd==0) { loc.but3click(2); return; }
    fs.dclear(hd);
    fs.dnput(hd,'code',c.val('idsearch'));
    fs.dnput(hd,'cost',c.val('idcost'));
    fs.dnput(hd,'memo',c.val('idmemo'));
    fs.dnput(hd,'del',' ');
    fs.dinsert(hd);
    fs.dclose(hd);
    
   }    
   //log(buf['imgnail'].length+'.....'+lpicdatanail.length+':'+(buf['imgnail']==lpicdatanail));
   if(lupdate=='') { ba=true; }
              else { ba=false; if(buf['imgnail']==lpicdatanail) { } else { ba=true; } }
   //log(ba+'....pic');
   if(ba==true) {
//****************************************************************
    hd=fs.dopen(sip,keyconv('stockpic'),lpasspic); if(hd==0) { loc.but3click(2); return; }
    fs.dclear(hd);
    fs.dnput(hd,'code',c.val('idsearch'));
    fs.dnput(hd,'memo',lpicname+':'+lpicdata);
    fs.dnput(hd,'del',' ');
    fs.dinsert(hd);
    fs.dclose(hd);
//****************************************************************
    hd=fs.dopen(sip,keyconv('stocknail'),lpassnail); if(hd==0) { loc.but3click(2); return; }
    fs.dclear(hd);
    fs.dnput(hd,'code',c.val('idsearch'));
    fs.dnput(hd,'memo',lpicnamenail+':'+lpicdatanail);
    fs.dnput(hd,'del',' ');
    fs.dinsert(hd);
    fs.dclose(hd);
   }    

   if(lupdate=='') { ba=true; }
              else { ba=false; if(buf['html']==lhtmldata) { } else { ba=true; } }
 if(ba==true) {
//****************************************************************
    hd=fs.dopen(sip,keyconv('stockhtml'),lpasshtml); if(hd==0) { loc.but3click(2); return; }
    fs.dclear(hd);
    fs.dnput(hd,'code',c.val('idsearch'));
    fs.dnput(hd,'memo',lhtmlname+':'+lhtmldata);
    fs.dnput(hd,'del',' ');
    fs.dinsert(hd);
    fs.dclose(hd);
   
       
   }
    setTimeout(function() { loc.but3click(2); },100);
}
function custdel() {
    var skey,hd;
    skey=c.val('idsearch'); if(skey=='') { c.val('idsearch',''); return; }
    hd=fs.dopen(sip,lfile,lpass);     if(fs.dfindid(hd,skey,1)==true) { fs.dnput(hd,'del','X'); fs.dinsert(hd); }    fs.dclose(hd);        
    hd=fs.dopen(sip,keyconv('stock'));     if(fs.dfindid(hd,skey,1)==true) { fs.dnput(hd,'del','X'); fs.dinsert(hd); }    fs.dclose(hd);        
    hd=fs.dopen(sip,keyconv('stockpic'),lpasspic);     if(fs.dfindid(hd,skey,1)==true) { fs.dnput(hd,'del','X'); fs.dinsert(hd); }    fs.dclose(hd);        
    hd=fs.dopen(sip,keyconv('stocknail'),lpassnail);     if(fs.dfindid(hd,skey,1)==true) { fs.dnput(hd,'del','X'); fs.dinsert(hd); }    fs.dclose(hd);        
    hd=fs.dopen(sip,keyconv('stockhtml'),lpasshtml);     if(fs.dfindid(hd,skey,1)==true) { fs.dnput(hd,'del','X'); fs.dinsert(hd); }    fs.dclose(hd);        
    loc.but3click(2);
}

function fieldlay(hd,ss) { 
    var sa='',sb,iofs=18,ioff=2,sc='',sext,sdat,sn,iww,ihh;
    var sublay=function(sf) { return(''); }
    for(var i=2;i<=fs.itemcount(ss);i++) {
      sb=fs.itemget(ss,i); if(sb=='') continue;
      if(sb=='memo') {
       sa+=c.tr( 
           c.td( c.at(c.att(c.swh(ioff,60))) ),
           c.td(
          c.textarea(
               c.at( c.id('id'+sb),c.spellcheck(true), //onkeyup('keychat(event)')
               c.att(c.border('1px solid #b0b0b0'),
                  c.sfont_size(32),c.font_family('myfont'),c.st('outline-color:#404040; '),c.white_space('nowrap'),c.swh(580-iofs-ioff,200)
               )
              ),sublay(sb)
           )
       ));
      } 
      else if((sb=='cat')&&(lupdate=='')) {
       sa+=c.tr(
           c.td( c.at(c.att(c.swh(ioff,60))) ),
           c.td(
           c.table( c.at(c.cellspacing(0),c.cellpadding(0)), c.tr(       
           c.td(       
           c.input(c.at(
                  c.ntype('text'),c.hint('   '+sb),c.id('id'+sb),sc,c.styl('autocomplete','off'),c.spellcheck(false),c.value(sublay(sb)),   
                  c.att(c.background_color('#FFFFFF'),c.sfont_size(32),c.font_family('myfont'),c.swh(580-iofs-ioff-60-10,60),c.st('outline-color:#404040; '),c.border('1px solid #e0e0e0')) //,c.border('1px solid #FFFFFF')
              )) // input
          ), //td
             c.td( c.at(c.att(c.swh(10,60))) ),
             c.td(
              c.svg(c.at(c.wh(60,60)),   
               c.rect(c.xywh(0,0,60,60),c.att(c.fill(fs.theme(2)))), //back selectiom
               c.image(c.xywh(0,0,60,60),c.xlink(fs.picsvgi('xsetting')),c.onclick('loc.but3click(32)'),c.att(c.cursor('pointer'))           ),
             ) //svg
            ) //td  
         )) // table
         ) //main td
       );

      }      
      else {
         if(lupdate=='')  { sc=c.disabled(false); } else { //log(sb);
             if(fs.itemnum('desc,cat',sb)>0) { sc=c.disabled(true);  } else { sc=c.disabled(false); }
         } 

       sa+=c.tr(
           c.td( c.at(c.att(c.swh(ioff,60))) ),
           c.td(
           c.input(c.at(
                  c.ntype('text'),c.hint('   '+sb),c.id('id'+sb),sc,c.styl('autocomplete','off'),c.spellcheck(false),c.value(sublay(sb)),   
                  c.att(c.background_color('#FFFFFF'),c.sfont_size(32),c.font_family('myfont'),c.swh(580-iofs-ioff,60),c.st('outline-color:#404040; '),c.border('1px solid #e0e0e0')) //,c.border('1px solid #FFFFFF')
              )) // input
          
       ));
      }
    }
//***************************** add a picture ********************************************
//img{ id('idimg') valign('top')align('center') src(ss) att(height(ih))  }
     //sc=c.src('data:image/svg+xml;base64,'+fs.x64s(lpic)); 

   sb='img'; sc='';  
   if(hd==0) {  lpicname='lock.svg'; lpicdata=lpic; }
        else { sc=sublay(sb);    if(sc=='') { lpicname='lock.svg'; lpicdata=lpic; }      }
   sa+=c.tr( 
           c.td( c.at(c.att(c.swh(ioff,60))) ),
           c.td(
            c.img(  c.at( c.id('id'+sb),c.align('center'),'',c.att(c.swh(580-iofs-ioff,400))          )           )
       ));

   sb='imgnail'; sc='';  
   if(hd==0) {  lpicnamenail='lock.svg'; lpicdatanail=lpic; }
        else { sc=sublay(sb);    if(sc=='') { lpicnamenail='lock.svg'; lpicdatanail=lpic; }      }
   sa+=c.tr( 
           c.td( c.at(c.att(c.swh(ioff,60))) ),
           c.td(
            c.img(  c.at( c.id('id'+sb),c.align('center'),'',c.att(c.swh(580-iofs-ioff,400))          )           )
       ));
    sb='html'; lhtmlname='file.html'; lhtmldata='';
      sa+=c.tr(
           c.td( c.at(c.att(c.swh(ioff,60))) ),  
           c.td( c.at(c.id('id'+sb), c.att( 
            c.border_radius((10*gy)),c.border((1*gy)+'px solid #b0b0b0'),c.padding_left(10),c.padding_right(10),
              c.spfont_size(25*gt),c.swidth(580-17-iofs-ioff),c.background_color('#FFFFFF')) ),''
                
           )
          );

      
      
    //   sa+=c.tr( 
    //       c.td( c.at(c.att(c.swh(ioff,60))) ),
    //       c.td(
    //       c.textarea(
    //           c.at( c.id('id'+sb),c.spellcheck(true), //onkeyup('keychat(event)')
    //           c.att(c.border('1px solid #b0b0b0'),
    //               c.sfont_size(32),c.font_family('myfont'),c.st('outline-color:#404040; '),c.white_space('nowrap'),c.swh(580-iofs-ioff,200)
    //           )
    //           ),''
    //       )
    //   ));
    return(sa)
}
// function searchretx(ss) { lupdate=ss; //log(ss);
//     var hd,s1='',s2='',ba=false,ia,itot,it,i,sa,sd,sb,se,sg,sdat,sfld,iw=gwidth,ih=ghmid;
//     sfld='code,desc,cat,stockcode,onhand,cost,price,memo';
//     if(ss=='') { sa=fieldlay(0,sfld); } else {
//      hd=fs.dopen(sip,lfile); 
//      if(hd==0) { sa=fieldlay(0,sfld); } else {
//       if(fs.dfindiddoc(hd,ss,1)==true) {  s1=fs.dnno(hd,1); sa=fieldlay(hd,sfld);     }
//       fs.dclose(hd);
//      }
//     }
//   //  if(gstart=='android') sa+=c.tr( c.td(), c.td( c.at(c.att(c.sheight(500)))        ));
//   c.html('cinfox',c.table( c.at(c.att(c.white_space('nowrap'))),sa ));
//   c.val('idsearch',s1); //c.val('idmemo','ok');
//   setTimeout(function() { butimageshow(function(sx) { butimageshownail(); }); },50);
//   gicallup=false;
// }
async function searchret(ss,babuf) { lupdate=ss; //log(ss);
    var hd,s1='',s2='',ba=false,ia,itot,it,i,sa,sd,sb,se,sg,sdat,sfld,iw=gwidth,ih=ghmid;
    sfld='code,desc,cat,stockcode,onhand,cost,price,memo';
     sa=fieldlay(0,sfld); 
  //  if(gstart=='android') sa+=c.tr( c.td(), c.td( c.at(c.att(c.sheight(500)))        ));
   c.html('cinfox',c.table( c.at(c.att(c.white_space('nowrap'))),sa ));
   c.val('idsearch',s1); //c.val('idmemo','ok');
    await butfillupdate(ss,1);// log('hi');
    if(babuf==false) { 
         await butfillupdate(ss,2); //log('hello');
         setTimeout(function() { buthtmlshow(); butimageshow(function(sx) { butimageshownail(); }); },50); 
    }
   gicallup=false;
}
async function butfillupdate(ss,n) {
  var hd,s1='',s2='',ba=false,ia,itot,it,sa,sd,sb,se,sg,sdat,sfld,iw=gwidth,ih=ghmid,sp,scode;
    sfld='code,desc,cat,stockcode,onhand,cost,price,memo';
async function sublay (sf) { var hds,s1=0,sext,sn;    if(hd==0) return('');    else  {
       if(sf=='img') {
           hds=await fs.wopen(sip,keyconv('stockpic'),lpasspic); 
           if(await fs.wfindid(hds,scode,1)==true) {  sdat=fs.dn(hds,'memo');     }
           fs.dclose(hds);  if(sdat.length=='') return('');
           lpicname=fs.xitemget(sdat,1,':'); sext=fs.xitemgetback(lpicname,1,'.'); 
           lpicdata=fs.xitemlast(sdat,1,':'); if(lpicdata=='') return('');
           if(sext=='svg') { sn='data:image/svg+xml;base64,'+fs.x64s(lpicdata); } else { sn='data:image/png;base64,'+fs.x64s(lpicdata); }
           return(sn);
       }       
       else if(sf=='imgnail') {
           hds=await fs.wopen(sip,keyconv('stocknail'),lpassnail); 
           if(await fs.wfindid(hds,scode,1)==true) {  sdat=fs.dn(hds,'memo');     }
           fs.dclose(hds); if(sdat.length=='') return('');
           lpicnamenail=fs.xitemget(sdat,1,':'); sext=fs.xitemgetback(lpicnamenail,1,'.'); 
           lpicdatanail=fs.xitemlast(sdat,1,':'); if(lpicdatanail=='') return('');
           if(sext=='svg') { sn='data:image/svg+xml;base64,'+fs.x64s(lpicdatanail); } else { sn='data:image/png;base64,'+fs.x64s(lpicdatanail); }
           buf[sf]=lpicdatanail;
           return(sn);
       }       
       if(sf=='html') {
           hds=await fs.wopen(sip,keyconv('stockhtml'),lpasshtml); 
           if(await fs.wfindid(hds,scode,1)==true) {  sdat=fs.dn(hds,'memo');     }
           fs.dclose(hds); if(sdat.length=='') return('');
           lhtmlname=fs.xitemget(sdat,1,':'); sext=fs.xitemgetback(lpicname,1,'.'); 
           lhtmldata=fs.xitemlast(sdat,1,':'); if(lpicdata=='') return('');
           if(sext=='htmd') { sn=lhtmldata; } else { sn=lhtmldata; }
           buf[sf]=lhtmldata;
           return(sn);
       }       

       else if(sf=='cost') {
          hds=await fs.wopen(sip,keyconv('stock')); 
          if(await fs.dfindid(hds,fs.dn(hd,'code'),1)==true) {  s1=fs.dn(hds,'cost').trim();     }
          fs.dclose(hds); 
          buf[sf]=s1;
          return(s1); 
       } 
       else {
           s1=fs.dn(hd,sf);buf[sf]=s1;
           return(s1); 
       }       
    }    
    }   
     if(n==1) {
     hd=await fs.wopen(sip,lfile,lpass); 
     if(hd==0) { return(''); } else {
      if(await fs.wfindid(hd,ss,1)==true) {  
           for(var i=2;i<=fs.itemcount(sfld);i++) {         sp=fs.itemget(sfld,i);      c.val('id'+sp,await sublay(sp));          }
           c.val('idsearch',fs.dn(hd,'code'));
         
      }
      fs.dclose(hd);
     } //else
     } else {
            scode=c.val('idsearch');
            await sublay('img'); 
           await sublay('imgnail'); 
           await sublay('html');
     }
}

function initlay() {
var x,y,sa,sb,k,j=0,jj=0;
  lmode='text'; 
  gwidth=c.tag('idbody').clientWidth
  gheight=c.tag('idbody').clientHeight; if(gwidth>gmwidth) { gmwidthreal=gwidth; gwidth=gmwidth; }
  if(gba==true) { gwidth=580; gheight=1256; }    //541,1021
  glay['base']=[580,1256];    
  gwr=glay['base'][0];
  ghr=glay['base'][1];
  x=gwidth/glay['base'][0]; gx=x; 
  y=gheight/glay['base'][1]; gy=y; c.xyset(x,y); gt=c.xyget(); 
}
 function initsecond(sf) { 
  var ss,s1,ksep=210,kofs=200,ktop=20,kw=50,kh=50,kadd=60,sx; 
          if((fs.themeset()>1))   sx=c.image(c.xywh(kofs+kadd*5-25,10,120,60),c.xlink(fs.picsvgi('xxlogo')),c.att(c.cursor('pointer'))           );
        else sx=c.image(c.xywh(kofs+kadd*5,ktop,kw+35,kh),c.xlink(fs.picget('icon31')),c.att(c.cursor('pointer'))           );

   //******************************* svg *****************************************************************************************************
   ss=c.svg(  c.at(c.id('idmain'),c.nwidth(gwidth),c.cheight(ksep)), //,c.viewbox(0,0,gwr,210),c.viewbox(0,0,gwr,210),c.viewbox('0 0 100 100') c.att(c.background_image(sgrp))
     //******************************************** load font *************************************************************
     c.defs(c.stylesheet(c.font_face(
        c.st(" font-family: 'myfont';  src: url(data:font/ttf;base64,"+gmfont+") format('truetype');  font-weight: normal; font-style: normal;")    
     ))),
     
           //******************** background **********************************************************
           c.rect(c.xywh(0,0,gwr,ksep),c.att(c.fill(fs.theme(2)))), 
           //*******************  heading *****************************************************************
           c.text(c.at(c.xy(15,60),c.onclick('loc.but3click(1)'),c.att(c.fill(fs.theme(1)),c.font_weight(fs.theme(3)),c.fill_opacity(0.8),c.sfont_size(55),c.cursor('pointer'),c.font_family('myfont'))),'Add Item'),
           c.image(c.xywh(7,7,15,15),c.xlink(fs.picsvg('xhelp')),c.att(c.cursor('pointer'))           ),
          //******************** incons *************************************************************************************
        //   c.image(c.xywh(kofs+kadd*0,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('loc.but3click(7)'),c.att(c.cursor('pointer'))           ),
        //   c.image(c.xywh(kofs+kadd*1,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('but3click(6)'),c.att(c.cursor('pointer'))           ),
        //   c.image(c.xywh(kofs+kadd*2,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('but3click(5)'),c.att(c.cursor('pointer'))           ),
        //   c.image(c.xywh(kofs+kadd*3,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('but3click(4)'),c.att(c.cursor('pointer'))           ),
//          c.image(c.xywh(kofs+kadd*3,ktop,kw,kh),c.xlink(fs.picsvg('xpic')),c.onclick('loc.but3click(10)'),c.att(c.cursor('pointer'))           ),
        //   c.foreignobject(c.at(c.xywh(kofs+kadd*2,ktop,kw,kh)), //file object
        //   c.input(c.at(
        //           c.ntype('file'),c.onchange('loc.but3click(11)')),   
        //           c.att(c.swh(kw,kh),c.cursor('pointer')) 
        //       )) // input
        //   ),


        //  c.image(c.xywh(kofs+kadd*0,ktop,kw,kh),c.xlink(fs.picsvgi('xcloud')),c.onclick('loc.but3click(12)'),c.att(c.cursor('pointer'))           ),
          c.image(c.xywh(kofs+kadd*2,ktop,kw,kh),c.xlink(fs.picsvgi('xfile')),c.onclick('loc.but3click(11)'),c.att(c.cursor('pointer'))           ),
          c.image(c.xywh(kofs+kadd*3,ktop,kw,kh),c.xlink(fs.picsvgi('xpic')),c.onclick('loc.but3click(10)'),c.att(c.cursor('pointer'))           ),
          c.image(c.id('iddel'),c.xywh(kofs+kadd*4,ktop,kw,kh),c.xlink(fs.picsvgi('xdelete')),c.onclick('loc.but3click(99)'),c.att(c.display('none'),c.cursor('pointer'))           ),
          sx, //c.image(c.xywh(kofs+kadd*5,ktop,kw+35,kh),c.xlink(fs.picget('icon31')),c.onclick('loc.but3click(1)'),c.att(c.cursor('pointer'))           ),
          //************************** back ********************************************************************************
//          c.polygon(c.points(20,140,40,160,40,120),c.att(c.fill('#FFFFFF')) ),
          c.image(c.xywh(0,100+4,80,80-8),c.xlink(fs.picsvgi('xxback')),c.att(c.cursor('pointer'))           ),
          
          c.rect(c.xywh(0,100,90,80),c.onclick('loc.but3click(2)'),c.att(c.cursor('pointer'),c.fill('transparent'))),
          //************************** pre-input ********************************************************************************
          c.foreignobject(c.at(c.xywh(70,100,30,80)),c.input(c.at( c.ntype('text'),c.disabled(true),c.att(c.swh(31,80),c.background_color('#FFFFFF'),c.border('1px solid #FFFFFF'))   ))        ),
          c.image(c.xywh(70+10,100+10,31-20,80-20),c.xlink(fs.picsvgi('xuser',fs.themeset()))           ), //image inside
          //************************** input ********************************************************************************
          c.foreignobject(c.at(c.xywh(100,100,400,80)), 
          c.input(c.at(
                  c.ntype('text'),c.hint('Stock Code'),c.id('idsearch'),c.disabled(true),c.styl('autocomplete','off'),c.spellcheck(false),c.value(sf),c.onkeyup('loc.keysup(event)'),   
                  c.att(c.background_color('#ffffff'),c.sfont_size(40),c.font_family('myfont'),c.swh(400,80),c.border('1px solid #FFFFFF')) //,c.border('1px solid #FFFFFF')
              )) // input
          ),
          //************************** accept  ********************************************************************************
          c.foreignobject(c.at(c.xywh(500,100,70,80)),c.input(c.at( c.ntype('text'),c.disabled(true),c.att(c.swh(70,80),c.background_color('#FFFFFF'),c.border('1px solid #FFFFFF'))   ))        ),
          c.image(c.xywh(500+20,100+20,40,40),c.xlink(fs.picsvgi('xaccept',fs.themeset()))), //backn
          c.rect( c.xywh(500,100,80,80),c.onclick('loc.but3click(20)'),c.att(c.cursor('pointer'),c.fill('transparent'))), //send selectiom
   );//svg
   ghmid=(ghr-ksep)*gy;
   s1=c.div(c.at( 
              c.id('cinfox'),
              c.att(c.swh(gwr,ghr-ksep),
              c.overflow('auto'),c.background_color('#E0E0E0')
              )
          )); // input
   ss=c.table(c.at(c.cellspacing(0),c.cellpadding(0)),
   c.tr(c.td(c.at(c.id('idxleft'))),c.td(ss),c.td(c.at(c.id('idxright')))),
   c.tr(c.td(c.at(c.id('idxleft'))),c.td(s1),c.td(c.at(c.id('idxright')))),
   c.tr(c.td(c.at(c.id('idxleft'))),c.td(c.at(c.id('idforfile'))),c.td(c.at(c.id('idxright')))),
   
 );
return(ss)
}
//********************************* main run **************************************
      sdat=initgen(sdat,sback,sbuf,spic);
      
      initlay(); 
      
      c.html(sarg,initsecond('')); c.drawwidth(gwidth,gheight,gmwidthreal);
      butfileboxadd();
       (async function() { await searchret(sdat,lbabuf); })();
       
       if(sdat=='') {  c.val('idsearch',custno(1,1000)); } else  {  c.nstyle('iddel','display','block'); }    

      if(lbabuf==false) { 
          
          
      } else { lbabuf=false; butfill(); }
      //log(fs.etick()+'...');
      
//      if(lbabuf==true) { lbabuf=false; butfill(); }

};
//********************************************************************************************************
function initfirst(sarg,sdat,sback,sbuf,spic) { // fs.stick();
    loc=new accmenu(sarg,sdat,sback,sbuf,spic);  
}


