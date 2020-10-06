// declare var fs,c,alog,Promise; 
// declare var gmicon,gmback,gmlock,gmfont,gmwidth,gmwidthreal,gloccopy,gchart,gchartshop;
// declare var gwidth,gheight,ghmid,gy,gx,gt;
// declare var gstart,gnodename,gservpubkey,gpubkeymy,gkeymy,gpubkeymyhash,gnodeselect,gnodemain,gnodemaster,gcustlist,gkeypmy,gpic,gpics,gscripts,gnodeloc,glocal,gappback;
var gbackshopitem,loc,gicallup=false;
//************************************** main routine *********************************************************************
function accmenu(sarg,sdat,sback,sinfo) {
var gwidth,gheight,ghmid,gwr,ghr,glay={},gx,gy,gba=false,sip,comm,banew=false,lname,lpass,lpasspic,lpassnail,lpasshtml,lpasscat;
var lmode,bmess=false,llogin,llock,lupdate='',lfile='cust';
var lno,laccount,lpic,lhtml,ltosend;
function log(ss) {  fs.log(ss);  }
function logx(ss) {  fs.logip('192.168.0.104:9000',ss);  }
function show(ss) { if(gstart=='android') { alog(ss); } else { alert(ss); } }
function keyconv(ss) {     return(fs.keyconvert(sip,ss,gkeymy)); }    




function initgen(sdat,ss) { 
 if(ss!=undefined)  gbackshopitem=ss; sip=gnodeselect;  
 lno=sdat;
 laccount=fs.xitemget(sinfo,2,'|')
 //laccount=gnodename;
 //log(laccount+'.....');
//  lfile='shop'+laccount; 
//  lpic='shop'+laccount+'pic';
//  lhtml='shop'+laccount+'html';

 lname=fs.dkeyhalf(sip,laccount);  
 lfile='shop'+lname; 
 lpass='shop'+lname;
 lpasspic='shop'+lname+'pic'; lpic=lpasspic;
 lpassnail='shop'+lname+'nail';
 lpasshtml='shop'+lname+'html'; lhtml=lpasshtml;
 lpasscat='shop'+lname+'cat';



// log(lno+'....'); 
// if(typeof(sdat)=='object') {  comm=sdat;  sdat=''; }
// lfile=keyconv('cust'); 
// return(sdat);
}
function custno(n) {
var sb='1000',k;
var sa=fs.dataget(sip,lfile+'no','number',1); 
 for(var i=0;i<sa.length;i++) { sb=sa[i]; break; }
 k=fs.xis(sb)+1; if(n==1) fs.dataput(sip,lfile+'no','number',k+'');   
 return(k+'');
}



//************************************ global access *****************************************
accmenu.prototype.but3click = function (n) { 
            if(n==1) {  fs.run('root','maathelp','accshop,Order',sinfo);  }
       else if(n==2) {   fs.run('root',gbackshopitem,sinfo);  }
       else if(n==3) {  fs.run('root','acccust',comm,'accmenu');}
       else if(n==6) {  fs.run('root','accshopchart','','accshop',sinfo); }
       //else if(n==20) {  setupkeyadd();  }
       //else if(n==99) {  custdel();  }
}



//************************************ database routines *******************************************
// function setupkeyadd() {
//     var skey,sdat,sb,hd;

//  function subadd() {
//     var sb,ss=fs.dfields(hd);   fs.dclear(hd);
//   for(var i=1;i<=fs.itemcount(ss);i++) {
//       sb=fs.itemget(ss,i); if(sb=='') continue; if(sb=='del') continue;
//       if(i==1) fs.dnput(hd,sb,c.val('idsearch')); else     fs.dnput(hd,sb,c.val('id'+sb));                   
          
//   }
//     fs.dinsert(hd);
//     fs.dclose(hd);
//     setTimeout(function() { loc.but3click(2); },100);
//  }
// //********************************************************************
//     skey=c.val('idsearch'); if(skey=='') { c.val('idsearch',''); return; }
//     hd=fs.dopenread(sip,lpass,lpass); 
//     if(hd==0) {
//       sb='cust|acc,6|name,26|contact,26|email,32|address1,32|address2,32|memo,m#number,acc|name,name,acc|contact,contact,acc';
//       sb=fs.dcreate(sip,sb);
       
//       setTimeout(function() { hd=fs.dopen(sip,lfile); subadd(); },1500); return; // give time to create
//     } 
//      if(lupdate=='') {
//          if(fs.dfindid(hd,skey,1)==true) { c.val('idsearch',''); c.attr('idsearch','placeholder',skey+' already exist'); fs.dclose(hd); return;      }
//      }
//     subadd();    
// }

// function custdel() {
//     var skey,hd;
//     skey=c.val('idsearch'); if(skey=='') { c.val('idsearch',''); return; }
//     hd=fs.dopen(sip,lfile); 
//     if(fs.dfindid(hd,skey,1)==true) { fs.dnput(hd,'del','X'); fs.dinsert(hd); }
//     fs.dclose(hd);        
//     loc.but3click(2);
// }
accmenu.prototype.butaddorder = function(scode,sprice) { 
var iqnt=0,sb,sd,sc='',n,ba=false;
if(gchart==undefined)  { gchart=''; }  
iqnt=fs.xis(c.val('idqnt'));
for(var i=1;i<=fs.xitemcount(gchart,'\n');i++) {
    sb=fs.xitemget(gchart,i,'\n'); if(sb=='') continue;
    sd=fs.itemget(sb,2);
    if(fs.lcase(sd)==fs.lcase(scode)) { 
       if(iqnt==0) { ba=true; continue;     }
       //n=fs.xis(fs.itemget(sb,3));// log(n+':'+iqnt);
       n=iqnt; sb=fs.itemrep(sb,n+'',3); ba=true;
    }
    sc+=sb+'\n';
}
gchart=sc;
if(ba==true) { } else { gchart+=laccount+','+scode+','+c.val('idqnt')+','+sprice+'\n';    }
//log(gchart);
 
 c.attr('idorder','disabled','true');
 c.nstyle('idorder','background-color','#808080');    
 
}    
function fieldlay(hd) {
    var sa='',sb,sc='',s1,iofs=18,ioff=2,iper=10,irat=10,ifont=35,scola='#FF8040',scode,sprice;
    if(fs.xis(fs.dn(hd,'onhand'))>0) { s1='In Stock'; } else { s1='Out of Stock'; }
    scode=fs.dn(hd,'code'); gchartshop.push(scode+' '+fs.dn(hd,'desc'));
    sprice=fs.dn(hd,'price').trim();
    sa+=c.tr( c.td(
            c.table( c.at(c.cellspacing(0),c.cellpadding(7),c.att(c.sfont_size(ifont),c.font_family('Arial')) ),
              c.tr( c.td( c.at(c.att(c.sheight(irat))) )),
              c.tr( c.td( c.at(c.colspan(2),c.att(c.font_weight('bold'),c.font_family('myfont'),c.sfont_size(ifont+20))),fs.dn(hd,'desc')  )),    //desc
              c.tr( c.td(  'Quantity:'), c.td(                 //qnt
                  c.input( c.at(c.ntype('text'),c.id('idqnt'),c.styl('autocomplete','off'),   c.att(c.sfont_size(40),c.swidth(200)),c.value('1')) ) 
              )),    //code

               c.tr( c.td(), c.td ( 
                   c.input( c.at(c.id('idorder'),c.ntype('button'), c.onclick('loc.butaddorder("'+scode+'","'+sprice+'")'),  
                   c.att(c.border_radius('5px'),c.border('1px solid #b0b0b0'),c.sfont_size(ifont),c.swh(200,60),c.color('#FFFFFF'),c.background_color('#FF6060')),
                   c.value('Add to Order') 
                   ) ) //input
               )),
               c.tr( c.td( 'Price excl. VAT:' ), c.td( c.at(c.att(c.color('#FF4040'),c.sfont_size(ifont+10))), '$'+fs.dn(hd,'price').trim() )),    //price
               c.tr( c.at(c.att(c.color(scola))), c.td( 'SKU Code:'), c.td( fs.dn(hd,'stockcode') )),    //code
            //   tr { at(att(color(scola))) td { func('Brand:')} td { func(itemget(sa,2,'|')) } }    //code
               c.tr( c.td(s1), c.td()),
            )  //table
    ));
    sa+=c.tr(c.td(c.at(c.id('idpic'))));       
    sa+=c.tr(
        c.td( c.at( c.att( 
            c.border_radius((10*gy)),//c.border((1*gy)+'px solid #b0b0b0'),
            c.padding_left(10),c.padding_right(10),
              c.spfont_size(25*gt),c.swidth(580-17),c.background_color('#FFFFFF')) ),
                fs.dn(hd,'memo')
             )
          );
    sa+=c.tr(c.td(c.at(c.id('idhtml'))));       
       
       
    return(sa)
}
async function butpicshow(ss) { 
  var hd,sb,sdat,snam,sext,sn; //log(ss+':'+lpic);
  hd=await fs.wopenread(sip,lpasspic,lpasspic); if(hd==0) return;
      if(await fs.wfindid(hd,ss,1)==true) { //alert(ss); 
          sdat=fs.drec(hd); sdat=sdat.substr(15,sdat.length-15);
      //alert(fs.drec(hd).substr(15,20)+'xxxx'); //alert(fs.dn(hd,'memo').length+'....');
        //  sdat=fs.dn(hd,'memo');// alert(lpic+':'+ss+':'+sdat.length);
        //  alert('xxxxx');
          snam=fs.xitemget(sdat,1,':'); sdat=fs.xitemlast(sdat,1,':'); sext=fs.xitemgetback(snam,1,'.');
      if(sext=='svg') { sn='data:image/svg+xml;base64,'+fs.x64s(sdat);  } else { sn='data:image/png;base64,'+fs.x64s(sdat); }
       c.html('idpic',
         c.img(c.at(c.align('center'),c.src(sn),c.att(c.swidth(580-17)) )           )
       )
      }
      //log(sb+':'+snam);
  fs.dclose(hd);    
}    
async function buthtmlshow(ss) { 
  var hd,sb,sdat,snam,sext,sn; //log(ss+':'+lpic);
  hd=await fs.wopenread(sip,lpasshtml,lpasshtml); if(hd==0) return;
      if(await fs.wfindid(hd,ss,1)==true) { 
        sdat=fs.drec(hd); sdat=sdat.substr(15,sdat.length-15);  
        //sdat=fs.dn(hd,'memo'); 
        snam=fs.xitemget(sdat,1,':'); sdat=fs.xitemlast(sdat,1,':'); sext=fs.xitemgetback(snam,1,'.');
        c.html('idhtml',
         c.div( c.at( c.att( 
           // c.border_radius((10*gy)),c.border((1*gy)+'px solid #b0b0b0'),//c.padding_left(10),c.padding_right(10),
              c.spfont_size(25*gt),c.swidth(580-17),c.background_color('#FFFFFF')) ),sdat
         )
       )

      }
      //log(sb+':'+snam);
  fs.dclose(hd);    
}    


async function searchret(ss) { lupdate=ss; 
    var hd,s1='',s2='',ba=false,ia,itot,it,i,sa='',sd,sb,se,sg,sdat,sfld,iw=gwidth,ih=ghmid;
     hd=await fs.wopenread(sip,lpass,lpass);    if(hd==0) { return; } else {
     if(await fs.wfindid(hd,ss,1)==true) {   sa=fieldlay(hd);      }
      fs.dclose(hd);
     }
//    if(gstart=='android') sa+=c.tr( c.td(), c.td( c.at(c.att(c.sheight(500)))        ));
 //  c.html('cinfox',c.table( c.at(c.att(c.white_space('nowrap'))),sa ));
   c.html('cinfox',c.table( sa ));
//   c.val('idsearch',s1); //c.val('idmemo','ok');
   setTimeout(function() { butpicshow(ss); buthtmlshow(ss); },50);
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
           c.text(c.at(c.xy(80+15,60),c.onclick('loc.but3click(1)'),c.att(c.fill(fs.theme(1)),c.font_weight(fs.theme(3)),c.fill_opacity(0.8),c.sfont_size(55),c.cursor('pointer'),c.font_family('myfont'))),'Item display'),
           c.image(c.xywh(80,7,15,15),c.xlink(fs.picsvg('xhelp')),c.att(c.cursor('pointer'))           ),
          //******************** incons *************************************************************************************

//           c.image(c.xywh(kofs+kadd*4,ktop,kw,kh),c.xlink(fs.picsvg('xchart')),c.att(c.cursor('pointer'))           ),
//           c.rect(c.id('idkey3'), c.xywh(kofs+kadd*4,ktop-5,kw,kh+10),c.onclick('loc.but3click(6)'),c.att(c.fill('transparent'),c.display('block'))), //back selectiom
          
          
          sx, //c.image(c.xywh(kofs+kadd*5,ktop,kw+35,kh),c.xlink(fs.picget('icon31')),c.att(c.cursor('pointer'))           ),
          //************************** back ********************************************************************************
//          c.polygon(c.points(20,140,40,160,40,120),c.att(c.fill('#FFFFFF')) ),
//          c.polygon(c.points(20,40,40,60,40,20),c.att(c.fill('#FFFFFF')) ),
          c.image(c.xywh(0,6,80,80-8),c.xlink(fs.picsvgi('xxback')),c.att(c.cursor('pointer'))           ),
          
          c.rect(c.xywh(0,0,80,80),c.onclick('loc.but3click(2)'),c.att(c.cursor('pointer'),c.fill('transparent'))),
          //************************** pre-input ********************************************************************************
        //   c.foreignobject(c.at(c.xywh(70,100,30,80)),c.input(c.at( c.ntype('text'),c.disabled(true),c.att(c.swh(31,80),c.background_color('#FFFFFF'),c.border('1px solid #FFFFFF'))   ))        ),
        //   c.image(c.xywh(70+10,100+10,31-20,80-20),c.xlink(fs.picsvg('xuser'))           ), //image inside
        //   //************************** input ********************************************************************************
        //   c.foreignobject(c.at(c.xywh(100,100,400,80)), 
        //   c.input(c.at(
        //           c.ntype('text'),c.hint('Customer Number'),c.id('idsearch'),c.styl('autocomplete','off'),c.disabled(true),c.spellcheck(false),c.value(sf),c.onkeyup('loc.keysup(event)'),   
        //           c.att(c.background_color('#ffffff'),c.sfont_size(40),c.font_family('myfont'),c.swh(400,80),c.border('1px solid #FFFFFF')) //,c.border('1px solid #FFFFFF')
        //       )) // input
        //   ),
        //   //************************** accept  ********************************************************************************
        //   c.foreignobject(c.at(c.xywh(500,100,70,80)),c.input(c.at( c.ntype('text'),c.disabled(true),c.att(c.swh(70,80),c.background_color('#FFFFFF'),c.border('1px solid #FFFFFF'))   ))        ),
        //   c.image(c.xywh(500+20,100+20,40,40),c.xlink(fs.picsvg('xaccept'))), //backn
        //   c.rect( c.xywh(500,100,80,80),c.onclick('loc.but3click(20)'),c.att(c.cursor('pointer'),c.fill('transparent'))), //send selectiom
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
      searchret(lno); //if(sdat=='') {  c.val('idsearch',custno(1)); } else {  c.nstyle('iddel','display','block'); }

};
//********************************************************************************************************
function initfirst(sarg,sdat,sback,sinfo) { loc=new accmenu(sarg,sdat,sback,sinfo);  }


