// declare var fs,c; 
// declare var gmicon,gmback,gmlock,gmfont,gmwidth,gmwidthreal,gloccopy;
// declare var gwidth,gheight,ghmid,gy,gx,gt;
// declare var gservpubkey,gpubkeymy,gkeymy,gpubkeymyhash,gnodeselect,gnodemain,gnodemaster,gcustlist,gkeypmy,gpic,gpics,gscripts,gnodeloc,glocal,gappback;
var gbacktranslist,loc,gicallup=false; // cust stock (names)
function log(ss) {  fs.log(ss);  }
//************************************** main routine *********************************************************************
function accmenu(sarg,sdat,sback) {

var gwidth,gheight,ghmid,gwr,ghr,glay={},gx,gy,gba=false;
var lmode,bmess=false,llogin,llock,sip,lfile='trans',lindex='ref';
function keyconv(ss) {     return(fs.keyconvert(sip,ss,gkeymy)); }    

function initgen(ss) { if(ss!=undefined)  gbacktranslist=ss;  sip=gnodeselect;  
    lfile=keyconv('trans'); 
    
}
function butsend() {
    var sa,sb;
    c.nstyle('idkey0','display','block');
    sa=c.html('cinfox');
    fs.chatputdocsingle(sip,gkeymy,'Transaction List: '+fs.datecurrent(),'file.htmd',sa,function(sn) {  c.nstyle('idkey0','display','none');   });
}
accmenu.prototype.but3click = function (n) { 
            if(n==1) {  fs.run('root','maathelp','acctrans,Transactions');  }
       else if(n==2) {  fs.run('root',gbacktranslist);  }
       else if(n==3) {  fs.run('root','acctransadd','','acctrans');}
       else if(n==4) { c.nstyle('idkey1','display','block'); c.nstyle('idkey2','display','none'); c.nstyle('idkey3','display','none');   lindex='ref'; searchret('');   }
       else if(n==5) { c.nstyle('idkey2','display','block'); c.nstyle('idkey1','display','none'); c.nstyle('idkey3','display','none');   lindex='acc'; searchret('');   }
       else if(n==6) { c.nstyle('idkey3','display','block'); c.nstyle('idkey2','display','none'); c.nstyle('idkey1','display','none');   lindex='period'; searchret('');   }
       else if(n==7) { butsend(); }
       else if(n==20) { searchret(c.val('idsearch')); }
}
// accmenu.prototype.keysup = function (e) { 
//      if(gicallup==false) {  gicallup=true;    setTimeout(function() {  searchret(c.val('idsearch')); },500);   } 
// }

accmenu.prototype.butedit = function (ss) { //log(ss+'...Name');
  var hd,sb;
     fs.run('root','acctransadd',ss,'acctrans');
}    
//**************************************** display *****************************************************
function custget(hd,skey) {
    if(fs.dfindid(hd,skey,1)==true) {  return(fs.dn(hd,'name').trim());   }
    return('');
}

function searchret(ss) { 
     var sa='',sc,sb='',hdc,kk=0,sline,sno,hdi,sno,ino,imany=100,amt=0.0,styp,am,sfrom,sto,sfil;
     hdi=fs.dopen(sip,'cust');
     hdc=fs.dopen(sip,lfile); if(hdc==0) return;
     ss=c.val('idsearch');
     sfrom=fs.xitemget(ss,1,'-');
     sto=fs.xitemget(ss,2,'-');
     sfil=fs.xitemget(ss,3,'-');
     if(sto=='') sto=sfrom;
     if(fs.dfind(hdc,lindex,sfrom,sto,'',0)==true) { //sb='';
       fs.dfirst(hdc);
       for(;;) {
         if(fs.deof(hdc)==true) break;
           if(fs.dn(hdc,'del')=='X') { fs.dnext(hdc); continue; }
           styp=fs.dn(hdc,'type'); 
           if(sfil=='') { } else {
               if(fs.itemnum(sfil,styp)>0) { } else { fs.dnext(hdc); continue; }
           }
           am=fs.xds(fs.dn(hdc,'amount'));
           if(fs.itemnum('inv,csh',styp)>0) { amt+=am; } else { amt-=am; }
          //************************************************************************
             sa=sa+c.tr(
              c.td( fs.dn(hdc,'ref') ),     
              c.td( fs.dn(hdc,'acc') ),     
              c.td( fs.dn(hdc,'type') ),     
              c.td( fs.dn(hdc,'period') ),     
              c.td( c.at(c.att(c.text_align('right'))),fs.dn(hdc,'amount') ),     
              c.td( fs.dn(hdc,'desc') ),     
              c.td( fs.dn(hdc,'dateref') ),     
                 

           )
         //*******************************************************************************
          fs.dnext(hdc);
       }
     }
     fs.dclose(hdc); fs.dclose(hdi);
     sa=c.tr( c.at(c.att(c.font_weight('bold'))), //heading
         c.td('Ref'),
         c.td('Account'),
         c.td('Type'),
         c.td('Period'),
         c.td('Amount'),
         c.td('Description'),
         c.td('Date'),
         )+sa;
      sa=c.tr( c.td( c.at(c.colspan(5),c.att(c.font_size(35))),'Transaction List' ),c.td(c.at(c.colspan(2),c.att(c.font_size(12))),fs.datecurrent()  ))+sa;         
      sa+=c.tr(
           c.td( c.at(c.colspan(4)) ),
           c.td( c.at(c.att(c.font_weight('bold'),c.text_align('right'))),            fs.xfs(amt))
          );
      
     c.html('cinfox',c.table( c.at(c.att(c.font_size(16),c.white_space('nowrap'))),sa ));
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
  var ss,s1,ksep=210,kofs=200,ktop=20,kw=50,kh=50,kadd=60; 
   //******************************* svg *****************************************************************************************************
   ss=c.svg(  c.at(c.id('idmain'),c.nwidth(gwidth),c.cheight(ksep)), //,c.viewbox(0,0,gwr,210),c.viewbox(0,0,gwr,210),c.viewbox('0 0 100 100') c.att(c.background_image(sgrp))
     //******************************************** load font *************************************************************
     c.defs(c.stylesheet(c.font_face(
        c.st(" font-family: 'myfont';  src: url(data:font/ttf;base64,"+gmfont+") format('truetype');  font-weight: normal; font-style: normal;")    
     ))),
     
           //******************** background **********************************************************
           c.rect(c.xywh(0,0,gwr,ksep),c.att(c.fill(fs.theme(2)))), 
           //*******************  heading *****************************************************************
           c.text(c.at(c.xy(15,60),c.onclick('loc.but3click(1)'),c.att(c.fill(fs.theme(1)),c.font_weight(fs.theme(3)),c.fill_opacity(0.8),c.sfont_size(55),c.cursor('pointer'),c.font_family('myfont'))),'Transactions List'),
           c.image(c.xywh(7,7,15,15),c.xlink(fs.picsvg('xhelp')),c.att(c.cursor('pointer'))           ),
          //******************** incons *************************************************************************************
        //   c.image(c.xywh(kofs+kadd*0,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('but3click(7)'),c.att(c.cursor('pointer'))           ),
//           c.rect(c.id('idkey3'), c.xywh(kofs+kadd*1,ktop-5,kw,kh+10),c.att(c.fill('red'),c.display('none'))), //back selectiom
//           c.image(c.xywh(kofs+kadd*1,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('loc.but3click(6)'),c.att(c.cursor('pointer'))           ),
           
           c.rect(c.id('idkey3'), c.xywh(kofs+kadd*2,ktop-5,kw,kh+10),c.att(c.fill(fs.theme(6)),c.display('none'))), //back selectiom
           c.image(c.xywh(kofs+kadd*2,ktop,kw,kh),c.xlink(fs.picsvgi('xsetting')),c.onclick('loc.but3click(6)'),c.att(c.cursor('pointer'))           ),
           
           c.rect(c.id('idkey2'), c.xywh(kofs+kadd*3,ktop-5,kw,kh+10),c.att(c.fill(fs.theme(6)),c.display('none'))), //back selectiom
           c.image(c.xywh(kofs+kadd*3,ktop,kw,kh),c.xlink(fs.picsvgi('xsetting')),c.onclick('loc.but3click(5)'),c.att(c.cursor('pointer'))           ),
          
           c.rect(c.id('idkey1'), c.xywh(kofs+kadd*4,ktop-5,kw,kh+10),c.att(c.fill(fs.theme(6)),c.display('block'))), //back selectiom
          c.image(c.xywh(kofs+kadd*4,ktop,kw,kh),c.xlink(fs.picsvgi('xsetting')),c.onclick('loc.but3click(4)'),c.att(c.cursor('pointer'))           ),

           c.rect(c.id('idkey0'), c.xywh(kofs+kadd*5,ktop-5,kw,kh+10),c.att(c.fill(fs.theme(6)),c.display('none'))), //back selectiom
          c.image(c.xywh(kofs+kadd*5,ktop,kw,kh),c.xlink(fs.picsvgi('xsendwhite')),c.onclick('loc.but3click(7)'),c.att(c.cursor('pointer'))           ),
          
          
       //   c.image(c.xywh(kofs+kadd*5,ktop,kw+35,kh),c.xlink(fs.picget('icon31')),c.onclick('loc.but3click(1)'),c.att(c.cursor('pointer'))           ),
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
                  c.ntype('text'),c.hint('From-To-Filter'),c.id('idsearch'),c.styl('autocomplete','off'),c.spellcheck(false),c.value(sf),   
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
              c.overflow('auto'),c.background_color('#FFFFFF')
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
      searchret('');

};
//********************************************************************************************************
function initfirst(sarg,sdat,sback) { loc=new accmenu(sarg,sdat,sback);  }


