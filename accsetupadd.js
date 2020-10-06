// declare var fs,c; 
// declare var gmicon,gmback,gmlock,gmfont,gmwidth,gmwidthreal,gloccopy;
// declare var gwidth,gheight,ghmid,gy,gx,gt;
// declare var gservpubkey,gpubkeymy,gkeymy,gpubkeymyhash,gnodeselect,gnodemain,gnodemaster,gcustlist,gkeypmy,gpic,gpics,gscripts,gnodeloc,glocal,gappback;
var gbacksetupadd,loc,gicallup=false;
//************************************** main routine *********************************************************************
function accmenu(sarg,sdat,sback) {
var gwidth,gheight,ghmid,gwr,ghr,glay={},gx,gy,gba=false,sip;
var lmode,bmess=false,llogin,llock;
function log(ss) {  fs.log(ss);  }
//************************************ database routines *******************************************
function keyconv(ss) {     return(fs.keyconvert(sip,ss,gkeymy)); }    

function setupkeyadd() {
    var skey,sdat,sb,hd;

 function subadd() {
   fs.dclear(hd);
    fs.dnput(hd,'name',skey);                   
    fs.dnput(hd,'memo',sdat); 
    fs.dinsert(hd);
    fs.dclose(hd);
    setTimeout(function() { loc.but3click(2); },100);
 }

    skey=c.val('idsearch'); if(skey=='') { c.val('idsearch',''); return; }
    sdat=c.val('idinmess');
    hd=fs.dopen(sip,keyconv('setup')); 
    if(hd==0) {
       sb=keyconv('setup')+'|name,30|memo,m#name,name';
       sb=fs.dcreate(sip,sb);
       setTimeout(function() { hd=fs.dopen(sip,keyconv('setup')); subadd(); },500); return; // give time to create
    } 
    subadd();    
}
function butadduserfile(skey,ss,se) { log(ss+'.....');
    var hd;
     hd=fs.dopen(sip,skey); 
     fs.dclear(hd);
     fs.dnput(hd,'name',ss);                   
     fs.dnput(hd,'memo',se);
     fs.dinsert(hd);
     fs.dclose(hd);
     
}
function setupget(ss) {
    var hd,sa='';
     hd=fs.dopen(sip,keyconv('setup')); 
     if(fs.dfindid(hd,ss,1)==true) { sa=fs.dn(hd,'memo'); }
     fs.dclose(hd);
     return(sa);
}
function setupput(ss,se) {
    var hd;
     hd=fs.dopen(sip,keyconv('setup')); 
     fs.dclear(hd);
     fs.dnput(hd,'name',ss);                   
     fs.dnput(hd,'memo',se);
     fs.dinsert(hd);
     fs.dclose(hd);
}

function butadduser() { 
     var suser=c.val('idsearch'); // suser=fs.xitemget(suser,2,'user');
     var se=c.val('idinmess');
     var skey=fs.dbkey(se); 
     var hd,sn,sd,sc,sb,sa=fs.useraddress(sip,fs.xhexs(skey.pub));   
     if(sa=='no') {  fs.userput(sip,se,suser); } 
//********************create setup file**********************************************
 setTimeout(function() {

    hd=fs.dopen(sip,se); 
     if(hd==0) {
       sb=se+'|name,30|memo,m#name,name';
       sb=fs.dcreate(sip,sb);
     }  
     fs.dclose(hd);
//*****************************************************************
  setTimeout(function() {
     sc='cust'; sb=setupget(sc);   if(sb!='') butadduserfile(skey,sc,sb);    
     sc='stock'; sb=setupget(sc);   if(sb!='') butadduserfile(skey,sc,sb);    
     sc='trans'; sb=setupget(sc);   if(sb!='') butadduserfile(skey,sc,sb);    
//****************** add a list  
     sb=setupget('users'); sd=fs.xhexs(skey.pri);
     if(sb=='') {
        setupput('users',suser+' '+fs.xhexs(skey.pri)+'\n'); return;
     } else {
        for(var i=1;i<=fs.xitemcount(sb,'\n');i++) {
            sn=fs.xitemget(sb,i,'\n'); if(sn=='') continue;
            sn=fs.xitemget(sn,2,' ');
            if(sd==sn) { return; }
        } 
        setupput('users',sb+suser+' '+fs.xhexs(skey.pri)+'\n'); return;
     }
 
  },500); //out2     
 },500);     //out1
}    


function butsetrandom() {
    var se=fs.sha256hex(fs.randomtweetn(32)); 
    var sdat=c.val('idinmess');
    if(sdat=='') { c.val('idinmess',se); } else {    c.val('idinmess',sdat+'\n'+se); }
}
//************************************ global access *****************************************
accmenu.prototype.but3click = function (n) { 
            if(n==1) {  fs.run('root','maathelp','accsetupadd,Setup Add');  }
       else if(n==2) {  fs.run('root',gbacksetupadd);  }
       else if(n==40) { butsetrandom(); }
       else if(n==41) { butadduser(); }
       else if(n==20) {  setupkeyadd();  }
}

function initgen(ss) { if(ss!=undefined)  gbacksetupadd=ss; sip=gnodeselect;  }
function butedit(ss) {  log(ss); }
function searchret(ss) {
    var hd,s1='',s2='',ia,itot,it,i,sa,sd,sb,se,sg,sdat,iw=gwidth,ih=ghmid;
    if(ss=='') { } else {
     hd=fs.dopen(sip,keyconv('setup')); 
     if(hd==0) { } else {
      if(fs.dfindid(hd,ss,1)==true) {  s1=fs.dn(hd,'name'); s2=fs.dn(hd,'memo');  } // log(fs.dfields(hd)); log(fs.dinfo(hd));  
      fs.dclose(hd);
     }
    }
    sa=c.tr( c.td(
         c.textarea(
              c.at( c.id('idinmess'),c.spellcheck(false),//c.value(s2), //onkeyup('keychat(event)')
               c.att(c.border('1px solid #e0e0e0'),
                 c.sfont_size(34),c.background_color('#FFFFFF'),c.st('outline-color:#404040; '),c.white_space('nowrap'),c.width(iw-6),c.height(ih-6)
               )  
             ),s2
          )
    ));
   c.html('cinfox',c.table( c.at(c.att(c.white_space('nowrap'))),sa ));
   c.val('idsearch',s1);
   gicallup=false;
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
           c.text(c.at(c.xy(15,60),c.onclick('loc.but3click(1)'),c.att(c.fill(fs.theme(1)),c.font_weight(fs.theme(3)),c.fill_opacity(0.8),c.sfont_size(55),c.cursor('pointer'),c.font_family('myfont'))),'Add Setup'),
           c.image(c.xywh(7,7,15,15),c.xlink(fs.picsvg('xhelp')),c.att(c.cursor('pointer'))           ),
          //******************** incons *************************************************************************************
        //   c.image(c.xywh(kofs+kadd*0,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('loc.but3click(7)'),c.att(c.cursor('pointer'))           ),
        //   c.image(c.xywh(kofs+kadd*1,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('but3click(6)'),c.att(c.cursor('pointer'))           ),
        //   c.image(c.xywh(kofs+kadd*2,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('but3click(5)'),c.att(c.cursor('pointer'))           ),
          c.image(c.xywh(kofs+kadd*3,ktop,kw,kh),c.xlink(fs.picsvgi('xusersmall')),c.onclick('loc.but3click(41)'),c.att(c.cursor('pointer'))           ),
          c.image(c.xywh(kofs+kadd*4,ktop,kw,kh),c.xlink(fs.picsvgi('xlockwhite')),c.onclick('loc.but3click(40)'),c.att(c.cursor('pointer'))           ),
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
                  c.ntype('text'),c.hint('Key'),c.id('idsearch'),c.styl('autocomplete','off'),c.spellcheck(false),c.value(sf),c.onkeyup('loc.keysup(event)'),   
                  c.att(c.sfont_size(40),c.font_family('myfont'),c.swh(400,80),c.border('1px solid #FFFFFF')) //,c.border('1px solid #FFFFFF')
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
              c.overflow('auto'),c.background_color('#e0e0e0')
              )
          )); // input
   ss=c.table(c.at(c.cellspacing(0),c.cellpadding(0)),
   c.tr(c.td(c.at(c.id('idxleft'))),c.td(ss),c.td(c.at(c.id('idxright')))),
   c.tr(c.td(c.at(c.id('idxleft'))),c.td(s1),c.td(c.at(c.id('idxright'))))
 );
return(ss)
}
//********************************* main run **************************************
      
      initgen(sback);
      initlay(); 
      c.html(sarg,initsecond('')); c.drawwidth(gwidth,gheight,gmwidthreal);
      searchret(sdat);

};
//********************************************************************************************************
function initfirst(sarg,sdat,sback) { loc=new accmenu(sarg,sdat,sback);  }


