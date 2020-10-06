// declare var fs,c; 
// declare var gmicon,gmback,gmlock,gmfont,gmwidth,gmwidthreal,gloccopy;
// declare var gwidth,gheight,ghmid,gy,gx,gt;
// declare var gservpubkey,gpubkeymy,gkeymy,gnodename,gpubkeymyhash,gnodeselect,gnodemain,gnodemaster,gcustlist,gkeypmy,gpic,gpics,gscripts,gnodeloc,glocal,gappback;
var gbackshopper,loc,gicallup=false;
function log(ss) {  fs.log(ss);  }
//************************************** main routine *********************************************************************
function accmenu(sarg,sdat,sback) {

var gwidth,gheight,ghmid,gwr,ghr,glay={},gx,gy,gba=false,comm=[];
var lmode,bmess=false,llogin,llock,sip,lfile='cust',lindex='name';
function keyconv(ss) {     return(fs.keyconvert(sip,ss,gkeymy)); }    

function initgen(sdat,ss) { 
  if(ss!=undefined)  gbackshopper=ss;  
  sip=gnodeselect;  
  if(typeof(sdat)=='object') {  comm=sdat;  }
  lfile=keyconv('stockshop'); 
}

accmenu.prototype.but3click = function (n) { 
            if(n==1) {  fs.run('root','maathelp','accshopper,Shoppers');  }
       else if(n==2) {  fs.run('root',gbackshopper);  }
       else if(n==3) {  fs.run('root','accshopperadd',comm,'accshopper');}
       else if(n==4) { c.nstyle('idkey1','display','block'); c.nstyle('idkey2','display','none'); c.nstyle('idkey3','display','none');   lindex='name'; searchret('');   }
       else if(n==5) { c.nstyle('idkey2','display','block'); c.nstyle('idkey1','display','none'); c.nstyle('idkey3','display','none');   lindex='number'; searchret('');   }
       else if(n==6) { c.nstyle('idkey3','display','block'); c.nstyle('idkey2','display','none'); c.nstyle('idkey1','display','none');   lindex='contact'; searchret('');   }
       else if(n==20) { searchret(c.val('idsearch')); }
}
accmenu.prototype.keysup = function (e) { 
     if(gicallup==false) {  gicallup=true;    setTimeout(function() {  searchret(c.val('idsearch')); },500);   } 
}

accmenu.prototype.butedit = function (ss) { //log(ss+'...Name');
  var hd,sb,s1;
    //   hd=fs.dopen(sip,lfile); if(hd==0) return;
    //   if(fs.dfind(hd,'name',ss,'','',1)==true) { log(ss+'*****');//sb='';
    //   fs.dfirst(hd);
    //   for(;;) {
    //       if(fs.deof(hd)==true) break;
    //       ss=fs.dn(hd,'acc'); break;
    //       fs.dnext(hd);
    //   }    
    //   fs.dclose(hd);
    //   }
     if(comm.length>0) {
        hd=fs.dopen(sip,lfile); 
        if(fs.dfindid(hd,ss,1)==true) { comm.push('cust'); s1=fs.dn(hd,'acc').trim(); comm.push(s1); s1=fs.dn(hd,'name').trim(); comm.push(s1);    }
       fs.dclose(hd);
       fs.run('root',gbackshopper,comm,'acccust');
     } else {     fs.run('root','accshopperadd',ss,'accshopper'); }
}    
//**************************************** display *****************************************************
function searchret(ss) { 
     var sa='',sc,sb='',hdc,kk=0,sline,sno;
     hdc=fs.dopen(sip,lfile);  if(hdc==0) return;
     if(fs.dfind(hdc,lindex,ss,'','',100)==true) { //sb='';
       fs.dfirst(hdc);
       for(;;) {
         if(fs.deof(hdc)==true) break;
         if(fs.dn(hdc,'del')=='X') { fs.dnext(hdc); continue; }
//          sb=kk+'.'+fs.dn(hdc,'name')+':'+fs.dn(hdc,'memo'); kk++; 
          sb=fs.dn(hdc,'shop').trim(); sline=fs.dn(hdc,'cat').trim()+'   '+fs.dn(hdc,'desc').trim(); sno=fs.dn(hdc,'shop').trim();
          //************************************************************************
             sa=sa+c.tr(
               c.td(
               c.table( c.at(c.cellspacing(0),c.cellpadding(0)),
                   c.tr( c.td( c.at(c.att(c.height(20*gy))) )),
                      c.tr( c.td(  c.link( c.at(c.href('#'),  c.onclick('loc.butedit("'+sno+'")')),
                        c.table( c.at(c.cellspacing(0),c.cellpadding(0)),
                            c.tr( c.td(c.at(c.att(c.padding_left(20*gy),c.font_family('myfont'),c.spfont_size(45*gt))), fs.left(sb,32)) ),
                            c.tr( c.td(c.at(c.att(c.padding_left(20*gy),c.font_family('myfont'),c.spfont_size(12*gt))), sline) )

                      ) //table
                ) //link
              ) ) //tr
           ) //table
           ))
         //*******************************************************************************
          fs.dnext(hdc);
       }
     }
     fs.dclose(hdc);
     c.html('cinfox',c.table( c.at(c.att(c.white_space('nowrap'))),sa ));
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
           c.text(c.at(c.xy(15,60),c.onclick('loc.but3click(1)'),c.att(c.fill(fs.theme(1)),c.font_weight(fs.theme(3)),c.fill_opacity(0.8),c.sfont_size(55),c.cursor('pointer'),c.font_family('myfont'))),'Shoppers'),
           c.image(c.xywh(7,7,15,15),c.xlink(fs.picsvg('xhelp')),c.att(c.cursor('pointer'))           ),
          //******************** incons *************************************************************************************
        //   c.image(c.xywh(kofs+kadd*0,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('but3click(7)'),c.att(c.cursor('pointer'))           ),
        //   c.rect(c.id('idkey3'), c.xywh(kofs+kadd*1,ktop-5,kw,kh+10),c.att(c.fill('red'),c.display('none'))), //back selectiom
        //   c.image(c.xywh(kofs+kadd*1,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('loc.but3click(6)'),c.att(c.cursor('pointer'))           ),
           
        //   c.rect(c.id('idkey2'), c.xywh(kofs+kadd*2,ktop-5,kw,kh+10),c.att(c.fill('red'),c.display('none'))), //back selectiom
        //   c.image(c.xywh(kofs+kadd*2,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('loc.but3click(5)'),c.att(c.cursor('pointer'))           ),
           
        //   c.rect(c.id('idkey1'), c.xywh(kofs+kadd*3,ktop-5,kw,kh+10),c.att(c.fill('red'),c.display('block'))), //back selectiom
        //   c.image(c.xywh(kofs+kadd*3,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('loc.but3click(4)'),c.att(c.cursor('pointer'))           ),
          
           c.image(c.xywh(kofs+kadd*4,ktop,kw,kh),c.xlink(fs.picsvgi('xadd')),c.onclick('loc.but3click(3)'),c.att(c.cursor('pointer'))           ),
          
          sx, //c.image(c.xywh(kofs+kadd*5,ktop,kw+35,kh),c.xlink(fs.picget('icon31')),c.att(c.cursor('pointer'))           ),
          //************************** back ********************************************************************************
//          c.polygon(c.points(20,140,40,160,40,120),c.att(c.fill('#FFFFFF')) ),
          c.image(c.xywh(0,100+4,80,80-8),c.xlink(fs.picsvgi('xxback')),c.att(c.cursor('pointer'))           ),
          

          c.rect(c.xywh(0,100,90,80),c.onclick('loc.but3click(2)'),c.att(c.cursor('pointer'),c.fill('transparent'))),
          //************************** pre-input ********************************************************************************
          c.foreignobject(c.at(c.xywh(70,100,30,80)),c.input(c.at( c.ntype('text'),c.disabled(true),c.att(c.swh(31,80),c.background_color('#FFFFFF'),c.border('1px solid #FFFFFF'))   ))        ),
  //        c.image(c.xywh(70+10,100+10,31-20,80-20),c.xlink(fs.picsvg('xuser'))           ), //image inside
          c.image(c.xywh(70+5,100+5,31-10,80-10),c.xlink(fs.picsvg('xxsearch'))           ), //image inside

          //************************** input ********************************************************************************
          c.foreignobject(c.at(c.xywh(100,100,400,80)), 
          c.input(c.at(
                  c.ntype('text'),c.hint('Shopper Search'),c.id('idsearch'),c.styl('autocomplete','off'),c.spellcheck(false),c.value(sf),c.onkeyup('loc.keysup(event)'),   
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
      initgen(sdat,sback);
      initlay(); 
      c.html(sarg,initsecond('')); c.drawwidth(gwidth,gheight,gmwidthreal);
      searchret('');

};
//********************************************************************************************************
function initfirst(sarg,sdat,sback,sextra) { loc=new accmenu(sarg,sdat,sback);  }


