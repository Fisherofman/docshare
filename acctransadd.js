// declare var fs,c,alog; 
// declare var gmicon,gmback,gmlock,gmfont,gmwidth,gmwidthreal,gloccopy;
// declare var gwidth,gheight,ghmid,gy,gx,gt;
// declare var gstart,gservpubkey,gpubkeymy,gkeymy,gpubkeymyhash,gnodeselect,gnodemain,gnodemaster,gcustlist,gkeypmy,gpic,gpics,gscripts,gnodeloc,glocal,gappback;
var gbacktransadd,loc,gicallup=false;
//************************************** main routine *********************************************************************
function accmenu(sarg,sdat,sback) {
var gwidth,gheight,ghmid,gwr,ghr,glay={},gx,gy,gba=false,sip,comm=[];
var lfields='ref,acc,type,dateref,period,desc,orderref,amount,memo';
var lmode,bmess=false,llogin,llock,lupdate='',lfile='trans';
function log(ss) {  fs.log(ss);  }
function logx(ss) {  fs.logip('192.168.0.104:9000',ss);  }
function show(ss) { if(gstart=='android') { alog(ss); } else { alert(ss); } }
function keyconv(ss) {     return(fs.keyconvert(sip,ss,gkeymy)); }    


function initgen(sdat,ss) { 
    if(typeof(sdat)=='string') { } else {       comm=sdat;        sdat='';    }
    if(ss=='acccust') { } else {      if(ss!=undefined)  gbacktransadd=ss;     }
    sip=gnodeselect;   lfile=keyconv('trans');  
    return(sdat);
}
//************************************ global access *****************************************
function custget() {
           comm=[];  comm.push(c.val('idsearch'));
           for(var i=2;i<=fs.itemcount(lfields);i++) {           
             comm.push(c.val('id'+fs.itemget(lfields,i)));
           }
}

function custno(n) {
var sb='1000',k;
var sa=fs.dataget(sip,lfile+'no','number',1); 
 for(var i=0;i<sa.length;i++) { sb=sa[i]; break; }
 k=fs.xis(sb)+1; if(n==1) fs.dataput(sip,lfile+'no','number',k+'');   
 return(k+'');
}
function custinit() { 
    var sd=fs.datecurrent();  sd=fs.xitemget(sd,1,' '); 
    c.val('idtype','inv');
    c.val('iddateref',sd);
    c.val('idperiod',fs.right(fs.xitemget(sd,3,'/'),2)+fs.xitemget(sd,1,'/'));
    c.val('idsearch',custno(0));
}    
function custput() {
 var ln,j=0,ss,s1,hdc;
 if(comm.length>0)  { } else { custinit(); return; } 
    c.val('idsearch',comm[0]);   ln=fs.itemcount(lfields);
           for(var i=2;i<=ln;i++) { j++;          
             c.val('id'+fs.itemget(lfields,i),comm[j]); 
           }
           j++; ss=comm[j];
           if(ss=='cust') {
            j++; c.val('idacc',comm[j]);
            j++; c.html('idname',comm[j]);
           } else {
            j++; c.val('idorderref',comm[j]); 
            j++; c.val('iddesc',comm[j]); 
            j++; c.val('idamount',comm[j]); 
            s1=c.val('idacc'); 
            if(s1!='') {
              hdc=fs.dopen(sip,keyconv('cust')); if(hdc!=0) {
              if(fs.dfindid(hdc,s1,1)==true) { c.html('idname',fs.dn(hdc,'name').trim());       }  
              fs.dclose(hdc);
            }}
           }
}    
accmenu.prototype.but3click = function (n) { 
            if(n==1) {  fs.run('root','maathelp','acctransadd,Transaction Add');  }
       else if(n==2) {  fs.run('root',gbacktransadd);  }
       else if(n==3) {  fs.run('root','acctrans','','accmenu');}
       else if(n==20) {  setupkeyadd();  }
       else if(n==31) {   custget();   fs.run('root','acccust',comm,'acctransadd');         }
       else if(n==32) {   custget();   fs.run('root','accstock',comm,'acctransadd');         }
      else if(n==41) {  c.nstyle('idt1','fill-opacity','1'); c.nstyle('idt2','fill-opacity','0.5'); c.nstyle('idt3','fill-opacity','0.5'); c.nstyle('idt4','fill-opacity','0.5');  c.val('idtype','inv');      }
      else if(n==42) {  c.nstyle('idt1','fill-opacity','0.5'); c.nstyle('idt2','fill-opacity','1'); c.nstyle('idt3','fill-opacity','0.5'); c.nstyle('idt4','fill-opacity','0.5');  c.val('idtype','pay');      }
      else if(n==43) {  c.nstyle('idt1','fill-opacity','0.5'); c.nstyle('idt2','fill-opacity','0.5'); c.nstyle('idt3','fill-opacity','1'); c.nstyle('idt4','fill-opacity','0.5');  c.val('idtype','csh');      }
      else if(n==44) {  c.nstyle('idt1','fill-opacity','0.5'); c.nstyle('idt2','fill-opacity','0.5'); c.nstyle('idt3','fill-opacity','0.5'); c.nstyle('idt4','fill-opacity','1');  c.val('idtype','cre');      }
       else if(n==99) {  custdel();  }

}
//************************************ database routines *******************************************
function setupkeyadd() {
    var skey,sdat,sb,hd;

 function subadd() {
    var sb,ss=lfields;   fs.dclear(hd);  //fs.dfields(hd);
   for(var i=1;i<=fs.itemcount(ss);i++) {
      sb=fs.itemget(ss,i); if(sb=='') continue;  if(sb=='del') continue;
      if(i==1) fs.dnput(hd,sb,custno(1)); else  {
          fs.dnput(hd,sb,c.val('id'+sb)); 
      }      
   }
    fs.dnput(hd,'alloc','0');
    fs.dinsert(hd);
    fs.dclose(hd);
    setTimeout(function() { loc.but3click(2); },100);
 }
//********************************************************************
    skey=c.val('idsearch'); if(skey=='') { c.val('idsearch',''); return; }
    hd=fs.dopen(sip,lfile); 
    if(hd==0) {
       sb=lfile+'|ref,10|acc,6|type,3|dateref,10|period,4|desc,25|orderref,15|amount,f|alloc,f|memo,m#ref,ref|acc,acc,ref|period,period,ref';
       sb=fs.dcreate(sip,sb);
       setTimeout(function() { hd=fs.dopen(sip,lfile); subadd(); },1500); return; // give time to create
    } 
     if(lupdate=='') {
         if(fs.dfindid(hd,skey,1)==true) { c.val('idsearch',''); c.attr('idsearch','placeholder',skey+' already exist'); fs.dclose(hd); return;      }
     }
    subadd();    
}
function custdel() {
    var skey,hd;
    skey=c.val('idsearch'); if(skey=='') { c.val('idsearch',''); return; }
    hd=fs.dopen(sip,lfile); 
    if(fs.dfindid(hd,skey,1)==true) { fs.dnput(hd,'del','X'); fs.dinsert(hd); }
    fs.dclose(hd);        
    loc.but3click(2);
}



function fieldlay(hd,ss) {
    var sa='',sb,sc='',iofs=18,ioff=12,hdc,snam='Select Customer';
    var sublay=function(sf) {     if(hd==0) return('');    else {  
        if(sf=='acc') {
            hdc=fs.dopen(sip,keyconv('cust')); if(hdc!=0) {
            if(fs.dfindid(hdc,fs.dn(hd,sf),1)==true) { snam=fs.dn(hdc,'name').trim();       }  
            fs.dclose(hdc);
        }}
        return(fs.dn(hd,sf).trim()); 
     } 
    }   
    for(var i=2;i<=fs.itemcount(ss);i++) {
      sb=fs.itemget(ss,i); if(sb=='') continue;
      if(sb=='acc') {
       sa+=c.tr(
           c.td( c.at(c.att(c.swh(ioff,60))) ),
           c.td(
           c.input(c.at(
                  c.ntype('text'),c.hint(' Account'),c.id('id'+sb),c.styl('autocomplete','off'),c.disabled(true),c.spellcheck(false),c.value(sublay(sb)),   
                  c.att(c.background_color('#FFFFFF'),c.color('#000000'),c.sfont_size(32),c.font_family('myfont'),c.swh(100,60),c.st('outline-color:#404040; '),c.border('1px solid #e0e0e0')) //,c.border('1px solid #FFFFFF')
              )) // input
           ), //td
           c.td(
             c.svg(c.at(c.wh(60,60)),   
              c.rect(c.xywh(0,0,60,60),c.att(c.fill(fs.theme(2)))), //back selectiom
              c.image(c.xywh(0,0,60,60),c.xlink(fs.picsvgi('xsetting')),c.onclick('loc.but3click(31)'),c.att(c.cursor('pointer'))           ),
            )
           ), //td button
           c.td(
             c.svg(c.at(c.wh(580-iofs-ioff-100-60-8,60)),   
                 c.text(c.at(c.id('idname'),c.xy(0,50),c.att(c.fill(fs.theme(1)),c.fill_opacity(0.8),c.sfont_size(55),c.font_family('myfont'))),snam)
            )               
           ) //td text
       );
          
      }      
      else if(sb=='desc') {
       sa+=c.tr(
           c.td( c.at(c.att(c.swh(ioff,60))) ),
           c.td( c.at(c.colspan(3)),
            c.table( c.at(c.cellspacing(0),c.cellpadding(0)), c.tr(
             c.td(
               c.input(c.at(
                  c.ntype('text'),c.hint(' Description'),c.id('id'+sb),c.styl('autocomplete','off'),c.spellcheck(false),c.value(sublay(sb)),   
                  c.att(c.sfont_size(32),c.font_family('myfont'),c.swh(580-iofs-ioff-60-10,60),c.st('outline-color:#404040; '),c.border('1px solid #e0e0e0')) //,c.border('1px solid #FFFFFF')
              )) // input
             ), //td
             c.td( c.at(c.att(c.swh(10,60))) ),
             c.td(
              c.svg(c.at(c.wh(60,60)),   
               c.rect(c.xywh(0,0,60,60),c.att(c.fill(fs.theme(2)))), //back selectiom
               c.image(c.xywh(0,0,60,60),c.xlink(fs.picsvgi('xsetting')),c.onclick('loc.but3click(32)'),c.att(c.cursor('pointer'))           ),
             ) //svg
            ) //td  
          )) //table
          )//td
        
       );
          
      }      
      else if(sb=='type') {
       sa+=c.tr(
           c.td( c.at(c.att(c.swh(ioff,60))) ),
           c.td( c.at(c.colspan(3)),
            c.table( c.at(c.cellspacing(0),c.cellpadding(0)), c.tr(
             c.td(
               c.input(c.at(
                  c.ntype('text'),c.hint(' Type'),c.id('id'+sb),c.styl('autocomplete','off'),c.disabled(true),c.spellcheck(false),c.value(sublay(sb)),   
                  c.att(c.background_color('#FFFFFF'),c.color('#000000'),c.sfont_size(32),c.font_family('myfont'),c.swh(100,60),c.st('outline-color:#404040; '),c.border('1px solid #e0e0e0')) //,c.border('1px solid #FFFFFF')
              )) // input
             ), //td
             c.td( c.at(c.att(c.swh(6,60))) ),
             c.td(
              c.svg(c.at(c.wh(580-100-iofs-ioff-6,60)),   
               c.rect(c.xywh(0,0,580-100-iofs-ioff-6,60),c.att(c.fill(fs.theme(2)))), 
               //c.text(c.at(c.id('idt1'),c.xy(0,100),c.att(c.fill('#611024'),c.fill_opacity(0.8),c.sfont_size(55),c.font_family('myfont'))),'Invoice')
               c.text(c.at(c.id('idt1'),c.xy(10,45),c.onclick('loc.but3click(41)'),c.att(c.cursor('pointer'),c.fill(fs.theme(1)),c.fill_opacity(1),c.sfont_size(40),c.font_family('myfont'))),'Invoice'),
               c.text(c.at(c.id('idt2'),c.xy(110+10,45),c.onclick('loc.but3click(42)'),c.att(c.cursor('pointer'),c.fill(fs.theme(1)),c.fill_opacity(0.5),c.sfont_size(40),c.font_family('myfont'))),'Payment'),
               c.text(c.at(c.id('idt3'),c.xy(225+20,45),c.onclick('loc.but3click(43)'),c.att(c.cursor('pointer'),c.fill(fs.theme(1)),c.fill_opacity(0.5),c.sfont_size(40),c.font_family('myfont'))),'Cash'),
               c.text(c.at(c.id('idt4'),c.xy(295+30,45),c.onclick('loc.but3click(44)'),c.att(c.cursor('pointer'),c.fill(fs.theme(1)),c.fill_opacity(0.5),c.sfont_size(40),c.font_family('myfont'))),'Credit'),
             ) //svg
            ) //td  
          )) //table
          )//td
        
       );
          
      }      



      else if(sb=='memo') {
       sa+=c.tr( 
           c.td( c.at(c.att(c.swh(ioff,60))) ),
           c.td( c.at(c.colspan(3)),
          c.textarea(
               c.at( c.id('id'+sb),c.spellcheck(true), //onkeyup('keychat(event)')
               c.att(c.border('1px solid #b0b0b0'),
                  c.sfont_size(32),c.font_family('myfont'),c.st('outline-color:#404040; '),c.white_space('nowrap'),c.swh(580-iofs-ioff,200)
               )
              ),sublay(sb)
           )
       ));
      } else {
           if(lupdate=='')  { sc=c.disabled(false); } else { //log(sb);
             if(fs.itemnum('period',sb)>0) { sc=c.disabled(true);  } else { sc=c.disabled(false); }
         } 
       sa+=c.tr( c.at(c.colspan(3)),
           c.td( c.at(c.att(c.swh(ioff,60))) ),
           c.td( c.at(c.colspan(3)),
           c.input(c.at(
                  c.ntype('text'),c.hint('   '+sb),c.id('id'+sb),sc,c.styl('autocomplete','off'),c.spellcheck(false),c.value(sublay(sb)),   
                  c.att(c.background_color('#FFFFFF'),c.sfont_size(32),c.font_family('myfont'),c.swh(580-iofs-ioff,60),c.st('outline-color:#404040; '),c.border('1px solid #e0e0e0')) //,c.border('1px solid #FFFFFF')
              )) // input
          
       ));
      }  //else
    } //for
    return(sa)
}
function searchret(ss) { lupdate=ss; 
    var hd,s1='',s2='',ba=false,ia,itot,it,i,sa,sd,sb,se,sg,sdat,sfld,iw=gwidth,ih=ghmid;
    sfld=lfields; //,a1,a2,a3,a4,a5,a6,a7,a8,a9
    if(ss=='') { sa=fieldlay(0,sfld); } else {
     hd=fs.dopen(sip,lfile); 
     if(hd==0) { sa=fieldlay(0,sfld); } else {
      if(fs.dfindid(hd,ss,1)==true) {  s1=fs.dnno(hd,1).trim();  sa=fieldlay(hd,lfields);     }
      fs.dclose(hd);
     }
    }
    if(gstart=='android') sa+=c.tr( c.td(), c.td( c.at(c.att(c.sheight(500)))        ));
   c.html('cinfox',c.table( c.at(c.cellspacing(0),c.cellpadding(4),c.att(c.white_space('nowrap'))),sa ));
   c.val('idsearch',s1); //c.val('idmemo','ok');
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
           c.text(c.at(c.xy(15,60),c.onclick('loc.but3click(1)'),c.att(c.fill(fs.theme(1)),c.font_weight(fs.theme(3)),c.fill_opacity(0.8),c.sfont_size(55),c.cursor('pointer'),c.font_family('myfont'))),'Add Transaction'),
           c.image(c.xywh(7,7,15,15),c.xlink(fs.picsvg('xhelp')),c.att(c.cursor('pointer'))           ),
          //******************** incons *************************************************************************************
        //   c.image(c.xywh(kofs+kadd*0,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('loc.but3click(7)'),c.att(c.cursor('pointer'))           ),
        //   c.image(c.xywh(kofs+kadd*1,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('but3click(6)'),c.att(c.cursor('pointer'))           ),
        //   c.image(c.xywh(kofs+kadd*2,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('but3click(5)'),c.att(c.cursor('pointer'))           ),
        //   c.image(c.xywh(kofs+kadd*3,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('but3click(4)'),c.att(c.cursor('pointer'))           ),
        //  c.image(c.xywh(kofs+kadd*4,ktop,kw,kh),c.xlink(fs.picsvg('xadd')),c.onclick('but3click(3)'),c.att(c.cursor('pointer'))           ),
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
                  c.ntype('text'),c.hint('Transaction Number'),c.id('idsearch'),c.styl('autocomplete','off'),c.disabled(true),c.spellcheck(false),c.value(sf),c.onkeyup('loc.keysup(event)'),   
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
   c.tr(c.td(c.at(c.id('idxleft'))),c.td(s1),c.td(c.at(c.id('idxright'))))
 );
return(ss)
}
//********************************* main run **************************************
      sdat=initgen(sdat,sback);
      initlay(); 
      c.html(sarg,initsecond('')); c.drawwidth(gwidth,gheight,gmwidthreal);
      searchret(sdat); if(sdat=='') custput(); else {  c.nstyle('iddel','display','block'); }

};
//********************************************************************************************************
function initfirst(sarg,sdat,sback) { loc=new accmenu(sarg,sdat,sback);  }


