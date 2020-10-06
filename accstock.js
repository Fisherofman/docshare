// declare var fs,c,Promise; 
// declare var gmicon,gmback,gmlock,gmfont,gmwidth,gmwidthreal,gloccopy,gchartline,gchartshop,gchart;
// declare var gwidth,gheight,ghmid,gy,gx,gt;
// declare var gservpubkey,gpubkeymy,gkeymy,gnodename,gpubkeymyhash,gnodeselect,gnodemain,gnodemaster,gcustlist,gkeypmy,gpic,gpics,gscripts,gnodeloc,glocal,gappback;
var gbackstock,loc,gicallup=false; // cust stock (names)
function log(ss) {  fs.log(ss);  }
//************************************** main routine *********************************************************************
function accmenu(sarg,sdat,sback) {

var gwidth,gheight,ghmid,gwr,ghr,glay={},gx,gy,gba=false,comm=[],lbuf=[],ksep=210,lname,lpass,lpasspic,lpassnail,lpasshtml,lpasscat;
var lbufspec=[],lbufspecdesc=[],lbufperson=[],lbufpersondesc=[];
var lmode,bmess=false,llogin,llock,sip,lfile='stockex',lindex='desc';
var ltosend,laccount,bufno=[],linx=0;
function keyconv(ss) {     return(fs.keyconvert(sip,ss,gkeymy)); }    
function initgen(sdat,ss) { 
  var sa;
  if(ss!=undefined) { gbackstock=ss;  gchartline='desc';  }
  sip=gnodeselect;  
  if(typeof(sdat)=='object') {  comm=sdat;  }

  ltosend=sdat;
  laccount=gnodename; //fs.xitemget(ltosend,2,'|')
   // if(typeof(sdat)=='object') {  comm=sdat;  }
 lname=fs.dkeyhalf(sip,laccount);  
 lfile='shop'+lname; 
 lpass='shop'+lname;
 lpasspic='shop'+lname+'pic';
 lpassnail='shop'+lname+'nail';
 lpasshtml='shop'+lname+'html';
 lpasscat='shop'+lname+'cat';
//log(lpass);
  //lindex='spec';
  
  
}

// function initgen(sdat,ss) { 
//   if(ss!=undefined)  gbackstock=ss;  
//   sip=gnodeselect;  
//     if(typeof(sdat)=='object') {  comm=sdat;  }
//     lfile=keyconv('stockex'); 
//     lname=fs.dkeyhalf(sip,gnodename);  lpass='shop'+lname;// log(lpass+':'+gnodename);
// }

function butbackreal() {
//  sdat(jhtml('cinfox'))                                         
//  sdat(encodex(butpdfset()&sdat))
//  runlabel('root',gappback,gtosend+',all,'+sfn+','+sdat)            
}


//**************************************** display *****************************************************
accmenu.prototype.buteditcat = function (ss) { //log(ss+'...Name');
  var s1;
  s1=fs.left(ss,20);   c.val('idsearch',s1);    searchret(s1);
}    
accmenu.prototype.butcatsub = function (ss) {  searchreal(ss,2);}
function searchreal(ss,m) {
 var sa='',s2,sn1,sn2='',ih,ch,ba=false;
     for(var i=0;i<lbuf.length;i++) {
         s2=lbuf[i]; if(s2=='') continue;
         if(ba==false) {
         if(m==1) {
          if(ss=='') { } else {
            if(fs.instr(1,s2,ss)>0)  { } else { continue; }
          }
         } else {
             if(fs.left(s2,1)>=ss) { ba=true; } else { continue; }
         } 
         } //ba
         sa=sa+c.tr(
               c.td(
               c.table( c.at(c.cellspacing(0),c.cellpadding(0)),
                   c.tr( c.td( c.at(c.att(c.height(20*gy))) )),
                      c.tr( c.td(  c.link( c.at(c.href('#'),  c.onclick('loc.buteditcat("'+s2+'")')),
                        c.table( c.at(c.cellspacing(0),c.cellpadding(0)),
                            c.tr( c.td(c.at(c.att(c.padding_left(20*gy),c.font_family('myfont'),c.spfont_size(45*gt))), fs.left(s2,32)) ),
                            //c.tr( c.td(c.at(c.att(c.padding_left(20*gy),c.font_family('myfont'),c.spfont_size(12*gt))), sline) )

                      ) //table
                ) //link
              ) ) //tr
           ) //table
           )
           )
         
     }
     sn1=c.table( c.at(c.att(c.white_space('nowrap'),c.swidth(518))),sa );
     sn1=c.div(     c.at(c.att(c.swh(530,ghr-ksep-10),c.overflow('auto'))),sn1

         
         );
     ih=(ghr-ksep-20)/26; 
     for(var i=65;i<(65+26);i++) {       ch=fs.chrb(i);
         sn2+=c.tr( c.td(     
             c.at(c.onclick('loc.butcatsub("'+ch+'")'),c.att(c.cursor('pointer'),c.sheight(ih),c.sfont_size(30))),fs.space(1)+ch
             ));      
     }
     sn2=c.table( c.at(c.cellspacing(0),c.padding(0),c.att(c.white_space('nowrap'))),sn2);
     //log(sn2);
     //log(sn1);
     c.html('cinfox',c.table( c.at(c.att(c.white_space('nowrap'))),c.tr(c.td(c.at(c.valign('top')),sn1),c.td(c.at(c.valign('top')),sn2)     ) ));
      gicallup=false;
}

function butsearchfirst() { 
     var sa='',sc,sb='',hdc,kk=0,sline,sno,s2,s1='';
     hdc=fs.dopenread(sip,lpasscat,lpasscat); if(hdc==0) return;
     if(fs.dfind(hdc,'desc','item','item','',100)==true) { //sb='';
       fs.dfirst(hdc);
       for(;;) {
         if(fs.deof(hdc)==true) break;
         if(fs.dn(hdc,'del')=='X') { fs.dnext(hdc); continue; }
         s1=fs.dn(hdc,'memo'); 
         break;
       }
     }
     fs.dclose(hdc);
     lbuf=s1.split('\n'); 
 }


function butsearchcat(ss) { 
    if(lbuf.length==0) butsearchfirst();
    searchreal(ss,1);
    gicallup=false;
}

    
//***********************specials***************************************************************************
async function searchrealspec(ss) { 
     var sa='',sc,sb='',keys='',hdc,kk=0,sline,sno,sqty,icnt=0,s2,sn,sm,bufspec=[]; bufno=[]; //fs.stick();
function subcatcat(sdat)    {    if(sdat=='') return(lbufspecdesc);
    var s6=fs.lcase(sdat),s5,s7,s8,bu=[];
    for(var j=0;j<lbufspecdesc.length;j++) {
      s5=lbufspecdesc[j]; 
      s8=fs.xitemget(s5,1,' '); s7=fs.lcase(fs.xitemlast(s5,1,' ')); 
      if(fs.instr(1,s7,s6)>0) { bu.push(s8); }
    }
    return(bu);    
}

     if(ss=='') { lbufspecdesc=[]; bufspec=lbufspec; } else { bufspec=subcatcat(ss); }
     hdc=await fs.wopenread(sip,lpass,lpass); if(hdc==0) return;
     for(var i=0;i<bufspec.length;i++) { 
         s2=bufspec[i];if(s2=='')  continue;  
         keys+=s2+',';
         sa=sa+c.tr(  c.td(c.at(c.id('idx'+s2)) ));
     }
  c.html('cinfox',c.table( c.at(c.att(c.white_space('nowrap'))),sa ));

//   for(var i=0;i<bufspec.length;i++) { 
//         s2=bufspec[i];if(s2=='')  continue;  
      if(await fs.wfindidlist(hdc,keys)==true) {
      fs.dfirst(hdc);
      for(;;) {
         if(fs.deof(hdc)==true) break;
         if(fs.dn(hdc,'del')=='X') { fs.dnext(hdc); continue; }
          sb=fs.dn(hdc,'desc'); if(ss=='') lbufspecdesc.push(s2+' '+sb); 
          if(fs.xis(fs.dn(hdc,'onhand'))>0) { sqty='Instock'; } else { sqty='Order'; } icnt++;
          sline=fs.dn(hdc,'cat')+' <b>$'+fs.dn(hdc,'price').trim()+'</b> '+sqty; sno=fs.dn(hdc,'code').trim(); bufno.push(sno);
          //************************************************************************
//             sa=sa+c.tr(
//             c.td(
                  sn=c.table( c.at(c.cellspacing(0),c.cellpadding(0)),
                  c.tr( c.td( c.at(c.att(c.height(20*gy))) )),
                     c.tr( 
                      c.td (
                         c.link( c.at(c.href('#'),  c.onclick('loc.butedit("'+sno+'")')),
                          c.div(c.at(c.id('id'+sno),c.att(c.swh(90,150))))
                         )
                      ), 
                      c.td(  
                        c.link( c.at(c.href('#'),  c.onclick('loc.butedit("'+sno+'")')),
                         c.table( c.at(c.cellspacing(0),c.cellpadding(0)),
                            c.tr( c.td(c.at(c.att(c.padding_left(20*gy),c.font_family('myfont'),c.spfont_size(30*gt))), fs.left(sb,32)) ),
                            c.tr( c.td(c.at(c.att(c.padding_left(20*gy),c.font_family('myfont'),c.spfont_size(12*gt))), sline) )
                         ) //table
                        ) //link
                      ) //td
                 ) //tr
          ) //table
//          ))
         //*******************************************************************************
          c.html('idx'+sno,sn); 
          fs.dnext(hdc);
      }
     } //true
     //} //for
     fs.dclose(hdc);  //log(icnt+'...');
//     c.html('cinfox',c.table( c.at(c.att(c.white_space('nowrap'))),sa ));
     setTimeout(function() { butpicshow();  },100);
     gicallup=false;
 }


function butsearchfirstspec() { 
     var sa='',sc,sb='',hdc,kk=0,sline,sno,s2,s1='';
     hdc=fs.dopenread(sip,lpasscat,lpasscat); if(hdc==0) return;
     if(fs.dfind(hdc,'desc','spec','spec','',100)==true) { //sb='';
       fs.dfirst(hdc);
       for(;;) {
         if(fs.deof(hdc)==true) break;
         if(fs.dn(hdc,'del')=='X') { fs.dnext(hdc); continue; }
         s1=fs.dn(hdc,'memo'); 
         break;
       }
     }
     fs.dclose(hdc);
     lbufspec=s1.split('\n');
     for(var i=0;i<lbufspec.length;i++) {       lbufspec[i]=fs.xitemget(lbufspec[i],1,' ');   }
 }

function butsearchspec(ss) { 
    if(lbufspec.length==0) butsearchfirstspec();
    searchrealspec(ss);
    gicallup=false;
}
//******************************************* person search ***************************************************
//******************************************* person search ***************************************************
//******************************************* person search ***************************************************
async function searchrealperson(ss) { 
     var sa='',sc,sb='',hdc,kk=0,sline,sno,sqty,icnt=0,s2,sn,keys='',bufspec=[]; bufno=[]; //fs.stick();
function subcatcat(sdat)    {    if(sdat=='') return(lbufspecdesc);
    var s6=fs.lcase(sdat),s5,s7,s8,bu=[];
    for(var j=0;j<lbufspecdesc.length;j++) {
      s5=lbufpersondesc[j]; 
      s8=fs.xitemget(s5,1,' '); s7=fs.lcase(fs.xitemlast(s5,1,' ')); 
      if(fs.instr(1,s7,s6)>0) { bu.push(s8); }
    }
    return(bu);    
}

     if(ss=='') { lbufpersondesc=[]; bufspec=lbufperson; } else { bufspec=subcatcat(ss); }
     hdc=await fs.wopenread(sip,lpass,lpass); if(hdc==0) return;
     for(var i=0;i<bufspec.length;i++) { 
         s2=bufspec[i];if(s2=='')  continue;  
                 keys+=s2+',';
                sa=sa+c.tr(    c.td(c.at(c.id('idx'+s2)) ));
     }
     c.html('cinfox',c.table( c.at(c.att(c.white_space('nowrap'))),sa ));

    //  for(var i=0;i<bufspec.length;i++) { 
    //      s2=bufspec[i];if(s2=='')  continue;  
    //   if(await fs.dfindid(hdc,s2,1)==true) {
      if(await fs.wfindidlist(hdc,keys)==true) {
      fs.dfirst(hdc);
      for(;;) {
         if(fs.deof(hdc)==true) break;
         if(fs.dn(hdc,'del')=='X') { fs.dnext(hdc); continue; }
          sb=fs.dn(hdc,'desc'); if(ss=='') lbufpersondesc.push(s2+' '+sb); 
          if(fs.xis(fs.dn(hdc,'onhand'))>0) { sqty='Instock'; } else { sqty='Order'; } icnt++;
          sline=fs.dn(hdc,'cat')+' <b>$'+fs.dn(hdc,'price').trim()+'</b> '+sqty; sno=fs.dn(hdc,'code').trim(); bufno.push(sno);
          //************************************************************************
    //         sa=sa+c.tr(
//              c.td(
              sn=c.table( c.at(c.cellspacing(0),c.cellpadding(0)),
                  c.tr( c.td( c.at(c.att(c.height(20*gy))) )),
                     c.tr( 
                      c.td (
                         c.link( c.at(c.href('#'),  c.onclick('loc.butedit("'+sno+'")')),
                          c.div(c.at(c.id('id'+sno),c.att(c.swh(90,150))))
                         )
                      ), 
                      c.td(  
                        c.link( c.at(c.href('#'),  c.onclick('loc.butedit("'+sno+'")')),
                         c.table( c.at(c.cellspacing(0),c.cellpadding(0)),
                            c.tr( c.td(c.at(c.att(c.padding_left(20*gy),c.font_family('myfont'),c.spfont_size(30*gt))), fs.left(sb,32)) ),
                            c.tr( c.td(c.at(c.att(c.padding_left(20*gy),c.font_family('myfont'),c.spfont_size(12*gt))), sline) )
                         ) //table
                        ) //link
                      ) //td
                 ) //tr
          ) //table
  //        ))
         //*******************************************************************************
           c.html('idx'+sno,sn);
          fs.dnext(hdc);
      }
     } //true
//     } //for
     fs.dclose(hdc);  //log(icnt+'...');
     setTimeout(function() { butpicshow();  },0);
     gicallup=false;
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
     if(s1=='') lbufperson=[]; else  lbufperson=s1.split('\n');
     
     for(var i=0;i<lbufperson.length;i++) {       lbufperson[i]=fs.xitemget(lbufperson[i],1,' ');   }
     return(s1);
 }

//******************************************************************************************************
function butsearchperson(ss) { 
    if(lbufperson.length==0) butsearchfirstperson();
    searchrealperson(ss);
    gicallup=false;
}

function butshopperselect() {
    var sb,sc,hdc,ba=false,bb=false,bc=false,sa,s2='',bu,buj=[],s1=butsearchfirstperson();
    if(s1=='') bu=[]; else bu=s1.split('\n');
    for(var i=0;i<gchartshop.length;i++) {
        sa=gchartshop[i]; if(sa=='') continue;
        //bu.push(sa); 
        bu.unshift(sa);
        ba=true;
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



function butselect() {
        if(lindex=='desc') { c.nstyle('idkey1','display','block'); c.nstyle('idkey2','display','none'); c.nstyle('idkey3','display','none'); c.nstyle('idkey4','display','none'); c.val('idsearch','');  lindex='desc';    }
       else if(lindex=='cat') { c.nstyle('idkey1','display','none'); c.nstyle('idkey2','display','block'); c.nstyle('idkey3','display','none'); c.nstyle('idkey4','display','none');c.val('idsearch','');  lindex='cat';    }
       else if(lindex=='spec') { c.nstyle('idkey1','display','none'); c.nstyle('idkey2','display','none'); c.nstyle('idkey3','display','block'); c.nstyle('idkey4','display','none');c.val('idsearch','');  lindex='spec';    }
       else if(lindex=='person') { c.nstyle('idkey1','display','none'); c.nstyle('idkey2','display','none'); c.nstyle('idkey3','display','none'); c.nstyle('idkey4','display','block');c.val('idsearch','');  lindex='person';   }
    
}
accmenu.prototype.but3click = function (n) { 
            if(n==1) {  fs.run('root','maathelp','accstock,Stock Add');  }
       else if(n==2) {   fs.run('root',gbackstock);  }
       else if(n==3) {  fs.run('root','accstockadd',comm,'accstock');}
       else if(n==4) { c.val('idsearch','');  lindex='desc'; butselect();  searchret('');   }
       else if(n==5) { c.val('idsearch','');  lindex='cat'; butselect(); butsearchcat('');   }
       else if(n==7) { c.val('idsearch','');  lindex='spec'; butselect(); butsearchspec('');   }
       else if(n==8) { c.val('idsearch','');  lindex='person'; butselect(); butsearchperson('');   }
       
       else if(n==31) { if((c.nstyle('idpic','display')+'')=='none') c.nstyle('idpic','display','block'); else c.nstyle('idpic','display','none');   }


       else if(n==6) {  fs.run('root','accshopchart','','accshop',ltosend); }
       else if(n==20) { searchret(c.val('idsearch')); }
}
accmenu.prototype.keysupx = function (e) { 
     if(gicallup==false) {  gicallup=true;    setTimeout(function() {  butsearchcat(c.val('idsearch')); },700);   } 
}
accmenu.prototype.keysup = function (e) { 
    if(lindex=='cat') {
        if(gicallup==false) {  gicallup=true;    setTimeout(function() {  butsearchcat(c.val('idsearch')); },700);   } 
    } 
    else if(lindex=='spec') {
        if(gicallup==false) {  gicallup=true;    setTimeout(function() {  searchrealspec(c.val('idsearch')); },700);   } 
    } 
    else if(lindex=='person') {
        if(gicallup==false) {  gicallup=true;    setTimeout(function() {  searchrealperson(c.val('idsearch')); },700);   } 
    } 
    else {    
     if(e.keyCode==13) { searchret(c.val('idsearch')); } 
    }
}

accmenu.prototype.butedit = function (ss) { 
  var hd,sb,s1;
     gchartline=lindex+','+c.val('idsearch'); 
  
  if((c.nstyle('idpic','display')+'')=='none') { } else {  
      gchartline=lindex+','+c.val('idsearch')+',pic'; 
      gchart='';   gchartshop=[]; 
      fs.run('root','accstockitem',ss,'accstock','|'+gnodename);  return; 
      
      
  }
  
  
  //log(ss);   
  
     if(comm.length>0) {
        hd=fs.dopenread(sip,lpass,lpass); 
        if(fs.dfindid(hd,ss,1)==true) {  comm.push('stock');
            s1=fs.dn(hd,'code').trim(); comm.push(s1); 
            s1=fs.dn(hd,'desc').trim(); comm.push(s1);    
            s1=fs.dn(hd,'price').trim(); comm.push(s1);    
        }
       fs.dclose(hd);
       fs.run('root',gbackstock,comm,'acccust');
     } else {     fs.run('root','accstockadd',ss,'accstock'); }
  
//     fs.run('root','accshopitem',ss,'accshop',ltosend); 
}    
//**************************************** display *****************************************************
async function butpicshow() { 
  var hd,sb,sdat,snam,sext,sn;
  hd=await fs.wopenread(sip,lpassnail,lpassnail); if(hd==0) return;
   for(var i=0;i<bufno.length;i++)  {
      sb=bufno[i]; if(sb=='') continue;
      if(await fs.wfindid(hd,sb,1)==true) { 
          sdat=fs.dn(hd,'memo'); snam=fs.xitemget(sdat,1,':'); sdat=fs.xitemlast(sdat,1,':'); sext=fs.xitemgetback(snam,1,'.');
      if(sext=='svg') { sn='data:image/svg+xml;base64,'+fs.x64s(sdat);  } else { sn='data:image/png;base64,'+fs.x64s(sdat); }
      c.html('id'+sb,
        c.img(c.at(c.align('center'),c.src(sn),c.att(c.swh(90,150)) )           )
      )
      //log(sb+':'+snam);
      } 
   }
  fs.dclose(hd);  //log('xxx'+fs.etick());  
}    

async function searchret(ss) {  
//   const a = await who();
//   const b = await what();
//   const c = await where();
    //const [a, b, c] = await Promise.all([who(), what(), where()]);
//*********************************************************************
// async function hello() {  return('Hello Alligator!'); }
// hello().then(function(x) {  log(x); }); // Hello Alligator!
//*************************************************************************
// async function fetchUsers(endpoint) {
//   const res = await fetch(endpoint);
//   let data = await res.json();
//   data = data.map(user => user.username);
//   console.log(data);
// }
// fetchUsers('https://jsonplaceholder.typicode.com/users');
// ["Bret", "Antonette", "Samantha", "Karianne", "Kamren", "Leopoldo_Corkery", "Elwyn.Skiles", "Maxime_Nienow", "Delphine", "Moriah.Stanton"]
//****************************************************
// const saveWebPage = async (url) {
//   const html = await getWebPage(url);
//   const page = await loadPage(url);
//   if (page === null) {
//     await insertPage(url, html);
//   } else {
//     await updatePage(url, html);
//   }
// }
//**************************************************************
// async () => {
//   try {
//     await saveWebPage(url);
//     console.log("Web page saved");
//   } catch (ex) {
//     console.error("Unable to save web page:", ex);
//   }
// })(); // Call our async method immediately

     var sa='',sc,sb='',hdc,kk=0,sline,sno,sqty,icnt=0; bufno=[]; //fs.stick();
     hdc=await fs.wopenread(sip,lpass,lpass); if(hdc==0) return;
     if(await fs.wfind(hdc,lindex,fs.lcase(ss),fs.lcase(ss),'',200)==true) { //sb='';
       fs.dfirst(hdc);
       for(;;) {
         if(fs.deof(hdc)==true) break;
         if(fs.dn(hdc,'del')=='X') { fs.dnext(hdc); continue; }
//          sb=kk+'.'+fs.dn(hdc,'name')+':'+fs.dn(hdc,'memo'); kk++; 
          sb=fs.dn(hdc,'desc'); if(fs.xis(fs.dn(hdc,'onhand'))>0) { sqty='Instock'; } else { sqty='Order'; } icnt++;
          sline=fs.dn(hdc,'cat')+' <b>$'+fs.dn(hdc,'price').trim()+'</b> '+sqty; sno=fs.dn(hdc,'code').trim(); bufno.push(sno);
          //************************************************************************
             sa=sa+c.tr(
               c.td(
               c.table( c.at(c.cellspacing(0),c.cellpadding(0)),
                   c.tr( c.td( c.at(c.att(c.height(20*gy))) )),
                     c.tr( 
                       c.td (
                         c.link( c.at(c.href('#'),  c.onclick('loc.butedit("'+sno+'")')),
                           c.div(c.at(c.id('id'+sno),c.att(c.swh(90,150))))
                         )
                       ), 
                       c.td(  
                        c.link( c.at(c.href('#'),  c.onclick('loc.butedit("'+sno+'")')),
                         c.table( c.at(c.cellspacing(0),c.cellpadding(0)),
                            c.tr( c.td(c.at(c.att(c.padding_left(20*gy),c.font_family('myfont'),c.spfont_size(30*gt))), fs.left(sb,32)) ),
                            c.tr( c.td(c.at(c.att(c.padding_left(20*gy),c.font_family('myfont'),c.spfont_size(12*gt))), sline) )
                         ) //table
                        ) //link
                      ) //td
                 ) //tr
           ) //table
           ))
         //*******************************************************************************
          fs.dnext(hdc);
       }
     }
     fs.dclose(hdc);  //log(icnt+'...');
     c.html('cinfox',c.table( c.at(c.att(c.white_space('nowrap'))),sa ));
     setTimeout(function() { butpicshow();  },0);
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
  var ss,s1,kofs=200,ktop=20,kw=65,kh=50,kadd=kw+10; 
   //******************************* svg *****************************************************************************************************
   ss=c.svg(  c.at(c.id('idmain'),c.nwidth(gwidth),c.cheight(ksep)), //,c.viewbox(0,0,gwr,210),c.viewbox(0,0,gwr,210),c.viewbox('0 0 100 100') c.att(c.background_image(sgrp))
     //******************************************** load font *************************************************************
     c.defs(c.stylesheet(c.font_face(
        c.st(" font-family: 'myfont';  src: url(data:font/ttf;base64,"+gmfont+") format('truetype');  font-weight: normal; font-style: normal;")    
     ))),
     
           //******************** background **********************************************************
           c.rect(c.xywh(0,0,gwr,ksep),c.att(c.fill(fs.theme(2)))), 
           //*******************  heading *****************************************************************
           c.text(c.at(c.xy(15,60),c.onclick('loc.but3click(1)'),c.att(c.fill(fs.theme(1)),c.font_weight(fs.theme(3)),c.fill_opacity(0.8),c.sfont_size(55),c.cursor('pointer'),c.font_family('myfont'))),'Stock'),
           c.image(c.xywh(7,7,15,15),c.xlink(fs.picsvg('xhelp')),c.att(c.cursor('pointer'))           ),
          //******************** incons *************************************************************************************
        //   c.image(c.xywh(kofs+kadd*0,ktop,kw,kh),c.xlink(fs.picsvg('xsetting')),c.onclick('but3click(7)'),c.att(c.cursor('pointer'))           ),

           c.rect(c.id('idpic'), c.xywh(kofs-kadd,ktop-5,kw,kh+10),c.att(c.fill(fs.theme(6)),c.display('none'))), //back selectiom
          c.image(c.xywh(kofs-kadd,ktop,kw,kh),c.xlink(fs.picsvgi('xpic')),c.onclick('loc.but3click(31)'),c.att(c.cursor('pointer'))           ),

          c.image(c.xywh(kofs,ktop,kw,kh),c.xlink(fs.picsvgi('xadd')),c.onclick('loc.but3click(3)'),c.att(c.cursor('pointer'))           ),


          c.image(c.xywh(kofs+kadd*0,ktop,kw,kh),c.xlink(fs.picsvgi('xchart')),c.att(c.cursor('pointer'),c.display('none'))           ),
          c.rect(c.id('idkey5'), c.xywh(kofs+kadd*0,ktop-5,kw,kh+10),c.att(c.fill('transparent'),c.display('none'))), //back selectiom

          c.rect(c.id('idkey4'), c.xywh(kofs+kadd*1,ktop-5,kw,kh+10),c.att(c.fill(fs.theme(6)),c.display('none'))), //back selectiom
          c.image(c.xywh(kofs+kadd*1,ktop,kw,kh),c.xlink(fs.picsvgi('xusersmall')),c.att(c.cursor('pointer'),c.display('none'))           ),

           c.rect(c.id('idkey3'), c.xywh(kofs+kadd*2,ktop-5,kw,kh+10),c.att(c.fill(fs.theme(6)),c.display('none'))), //back selectiom
           c.image(c.xywh(kofs+kadd*2,ktop,kw,kh),c.xlink(fs.picsvgi('xmoney')),c.onclick('loc.but3click(7)'),c.att(c.cursor('pointer'))           ),


           c.rect(c.id('idkey2'), c.xywh(kofs+kadd*3,ktop-5,kw,kh+10),c.att(c.fill(fs.theme(6)),c.display('none'))), //back selectiom
           c.image(c.xywh(kofs+kadd*3,ktop,kw,kh),c.xlink(fs.picsvgi('xcat')),c.onclick('loc.but3click(5)'),c.att(c.cursor('pointer'))           ),
           
           c.rect(c.id('idkey1'), c.xywh(kofs+kadd*4,ktop-5,kw,kh+10),c.att(c.fill(fs.theme(6)),c.display('none'))), //back selectiom
           c.image(c.xywh(kofs+kadd*4,ktop,kw,kh),c.xlink(fs.picsvgi('xdesc')),c.onclick('loc.but3click(4)'),c.att(c.cursor('pointer'))           ),
          
          
  //        c.image(c.xywh(kofs+kadd*4,ktop,kw,kh),c.xlink(fs.picsvg('xadd')),c.onclick('loc.but3click(3)'),c.att(c.cursor('pointer'))           ),
  
  
          //c.image(c.xywh(kofs+kadd*5,ktop,kw+35,kh),c.xlink(fs.picget('icon31')),c.att(c.cursor('pointer'))           ),
          //************************** back ********************************************************************************
//          c.polygon(c.points(20,140,40,160,40,120),c.att(c.fill('#FFFFFF')) ),
          c.image(c.xywh(0,100+4,80,80-8),c.xlink(fs.picsvgi('xxback')),c.att(c.cursor('pointer'))           ),
          
          c.rect(c.xywh(0,100,90,80),c.onclick('loc.but3click(2)'),c.att(c.cursor('pointer'),c.fill('transparent'))),
          //************************** pre-input ********************************************************************************
          c.foreignobject(c.at(c.xywh(70,100,30,80)),c.input(c.at( c.ntype('text'),c.disabled(true),c.att(c.swh(31,80),c.background_color('#FFFFFF'),c.border('1px solid #FFFFFF'))   ))        ),
          c.image(c.xywh(70+5,100+5,31-10,80-10),c.xlink(fs.picsvg('xxsearch'))           ), //image inside
          //************************** input ********************************************************************************
          c.foreignobject(c.at(c.xywh(100,100,400,80)), 
          c.input(c.at(
                  c.ntype('text'),c.hint('Stock item Search'),c.id('idsearch'),c.styl('autocomplete','off'),c.spellcheck(false),c.value(sf),c.onkeyup('loc.keysup(event)'),   
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
      lindex=fs.itemget(gchartline,1);       butselect();      
      if(fs.itemget(gchartline,3)=='pic') { c.nstyle('idpic','display','block');    };
      c.val('idsearch',fs.itemget(gchartline,2));
      if(lindex=='spec') { c.val('idsearch','');  butsearchspec(''); } 
      else if(lindex=='person') { c.val('idsearch','');  butsearchperson(''); } 
      else { searchret(fs.itemget(gchartline,2)); }

};
//********************************************************************************************************
function initfirst(sarg,sdat,sback) {  loc=new accmenu(sarg,sdat,sback);  }


