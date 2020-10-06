// declare var fs,c,jscall; 
// declare var gmicon,gmback,gmlock,gmfont,gmwidth,gmwidthreal,gloccopy;
// declare var gwidth,gheight,ghmid,gy,gx,gt;
// declare var gservpubkey,gpubkeymy,gkeymy,gstart,gnodename,gpubkeymyhash,gnodeselect,gnodemain,gnodemaster,gcustlist,gkeypmy,gpic,gpics,gscripts,gnodeloc,glocal,gappback;
var gbackcust,loc,gicallup=false;
function log(ss) {  fs.log(ss);  }
//************************************** main routine *********************************************************************
function accmenu(sarg,sdat,sback,sbuf) {

var gwidth,gheight,ghmid,gwr,ghr,glay={},gx,gy,gba=false,comm=[];
var lmode,bmess=false,llogin,llock,sip,lfile='cust',lindex='name';
var lback,lcomm,lbuf,lpic='',bufpic,gsfn,gsinfo;;
var gsdcard,sdir,ghdir,gdel,gldir,gicmax,glfiles,gpng=false,gic=0,lw=90,lh=150;
function keyconv(ss) {     return(fs.keyconvert(sip,ss,gkeymy)); }    

function initgen(sdat,ss) { 
  if(ss!=undefined)  gbackcust=ss;  
  sip=gnodeselect;  
  lback=sback; lcomm=sdat; lbuf=sbuf; lpic='';
  if(typeof(sdat)=='object') {  comm=sdat;  }
  lfile=keyconv('cust'); 
  if(gstart=='android') {  gsdcard=jscall(193,'x');     }

 gldir='/sdcard/Download';
 gdel=fs.chrb(254);
 sdir=jscall(170,'x');  
 ghdir=fs.itemget(sdir,1)+'small/'; gicmax=5;
}

accmenu.prototype.but3click = function (n) { var sa;

              if(n==1) { butback(); }
       else if(n==2) { gldir='/sdcard/Download'; butoff(); butdirset(); } //pictures
       else if(n==3) { gldir='/sdcard/DCIM/Camera'; butoff();butdirset(); } //photos
       else if(n==4) { gldir='/sdcard/DCIM/Screenshots'; butoff();butdirset(); } //screens
       else if(n==5) { butoff(); buthelp(); } //help
       else if(n==6) { if(butoff()==true) { butpngaccept(); } else { butsearch(c.val('idsearch')); } }
       else if(n==7) { butoff(); butsearch('.'); }
       else if(n==8) { gldir=gsdcard+'/DCIM/Camera'; butoff();butdirset(); } //screens
}
function buthelp() {      fs.run('root','maathelp','accpiclistx,Files');   }

function butoff() {
    if(gpng==true) { gpng=false; 
      c.nstyle('cinfoxx','display','none');    
      c.nstyle('cinfox','display','block');    
      c.attr('idsearch','placeholder','Search File Name');
      return(true);  
    }
    return(false);
}
function butback() {        
      if(butoff()==true)  return;
      fs.run('root',lback,lcomm,'',lbuf);    
}  
function butpngaccept() {
        lpic=gsfn+':'+gsinfo;
        fs.run('root',lback,lcomm,'',lbuf,lpic);    
}

function butdirset() {
 var ss,sa,sb,sc,sdat='',sd='',sext,s1,i;
   sa='pub';
  if(gstart=='android')  { 
          ss=fs.rpostget(gnodeloc,'write|blockdirsubext|'+gldir+',date');       //,date=withdate ,=withoutdate
          for(i=1;i<=fs.itemcount(ss);i++)  { 
             sb=fs.itemget(ss,i); if(sb=='')  continue;
             s1=fs.xitemget(sb,1,'|'); sext=fs.xitemgetback(s1,1,'.');
             if(fs.itemnum('jpg,jpeg,png,gif,svg,html,htmd',sext)>0)  { } else { continue; }
             sd=sd+fs.xitemget(sb,2,'|')+'|'+fs.xitemget(sb,1,'|')+',';
         } 
          ss=fs.xleft(sd);            
          ss=ss.split(',').sort(function(a, b) { return(a.toLowerCase().localeCompare(b.toLowerCase()));}).reverse().join(',');      
          sc=fs.strrep(ss,',',gdel);
         for(i=1;i<=fs.xitemcount(sc,gdel);i++)  {
             sb=fs.xitemget(sc,i,gdel); if(sb=='') continue;
             sb=',,'+fs.xitemget(sb,2,'|');
             sdat=sdat+sb+gdel;
         }
         glfiles=sdat;
         butsearch('')
  } 
}
function butsearch(ss) { search(ss); }
function search(ss) { ss=fs.lcase(ss); 
    var sa,sb,sd,sc,hd,ia,i,j,n,tmp;
     if(ss=='.')  { ss=''; gicmax=20;  } else { gicmax=0; }
     if(ss=='')   { searchret(glfiles); return; }
     for(i=1;i<=fs.xitemcount(glfiles,gdel);i++)  {
         sb=fs.xitemget(glfiles,i,gdel); if(sb=='') continue;
         sc=fs.itemlast(sb,2);
         if(fs.instr(1,sc,ss)>0)  { sa=sa+sb+gdel;  }
     }
   searchret(sa)
}    
function searchret(ss) {  bufpic=[]; 
    var hd,ia=0,itot,it,sa='',sd,se,sg,sdat,sm,s1,s2; gic=0;

function subret() {   ia++; 
     if(ia>=fs.xitemcount(ss,gdel))  { 
        c.html('cinfox',c.table( c.at(c.att(c.white_space('nowrap'))),sa ));
        gicallup=false; c.val('idsearch','');
        setTimeout(function() { butlookpic(); },1); 
        return;
     }
       sg=fs.xitemget(ss,ia,gdel); if(sg=='')  { subret(); return; }
       se=fs.itemlast(sg,2); 
   butlookpng(se,function(se) { 
       sm=c.tr( //c.border_radius((5*gy)+'px'),c.border((1*gy)+'px solid #b0b0b0'),
         c.td( c.at(c.onclick('loc.butedit("'+sg+'")'), c.att(c.cursor('pointer'),c.padding_left(10),c.padding_right(10),c.spfont_size(25*gt),c.background_color('#FFFFFF'))),se  )
       );
      sa+=c.tr(
          c.td (
              c.table( c.at(c.cellspacing(0),c.cellpadding(0),c.att(c.white_space('nowrap'))),
                 c.tr( c.td ( c.at(c.att(c.height(10*gy)))  )),
                 sm
              )
          )
      );
     subret()      
   }); 
}
c.val('idsearch','..wait.'+fs.xitemcount(ss,gdel))
setTimeout(function() { subret(); },0);
}
function butlookpng(ss,sfn) { 
    var sb,sa,sdat,s1,s2; sa=ss;
    sb=fs.xitemgetback(ss,1,'.');
     if(fs.itemnum('jpg,jpeg,png,gif',sb)>0)  { 
              sa=c.table (c.at(c.cellspacing(0),c.cellpadding(0)), c.tr ( c.td ( c.at(c.id('id'+ss) )  ), c.td ( c.at(c.att(c.spfont_size(25*gt))),sa )));
              bufpic.push(ss);  sfn(sa);      return; 
     }
    sfn(sa);
}
function afexist(ss) { return(fs.xis(jscall(135,ss))); }
function afilewrite (ss,sdat) { return(jscall(111,ss+fs.chrb(252)+sdat));   }
function afilereadloc(ss) { var sdat=fs.xs64(fs.rpostget(gnodeloc,'write|blockfilereadascdir|'+ss)); return(sdat); }
function butlookpic() { 
    var i,icnt=0,sa,s1,s2,sdat;
    
function subpic() {
    if(icnt>=bufpic.length) { return; } icnt++; sa=bufpic[icnt-1];  
         if(afexist(ghdir+sa)=='1')  { 
              s2=afilereadloc(ghdir+sa); s1='data:image/jpg;base64,'+fs.x64s(s2);  
               c.html('id'+sa,c.img (   c.at(c.src(s1),c.wh(lw,lh))  ));
               setTimeout(function() { subpic(); },0); 
         } else {
              gic++; if(gic>gicmax)  {    return; }
              sdat=afilereadloc(gldir+'/'+sa); c.val('idsearch','..wait'+fs.strdup('.',gic));
              butimagechangea(sdat,function(s1) { 
                 afilewrite(ghdir+sa,fs.xs64(fs.itemlast(s1,1)));
                 c.html('id'+sa,c.img ( c.at(  c.src(s1), c.wh(lw,lh))  ));
                  setTimeout(function() { subpic(); },0); 
               });
            // subpic() return()
         } //else
}    
subpic(); return;
}
function butimagechangea(ss,sfn) { 
var i1,i2,itot,i3,iiw,iih,s1,s2; iiw=lw; iih=lh; 
 //if(sext=='svg')  { s2='data:image/svg+xml;base64,'+fs.x64s(ss); } else { s2='data:image/jpg;base64,'+fs.x64s(ss);  }
 s2='data:image/jpg;base64,'+fs.x64s(ss);
 butimageconvert(s2,iiw,iih,function(s1) {    sfn(s1);  });
}
function butimageconvert(sdat,iw,ih,sfn) { 
       var image = new Image();
       image.onload = function () {
          var canv = c.ncreate('canvas'); //document.createElement('canvas');
          canv.width = iw; 
          canv.height = ih;
          var ctx=canv.getContext('2d');
          ctx.drawImage(image,0,0,canv.width,canv.height); 
          var img2 =  canv.toDataURL('image/jpeg',0.667); //image/png ,0.667
          //img2=fs.xs64(fs.itemlast(img2,1));
          sfn(img2,iw,ih); return;
      };
      image.src = sdat;
}
//*************************************************************************************************************************
//*************************************************************************************************************************
//*************************************************************************************************************************
//*************************************************************************************************************************
accmenu.prototype.keysup = function (e) { 
    if(e.keyCode==13)  {  
     if(gicallup==false) {  gicallup=true;    setTimeout(function() {  search(c.val('idsearch')); },500);   } 
    } 
}

accmenu.prototype.butedit = function (ss) { 
  var i,j,k,sb,sa,sb,sdat; 

    ss=fs.itemlast(ss,2); 
    sa='txt,htm,html,htmd,js,ts,jpg,svg,jpeg,png,gif,pdf,mp3,ogg,wav,mp4,webm,enc'; 
    sb=fs.lcase(fs.xitemgetback(ss,1,'.')); 
    if(fs.itemnum(sa,sb)>0)  { 
        sdat=afilereadloc(gldir+'/'+ss); 
        buteditcall(ss,sdat); return; 
    }
    //runlabel('root',gappback,gtosend+',dev,'+gldir+'/'+ss)
}

function buteditcall(sfn,sdat) { 
 var sext,sa,sb,sc,ln,su;
  sb=fs.lcase(fs.xitemgetback(sfn,1,'.')); 
 //if(sb=='enc') then {    sfn(tfirst(sfn,1,'.')) sb(itemgetback(sfn,1,'.')) sdat(dbdataget72(x64s(sdat),gkeymy,1)) } //for encrypted
 sa='txt,htm,html,htmd,js,ts,jpg,svg,jpeg,png,gif,pdf,mp3,ogg,wav,mp4,webm'; sc='accstockadd';
 if(fs.itemnum(sa,sb)>0)  {
       //if(itemnum('txt,htm',sb)>0) then { runlabel('root','maatmainwalltxt',gtosend,sfn,sdat,sc,gldir) }
      //if(itemnum('js,ts',sb)>0) then { runlabel('root','maatmainwalljs',gtosend,sfn,sdat,sc,gldir) }
       if(fs.itemnum('htmd,html',sb)>0)  { 
          lpic=sfn+':'+sdat;
          fs.run('root',lback,lcomm,'',lbuf,lpic);    
          return;
        }
      if(fs.itemnum('jpg,jpeg,png,gif,svg',sb)>0)  {        butpng(sfn,sdat); return;      }
      //if(itemnum('pdf',sb)>0) then { runlabel('root','maatmainwallpdf',gtosend,sfn,sdat,sc,gldir) }
      //if(itemnum('mp3,ogg,wav,mp4,webm',sb)>0) then { runlabel('root','maatmainwallmp3',gtosend,sfn,sdat,sc,gldir) }              
} 
else {
//  runlabel('root',gappback,gtosend+',all,'+sfn+','+sdat)           
 }
}
//***********************************************************************************************
function butpng(sf,sdat) { gpng=true;
  setTimeout(function() {
    c.nstyle('cinfox','display','none');    
    c.nstyle('cinfoxx','display','block');    
    c.attr('idsearch','placeholder','Accept Photo');
    searchlist(gwidth,ghmid,sf,sdat);    
  },0) ;     
}
 function searchlist(iw,ih,sfn,ss) { 
   var hd,ia,itot,it,i,i1,i2,itot,i3,iiw,iih,sa='',sd,sb,se,sg,sdat,s1;
   sb=fs.lcase(fs.xitemgetback(sfn,1,'.')); 
   gsfn=sfn; gsinfo=ss;
     if(sb=='svg') { ss='data:image/svg+xml;base64,'+fs.x64s(ss); } else { ss='data:image/png;base64,'+fs.x64s(ss); }
      sa+=c.tr (  c.td ( c.at(c.valign('top'),c.align('center'),c.att(c.border_left('1px solid #F0F0F0'))), 
                       c.img( c.at(c.id('idimg'), c.valign('top'),c.align('center'), c.src(ss), c.att(c.height(ih))  ))
               ));
     c.html('cinfoxx',c.table ( c.at(c.cellspacing(0), c.cellpadding(0),c.att(c.margin_left(0-1),c.white_space('nowrap'))),sa ))
 }




//****************************************************************************************************
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
function initsecond(sff) { 
 var sa,sa1,sa2,sa3,sa4,sa5,sa6,sa7,sa8,s1,s2,ss,s3,s4,s5,s6,s7,s8,s9,sb1,k,k2,k3,k1,sfont,ksep=210; 
     glay['y1']=[25,56+12,200,21+70];    //friends text
   k=10; k2=5; k3=10; glay['y2']=[200+k+k2,21+k2,260+k-k3,21+60-k3];    //1 new contacts
   k1=20;      glay['y3']=[260+k+k1+k2,21+k2,320+k+k1-k3,21+60-k3];    //2 new groups
   k1+=20;      glay['y4']=[320+k+k1+k2-5,21+k2,380+k+k1+k2-k3-5,21+60-k3];    //3 delete contacts
   k1+=30;      glay['y5']=[380+k+k1+k2-20+6,21+k2+5,500+k+k1-k3-20-30+40,21+60-k3-6];    //4 icon
                glay['y6']=[0,100,90,100+80];    //5back button
                glay['y7']=[90+10,100,500+10+35,100+80];    //search contact list
                glay['y8']=[70,100,90+11,100+80];    //search contact list
  sa1=glay['y1'];
  sa2=glay['y2'];
  sa3=glay['y3'];
  sa4=glay['y4'];
  sa5=glay['y5'];
  sa6=glay['y6'];
  sa7=glay['y7'];
  sa8=glay['y8'];


 if(gsdcard=='') { sb1=''; } //c.image(c.xywh(sa5[0],sa5[1],sa5[2]-sa5[0],sa5[3]-sa5[1]),c.xlink(fs.picget('icon31')),c.onclick('but3click(5)'),c.att(c.cursor('pointer'))           ); }
            else { sb1=c.image(c.xywh(sa4[0]+80,sa4[1],45,45),c.xlink(fs.picsvgi('xpicdir')),c.onclick('but3click(8)'),c.att(c.cursor('pointer'))           ); }


   ss=c.svg(  c.at(c.id('idmain'),c.nwidth(gwidth),c.cheight(ksep)), //,c.viewbox(0,0,gwr,210),c.viewbox(0,0,gwr,210),c.viewbox('0 0 100 100') c.att(c.background_image(sgrp))
     
     c.defs(c.stylesheet(c.font_face(
      c.st(" font-family: 'myfont';  src: url(data:font/ttf;base64,"+gmfont+") format('truetype');  font-weight: normal; font-style: normal;")    
     ))),
     
           c.rect(c.xywh(0,0,gwr,ksep),c.att(c.fill(fs.theme(2)))),
           c.text(c.at(c.xy(sa1[0],sa1[1]),c.onclick('loc.but3click(5)'),c.att(c.fill(fs.theme(1)),c.font_weight(fs.theme(3)),c.fill_opacity(0.8),c.sfont_size(55),c.cursor('pointer'),c.font_family('myfont'))),'Files'),
           c.image(c.xywh(sa1[0]-20,sa1[1]-55,15,15),c.xlink(fs.picsvg('xhelp')),c.att(c.cursor('pointer'))           ),

           c.image(c.xywh(sa2[0]-80,sa2[1]+10,30,30),c.xlink(fs.picsvgi('xcalc')),c.onclick('loc.but3click(7)'),c.att(c.cursor('pointer'))           ),
           c.image(c.xywh(sa2[0],sa2[1],sa2[2]-sa2[0],sa2[3]-sa2[1]),c.xlink(fs.picsvgi('xclouddir')),c.onclick('loc.but3click(2)'),c.att(c.cursor('pointer'))           ),
           c.image(c.xywh(sa3[0],sa3[1],sa3[2]-sa3[0],sa3[3]-sa3[1]),c.xlink(fs.picsvgi('xpicdir')),c.onclick('loc.but3click(3)'),c.att(c.cursor('pointer'))           ),
           c.image(c.xyxy(sa4[0],sa4[1],sa4[2],sa4[3]),c.xlink(fs.picsvgi('xscreendir')),c.onclick('loc.but3click(4)'),c.att(c.cursor('pointer'))           ),
           sb1,
           //c.image(c.xywh(sa5[0],sa5[1],sa5[2]-sa5[0],sa5[3]-sa5[1]),c.xlink(fs.picget('icon31')),c.onclick('but3click(5)'),c.att(c.cursor('pointer'))           ),
          c.foreignobject(c.at(c.xyxy(sa7[0],sa7[1],sa7[2],sa7[3])), 
          c.input(c.at(
                  c.ntype('text'),c.hint('Search File Name'),c.id('idsearch'),c.styl('autocomplete','off'),c.spellcheck(false),c.onkeyup('loc.keysup(event)'),
                  c.att(c.sfont_size(40),c.font_family('myfont'),c.swh(sa7[2]-sa7[0]-52,sa7[3]-sa7[1]),c.border('1px solid #FFFFFF')) //,c.border('1px solid #FFFFFF')
              )) // input
          ),
//          c.polygon(c.points(20,140,40,160,40,120),c.att(c.fill('#FFFFFF')) ), //back
          c.image(c.xywh(0,100+4,80,80-8),c.xlink(fs.picsvgi('xxback')),c.att(c.cursor('pointer'))           ),
          
          c.rect(c.xywh(sa6[0],sa6[1],sa6[2]-sa6[0]+8,sa6[3]-sa6[1]),c.onclick('loc.but3click(1)'),c.att(c.fill('transparent'))),//back

          //search
          c.foreignobject(c.at(c.xywh(70,100,31,80)),c.input(c.at( c.ntype('text'),c.att(c.swh(31,80),c.border('1px solid #FFFFFF'))   ))        ),
          c.image(c.xywh(sa8[0]+5,sa8[1]+5,sa8[2]-sa8[0]-10,sa8[3]-sa8[1]-10),c.xlink(fs.picsvg('xxsearch'))           ), //search button
          c.rect(c.xywh(70,100,31,80),c.att(c.fill('transparent'))),
          
          c.foreignobject(c.at(c.xywh(500-8,100,70,80)),c.input(c.at( c.ntype('text'),c.att(c.swh(70,80),c.border('1px solid #FFFFFF'))   ))        ),
//          c.image(c.xywh(500-8+20,100+20,40,40),c.xlink(fs.picsvg('xsend'))), //backn
          c.image(c.xywh(500-8+5,100+15,55,55),c.xlink(fs.picsvgi('xaccept',fs.themeset()))), //accept
          
          c.rect( c.xywh(500-8,100,80,80),c.onclick('loc.but3click(6)'),c.att(c.fill('transparent'))), //send selectiom


          
   );//svg
   ghmid=(ghr-ksep)*gy;
   s1=c.div(c.at( 
              c.id('cinfox'),
              c.att(c.swh(gwr,ghr-ksep),//c.border('1px solid #FFFFFF'),
              c.overflow('auto'),c.background_color('#FFFFFF')
              )
          )); // input
   s2=c.div(c.at( 
              c.id('cinfoxx'),
              c.att(c.swh(gwr,ghr-ksep),c.display('none'),//c.border('1px solid #FFFFFF'),
              c.overflow('auto'),c.background_color('#FFFFFF')
              )
          )); // input

 ss=c.table(c.at(c.cellspacing(0),c.cellpadding(0)),
 
  c.tr(c.td(c.at(c.id('idxleft'))),c.td(ss),c.td(c.at(c.id('idxright')))),
   c.tr(c.td(c.at(c.id('idxleft'))),c.td(s1),c.td(c.at(c.id('idxright')))),
 c.tr(c.td(c.at(c.id('idxleft'))),c.td(s2),c.td(c.at(c.id('idxright')))),

  c.tr(c.td( c.at(c.id('idgetx'),c.att(c.display('none'))) ))
 
 
 
 );
return(ss)
}

//********************************* main run **************************************
      initgen(sdat,sback);
      initlay(); 
      c.html(sarg,initsecond('')); c.drawwidth(gwidth,gheight,gmwidthreal);
      butdirset(); 
     // searchret('');

};
//********************************************************************************************************
function initfirst(sarg,sdat,sback,sbuf) { loc=new accmenu(sarg,sdat,sback,sbuf);  }


