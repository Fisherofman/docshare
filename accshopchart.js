// declare var fs,c,alog; 
// declare var gmicon,gmback,gmlock,gmfont,gmwidth,gmwidthreal,gloccopy,gchart,gchartshop;
// declare var gwidth,gheight,ghmid,gy,gx,gt;
// declare var gstart,gservpubkey,gpubkeymy,gnodename,gkeymy,gpubkeymyhash,gnodeselect,gnodemain,gnodemaster,gcustlist,gkeypmy,gpic,gpics,gscripts,gnodeloc,glocal,gappback;
var gbackshopitem,loc,gicallup=false;
//************************************** main routine *********************************************************************
function accmenu(sarg,sdat,sback,sinfo) {
var gwidth,gheight,ghmid,gwr,ghr,glay={},gx,gy,gba=false,sip,comm,banew=false,lname,lpass,lpasspic,lpassnail,lpasshtml,lpasscat;
var lmode,bmess=false,llogin,llock,lupdate='',lfile='cust';
var lno,laccount,lpic,ltosend,ltot,bufno=[];
function log(ss) {  fs.log(ss);  }
function logx(ss) {  fs.logip('192.168.0.104:9000',ss);  }
function show(ss) { if(gstart=='android') { alog(ss); } else { alert(ss); } }
function keyconv(ss) {     return(fs.keyconvert(sip,ss,gkeymy)); }    




function initgen(sdat,ss) { 
 if(ss!=undefined)  gbackshopitem=ss; sip=gnodeselect;  
 lno=sdat;
 laccount=fs.xitemget(sinfo,2,'|')
// lfile='shop'+laccount; 
// lpic='shop'+laccount+'pic';

 lname=fs.dkeyhalf(sip,laccount);  
 lfile='shop'+lname; 
 lpass='shop'+lname;
 lpasspic='shop'+lname+'pic';
 lpassnail='shop'+lname+'nail';
 lpasshtml='shop'+lname+'html';
 lpasscat='shop'+lname+'cat';
 
 
}
function custno(n) {
var sb='1000',k;
var sa=fs.dataget(sip,lfile+'no','number',1); 
 for(var i=0;i<sa.length;i++) { sb=sa[i]; break; }
 k=fs.xis(sb)+1; if(n==1) fs.dataput(sip,lfile+'no','number',k+'');   
 return(k+'');
}
function butsearchfirstperson() { 
     var sa='',sc,sb='',hdc,kk=0,sline,sno,s2,s1=''; 
     hdc=fs.dopen(sip,'shop'+lname+'shop');  if(hdc==0) return('');
     if(fs.dfindid(hdc,gnodename,1)==true) { 
       fs.dfirst(hdc);
       for(;;) {
         if(fs.deof(hdc)==true) break;
         if(fs.dn(hdc,'del')=='X') { fs.dnext(hdc); continue; }
         s1=fs.dn(hdc,'memo'); 
         break;
       }
     }
     fs.dclose(hdc); 
//     if(s1=='') lbufperson=[]; else  lbufperson=s1.split('\n');
//     for(var i=0;i<lbufperson.length;i++) {       lbufperson[i]=fs.xitemget(lbufperson[i],1,' ');   }
     return(s1);
 }

function butshopperselect() {
    var sb,sc,hdc,ba=false,bb=false,bc=false,sa,s2='',bu,buj=[],s1=butsearchfirstperson();
    if(s1=='') bu=[]; else bu=s1.split('\n');
    for(var i=0;i<gchartshop.length;i++) {
        sa=gchartshop[i]; if(sa=='') continue;
        bu.unshift(sa); ba=true;
    }
    for(var i=0;i<bu.length;i++) {  // remove duplicates
        sb=bu[i]; if(sb=='') continue;
        bc=false; for(var k=0;k<buj.length;k++) { if(buj[k]==i) { bc=true; break; } } if(bc==true) continue; 
        sc=fs.xitemget(sb,1,' '); bb=false; //log(sc+':::'+sb);
        for(var j=0;j<bu.length;j++) {
            if(j==i) { } else { if(fs.xitemget(bu[j],1,' ')==sc) { buj.push(j); } }
        }
        s2+=sb+'\n';
    }
    //log('\n'+s2+'xxxxx');    s2=bu.join('\n');
    if(ba==true) {
        hdc=fs.dopen(sip,'shop'+lname+'shop');  if(hdc==0) return('');
        fs.dnput(hdc,'shop',gnodename);        
        fs.dnput(hdc,'cat','normal');        
        fs.dnput(hdc,'desc','shopper');        
        fs.dnput(hdc,'memo',s2);        
        fs.dinsert(hdc);
        fs.dclose(hdc);
    }
}


//************************************ global access *****************************************
accmenu.prototype.but3click = function (n) { 
            var ss;
            if(n==1) {  fs.run('root','maathelp','accshop,Order',sinfo);  }
       else if(n==2) {   
           
           fs.run('root',gbackshopitem,sinfo);  
       }
       else if(n==3) {  fs.run('root','acccust',comm,'accmenu');}
       else if(n==6) { butaccept();  }
       //else if(n==20) {  setupkeyadd();  }
       //else if(n==99) {  custdel();  }
}

accmenu.prototype.butcodedisplayno = function (ss) { 
    fs.run('root','accshopitem',ss,'accshop',sinfo); 
}    
accmenu.prototype.butcodedel = function (scode) { 
var sb,sd,sc='',ba=false;
    for(var i=1;i<=fs.xitemcount(gchart,'\n');i++) {
    sb=fs.xitemget(gchart,i,'\n'); if(sb=='') continue;
    sd=fs.itemget(sb,2);
    if(fs.lcase(sd)==fs.lcase(scode)) { 
        ba=true; continue;     
    }
    sc+=sb+'\n';
}
gchart=sc;
searchret();    
}    

function butaccept() { butshopperselect();
    var sb,sn,sm,ss,sf='order_'+fs.datedisk()+'.htmd';

  for(var i=0;i<bufno.length;i++)  {
      sb=bufno[i]; if(sb=='') continue;
      c.html('iddel'+(i+1)+sb,'');
      c.attr('iddesc'+(i+1)+sb,'onclick','');
  }
    ss=c.html('cinfox');
    
    
    
    
    ss=fs.zip(fs.encode(ss));
    sm='Order - $'+ltot; sn=fs.xitemrep(sinfo,sm,2,fs.chrb(254));
    fs.run('root','accmenu');
}


// function custdel() {
//     var skey,hd;
//     skey=c.val('idsearch'); if(skey=='') { c.val('idsearch',''); return; }
//     hd=fs.dopen(sip,lfile); 
//     if(fs.dfindid(hd,skey,1)==true) { fs.dnput(hd,'del','X'); fs.dinsert(hd); }
//     fs.dclose(hd);        
//     loc.but3click(2);
// }
function fieldlay(hd,n,ss) {
    var sa='',sb,sc='',s1,iofs=18,ioff=2,iper=10,irat=10,ifont=20,scola='#FF8040',scode,sprice,sqnt,samt;
    scode=fs.dn(hd,'code');
    sqnt=fs.itemget(ss,3);
    sprice=fs.itemget(ss,4);
    samt=fs.xds(sqnt)*fs.xds(sprice); ltot+=samt;

    sa=c.tr( 
         c.td(c.at(c.id('id'+n+scode))         ),
         c.td(fs.dn(hd,'stockcode')         ),
         c.td(c.at(c.att(c.font_weight('bold'))),c.link(c.at(c.id('iddesc'+n+scode),c.href('#'),c.onclick('loc.butcodedisplayno("'+scode+'")')),fs.dn(hd,'desc'))         ),
         c.td(c.at(c.att(c.text_number())),sqnt         ),
         c.td(c.at(c.id('iddel'+n+scode),c.align('center'),c.att(c.font_weight('bold'))),c.link(c.at(c.href('#'),c.onclick('loc.butcodedel("'+scode+'")'),c.att(c.color('red'))),'X')         ),
         c.td(c.at(c.att(c.text_number())),fs.xfs(sprice)         ),
         c.td(c.at(c.att(c.text_number())),fs.xfs(samt+'')         ),
         c.td(c.at(c.att(c.color('#FF4040'),c.text_number())),fs.xfs(ltot+'')         ),
       );
    return(sa);
}
function butpicshow() { 
  var hd,sb,sdat,snam,sext,sn;
  hd=fs.dopenread(sip,lpassnail,lpassnail); if(hd==0) return;
   for(var i=0;i<bufno.length;i++)  {
      sb=bufno[i]; if(sb=='') continue;
      if(fs.dfindid(hd,sb,1)==true) { 
          sdat=fs.dn(hd,'memo'); snam=fs.xitemget(sdat,1,':'); sdat=fs.xitemlast(sdat,1,':'); sext=fs.xitemgetback(snam,1,'.');
      if(sext=='svg') { sn='data:image/svg+xml;base64,'+fs.x64s(sdat);  } else { sn='data:image/png;base64,'+fs.x64s(sdat); }
      c.html('id'+(i+1)+sb,
        c.link(c.at(c.href('#'),c.onclick('loc.butcodedisplay("'+sb+'")')),
         c.img(c.at(c.align('center'),c.src(sn),c.att(c.swh(60,100)) )           )
        ) 
      )
      //log(sb+':'+snam);
      } 
   }
  fs.dclose(hd);    
}    
function searchret() { 
    var hd,s1='',s2='',ba=false,ia,itot,it,sa='',sd,sb,se,sg='',sdat,sfld,iw=gwidth,ih=ghmid,ifont=30; ltot=0; bufno=[];
     hd=fs.dopenread(sip,lpass,lpass);     if(hd==0) { return; }
     for(var i=1;i<=fs.xitemcount(gchart,'\n');i++) {
        sb=fs.xitemget(gchart,i,'\n') ; if(sb=='') {   }
        se=fs.itemget(sb,2); bufno.push(se);
        if(fs.dfindid(hd,se,1)==true) {  sa=fieldlay(hd,i,sb); sg+=sa;     }
     }
      fs.dclose(hd);
   sg=c.tr( c.at(c.att(c.background_color('#EFEEDD'))), 
       c.td(),
       c.td('Code'),
       c.td('Description'),
       c.td('Qty'),
       c.td(''),
       c.td('Price'),
       c.td('Amount'),
       c.td('Total')
       )+sg;    
     sg=c.tr( c.td( c.at(c.colspan(5),c.att(c.sfont_size(ifont+15))),'Order' ),c.td(c.at(c.colspan(2),c.att(c.sfont_size(ifont-8))),fs.datecurrent()  ))+sg;                
       
   c.html('cinfox',c.table(c.at(c.att(c.sfont_size(ifont))), sg ));
   setTimeout(function() { butpicshow(); },50);
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
  var ss,s1,ksep=90,kofs=200,ktop=20,kw=50,kh=50,kadd=60,sx; 
          if((fs.themeset()>1))   sx=c.image(c.xywh(kofs+kadd*5-25,10,120,60),c.onclick('loc.but3click(6)'),c.xlink(fs.picsvgi('xxlogo')),c.att(c.cursor('pointer'))           );
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
           c.text(c.at(c.xy(80+15,60),c.onclick('loc.but3click(1)'),c.att(c.fill(fs.theme(1)),c.font_weight(fs.theme(3)),c.fill_opacity(0.8),c.sfont_size(55),c.cursor('pointer'),c.font_family('myfont'))),'Chart'),
           c.image(c.xywh(80,7,15,15),c.xlink(fs.picsvg('xhelp')),c.att(c.cursor('pointer'))           ),
          //******************** incons *************************************************************************************
           c.image(c.xywh(kofs+kadd*4+5,ktop+5,kw-10,kh-10),c.xlink(fs.picsvgi('xacceptwhite')),c.att(c.cursor('pointer'))           ),
           c.rect(c.id('idkey3'), c.xywh(kofs+kadd*4,ktop-5,kw,kh+10),c.onclick('loc.but3click(6)'),c.att(c.fill('transparent'),c.display('block'))), //back selectiom
          
          
          sx, //c.image(c.xywh(kofs+kadd*5,ktop,kw+35,kh),c.xlink(fs.picget('icon31')),c.att(c.cursor('pointer'))           ),
          //************************** back ********************************************************************************
//          c.polygon(c.points(20,140,40,160,40,120),c.att(c.fill('#FFFFFF')) ),
//          c.polygon(c.points(20,40,40,60,40,20),c.att(c.fill('#FFFFFF')) ),
          c.image(c.xywh(0,6,80,80-8),c.xlink(fs.picsvgi('xxback')),c.att(c.cursor('pointer'))           ),
          
          c.rect(c.xywh(0,0,80,80),c.onclick('loc.but3click(2)'),c.att(c.cursor('pointer'),c.fill('transparent'))),
          //************************** pre-input ********************************************************************************
   );//svg
   ghmid=(ghr-ksep)*gy;
   s1=c.div(c.at( 
              c.id('cinfox'),
              c.att(c.swh(gwr,ghr-ksep),
              c.overflow('auto'),c.background_color('#FFFFF8') 
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
      searchret(); //if(sdat=='') {  c.val('idsearch',custno(1)); } else {  c.nstyle('iddel','display','block'); }

};
//********************************************************************************************************
function initfirst(sarg,sdat,sback,sinfo) { loc=new accmenu(sarg,sdat,sback,sinfo);  }


