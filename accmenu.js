// declare var fs,c,Promise; 
// declare var gmicon,gmback,gmlock,gmfont,gmwidth,gmwidthreal,gloccopy;
// declare var gwidth,gheight,ghmid,gy,gx,gt;
// declare var gservpubkey,gpubkeymy,gkeymy,gpubkeymyhash,gnodename,gnodeselect,gnodemain,gnodemaster,gcustlist,gkeypmy,gpic,gpics,gscripts,gnodeloc,glocal,gappback;

var gbackmenu,loc,gicallup=false;
//************************************** main routine *********************************************************************
function accmenu(sarg,sdat,sback) {
var gwidth,gheight,ghmid,gwr,ghr,glay={},gx,gy,gba=false,sip;
var lmode,bmess=false,llogin,llock;
function keyconv(ss) {    return(fs.keyconvert(sip,ss,gkeymy)); }
function log(ss) {  fs.log(ss);  }
function initgen(sdat,ss) { if(ss!=undefined)  gbackmenu=ss;   
    var sb;
    sip=gnodeselect;
}


accmenu.prototype.but3click = function (n) { 
            if(n==1) {  fs.run('root','maathelp','accmenu,Menu');  } //function butback() { fs.run('root','maatlogin','back'); }
       else if(n==2) {  }
       else if(n==3) {  fs.run('root','accsetup','','accmenu');}
      else if(n==4) {  fs.run('root','acccat','','accmenu');  }

       else if(n==41) {  buttest(); }
}

function dkeyread(spubname) { 
    var sc,sb,sa={};    
       sc=fs.rpostget(sip,'write|addressgetnameadr|'+spubname); // sc=fs.xhexs(fs.xl(fs.xshex(sc),dblen));
       if(sc.length==64) {       sb=fs.xshex(sc);        sa['pri']=sb; sa['pub']=sb;  return(sa);       }    
       else return('');
}

accmenu.prototype.butedit = function (ss) { 
  var hd,sb,sc;
             if(ss=='c') {  fs.run('root','acccust','','accmenu');  }
        else if(ss=='s') {  fs.run('root','accstock','','accmenu'); }
        else if(ss=='h') {  fs.run('root','accshopper','','accmenu'); }
        else if(ss=='t') {  fs.run('root','acctrans','','accmenu'); }
        else if(ss=='lt') {  fs.run('root','acctranslist','','accmenu'); }
        else if(ss=='ls') {  fs.run('root','accstate','','accmenu'); }
        else if(ss=='lo') {  
		      gchart='';  gchartline='spec';  gchartshop=[]; 
			  sc='1|'+gnodename+'|'+fs.xhexs(gkeymy.pub)+'|';
			  sc=sc+fs.chrb(254)+fs.chrb(254);
             fs.run('root','accshop',sc,'accmenu')       

		
		}
}


function initsetup(ss,se) {
    var hd;
     hd=fs.dopen(sip,keyconv('setup')); 
     fs.dclear(hd);
     fs.dnput(hd,'name',ss);                   
     fs.dnput(hd,'memo',se);
     fs.dinsert(hd);
     fs.dclose(hd);
     return(se);
}
function setupget(ss) {
    var hd,sa='';
     hd=fs.dopen(sip,keyconv('setup')); if(hd==0) return('');
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
     return(se);
}

function setupuseradd(suser,spass) { 
      if(suser=='') { return(false); } // check if user exist
      if(spass=='') { return(false); } //check if password exist
      if(fs.userexist(sip,suser)=='') { } else {  return(false);  }  
      var skey=fs.dbkey(spass); 
      var sa=fs.useraddress(sip,fs.xhexs(skey.pub));   
      if(sa=='no') {  fs.userput(sip,spass,suser); return(true); } 
      return(false);
}

function initcreate(ss) {
    var se,hd;
     se=fs.sha256hex(fs.randomtweetn(32)); 
     hd=fs.dopen(sip,keyconv('setup')); 
     fs.dclear(hd);
     fs.dnput(hd,'name',ss);                   
     fs.dnput(hd,'memo',se);
     fs.dinsert(hd);
     fs.dclose(hd);
     return(se);
}

function initpub(ss) { var sa=fs.dbkey(ss); return(fs.xhexs(sa.pub)); }
function initgensetmaster() { // c.nstyle('idsetting','display','block'); return;
    var sb=setupget('master'); if(sb=='') { } else { c.nstyle('idsetting','display','block'); }
}
function disp(ss) { c.val('idsearch',ss); }
function initgencreate(sdat) {   if(sdat=='') return;
    var hd,sb,sf,sg='',nname=fs.dkeyhalf(sip,gnodename);
    hd=fs.dopen(sip,keyconv('setup'));  
    if(hd==0) {
        
//       sb=keyconv('setup')+'|name,30|memo,m#name,name';
       sb=sdat+'|name,30|memo,m#name,name';
       sb=fs.dcreate(sip,sb);
       disp('Created Setup....');
       setTimeout(function() { 
          sg+=fs.xhexs(gkeymy.pub)+'\n';
          sf=initcreate('cust'); 
          sg+=initpub(sf)+'\n'; sg+=initpub(sf+'no')+'\n';
          sb=sf+'|acc,6|name,26|contact,26|email,32|address1,32|address2,32|del,1|memo,m#number,acc|name,name,acc|contact,contact,acc';
          sb=fs.dcreate(sip,sb);
//************************************************************
        disp('Created Customer file....');
        setTimeout(function() {  
          sf=initcreate('stock'); sg+=initpub(sf)+'\n'; sg+=initpub(sf+'no')+'\n';
          sb=sf+'|code,10|cost,f|del,1|memo,m#code,code';
          sb=fs.dcreate(sip,sb);
          
          
          sf=initcreate('stockex'); fs.useradd(sip,'shop'+nname,sf); sg+=initpub(sf)+'\n';
//          sf=setupput('stockex','shop'+gnodename);   setupuseradd(sf,sf); sg+=initpub(sf)+'\n';
          sb=sf+'|code,10|stockcode,10|desc,36,22|cat,20|onhand,f|price,f|del,1|memo,m#code,code|desc,desc,code|cat,cat,code';
          sb=fs.dcreate(sip,sb,'shop'+nname);

          sf=initcreate('stockpic'); fs.useradd(sip,'shop'+nname+'pic',sf); sg+=initpub(sf)+'\n';
          //sf=setupput('stockpic','shop'+gnodename+'pic');   setupuseradd(sf,sf); sg+=initpub(sf)+'\n';
          sb=sf+'|code,10|del,1|memo,m#code,code';
          sb=fs.dcreate(sip,sb,'shop'+nname+'pic');

          sf=initcreate('stocknail'); fs.useradd(sip,'shop'+nname+'nail',sf); sg+=initpub(sf)+'\n';
          //sf=setupput('stocknail','shop'+gnodename+'nail');   setupuseradd(sf,sf); sg+=initpub(sf)+'\n';
          sb=sf+'|code,10|del,1|memo,m#code,code';
          sb=fs.dcreate(sip,sb,'shop'+nname+'nail');

          sf=initcreate('stockhtml'); fs.useradd(sip,'shop'+nname+'html',sf); sg+=initpub(sf)+'\n';
          //sf=setupput('stockhtml','shop'+gnodename+'html');   setupuseradd(sf,sf); sg+=initpub(sf)+'\n';
          sb=sf+'|code,10|del,1|memo,m#code,code';
          sb=fs.dcreate(sip,sb,'shop'+nname+'html');

          sf=initcreate('stockcat'); fs.useradd(sip,'shop'+nname+'cat',sf); sg+=initpub(sf)+'\n';
          //sf=setupput('stockcat','shop'+gnodename+'cat');   setupuseradd(sf,sf); sg+=initpub(sf)+'\n';
          sb=sf+'|cat,10|desc,22|del,1|memo,m#cat,cat|desc,desc,cat';
          sb=fs.dcreate(sip,sb,'shop'+nname+'cat');


//***************************************************************************************
      disp('Created Stock files....');
      setTimeout(function() {  
          sf=initcreate('trans'); sg+=initpub(sf)+'\n'; sg+=initpub(sf+'no')+'\n';
          sb=sf+'|ref,10|acc,6|type,3|dateref,10|period,4|desc,25|orderref,15|amount,f|alloc,f|del,1|memo,m#ref,ref|acc,acc,ref|period,period,ref';
          sb=fs.dcreate(sip,sb);

          //sf=initcreate('shopper'); sg+=initpub(sf)+'\n'; sg+=initpub(sf+'no')+'\n';
          sf=setupput('stockshop','shop'+nname+'shop');   setupuseradd(sf,sf); sg+=initpub(sf)+'\n';
          sb=sf+'|shop,32|cat,22|desc,22|del,1|memo,m#shop,shop';
          sb=fs.dcreate(sip,sb);
          
          initsetup('master',sg);  c.nstyle('idsetting','display','block'); 
          disp('Created Transaction file....finish');
          return;

       },50);       // trans
       
       },50);       // stock1
       },2000);       // setup
    } else { fs.dclose(hd); 
            sb=setupget('cust'); if(sb=='') {  fs.run('root','acclogin','back');  return; };
            initgensetmaster();
    }
}

function searchret() { 
     var hd,ia,itot,it,i,sa='',sd,sb,se,sg,sdat,sn,ss,s1;
       ss='Customers-c,Stock-s,Shoppers-h,Transactions-t,Transaction List-lt,Statements-ls,Orders-lo';
         for(ia=1;ia<=fs.itemcount(ss);ia++)  {
             sb=fs.itemget(ss,ia); if(sb=='')  continue;
             sd=fs.xitemget(sb,1,'-'); se=fs.xitemget(sb,2,'-'); 
             sa=sa+c.tr(
               c.td(
               c.table( c.at(c.cellspacing(0),c.cellpadding(0)),
                   c.tr( c.td( c.at(c.att(c.height(20*gy))) )),
                      c.tr( c.td(  c.link( c.at(c.href('#'),  c.onclick('loc.butedit("'+se+'")')),
                        c.table( c.at(c.cellspacing(0),c.cellpadding(0)),
                            c.tr( c.td(c.at(c.att(c.padding_left(20*gy),c.font_family('myfont'),c.spfont_size(45*gt))), fs.left(sd,32)) )
                     //   )
                      ) //table
                ) //link
              ) ) //tr
           ) //table
           ))
         }

   c.html('cinfox',c.table( c.at(c.att(c.white_space('nowrap'))),sa ));
//     //gicallup(false) 
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
   //******************************* svg *****************************************************************************************************
        if((fs.themeset()>1))   sx=c.image(c.xywh(kofs+kadd*5-25,10,120,60),c.xlink(fs.picsvgi('xxlogo')),c.att(c.cursor('pointer'))           );
        else sx=c.image(c.xywh(kofs+kadd*5,ktop,kw+35,kh),c.xlink(fs.picget('icon31')),c.att(c.cursor('pointer'))           );


   ss=c.svg(  c.at(c.id('idmain'),c.nwidth(gwidth),c.cheight(ksep)), //,c.viewbox(0,0,gwr,210),c.viewbox(0,0,gwr,210),c.viewbox('0 0 100 100') c.att(c.background_image(sgrp))
     //******************************************** load font *************************************************************
     c.defs(c.stylesheet(c.font_face(
        c.st(" font-family: 'myfont';  src: url(data:font/ttf;base64,"+gmfont+") format('truetype');  font-weight: normal; font-style: normal;")    
     ))),
     
           //******************** background **********************************************************
           c.rect(c.xywh(0,0,gwr,ksep),c.att(c.fill(fs.theme(2)))), 
           //*******************  heading *****************************************************************
           c.text(c.at(c.xy(15,60),c.onclick('loc.but3click(1)'),c.att(c.fill(fs.theme(1)),c.font_weight(fs.theme(3)),c.fill_opacity(0.8),c.sfont_size(55),c.cursor('pointer'),c.font_family('myfont'))),'Accounting'),
           c.image(c.xywh(7,7,15,15),c.xlink(fs.picsvg('xhelp')),c.att(c.cursor('pointer'))           ),
          //******************** incons *************************************************************************************
        //   c.image(c.xywh(kofs+kadd*0,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('but3click(7)'),c.att(c.cursor('pointer'))           ),
        //   c.image(c.xywh(kofs+kadd*1,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('but3click(6)'),c.att(c.cursor('pointer'))           ),
        //   c.image(c.xywh(kofs+kadd*2,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('but3click(5)'),c.att(c.cursor('pointer'))           ),
//        c.image(c.xywh(kofs+kadd*2,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('loc.but3click(41)'),c.att(c.cursor('pointer'))           ),
          c.image(c.id('idcat'),c.xywh(kofs+kadd*3,ktop,kw,kh),c.xlink(fs.picsvgi('xcat')),c.onclick('loc.but3click(4)'),c.att(c.display('block'),c.cursor('pointer'))           ),
          c.image(c.id('idsetting'),c.xywh(kofs+kadd*4,ktop,kw,kh),c.xlink(fs.picsvgi('xsetting')),c.onclick('loc.but3click(3)'),c.att(c.display('none'),c.cursor('pointer'))           ),
          sx, //c.image(c.xywh(kofs+kadd*5,ktop,kw+35,kh),c.xlink(fs.picget('icon31')),c.att(c.cursor('pointer'))           ),
          //************************** back ********************************************************************************
 //         c.polygon(c.points(20,140,40,160,40,120),c.att(c.fill('#FFFFFF')) ),
          c.image(c.xywh(0,100+4,80,80-8),c.xlink(fs.picsvgi('xxback')),c.att(c.cursor('pointer'))           ),
          c.rect(c.xywh(0,100,90,80),c.onclick('loc.but3click(2)'),c.att(c.cursor('pointer'),c.fill('transparent'))),
          //************************** pre-input ********************************************************************************
          c.foreignobject(c.at(c.xywh(70,100,30,80)),c.input(c.at( c.ntype('text'),c.disabled(true),c.att(c.swh(31,80),c.background_color('#FFFFFF'),c.border('1px solid #FFFFFF'))   ))        ),
          c.image(c.xywh(70+10,100+10,31-20,80-20),c.xlink(fs.picsvgi('xuser',fs.themeset()))           ), //image inside
          //************************** input ********************************************************************************
          c.foreignobject(c.at(c.xywh(100,100,400,80)), 
          c.input(c.at(
                  c.ntype('text'),c.hint('Basic Accounting Example'),c.id('idsearch'),c.styl('autocomplete','off'),c.spellcheck(false),c.value(sf),c.onkeyup('keysup(event)'),   
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

    //   initgen(sdat,sback,function(sn) { if(sn=='ok') { 
    //   initlay(); 
    //   c.html(sarg,initsecond('')); c.drawwidth(gwidth,gheight,gmwidthreal);
    //   searchret(); initgensetmaster();
    //   }});

       initgen(sdat,sback)
       initlay(); 
       c.html(sarg,initsecond('')); c.drawwidth(gwidth,gheight,gmwidthreal);
       searchret();         
       initgencreate(sdat);     

//buttest1();


};
//********************************************************************************************************
function initfirst(sarg,sdat,sback) { loc=new accmenu(sarg,sdat,sback);  }


