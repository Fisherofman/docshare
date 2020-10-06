

//***********************************************************************************************************************************
//***********************************************************************************************************************************
//*****************************************************api******************************************************************************
//***********************************************************************************************************************************
//declare var nodeobjects,initfirst,Promise; 
//***********************************************************************************************************************************
function funcsecure() { 
    var xltimtweet=0.0;
    var gcrypto; //=nodeobjects.crypto;
    var gbuffer; //=nodeobjects.gbuffer;
    var edtweet; //=nodeobjects.edtweet;
    var zlib; //=nodeobjects.zlib;

    var blocksize=128;
    var blockofs=80;
    var bt40=40;
    var bthead=10;
    var btcore=blocksize-blockofs; //48
    var btcoreadr=btcore-32;       //16

    var btbetween=blockofs-bt40;   //40
    var btbox=btcore+btbetween;    //88
    var bthash=btbetween+32;       //72

    var btbetweenh=blockofs-bt40-bthead;   //40
    var btboxh=btcore+btbetweenh;    //88
    var bthashh=btbetweenh+32;       //72
    var btportmax=1,btdbnum='',btipservers='',btipserverports='',btsip,btsippub;
    var dai=[],recdata=[],recs=[],recsdoc=[],recsitem=[],recskey=[],recscur=[],recip=[],recpass=[],inxmax=97,dblen=35,xtheme=1;
    var siphttp=(window.location+'').split('/')[2];
//****************************************************** main initial *****************************************************
    funcsecure.prototype.cryptoinit = function () { 
     gcrypto=nodeobjects.crypto;
     gbuffer=nodeobjects.gbuffer;
     edtweet=nodeobjects.edtweet;
     zlib=nodeobjects.zlib;
    };
   funcsecure.prototype.blockmetric = function (ss,sip,siploc) { 
        blocksize=fs.xis(fs.itemget(ss,1));
        blockofs=fs.xis(fs.itemget(ss,2));
        bt40=fs.xis(fs.itemget(ss,3));
        bthead=fs.xis(fs.itemget(ss,4));
        btcore=blocksize-blockofs; //48
        btcoreadr=btcore-32;       //16
        btbetween=blockofs-bt40;   //40
        btbox=btcore+btbetween;    //88
        bthash=btbetween+32;       //72
        btbetweenh=blockofs-bt40-bthead;   //40
        btboxh=btcore+btbetweenh;    //88
        bthashh=btbetweenh+32;       //72
        inxmax=bthashh-1-1-1; //250 ...0
        btportmax=fs.xis(fs.itemget(ss,5));
        btdbnum=fs.itemget(ss,6);
        btipservers=fs.itemget(ss,7);
        btipserverports=fs.itemget(ss,8);
        dblen=fs.xis(fs.itemget(ss,9));
        btsip=siploc;
        btsippub=sip;
   };
//************************************************ general functions ******************************************************** 
    funcsecure.prototype.portmax = function () { return(btportmax); }
    funcsecure.prototype.dbnum = function () { return(btdbnum); }
    funcsecure.prototype.ipservers = function () { return(btipservers); }
    funcsecure.prototype.themeset = function (n) { if(n==undefined) return(xtheme); else { xtheme=n; return(xtheme); } }
    funcsecure.prototype.ipserverports = function () { return(btipserverports); }
    funcsecure.prototype.datakey = function () { if(fs.portmax()>1) { return('datakeyx'); } else { return('datakey'); }}
    //funcsecure.prototype.portmulti = function (sip) {  var n,m,k;  n=fs.portmax();  if(n>1) { m=fs.randomget(1,n)-1; if(m>0) {  k=fs.xis(fs.xitemget(sip,2,':'))+m;  return(fs.xitemget(sip,1,':')+':'+k);  }  }    return(sip);    }
    funcsecure.prototype.portmulti = function(sip) { //return(sip)
     var n,m,mm,k,kk,iserv,iports,sipret;
     iserv=fs.xitemcount(fs.ipservers(),';');  m=iserv; if(iserv>1)  {  m=fs.randomget(1,iserv);    }  
     iports=fs.xis(fs.xitemget(fs.ipserverports(),m,';'));    sipret=fs.xitemget(fs.ipservers(),m,';');
     if(iports>1) { mm=fs.randomget(1,iports)-1;  if(mm>0) { k=fs.xis(fs.xitemget(sipret,2,':'))+mm;  return(fs.xitemget(sipret,1,':')+':'+k);      }    }  
     return(sipret)
    }
    funcsecure.prototype.stick = function () { xltimtweet = new Date();  };
    funcsecure.prototype.etick = function () { var curDate = new Date();     return (curDate - xltimtweet);     };
    funcsecure.prototype.mid = function (ss, n, m) { return (ss.substr(n - 1, m)); };
    funcsecure.prototype.substr = function (ss, n, m) { return (ss.substr(n, m)); };
    funcsecure.prototype.left = function (ss, m) { return (ss.substr(0, m)); };
    funcsecure.prototype.xleft = function (ss) { if (ss.length > 0) { return (ss.substring(0, ss.length - 1)); } else { return (''); } };
    funcsecure.prototype.right = function (ss, m) { return (ss.substr(ss.length - m, m)); };
    funcsecure.prototype.xright = function (ss) { if (ss.length > 0) { return (ss.substr(1, ss.length - 1)); } else { return (''); } };
    
    funcsecure.prototype.lcase = function (ss) { return (ss.toLowerCase()); };
    funcsecure.prototype.ucase = function (ss) { return (ss.toUpperCase()); };
    funcsecure.prototype.instr = function (n, ss, ss1) { return (ss.toLowerCase().indexOf(ss1.toLowerCase(), n - 1) + 1); };
    funcsecure.prototype.xinstr = function (n, ss, ss1) { return (ss.indexOf(ss1, n - 1) + 1); }
    funcsecure.prototype.strout = function (ss, ss1) { var sa = ss; for (; ; ) { if (this.xinstr(1, sa, ss1) > 0) { sa = sa.replace(ss1, '') } else { break; } } return (sa) };
    funcsecure.prototype.strdup = function (ss, n) { var sa = ""; for (var i = 0; i < n; i++) { sa += ss; } return (sa) };
    funcsecure.prototype.strrep = function (ss, ss1, ss2) { var n = 0, m = 0, sa = '';  for (;;) { n = ss.indexOf(ss1, m);  if (n < 0) { sa += ss.substr(m, ss.length - m); break; }  sa += ss.substring(m, n) + ss2;  m = n + ss1.length; }  return (sa); }                                                      
    funcsecure.prototype.space = function (n)   { var sa = ""; for (var i = 0; i < n; i++)   { sa +='&nbsp'; } return (sa) }
    
    funcsecure.prototype.xl = function (s,ln) { if(s.length>=ln) { return(fs.mid(s,1,ln)); }  return(s+fs.strdup(' ',ln-s.length));   };
    funcsecure.prototype.xr = function (s,ln) { s=s.trim(); if(s.length>=ln) { return(fs.right(s,ln)); }  return(fs.strdup(' ',ln-s.length)+s);   };

    funcsecure.prototype.itemget = function (ss, n) { var sxa = ss.split(','); if (n > sxa.length) return (""); else return (sxa[n - 1]); };
    funcsecure.prototype.xitemget = function (ss, n, ssa) { var sxa = ss.split(ssa); if (n > sxa.length) return (""); else return (sxa[n - 1]); };
    funcsecure.prototype.itemgetback = function (ss, n) { var sxa = ss.split(','); var m = sxa.length; if (n > m) return (""); else return (sxa[m - n]); };
    funcsecure.prototype.xitemgetback =  function (ss, n, ssa) { var sxa = ss.split(ssa); var m = sxa.length; if (n > m) return (""); else return (sxa[m - n]); };
    funcsecure.prototype.itemlast = function (ss, n) { var sxb, sxa = ss.split(','); sxb = sxa.slice(n, sxa.length); return (sxb.join(',')); };
    funcsecure.prototype.xitemlast = function (ss, n, ssa) { var sxb, sxa = ss.split(ssa); sxb = sxa.slice(n, sxa.length); return (sxb.join(ssa)); };
    funcsecure.prototype.itemcount = function (ss) { var sxa = ss.split(','); return (sxa.length); };
    funcsecure.prototype.xitemcount = function (ss, ssa) { var sxa = ss.split(ssa); return (sxa.length); };
    funcsecure.prototype.itemnum = function (ss, sa) { var j = 0, i, s2 = sa.toLowerCase(), s1 = ss.toLowerCase().split(','); for (i = 0; i < s1.length; i++) { if (s2 == s1[i]) { j = i + 1; break; } }; return (j); };
    funcsecure.prototype.itemnumcase = function (ss, sa) { var j = 0, i, s2 = sa, s1 = ss.split(','); for (i = 0; i < s1.length; i++) { if (s2 == s1[i]) { j = i + 1; break; } }; return (j); };
    funcsecure.prototype.xitemnum = function (ss, sa, sb) { var j = 0, i, s2 = sa.toLowerCase(), s1 = ss.toLowerCase().split(sb); for (i = 0; i < s1.length; i++) { if (s2 == s1[i]) { j = i + 1; break; } }; return (j); };
    funcsecure.prototype.itemrep = function (ss, ssb, n) { var sxa = ss.split(','); sxa[n - 1] = ssb; return (sxa.join(',')); };
    funcsecure.prototype.xitemrep = function (ss, ssb, n, ssa) { var sxa = ss.split(ssa); sxa[n - 1] = ssb; return (sxa.join(ssa)); };
    
    
    
    funcsecure.prototype.tadj = function (ss) { return (fs.right('00' + ss, 2)); };
    funcsecure.prototype.datedisk = function (ss) { var sa; if(ss==undefined) sa=new Date(); else sa=new Date(ss); return (sa.getFullYear() + '_' + fs.tadj(sa.getMonth() + 1) + '_' + fs.tadj(sa.getDate())    +'_'+fs.tadj(sa.getHours()) + fs.tadj(sa.getMinutes())  + fs.tadj(sa.getSeconds())     ); };
    funcsecure.prototype.datetrans = function (ss) { var sa=fs.strrep(ss,'n','-');     sa=fs.strrep(sa,'m',':');  return(sa); }//2015-03-25T12:00:00Z
    funcsecure.prototype.zone = function (ss) { ss.setHours(ss.getHours()+(ss.getTimezoneOffset()/60)); return(ss);};
    funcsecure.prototype.datecurrent = function (ss) {
      //var sb=fs.strrep(ss,'n','-'); ss=fs.strrep(sb,'m',':'); //2015-03-25T12:00:00Z
      var sa =new Date(); 
      if(navigator.platform=='Win32') sa=fs.zone(sa);
      return (fs.tadj(sa.getMonth() + 1) + '/' + fs.tadj(sa.getDate()) + '/' + sa.getFullYear()+' '+fs.tadj(sa.getHours()) + ':' + fs.tadj(sa.getMinutes())+':'+fs.tadj(sa.getSeconds())); 
    };


    funcsecure.prototype.dateupdate = function (ss) {
      var sb=fs.strrep(ss,'n','-'); ss=fs.strrep(sb,'m',':'); //2015-03-25T12:00:00Z
      var sa =new Date(ss); 
      if(navigator.platform=='Win32') sa=fs.zone(sa);
      return (fs.tadj(sa.getMonth() + 1) + '/' + fs.tadj(sa.getDate()) + '/' + fs.right(sa.getFullYear()+'',2)+' '+fs.tadj(sa.getHours()) + ':' + fs.tadj(sa.getMinutes())); 
    };
    funcsecure.prototype.datelong = function (ss) {
      var sb=fs.strrep(ss,'n','-'); ss=fs.strrep(sb,'m',':'); //2015-03-25T12:00:00Z
      var sa =new Date(ss); 
      if(navigator.platform=='Win32') sa=fs.zone(sa);
      return (fs.right(sa.getFullYear()+'',2)+fs.tadj(sa.getMonth() + 1)+fs.tadj(sa.getDate())+'_'+fs.tadj(sa.getHours())+ fs.tadj(sa.getMinutes())+this.tadj(sa.getSeconds())+'.'+fs.right('000'+sa.getMilliseconds(),3)); 
    };

    funcsecure.prototype.randomget = function (low, high) {  return Math.floor(Math.random() * (high - low+1) + low); }
    funcsecure.prototype.xbyteip = function (ss) {     var sa, sb, s1='',s6; s6=ss.split(':');sa=s6[0]; sb=s6[1]; s6=sa.split('.');  for(var i=0;i<4;i++) {  s1+=String.fromCharCode(s6[i]); } return (fs.chrw(0)+s1+fs.chrw(sb));}
    funcsecure.prototype.xis = function (ss) { var n=parseInt(ss); if(isNaN(n)) return(0); else return(n); };
    funcsecure.prototype.xds = function (ss) { var n=parseFloat(ss);  if(isNaN(n)) return(0.00); else return(n); }; // ss->float
    funcsecure.prototype.xfs = function (sarg) { return (this.xds(sarg).toFixed(2) + ''); };
    funcsecure.prototype.xns = function (sarg) { return (this.xds(sarg).toFixed(4) + ''); };
    funcsecure.prototype.xqs = function (sarg) { return (this.xds(sarg).toFixed(6) + ''); };

    funcsecure.prototype.x64s = function (sarg) { return (btoa(sarg)); };
    funcsecure.prototype.xs64 = function (sarg) { return (atob(sarg)); };
    funcsecure.prototype.xhexs = function (ss) { var sa='',sb=''; if(ss==undefined) return(sa); for (var i = 0; i < ss.length; i++) {  sa=ss.charCodeAt(i).toString(16);  if(sa.length==1) { sa='0'+sa; };   sb+=sa;  } return(sb); };
    funcsecure.prototype.xshex = function (ss) {  var sa='';   if(ss==undefined) return(sa);  for(var i=0;i<ss.length;i+=2) { sa+=String.fromCharCode(parseInt(ss.substr(i,2),16));   } return(sa);  };

    funcsecure.prototype.xso = function (obj) {   return JSON.stringify(obj); }
    funcsecure.prototype.xos = function (ss) {   return JSON.parse(ss); }

    funcsecure.prototype.chrb = function (m) {  var sa=String.fromCharCode(m);  return(sa); };
    funcsecure.prototype.chrw=function(n) { var cc=gbuffer.alloc(2); cc.writeUInt16LE(n,0); return(cc.toString('binary')); }
    funcsecure.prototype.chrwr=function(n) { var cc=gbuffer.alloc(2); cc.writeUInt16BE(n,0); return(cc.toString('binary')); }
    funcsecure.prototype.chrd=function(n) { var cc=gbuffer.alloc(4); cc.writeUInt32LE(n,0); return(cc.toString('binary')); }
    funcsecure.prototype.chrdr=function(n) { var cc=gbuffer.alloc(4); cc.writeUInt32BE(n,0); return(cc.toString('binary')); }

    funcsecure.prototype.chrddr=function(n) { var cc=gbuffer.alloc(8);
      if(n<4294967296) { cc.writeUInt32BE(n,4); cc.writeUInt32BE(0,0);       }
      else {
         var MAX_UINT32 = 0x00000000FFFFFFFF;
         var high = 0;
         var signbit= n & 0xFFFFFFFF;
         var low=signbit < 0 ? (n & 0x7FFFFFFF) + 0x80000000 : signbit;
         if (n>MAX_UINT32) {   high = (n - low) / (MAX_UINT32 + 1);     }
         cc.writeUInt32BE(low,4);
         cc.writeUInt32BE(high,0);
      }
      return(cc.toString('binary'));
  };
  funcsecure.prototype.ascb = function (ss) { var n=0; return(ss.charCodeAt(n)); };
  funcsecure.prototype.ascwr=function(ss) {  var cc=gbuffer.from(ss,'binary'); return(cc.readUInt16BE(0)); }
  funcsecure.prototype.ascd=function(ss) {  var cc=gbuffer.from(ss,'binary'); return(cc.readUInt32LE(0)); }
  funcsecure.prototype.ascdr=function(ss) {  var cc=gbuffer.from(ss,'binary'); return(cc.readUInt32BE(0)); }
  funcsecure.prototype.ascddr=function(ss) { var cc=gbuffer.from(ss,'binary'); return((4294967296*cc.readUInt32BE(0))+cc.readUInt32BE(4));   };
  funcsecure.prototype.xas = function (ss) {  var bb=new Uint8Array(ss.length);    for(var i=0;i<ss.length;i++) {  bb[i]=ss.charCodeAt(i);  }  return(bb); };
  funcsecure.prototype.xsa = function (bb) {  var sa='';   for (var i=0;i<bb.length;i++) { sa+=String.fromCharCode(bb[i]); }  return(sa); };
  funcsecure.prototype.xsalen = function (ln) {  var bb=new Uint8Array(ln);   return(fs.xsa(bb)); };

funcsecure.prototype.sha256 = function(ss) {  return(gcrypto.createHash('sha256').update(ss,'binary').digest('latin1')); };
funcsecure.prototype.sha256hex = function (ss) {  return(gcrypto.createHash('sha256').update(ss,'binary').digest('hex')); }

funcsecure.prototype.sha128 = function (ss) {  return(gcrypto.createHash('md5').update(ss,'binary').digest('latin1')); }
funcsecure.prototype.encrypt = function(ss,spass) {   var cipher = gcrypto.createCipher('aes-256-cbc',spass);   var crypted = cipher.update(ss,'binary','binary');  crypted += cipher.final('binary');  return crypted;};
funcsecure.prototype.decrypt = function(ss,spass) {   var decipher = gcrypto.createDecipher('aes-256-cbc',spass);   var sdec = decipher.update(ss,'binary','binary');    sdec += decipher.final('binary');  return sdec;};
funcsecure.prototype.encode = function(ss) {  return(encodeURIComponent(ss)); };
funcsecure.prototype.decode = function(ss) {  return(decodeURIComponent(ss)); };
funcsecure.prototype.zip = function (ss) {  var buf=zlib.deflateRawSync(gbuffer.from(ss,'binary'));  return(buf.toString('Binary'));};  
funcsecure.prototype.unzip = function (ss,sfn) {  var buf=zlib.inflateRawSync(gbuffer.from(ss,'binary'));  return(buf.toString('Binary')); }  ;
funcsecure.prototype.pageparm = function(name,sa) {
        var saa,sbb,scc,sb = "", sc = ""; //, sa = window.location.href;
        saa =sa.split('?');  if (saa.length==1) return ('');
        sa=saa[1]; saa=sa.split('&');
         for (var i = 0;i<saa.length; i++) { 
             sb = saa[i]; sbb=sb.split('=');
             sc = sbb[0];
             if(sc==name) { sc=sbb[1]; scc=sc.split('#'); return(scc[0]);  }
        }
        return ('');
}


//************************************************ access to cloud ******************************************************** 
//************************************************ access to cloud ******************************************************** 
 funcsecure.prototype.rcall = function (sdat,sfn,tt) {  
        sdat=fs.x64s(sdat); 
        var req = new XMLHttpRequest();
        req.open('POST','http://'+siphttp+'/petacall', true);
        req.timeout = tt;
        req.onload = function(e) {    if (req.status != 200) { sfn('errorx') } else { sfn(req.response); }        }
        req.onerror = function(e) { sfn('error');        }
        req.ontimeout = function(e) { sfn('timeout');     }
        req.setRequestHeader('Content-type','application/octet-stream');
        var blob = new Blob([sdat], {type: 'application/octet-stream'});
        req.send(blob);
 };
funcsecure.prototype.rcallget = function (sdat) {   sdat=fs.x64s(sdat); 
      var req = new XMLHttpRequest();  req.open('POST','http://'+siphttp+'/petacall', false);  req.setRequestHeader("Content-type","application/octet-stream"); 
      var blob = new Blob([sdat], {type: 'application/octet-stream'});   req.send(blob);  if (req.status != 200) return ''; return req.response;
}; 
funcsecure.prototype.scriptload = function(ss) { 
        var script = document.createElement('script');	
        //script.language = 'javascript';  
        script.type = 'text/javascript';    script.text = ss; 
        document.head.appendChild(script); 
        document.head.removeChild(script);
};

 funcsecure.prototype.httpsip = function (sip) { siphttp=sip; };
 funcsecure.prototype.rpost = function (sip,ss,sfn) {  return(fs.rcall('write|rpostnew|10000,'+sip+','+ss,sfn,10000));  };
 funcsecure.prototype.rpostl = function (tt,sip,ss,sfn) {  return(fs.rcall('write|rpostnew|'+tt+','+sip+','+ss,sfn,tt));  };
 //funcsecure.prototype.rpostloc = function (sip,ss,sfn,siploc) {  return(fs.rcall(siploc,'write|rpostnew|2000,'+sip+','+ss,sfn,2000));  };
 //funcsecure.prototype.rpostlloc = function (tt,sip,ss,sfn,siploc) {  return(fs.rcall(siploc,'write|rpostnew|'+tt+','+sip+','+ss,sfn,tt));  };
 funcsecure.prototype.rpostget = function (sip,ss) {  return(fs.rcallget('write|rpostnew|10000,'+sip+','+ss));  };
 funcsecure.prototype.rpostlget = function (tt,sip,ss) {  return(fs.rcallget('write|rpostnew|'+tt+','+sip+','+ss));  };
 funcsecure.prototype.initcryptoscript = function (sip) { var sc=fs.rpostget(sip,'write|blockrunget|crypto');   fs.scriptload(fs.xs64(sc)); fs.cryptoinit(); };
 funcsecure.prototype.initmetric = function (sip,loc) {    var sa=fs.rpostget(sip,'write|blockmetric'); if(loc==undefined) loc=sip; fs.blockmetric(sa,sip,loc);  };

 //******************************** tweet randomencrypt signatures
funcsecure.prototype.randomtweet = function() {   var rand=gcrypto.randomBytes(16);  return(rand.toString('binary'));};
funcsecure.prototype.randomtweetn = function(n) { var rand=gcrypto.randomBytes(n);   return(rand.toString('binary'));};
funcsecure.prototype.signtweetenc = function(hmsg,pub) { // hmsg=randombytes(16)
 //if(edtweet==undefined) { edtweet=require(bdirm+'tweetnacl'); }
 var clientKeys = edtweet.box.keyPair();
 var nonce = new Uint8Array(edtweet.box.nonceLength);
 var msg =fs.xas(hmsg);
 var puba=fs.xas(pub);
 var sig = edtweet.box(msg, nonce,puba, clientKeys.secretKey);
 return(fs.xsa(clientKeys.publicKey)+fs.xsa(sig)); // 32+16+16
};	
funcsecure.prototype.signtweete = function(hmsg,pri) { // hash32,private
 //if(edtweet==undefined) { edtweet=require(bdirm+'tweetnacl'); }
 var clientKeys = edtweet.box.keyPair();
 var nonce =fs.xas(hmsg.substr(8,hmsg.length-8));
 var msg =fs.xas(hmsg.substr(0,8));
 var pria=fs.xas(pri);
 var sig = edtweet.box(msg, nonce,clientKeys.publicKey,pria);
 return(fs.xsa(clientKeys.secretKey)+fs.xsa(sig)); // 32+8+16
};
funcsecure.prototype.keypairtweete = function(passw) { // ==keypair
 //if(edtweet==undefined) { edtweet=require(bdirm+'tweetnacl'); }
 var seed=fs.xas(passw);
 var kp=  edtweet.box.keyPair.fromSecretKey(seed);
 return({pri:fs.xsa(kp.secretKey),pub:fs.xsa(kp.publicKey)});
};
funcsecure.prototype.verifytweetenc = function(hmsg,pri) { // hmsg=randombytes(16)
// if(edtweet==undefined) { edtweet=require(bdirm+'tweetnacl'); }
 var nonce = new Uint8Array(edtweet.box.nonceLength);
 var pria=fs.xas(pri);
 var ans = edtweet.box.open(fs.xas(hmsg.substr(32,hmsg.length-32)),nonce,fs.xas(hmsg.substr(0,32)),pria); 
 return(fs.xsa(ans)); //
}	
funcsecure.prototype.encrypttweet = function(hmsg,key) { // hash32,pub,signature
 //if(edtweet==undefined) { edtweet=require(bdirm+'tweetnacl'); }
 var nonce =new Uint8Array(24); 
 var ans=edtweet.secretbox(fs.xas(hmsg), nonce, fs.xas(fs.sha256(key)));
 return(fs.xsa(ans));
}	
funcsecure.prototype.decrypttweet = function(hmsg,key) { // hash32,pub,signature
// if(edtweet==undefined) { edtweet=require(bdirm+'tweetnacl'); }
 var nonce =new Uint8Array(24); 
 var ans=edtweet.secretbox.open(fs.xas(hmsg), nonce,  fs.xas(fs.sha256(key)));
 return(fs.xsa(ans));
}	
funcsecure.prototype.encrypttweet70 = function(hmsg,key) { // hash32,pub,signature
 //if(edtweet==undefined) { edtweet=require(bdirm+'tweetnacl'); }
 var nonce =new Uint8Array(24); 
 var ans=edtweet.secretbox(fs.xas(encodeURIComponent(hmsg)), nonce, fs.xas(fs.sha256(key)));
 return(fs.xsa(ans));
}	
funcsecure.prototype.decrypttweet70 = function(hmsg,key) { // hash32,pub,signature
 //if(edtweet==undefined) { edtweet=require(bdirm+'tweetnacl'); }
 var nonce =new Uint8Array(24); 
 var ans=edtweet.secretbox.open(fs.xas(hmsg), nonce,  fs.xas(fs.sha256(key)));
 return(decodeURIComponent(fs.xsa(ans)));
}	

funcsecure.prototype.dbkey = function (spass) {    return(fs.keypairtweete(fs.sha256(spass)));    };
funcsecure.prototype.dbdatarand = function (info,nrand,n) {
nrand=fs.xhexs(fs.xl(nrand,16)); 
try { //len1,sig64..sig64..,enc(+16)
    var sdat=fs.xs64(info);
    var ln=fs.ascb(sdat.substr(0,1));
    var ofs=(ln*64)+1;
   // var sig64=sdat.substr((64*(n-1))+1,64);
    var srand16=fs.xshex(nrand); //fc.verifytweetenc(sig64,prikey.pri);
    var enc=sdat.substr(ofs,sdat.length-ofs);
    var ss=fs.decrypttweet(enc,srand16); //changed
    return(ss);
} catch(e)    { return(''); }
}

funcsecure.prototype.dbdataget = function (info,prikey,n) {
    // len1
    // sig64..sig64..sig64..sig64..   (sign64+pri->srand16)
    // data encrypted                 ( ans=decrypt(data,srand16) )
try { //len1,sig64..sig64..,enc(+16)
    var sdat=fs.xs64(info);
    var ln=fs.ascb(sdat.substr(0,1));
    var ofs=(ln*64)+1;
    var sig64=sdat.substr((64*(n-1))+1,64);
    var srand16=fs.verifytweetenc(sig64,prikey.pri); //    hash(prikey.pri+hash2(pass))
    var enc=sdat.substr(ofs,sdat.length-ofs);
    var ss=fs.decrypttweet(enc,srand16);
    return(ss);
} catch(e)    { return(''); }
};
funcsecure.prototype.dbdataget70 = function (info,prikey,n) {
try { //len1,sig64..sig64..,enc(+16)
    var sdat=fs.xs64(info);
    var ln=fs.ascb(sdat.substr(0,1));
    var ofs=(ln*64)+1;
    var sig64=sdat.substr((64*(n-1))+1,64);
    var srand16=fs.verifytweetenc(sig64,prikey.pri);
    var enc=sdat.substr(ofs,sdat.length-ofs);
    var ss=fs.decrypttweet70(enc,srand16);
    return(ss);
} catch(e)    { return(''); }
};


funcsecure.prototype.transsend42 = function(adr1,desc,loc,sip,priv) { // publicaddrss,name,loc,sip,privatekey
  var blksize=blocksize,descsize=btbetween-1,amount=0,adr2=adr1;
  var b1=adr1+fs.chrb(42)+fs.xl(desc,descsize)+fs.xbyteip(sip);
  var b2=adr2+fs.chrb(43)+fs.xl(loc,descsize);
  var hash=fs.sha256(b1+b2);
  var box=fs.signtweete(hash,priv);
  b1=fs.xsalen(btcoreadr)+b1+box.substr(32,box.length-32); //24
  b2=fs.xsalen(btcoreadr)+b2+box.substr(0,32);
  b1=b1+fs.xsalen(blksize-b1.length); //8
  b2=b2+fs.xsalen(blksize-b2.length);
  return(b1+b2);
}

//*********************************************************************************************************************************************
//**********************************************basic calls***********************************************************************************************
//*********************************************************************************************************************************************
//1.adrpub
//2.pri1+pri2+pri3..
//3.ofs .. last blockchain record of adrpub
//4.amount=0
//5.Money|startout-[randomadr]|starin-[randomadr]|...
//6. mess=4len1,amt8,tot8,mess
//7. doc=len1,filename,data
//8. txte
//9. key.pri
//10.70
//11. nrand32(hex)=password


//  |<------------------------------------blocksize-------------------------------------->| 164 (128+36)
//                       |<---------------blockofs----------------------------------------| =116
//  |<---btcore--------->|=48
//  |<btcadr>|=16
//                                                              |<--- bthead10------>|
//                       |<-------btbetweenh66----->|<--32----->|
//  |<----------------------------btboxh78--------->|<-8--24--->|
//  |<---btcore48------->|<-------bthashh98-------------------->|<--- bthead10----->|date8
//  hashdoc16|addressfr32|72|description9|item32|24.|sign32.....|len1|blockno8 |bin1|date8  len1=no of pubs
//  ofs8|bal8|addressto32|73|description97......................|cnt1|ext4|ofs4|bin1|date8
//  ofs8|bal8|addressto32|73|description97......................|cnt2|ext4|ofs4|bin1|date8
//  ------------------------------------------------------------------------------------

funcsecure.prototype.transsend704real = function(adr1,adr2,ofs,amount,desc,doc1,doc2,ext,priv,itype,nrand,nsplit) { // adr1sender,adr1adr2adr3,amount,desc,docdata,ext,priv
var blksize=blocksize,descsize=btbetweenh-1+32;
var desc2; if(nsplit==undefined) desc2=desc.split('|'); else desc2=desc;
function subdescx(n)  { if(n<desc2.length) return(desc2[n]);   else return(desc2[desc2.length-1]); }
function subdesc(n)  { if(n<desc2.length) return(fs.xl(desc2[n],descsize));   else return(fs.xl(desc2[desc2.length-1],descsize)); }
function subdescln(n,l)  { if(n<desc2.length) return(fs.xl(desc2[n],descsize-l));   else return(fs.xl(desc2[desc2.length-1],descsize-l)); }
function subadrtest() {
    var l=adr2.length/32,ad=[],p,ba,adr='',r='';
function subsubtest(p,i) {  for(var j=i+1;j<ad.length;j++) { if(p==ad[j]) { ad.splice(j,1); subsubtest(p,i); return; }        }    }
    for(var i=0;i<l;i++) { ad.push(adr2.substr(i*32,32)); }
    for(var i=0;i<ad.length;i++) {    p=ad[i]; subsubtest(p,i);    }
    for(var i=0;i<ad.length;i++) { adr+=ad[i]; }
    return(adr);
}
  adr2=subadrtest(); if(nrand==undefined) nrand=''; // test for duplications
  var srand; if(nrand.length==32) srand=fs.xshex(nrand); else srand=fs.randomtweet(); //password
  var item=fs.randomtweetn(32);
  //alert(fs.xhexs(srand)+','+nrand+','+fs.xright(doc2)+':'+doc2.length); //doc2='hello';
  var ln=adr2.length/32; //alert(ln);// must be two
  var sext=fs.xl(ext,4);
  var ic=0;
  var b1=adr1+fs.chrb(itype)+subdescln(0,56+32)+item;   //addr32+type1+(descsize97-sign56-item32)9
  var b2='',b3='',sk,sk1,sk2,bt,hash,box,pub,sig,sigtot='',enc1,enc2,sdat,lnn=ln,dochash;
  if(doc2.length>0) { enc2=fs.encrypttweet(doc2,srand); dochash=fs.sha128(enc2);  } else { enc2='';  dochash=fs.strdup(fs.chrb(0),16); } //xx
  for(var i=0;i<ln;i++) {
    pub=adr2.substr(i*32,32); 
    sk=subdescx(i+1); sk1=sk; //sk1=fs.xitemget(sk,1,'-'); sk2=fs.xshex(fs.xitemlast(sk,1,'-'));
    if(i==0) bt=pub+fs.chrb(itype+1)+fs.xl(sk1,descsize);        
       else  bt=pub+fs.chrb(itype+1)+fs.xl(sk1,descsize);  
    b3+=bt;     
    b2+=fs.xsalen(btcoreadr)+bt; ic++;
    b2+=fs.chrb(ic)+sext+fs.xsalen(bthead-5+8); 
    // |dochash16 adr32 72 money9 item32| sign56  2 blockno8  0    date8     |...| datatosign
    // 8    8    |adr32 73 desc97                |1 ext4 ofs4 bin1 date8
    // 8    8    |adr32 73 desc97                |2 ext4 ofs4 bin1 date8
    sig=fs.signtweetenc(srand,pub); sigtot+=sig; //sig64
  }    
  hash=fs.sha256(dochash+b1+b3); // dochash+owner+allOther
  box=fs.signtweete(hash,priv); // sign56    hash(priv+hash2(pass))
  b2=dochash+b1+box+fs.chrb(ln)+fs.xsalen(bthead-1+8)+b2;       // dochash16+(adr32+type1+desc9+item32)+sign56+ln1+blockno8+1+date8  
//  enc1=fs.encrypttweet(doc1,srand);   enc2=fs.encrypttweet(doc2,srand);
  enc1=fs.encrypttweet(doc1,srand);    // 0  ,0,adr,71,desc29,desc32  ,n1 ,ext4,ofs4,bin1,date8 ....
  //if(doc2.length>0) enc2=fs.encrypt(doc2,srand); else enc2='';
  sdat=fs.chrb(ln)+sigtot+fs.chrddr(enc1.length)+enc1+fs.chrddr(enc2.length)+enc2;  
  return(b2+fs.chrddr(sdat.length)+sdat);                       // len8,ln1,sigtot64..64,len8,enc1mess,len8,enc2data

}
//**************************** db multi (hashdoc...+item+sign56)*********************************************************************
funcsecure.prototype.transsend704 = function(adr1,adr2,ofs,amount,desc,doc1,doc2,ext,priv,nrand) { // adr1sender,adr1adr2adr3,amount,desc,docdata,ext,priv
  return(fs.transsend704real(adr1,adr2,ofs,amount,desc,doc1,doc2,ext,priv,72,nrand));
}
funcsecure.prototype.transsend704ex = function(adr1,adr2,ofs,amount,desc,doc1,doc2,ext,priv,nrand) { // adr1sender,adr1adr2adr3,amount,desc,docdata,ext,priv
 
  return(fs.transsend704real(adr1,adr2,ofs,amount,desc,doc1,doc2,ext,priv,72,nrand,1));
}
//****************************************************************************************************************************************
//****************************************************************************************************************************************
//****************************************************************************************************************************************
//****************************************************************************************************************************************

//*********************************************** get example 2 *****************************************************************
//*********************************************** get example 2 *****************************************************************
funcsecure.prototype.mailsendmicro=function (sip,semail,shead,sdoc,sfn) { 
  var mess,doc,desc,sfile,skey,keyto,ssend,pubm,sa,sb,sc; 
      keyto=fs.rpostget(sip,'write|addressgetnameadr|'+semail);  if(keyto.length==(dblen*2)) { } else {  sfn('error:'+semail+' not registered'); return; }
      if(sdoc=='') { sdoc=' ' } sdoc=fs.zip(fs.encode(sdoc));
      sfile='email'+fs.xhexs(fs.randomtweetn(2))+'.htmd';
      skey=fs.dbkey('maatadrdatagulati123'); pubm=skey.pub;    //generate a keypair 
      desc='011100000000|';                                    //itemdouble cross only all moneyfile
      mess=fs.chrb(4)+fs.chrddr(0)+fs.chrddr(0)+shead;         //setup header
      doc=fs.chrb(sfile.length)+sfile+sdoc;                    //setuo email body
      ssend=fs.transsend704(pubm,pubm+fs.xshex(keyto),0,0,desc,mess,doc,'txte',skey.pri,''); 
      fs.rpost(sip,'write|blockminingdo|30,'+ssend,function(sn) {  sfn(sn);       });
}
//*************************************************************************************************************************************************
//*************************************************************************************************************************************************
//*************************************************************************************************************************************************
//*************************************************************************************************************************************************
//*************************************************************************************************************************************************
funcsecure.prototype.llog=function (ss) {   var sa=fs.rpostget('192.168.0.104:9000','write|blockecholog|'+ss); return(sa); }    
funcsecure.prototype.log=function (ss) {   var sa=fs.rpostget(btsippub,'write|blockecholog|'+ss); return(sa); }    
                        function log(ss) {   var sa=fs.rpostget(btsippub,'write|blockecholog|'+ss); return(sa); }    
funcsecure.prototype.logip=function (sip,ss) {   var sa=fs.rpostget(sip,'write|blockecholog|'+ss); return(sa); }    
funcsecure.prototype.logx=function (ss) {   var sa=fs.rpostget('192.168.0.104:9000','write|blockecholog|'+ss); return(sa); }    
funcsecure.prototype.filereadasc=function (ss,sfn) { 
  var sa;
  if(typeof(sfn)=='function') { fs.rpost(btsip,'write|blockfilereadasc|'+ss,function(sn) { sfn(sn); }); } 
                         else { sa=fs.rpostget(btsip,'write|blockfilereadasc|'+ss); return(sa); }
}    
funcsecure.prototype.fileread=function (sip,ss,sfn) { 
  var sa;
  if(typeof(sfn)=='function') { fs.rpost(sip,'write|blockfilereadasc|'+ss,function(sn) { sfn(fs.xs64(sn)); }); } 
                         else { sa=fs.rpostget(sip,'write|blockfilereadasc|'+ss); return(fs.xs64(sa)); }
}    
funcsecure.prototype.filereaddir=function (sip,ss,sfn) { 
  var sa;
  if(typeof(sfn)=='function') { fs.rpost(sip,'write|blockfilereadascdir|'+ss,function(sn) { sfn(fs.x64(sn)); }); } 
                         else { sa=fs.rpostget(sip,'write|blockfilereadascdir|'+ss); return(fs.xs64(sa)); }
}    


funcsecure.prototype.filewrite=function (sip,ss,sdat,sfn) { 
  var sa;
  if(typeof(sfn)=='function') { fs.rpost(sip,'write|blockfilewrite|'+ss+','+sdat,function(sn) { sfn(sn); }); } 
                         else { sa=fs.rpostget(sip,'write|blockfilewrite|'+ss+','+sdat); return(sa); }
}    


funcsecure.prototype.picget=function (ss,sfn) {
  var sa;
  if(typeof(sfn)=='function') { fs.rpost(btsip,'write|blockpicget|'+ss,function(sn) { sfn('data:image/png;base64,'+sn); }); } 
                         else { sa=fs.rpostget(btsip,'write|blockpicget|'+ss); return('data:image/png;base64,'+sa); }
}                         
funcsecure.prototype.theme=function (n) { 
 var sa;
 if(n==1)   { //writting heading
   sa='#f6e7ed';
   if(xtheme==2) { sa='#332b60'; }
   else if(xtheme==3) { sa='#a83300'; } //dark
   else if(xtheme==4) { sa='#426382'; } //dark
   else if(xtheme==5) { sa='#008780'; } //dark
   else if(xtheme==5) { sa='#FFFFFF'; } //dark
   else if(xtheme==6) { sa='#44180f'; } //dark
   else if(xtheme==7) { sa='#b78300'; } //dark
   else if(xtheme==8) { sa='#d13085'; } //dark
   else if(xtheme==9) { sa='#49047f'; } //dark
   else if(xtheme==10) { sa='#FFFFFF'; } //dark
   else if(xtheme==11) { sa='#FFFFFF'; } //dark
   else if(xtheme==12) { sa='#FFFFFF'; } //dark
   else if(xtheme==13) { sa='#FFFFFF'; } //dark
   else if(xtheme==14) { sa='#FFFFFF'; } //dark
   else if(xtheme==15) { sa='#FFFFFF'; } //dark
 }
 else if(n==2) { //background box
   sa='#611024';
   if(xtheme==2) { sa='#d9d9d9'; }
   else if(xtheme==3) { sa='#f9eae5'; } //light
   else if(xtheme==4) { sa='#d0d9e0'; } //light
   else if(xtheme==5) { sa='#c4d6d5'; } //light
   else if(xtheme==5) { sa='#008780'; } //light
   else if(xtheme==6) { sa='#e2dedc'; } //light
   else if(xtheme==7) { sa='#eae4ce'; } //light
   else if(xtheme==8) { sa='#e5d8e1'; } //light
   else if(xtheme==9) { sa='#e6dfed'; } //light
   else if(xtheme==10) { sa='#008780'; } //light
   else if(xtheme==11) { sa='#426382'; } //light
   else if(xtheme==12) { sa='#a83300'; } //dark
   else if(xtheme==13) { sa='#054c44'; } //dark
   else if(xtheme==14) { sa='#b78300'; } //dark
   else if(xtheme==15) { sa='#d13085'; } //dark
   
 }
 else if(n==3) { //writing heading bold
   sa='normal';
   if(xtheme==2) { sa='bold'; }
   else if(xtheme==3) { sa='bold'; }
   else if(xtheme==4) { sa='bold'; }
   else if(xtheme==5) { sa='bold'; }
   else if(xtheme==6) { sa='bold'; }
   else if(xtheme==7) { sa='bold'; }
   else if(xtheme==8) { sa='bold'; }
   else if(xtheme==9) { sa='bold'; }
   else if(xtheme==10) { sa='normal'; }
   else if(xtheme==11) { sa='normal'; }
   else if(xtheme==12) { sa='normal'; }
   else if(xtheme==13) { sa='normal'; }
   else if(xtheme==14) { sa='normal'; }
   else if(xtheme==15) { sa='normal'; }
 }
 else if(n==4) { //writing inbox
   sa='#E0E0E0';
   if(xtheme==2) { sa='#bebed3'; }
   else if(xtheme==3) { sa='#af562e'; } //medium
   else if(xtheme==4) { sa='#517da2'; } //medium
   else if(xtheme==5) { sa='#349991'; } //medium
   else if(xtheme==6) { sa='#512f2a'; } //medium brown
//   else if(xtheme==6) { sa='#af562e'; } //medium
   else if(xtheme==7) { sa='#b58f41'; } //medium 512f2a 5a2014
   else if(xtheme==8) { sa='#cc6da6'; } //medium 512f2a 5a2014
   else if(xtheme==9) { sa='#6343aa'; } //medium 512f2a 5a2014
   else if(xtheme==10) { sa='#349991'; } //medium
   else if(xtheme==11) { sa='#517da2'; } //medium
   else if(xtheme==12) { sa='#af562e'; } //medium
   else if(xtheme==13) { sa='#075e55'; } //back light organe
   else if(xtheme==14) { sa='#b58f41'; } //back green
   else if(xtheme==15) { sa='#cc6da6'; } //medium 512f2a 5a2014
 }
 else if(n==5) { //writing color help
   sa='#FFFFFF';
   if(xtheme==2) { sa='#332b60'; }
   else if(xtheme==3) { sa='#a83300'; } //dark
   else if(xtheme==4) { sa='#426382'; } //dark
   else if(xtheme==5) { sa='#008780'; } //dark
   else if(xtheme==6) { sa='#44180f'; } //dark
   else if(xtheme==7) { sa='#b78300'; } //dark
   else if(xtheme==8) { sa='#d13085'; } //dark
   else if(xtheme==9) { sa='#49047f'; } //dark
   else if(xtheme==10) { sa='#FFFFFF'; } //dark
   else if(xtheme==11) { sa='#FFFFFF'; } //dark
   else if(xtheme==12) { sa='#FFFFFF'; } //dark
   else if(xtheme==13) { sa='#FFFFFF'; } //dark
   else if(xtheme==14) { sa='#FFFFFF'; } //dark
   else if(xtheme==15) { sa='#FFFFFF'; } //dark
 }
 else if(n==6) { //icon highlight
   sa='red';
   if(xtheme==2) { sa='#A0A0A0'; }  //gray blue
   else if(xtheme==3) { sa='#af562e'; } //orange
   else if(xtheme==4) { sa='#517da2'; } //medium light blue
   else if(xtheme==5) { sa='#349991'; } //medium green
//   else if(xtheme==6) { sa='#512f2a'; } //medium brown
   else if(xtheme==6) { sa='#af562e'; } //medium
   else if(xtheme==7) { sa='#b58f41'; } //medium yellow
   else if(xtheme==8) { sa='#cc6da6'; } //medium pink
   else if(xtheme==9) { sa='#6343aa'; } //medium purple
   else if(xtheme==10) { sa='#349991'; } //back light green
   else if(xtheme==11) { sa='#517da2'; } //back light blue
   else if(xtheme==12) { sa='#af562e'; } //back light organe
   else if(xtheme==13) { sa='#075e55'; } //back green
   else if(xtheme==14) { sa='#b58f41'; } //back yellow
   else if(xtheme==15) { sa='#cc6da6'; } //medium 512f2a 5a2014
   
 }
 else if(n==7) { //icon highlight
   sa='#FFFFFF';
//   if(xtheme==2) { sa='#A0A0A0'; }  //gray blue
//   else if(xtheme==3) { sa='#af562e'; } //orange
//   else if(xtheme==4) { sa='#517da2'; } //medium light blue
//   else if(xtheme==5) { sa='#349991'; } //medium green
// //   else if(xtheme==6) { sa='#512f2a'; } //medium brown
//   else if(xtheme==6) { sa='#af562e'; } //medium
//   else if(xtheme==7) { sa='#b58f41'; } //medium yellow
//   else if(xtheme==8) { sa='#cc6da6'; } //medium pink
//   else if(xtheme==9) { sa='#6343aa'; } //medium purple
   if(xtheme==10) { sa='#008780'; } //light
   else if(xtheme==11) { sa='#426382'; } //light
   else if(xtheme==12) { sa='#a83300'; } //dark
   else if(xtheme==13) { sa='#054c44'; } //dark
   else if(xtheme==14) { sa='#b78300'; } //dark
   else if(xtheme==15) { sa='#d13085'; } //dark
   
 }
 else if(n==8) { //writing heading bold
   sa=0.8;
   if(xtheme==10) { sa=1; }
   else if(xtheme==11) { sa=1; }
   else if(xtheme==12) { sa=1; }
   else if(xtheme==13) { sa=1; }
   else if(xtheme==14) { sa=1; }
   else if(xtheme==15) { sa=1; }
 }


 return(sa);
}    
funcsecure.prototype.picsvgi=function (ss,m,sfn) { 
  var sa;
function subpic(sn) {
    var ss=fs.xs64(sn); 
    var n=fs.instr(1,ss,'#');
    var sa='f6e7ed';
    if(xtheme==2) { sa='332b60'; }
    else if(xtheme==3) { sa='a83300'; } //dark
    else if(xtheme==4) { sa='426382'; } //dark light blue
    else if(xtheme==5) { sa='008780'; } //dark
   else if(xtheme==6) { sa='44180f'; } //dark
   else if(xtheme==7) { sa='b78300'; } //dark
   else if(xtheme==8) { sa='d13085'; } //dark
   else if(xtheme==9) { sa='49047f'; } //dark
   else if(xtheme==10) { sa='FFFFFF'; } //dark
   else if(xtheme==11) { sa='FFFFFF'; } //dark
   else if(xtheme==12) { sa='FFFFFF'; } //dark
   else if(xtheme==13) { sa='FFFFFF'; } //dark
   else if(xtheme==14) { sa='FFFFFF'; } //dark
   else if(xtheme==15) { sa='FFFFFF'; } //dark
    
    if(m==undefined) { } else {
        sa='46131f';
        if(xtheme==2) {  sa='332b60'; }
        else if(xtheme==3) { sa='a83300'; } //dark
        else if(xtheme==4) { sa='426382'; } //dark light blue
        else if(xtheme==5) { sa='008780'; } //dark
//   else if(xtheme==5) { sa='FFFFFF'; } //dark
   else if(xtheme==6) { sa='44180f'; } //dark
   else if(xtheme==7) { sa='b78300'; } //dark
   else if(xtheme==8) { sa='d13085'; } //dark
   else if(xtheme==9) { sa='49047f'; } //dark
  else if(xtheme==10) { sa='008780'; } //dark
   else if(xtheme==11) { sa='426382'; } //light
   else if(xtheme==12) { sa='a83300'; } //dark
   else if(xtheme==13) { sa='054c44'; } //dark
   else if(xtheme==14) { sa='b78300'; } //dark
   else if(xtheme==15) { sa='d13085'; } //dark
  
    }
    ss=ss.substr(0,n)+sa+ss.substr(n+6,ss.length-(n+6));
    return(fs.x64s(ss));
}

  if(typeof(sfn)=='function') { fs.rpost(btsip,'write|blockpicget|'+ss,function(sn) { sfn('data:image/svg+xml;base64,'+sn); }); } 
                         else { sa=fs.rpostget(btsip,'write|blockpicget|'+ss); return('data:image/svg+xml;base64,'+subpic(sa)); }
}                         
funcsecure.prototype.picsvg=function (ss,sfn) { 
  var sa;
  if(typeof(sfn)=='function') { fs.rpost(btsip,'write|blockpicget|'+ss,function(sn) { sfn('data:image/svg+xml;base64,'+sn); }); } 
                         else { sa=fs.rpostget(btsip,'write|blockpicget|'+ss); return('data:image/svg+xml;base64,'+sa); }
}                         


funcsecure.prototype.pic64=function (ss,sfn) { 
  var sa;
  if(typeof(sfn)=='function') { fs.rpost(btsip,'write|blockpicget|'+ss,function(sn) { sfn(sn); }); } 
                         else { sa=fs.rpostget(btsip,'write|blockpicget|'+ss); return(sa); }
}                         
funcsecure.prototype.picput=function (ss,sdat,sfn) { 
  var sa;
  if(typeof(sfn)=='function') { fs.rpost(btsip,'write|blockpicput|'+ss+','+sdat,function(sn) { sfn('ok'); }); } 
                         else { sa=fs.rpostget(btsip,'write|blockpicput|'+ss+','+sdat);  return(sa); }
}                         
funcsecure.prototype.infoget=function (ss,sfn) { 
  var sa;
  if(typeof(sfn)=='function') { fs.rpost(btsip,'write|blockpicget|'+ss,function(sn) { sfn(fs.xs64(sn)); }); } 
                         else { sa=fs.rpostget(btsip,'write|blockpicget|'+ss); return(fs.xs64(sa)); }
}                         

funcsecure.prototype.runnormal = function(slab,sn,sxx,s1,s2,s3,s4,s5,s6) { 
   var hd,ss,se='script',sa,sb;
   sa=fs.xs64(fs.rpostget(btsip,'write|blockrunget|'+sn)); if(sa=='') return;
   ss='<div id="'+sn+'idrun"></div><div id="'+sn+'program"></div>';
   c.html(slab,ss);
   //c.html(sn+'idrun','<'+se+'>'+sa+'</'+se+'>')
   fs.scriptload(sa);
   initfirst(sn+'program',sxx,s1,s2,s3,s4,s5,s6); 
}
funcsecure.prototype.run = function(slab,sn,sxx,s1,s2,s3,s4,s5,s6) { 
   var hd,ss,se='script',sa,sb;
   sa=fs.fileread(btsip,sn+'.js'); if(sa=='') return;
   ss='<div id="'+sn+'idrun"></div><div id="'+sn+'program"></div>';
   c.html(slab,ss);
   //c.html(sn+'idrun','<'+se+'>'+sa+'</'+se+'>')
   fs.scriptload(sa);
   initfirst(sn+'program',sxx,s1,s2,s3,s4,s5,s6); 
}


//*************************************************************************************************************
//*************************************************************************************************************
//*************************************************************************************************************
//*************************************************************************************************************
//*************************************************************************************************************



funcsecure.prototype.dataindexold=function (ss) { 
 var sa='',sb,sc;
 for(var i=2;i<=fs.xitemcount(ss,'^');i++) {
   sb=fs.xitemget(ss,i,'^'); if(sb=='') continue;
   sc=fs.dbkey(sb).pub;
   sa+=sc
 }  
 return(sa);    
}    

funcsecure.prototype.dataindex=function (sip,ss) { 
 var sa='',sb,sc;
 for(var i=2;i<=fs.xitemcount(ss,'^');i++) {
   sb=fs.xitemget(ss,i,'^'); if(sb=='') continue;
   sc=fs.rpostget(sip,'write|addressgetnameadr|'+sb); // sc=fs.xhexs(fs.xl(fs.xshex(sc),dblen));
   if(sc.length==64) { sa+=fs.xshex(sc); }    
 }  
 return(sa);    
}    



funcsecure.prototype.dataputrand=function (sip,fname,key,dat,rand,sfn) { 
  var inx,doc,ssend,pubm,sa; 
  var skey=fs.dbkey(fs.xitemget(fname,1,'^')); pubm=skey.pub;           // from petavalue
  var keyto=fs.dataindex(sip,fname);
  if(rand=='') { } else { rand=fs.xhexs(fs.xl(rand,16)); }
  doc=''                                               // no document is attached
  inx='000000000|'+key;                                //itemdouble cross only all moneyfile |key
  ssend=fs.transsend704(pubm,pubm+keyto,0,0,inx,dat,doc,'txte',skey.pri,rand); 
  if(typeof(sfn)=='function') { fs.rpost(fs.portmulti(sip),'write|blockminingdo|30,'+ssend,function(sn) { sfn(sn); }); } 
                         else { sa=fs.rpostget(fs.portmulti(sip),'write|blockminingdo|30,'+ssend); return(sa); }
}
funcsecure.prototype.dataput=function (sip,fname,key,dat,sfn) {   fs.dataputrand(sip,fname,key,dat,'',sfn); }
funcsecure.prototype.dataputpass=function (sip,fname,key,dat,spass,sfn) { if(spass==undefined) spass='';  fs.dataputrand(sip,fname,key,dat,spass,sfn); }

funcsecure.prototype.dataputexrand=function (sip,fname,key,dat,rand,sfn) { 
  var inx,doc,ssend,pubm,sa; 
  var skey=fs.dbkey(fs.xitemget(fname,1,'^')); pubm=skey.pub;           // from petavalue
  var keyto=fs.dataindex(sip,fname);
  if(rand=='') { } else { rand=fs.xhexs(fs.xl(rand,16)); }
  doc='';                                               // no document is attached
  key.unshift('000000000');
  //alert(fs.xhexs(key[1]));
  ssend=fs.transsend704ex(pubm,pubm+keyto,0,0,key,dat,doc,'txte',skey.pri,rand); 
  if(typeof(sfn)=='function') { fs.rpost(fs.portmulti(sip),'write|blockminingdo|30,'+ssend,function(sn) { sfn(sn); }); } 
                         else {  sa=fs.rpostget(fs.portmulti(sip),'write|blockminingdo|30,'+ssend); return(sa); }
}
funcsecure.prototype.dataputex=function (sip,fname,key,dat,sfn) {   fs.dataputexrand(sip,fname,key,dat,'',sfn); }
funcsecure.prototype.dataputexpass=function (sip,fname,key,dat,spass,sfn) { if(spass==undefined) spass='';  fs.dataputexrand(sip,fname,key,dat,spass,sfn); }


funcsecure.prototype.dataputdocex=function (sip,fname,key,dat,docname,doc,sto,stype,rand,sfn) { //stype=0111 = chat 
  var inx,sdoc,ssend,pubm,sa,friendto; 
  var skey=fs.dbkey(fs.xitemget(fname,1,'^')); pubm=skey.pub;           // from petavalue
  var keyto=fs.dataindex(sip,fname);
  if(rand=='') { } else { rand=fs.xhexs(fs.xl(rand,16)); }
  if(sto==undefined) { friendto=''; } else { friendto=fs.friendaddressex(sip,sto);   }
  if(doc=='') sdoc=doc; else sdoc=fs.chrb(docname.length)+docname+doc;         //document attached
  if(stype==undefined) stype=''; stype=fs.left(stype+'000000000',9);
  key.unshift(stype);                                //itemdouble cross only all moneyfile 
  ssend=fs.transsend704ex(pubm,pubm+keyto+friendto,0,0,key,dat,sdoc,'txte',skey.pri,rand); 
  if(typeof(sfn)=='function') { fs.rpost(fs.portmulti(sip),'write|blockminingdo|30,'+ssend,function(sn) { sfn(sn); }); } 
                         else { sa=fs.rpostget(fs.portmulti(sip),'write|blockminingdo|30,'+ssend); return(sa); }
}



//************************************* get data *********************************************************************
funcsecure.prototype.dataformat=function (ss,skey,sr,n) { 
      var sb,se,sa=[],sc,j=0,ky;  
      for(var i=1;i<=fs.xitemcount(ss,'\n');i++)  {
          sb=fs.xitemget(ss,i,'\n'); if(sb=='') continue;
          //ky=fs.xshex(fs.xitemget(sb,1,':'));
          if((sr==undefined)||(sr==''))  se=fs.dbdataget(fs.xitemlast(sb,6,':'),skey,fs.xis(fs.xitemget(sb,2,':')));
                                    else se=fs.dbdatarand(fs.xitemlast(sb,6,':'),sr,fs.xis(fs.xitemget(sb,2,':')));
          
          if(n==undefined) { } else { se=fs.decode(se.substr(17,se.length-17)); }
          if(se=='') continue;
          sa[j]=se; j++;
      }     
      return(sa);
}  

funcsecure.prototype.datadoc=function (sm,sfn) { if(sm=='') if(typeof(sfn)=='function') { sfn(''); return; } else { return(''); }
     var se;
     var sip=fs.xitemget(sm,1,fs.chrb(250));
     var n=fs.xis(fs.xitemget(sm,2,fs.chrb(250)));
     var sn=fs.xitemget(sm,3,fs.chrb(250));
     var key={pri:fs.xshex(fs.xitemget(sm,4,fs.chrb(250)))};
     var mdir=fs.xitemget(sm,5,fs.chrb(250));
     var mip=fs.xitemget(sm,6,fs.chrb(250));
     var sf,ss,sr='',ln,sdat,scall,akey; //alert(sip+':'+n+':'+sn+':'+key+':'+mdir+':'+mip);

function subdatadoc(se) {
     if(sr=='') {  ss=fs.dbdataget(se,key,n); } //else { ss=fb.dbdatarand(s1,sr,n); }
          if(ss.length>0) {
          ln=fs.ascb(ss.substr(0,1));   
          sf=ss.substr(1,ln);
          sdat=ss.substr(1+ln,ss.length-(1+ln));
          }
        if(fs.xitemgetback(sf,1,'.')=='htmd') { sdat=fs.decode(fs.unzip(sdat)); }
        return(sf+':'+sdat); 
    
}
     if(mdir=='')  { scall='blockdocgetnewfirstofs'; } else { scall='blockdocgetnewfirstofsx'; sn=mdir+'|'+sn; sip=mip; }
     if(typeof(sfn)=='function') {      fs.rpostget(sip,'write|'+scall+'|'+sn,function(se) {  sfn(subdatadoc(se));       }); }
                          else {     se=fs.rpostget(sip,'write|'+scall+'|'+sn);  return(subdatadoc(se)); }
}



funcsecure.prototype.dataformatdoc=function (sip,ss,key,sr,nn) {  //nn=decode sr randpassword
   var sa='',sb,si,j=0,s1,s2,addressto,addressfrom,icountoff,filename,blockofs,isdoc,isf,sadr,ndate,snam,chat,sdat,nadr,mdir,mnon,mno='',mip='',akey,ssitem,srec=[],sdoc=[],sitem=[],skey=[];
    //********************************************* main loop *********************************************       
           for(var i=1;i<=fs.xitemcount(ss,'\n');i++)  {
              sb=fs.xitemget(ss,i,'\n'); if(sb=='') continue;
             //addressto:countoff:filename:addressfrom----name-date:isdoc:blockofs:chatdata
               sdat=sb.split(':');
               addressto=sdat[0]; if(fs.right(addressto,8)=='20202020') akey=fs.xshex(addressto).trim(); else akey=addressto;
               //akey=fs.xshex(addressto).trim(); if(akey.length==32) {  akey=addressto; }  alert(akey+'>>'+akey.length+'>>'+addressto);  //key (addressto)
               icountoff=fs.xis(sdat[1]);                     //count offset from 70
               filename=sdat[2];                              //filename of document engine
               sadr=sdat[3];
                                             //1. addressfrom
                                             //2.
              ssitem=fs.xitemget(sadr,3,'-'); //3.itemnumber
              nadr=fs.xitemget(sadr,4,'-');                                             //4.addressn
              snam=fs.xitemget(sadr,5,'-');  //5.Pseudo Name                         //
              ndate=fs.xitemget(sadr,6,'-'); //6.date
                                             //7.hash
                                             //8.
                                             //9.
               mdir=fs.xitemget(sadr,10,'-');//10.mdir
               mip=fs.xshex(fs.xitemget(sadr,12,'-'));//12.mdir
               if(mdir=='')  { mno=''; mip=''; mnon=''; } else { mdir=fs.xshex(mdir); mno=fs.xitemget(sadr,11,'-');    mnon=fs.xshex(mno); mnon=fs.ascwr(mnon.substr(6,2));  }
               addressfrom=fs.xitemget(sadr,1,'-');   if(addressfrom==fs.xhexs(key.pub))  { isf=0; } else { isf=1; } //address for the color
               isdoc=sdat[4];                                 //1=doc 0#doc
               blockofs=sdat[5]; if(blockofs=='') continue;   // ofs in blockchain
               chat=fs.xitemlast(sb,6,':');  
               if((sr==undefined)||(sr=='')) si=fs.dbdataget(chat,key,icountoff); else si=fs.dbdatarand(chat,sr,icountoff);           //decrypt chat data
               if(si=='') continue;
               if(nn==undefined) { } else { 
                  if(si.length>=17)  {  if(fs.ascb(si[0])==4) { si=fs.decode(si.substr(17,si.length-17));  } else { si=fs.decode(si); } }
                               else { si=fs.decode(si);  }
               }
               if(isdoc=='1') {  s1=sip+fs.chrb(250)+icountoff+fs.chrb(250)+blockofs+','+filename+fs.chrb(250)+fs.xhexs(key.pri)+fs.chrb(250)+mdir+fs.chrb(250)+mip; } else { s1=''; }
               srec[j]=si; sdoc[j]=s1; sitem[j]=fs.datetrans(ndate)+','+ssitem+','+isf+','+isdoc+','+nadr; skey[j]=akey;  j++;
           }   
           return({record:srec,doc:sdoc,item:sitem,key:skey});
 }     

// funcsecure.prototype.keyconvert=function (sip,ss,skey) { 
//      var hd,s1='none',sf=fs.xhexs(skey.pri); 
//      if(ss=='setup') { return(sf);  }  
//      else {   hd=fs.dopen(sip,sf);     if(fs.dfindid(hd,ss,1)==true) {  s1=fs.dn(hd,'memo');     }    fs.dclose(hd);      return(s1); }
// }    
funcsecure.prototype.keyconvert=function (sip,ss,skey) { 
     var hd,s1='none',sf=skey; 
     if(ss=='setup') { return(sf);  }  
     else {   hd=fs.dopen(sip,sf);     if(fs.dfindid(hd,ss,1)==true) {  s1=fs.dn(hd,'memo');     }    fs.dclose(hd);      return(s1); }
}    



funcsecure.prototype.dataget=function (sip,fname,key,cnt,srr,sfn) { 
  var skey,sa;
  if(srr==undefined) srr='';
  if(typeof(fname)=='string') { skey=fs.dbkey(fname);  } else { skey=fname;  }
  if(cnt==undefined) cnt='0';
  if(typeof(sfn)=='function') { 
      fs.rpost(sip,'write|'+fs.datakey()+'|key,'+fs.xhexs(skey.pub)+','+key+','+cnt,function(ss) {  sfn(fs.dataformat(ss,skey,srr));     }); 
  }  else { 
      sa=fs.rpostget(sip,'write|'+fs.datakey()+'|key,'+fs.xhexs(skey.pub)+','+key+','+cnt); return(fs.dataformat(sa,skey,srr)); 
  }
} //dataget
funcsecure.prototype.datagetlist=function (sip,fname,keys,srr,sfn) { 
  var skey,sa;
  if(srr==undefined) srr='';
  if(typeof(fname)=='string') skey=fs.dbkey(fname); else skey=fname;
  if(typeof(sfn)=='function') { 
      fs.rpost(sip,'write|datadfindidlist|'+fs.xhexs(skey.pub)+','+keys,function(ss) {  sfn(fs.dataformat(ss,skey,srr));     }); 
  }  else { 
      //fs.rpost(sip,'write|datadfindidlist|'+fs.xhexs(skey.pub)+','+keys,function(ss) {  sfn(fs.dataformat(ss,skey));     }); 
      sa=fs.rpostget(sip,'write|datadfindidlist|'+fs.xhexs(skey.pub)+','+keys); return(fs.dataformat(sa,skey,srr)); 
  }
} //dataget



funcsecure.prototype.datafrom=function (sip,fname,sfrom,sto,sfilter,cnt,srr,sfn) { 
  var sa;
  var skey=fs.dbkey(fname); 
  if(sfrom==undefined) sfrom=''; else sfrom=fs.xhexs(sfrom);
  if(sto==undefined) sto='';     else sto=fs.xhexs(sto);
  if(sfilter==undefined) sfilter='';
  if(cnt==undefined) cnt='0';
  if(typeof(sfn)=='function') { 
   fs.rpostl(30000,sip,'write|'+fs.datakey()+'|keyfrom,'+fs.xhexs(skey.pub)+','+sfrom+','+sto+','+sfilter+','+cnt,function(ss) { sfn(fs.dataformat(ss,skey,srr));     }); //from,to,filter
  }  else { 
    sa=fs.rpostlget(30000,sip,'write|'+fs.datakey()+'|keyfrom,'+fs.xhexs(skey.pub)+','+sfrom+','+sto+','+sfilter+','+cnt); return(fs.dataformat(sa,skey,srr));
  }
}
funcsecure.prototype.datafromall=function (sip,fname,sfrom,sto,sfilter,cnt,srr,sfn) { 
  var sa;
  var skey=fs.dbkey(fname); 
  if(sfrom==undefined) sfrom=''; else sfrom=fs.xhexs(sfrom);
  if(sto==undefined) sto='';     else sto=fs.xhexs(sto);
  if(sfilter==undefined) sfilter='';
  if(cnt==undefined) cnt='0';
  if(typeof(sfn)=='function') { 
   fs.rpostl(30000,sip,'write|'+fs.datakey()+'|keyfromall,'+fs.xhexs(skey.pub)+','+sfrom+','+sto+','+sfilter+','+cnt,function(ss) { sfn(fs.dataformat(ss,skey,srr));     }); //from,to,filter
  }  else { 
    sa=fs.rpostlget(30000,sip,'write|'+fs.datakey()+'|keyfromall,'+fs.xhexs(skey.pub)+','+sfrom+','+sto+','+sfilter+','+cnt); return(fs.dataformat(sa,skey,srr));
  }
}
//*****************************************doc ******************************************************************************
funcsecure.prototype.dataputdocreal=function (sip,fname,key,dat,docname,doc,rand,sfn) { 
  var inx,sdoc,ssend,pubm,sa; 
  var skey=fs.dbkey(fs.xitemget(fname,1,'^')); pubm=skey.pub;           // from petavalue
  var keyto=fs.dataindex(sip,fname);
  if(rand=='') { } else { rand=fs.xhexs(fs.xl(rand,16)); }
  sdoc=fs.chrb(docname.length)+docname+doc;         //document attached
  inx='000000000|'+key;                                //itemdouble cross only all moneyfile|key
  ssend=fs.transsend704(pubm,pubm+keyto,0,0,inx,dat,sdoc,'txte',skey.pri,rand); 
  if(typeof(sfn)=='function') { fs.rpost(fs.portmulti(sip),'write|blockminingdo|30,'+ssend,function(sn) { sfn(sn); }); } 
                         else { sa=fs.rpostget(fs.portmulti(sip),'write|blockminingdo|30,'+ssend); return(sa); }
}
funcsecure.prototype.dataputdoc=function (sip,fname,key,dat,docname,doc,sfn) { fs.dataputdocreal(sip,fname,key,dat,docname,doc,'',sfn); } 
funcsecure.prototype.dataputdocpass=function (sip,fname,key,dat,docname,doc,spass,sfn) { if(spass==undefined) spass=''; fs.dataputdocreal(sip,fname,key,dat,docname,doc,spass,sfn); } 

funcsecure.prototype.datagetdoc=function (sip,fname,key,cnt,srr,sfn) {
  var mess,doc,desc,sfile,skeyto,ssend,pubm,key,sa,sb,sc; 
  var skey=fs.dbkey(fname);
  if(cnt==undefined) cnt='0'; 
  if(typeof(sfn)=='function') { 
      fs.rpost(sip,'write|'+fs.datakey()+'|key,'+fs.xhexs(skey.pub)+','+key+','+cnt,function(ss) {  sfn(fs.dataformatdoc(sip,ss,skey,srr));     }); 
  }  else { 
      sa=fs.rpostget(sip,'write|'+fs.datakey()+'|key,'+fs.xhexs(skey.pub)+','+key+','+cnt); 
      return(fs.dataformatdoc(sip,sa,skey,srr)); 
  }
} //dataget
funcsecure.prototype.datafromdoc=function (sip,fname,sfrom,sto,sfilter,cnt,srr,sfn) { 
  var sa;
  var skey=fs.dbkey(fname); 
  if(sfrom==undefined) sfrom=''; else sfrom=fs.xhexs(sfrom);
  if(sto==undefined) sto='';     else sto=fs.xhexs(sto);
  if(sfilter==undefined) sfilter='';
  if(cnt==undefined) cnt='0';
  if(typeof(sfn)=='function') { 
   fs.rpost(sip,'write|'+fs.datakey()+'|keyfrom,'+fs.xhexs(skey.pub)+','+sfrom+','+sto+','+sfilter+','+cnt,function(ss) { sfn(fs.dataformatdoc(sip,ss,skey,srr));     }); //from,to,filter
  }  else { 
    sa=fs.rpostget(sip,'write|'+fs.datakey()+'|keyfrom,'+fs.xhexs(skey.pub)+','+sfrom+','+sto+','+sfilter+','+cnt); return(fs.dataformatdoc(sip,sa,skey,srr));
  }
}
funcsecure.prototype.datafromalldoc=function (sip,fname,sfrom,sto,sfilter,cnt,srr,sfn) { 
  var sa;
  var skey=fs.dbkey(fname); 
  if(sfrom==undefined) sfrom=''; else sfrom=fs.xhexs(sfrom);
  if(sto==undefined) sto='';     else sto=fs.xhexs(sto);
  if(sfilter==undefined) sfilter='';
  if(cnt==undefined) cnt='0';
  if(typeof(sfn)=='function') { 
   fs.rpost(sip,'write|'+fs.datakey()+'|keyfromall,'+fs.xhexs(skey.pub)+','+sfrom+','+sto+','+sfilter+','+cnt,function(ss) { sfn(fs.dataformatdoc(sip,ss,skey,srr));     }); //from,to,filter
  }  else { 
    sa=fs.rpostget(sip,'write|'+fs.datakey()+'|keyfromall,'+fs.xhexs(skey.pub)+','+sfrom+','+sto+','+sfilter+','+cnt); return(fs.dataformatdoc(sip,sa,skey,srr));
  }
}
//*********************************************** chats *******************************************************
//*********************************************** chats *******************************************************
//*********************************************** chats *******************************************************
//*********************************************** chats *******************************************************
funcsecure.prototype.friendaddressex=function (sip,ss) { 
 var sa='',sb,sc; 
 for(var i=1;i<=fs.xitemcount(ss,'^');i++) {
   sb=fs.xitemget(ss,i,'^'); if(sb=='') continue;
   sc=fs.rpostget(sip,'write|addressgetnameadr|'+sb); // sc=fs.xhexs(fs.xl(fs.xshex(sc),dblen));
   if(sc.length==64) { sa+=fs.xshex(sc); }    
 }  
 return(sa);    
}    
funcsecure.prototype.friendaddress=function (sip,ss) { 
 var sa='',sb,sc; 
 for(var i=1;i<=fs.xitemcount(ss,'^');i++) {
  sb=fs.xitemget(ss,i,'^'); if(sb=='') continue;
  sc=fs.rpostget(sip,'write|addressgetnameadr|'+sb);  sc=fs.xhexs(fs.xl(fs.xshex(sc),dblen));
  if(sc.length==(dblen*2)) { sa+=sc+'^'; }    
 }  
 return(fs.xleft(sa));    
}    

funcsecure.prototype.chatput=function (sip,suser,sfriend,dat,sfn) { 
  var inx,doc,ssend,pubm,mess,sa;
  var ba=(typeof(sfn)=='function');
  var skey;
  if(typeof(suser)=='string') skey=fs.dbkey(suser); else skey=suser;
  pubm=skey.pub;           // from petavalue
  var keyto=fs.friendaddressex(sip,sfriend);               //get friend address(es)
  doc=''                                               // no document is attached
  inx='011100000000|';                                //itemdouble cross only all moneyfile   (indexes)
  mess=fs.chrb(4)+fs.chrddr(0)+fs.chrddr(0)+dat;   //setup header
  ssend=fs.transsend704(pubm,pubm+keyto,0,0,inx,mess,doc,'txte',skey.pri,''); 
  if(ba==true) { fs.rpost(fs.portmulti(sip),'write|blockminingdo|30,'+ssend,function(sn) { sfn(sn); }); } 
          else { sa=fs.rpostget(fs.portmulti(sip),'write|blockminingdo|30,'+ssend); return(sa); }
}
funcsecure.prototype.chatputdoc=function (sip,suser,sfriend,dat,docname,doc,sfn) { 
  var inx,sdoc,ssend,pubm,mess,sa;
  var ba=(typeof(sfn)=='function');
  var skey;
  if(typeof(suser)=='string') skey=fs.dbkey(suser); else skey=suser;
  pubm=skey.pub;           // from petavalue
  var keyto=fs.friendaddressex(sip,sfriend);
  if(fs.xitemgetback(docname,1,'.')=='htmd') { if(doc=='') { sdoc=' '; }  else { doc=fs.zip(fs.encode(doc)); }}
  sdoc=fs.chrb(docname.length)+docname+doc;         //setup document 
  inx='011100000000|';                                //itemdouble cross only all moneyfile |  (indexes)
  mess=fs.chrb(4)+fs.chrddr(0)+fs.chrddr(0)+dat;   //setup header
  //mess=dat;
  ssend=fs.transsend704(pubm,pubm+keyto,0,0,inx,mess,sdoc,'txte',skey.pri,''); 
  if(ba==true) { fs.rpost(fs.portmulti(sip),'write|blockminingdo|30,'+ssend,function(sn) { sfn(sn); }); } 
          else { sa=fs.rpostget(fs.portmulti(sip),'write|blockminingdo|30,'+ssend); return(sa); }
}

funcsecure.prototype.chatputdocsingle=function (sip,suser,dat,docname,doc,sfn) { //key.pri/pub 
  var inx,sdoc,ssend,pubm,mess,sa;
  var ba=(typeof(sfn)=='function');
  var skey;
  if(typeof(suser)=='string') skey=fs.dbkey(suser); else skey=suser;
  pubm=skey.pub;           // from petavalue
  //var keyto=fs.friendaddressex(sip,sfriend);
  if(fs.xitemgetback(docname,1,'.')=='htmd') { if(doc=='') { sdoc=' '; }  else { doc=fs.zip(fs.encode(doc)); }}
  sdoc=fs.chrb(docname.length)+docname+doc;         //setup document 
  inx='011100000000|';                                //itemdouble cross only all moneyfile |  (indexes)
  mess=fs.chrb(4)+fs.chrddr(0)+fs.chrddr(0)+dat;   //setup header
  //mess=dat;
  ssend=fs.transsend704(pubm,pubm,0,0,inx,mess,sdoc,'txte',skey.pri,''); 
  if(ba==true) { fs.rpost(fs.portmulti(sip),'write|blockminingdo|30,'+ssend,function(sn) { sfn(sn); }); } 
          else { sa=fs.rpostget(fs.portmulti(sip),'write|blockminingdo|30,'+ssend); return(sa); }
}

//************************************** chat read ***********************************************************

funcsecure.prototype.chatget=function (sip,suser,sfriend,cnt,sfn) { 
  var sa,skey=fs.dbkey(suser); 
  var key=fs.friendaddress(sip,sfriend);
  if(cnt==undefined) cnt='0';
  if(typeof(sfn)=='function') { 
      fs.rpost(sip,'write|'+fs.datakey()+'|key,'+fs.xhexs(skey.pub)+','+key+','+cnt,function(ss) {  sfn(fs.dataformat(ss,skey,'',1));     }); 
  }  else { 
      sa=fs.rpostget(sip,'write|'+fs.datakey()+'|key,'+fs.xhexs(skey.pub)+','+key+','+cnt); return(fs.dataformat(sa,skey,'',1)); 
  }
} //
funcsecure.prototype.chatgetdoc=function (sip,suser,sfriend,cnt,sfn) { 
  var sa,skey=fs.dbkey(suser); 
  var key=fs.friendaddress(sip,sfriend);
  if(cnt==undefined) cnt='0';
  if(typeof(sfn)=='function') { 
      fs.rpost(sip,'write|'+fs.datakey()+'|key,'+fs.xhexs(skey.pub)+','+key+','+cnt,function(ss) {  sfn(fs.dataformatdoc(sip,ss,skey,'',1));     }); 
  }  else { 
      sa=fs.rpostget(sip,'write|'+fs.datakey()+'|key,'+fs.xhexs(skey.pub)+','+key+','+cnt); return(fs.dataformatdoc(sip,sa,skey,'',1)); 
  }
} //dataget


//*****************************************************email*******************************************************************
//*****************************************************email*******************************************************************
//*****************************************************email*******************************************************************
//*****************************************************email*******************************************************************
funcsecure.prototype.emailput=function(sip,semailaddress,ssubject,sfile,sbody,sfn) { 
  var sb,sa=semailaddress+'|'+ssubject+'|'+sfile+'|'+sbody; 
   if(typeof(sfn)=='function') { fs.rpostl(10000,sip,'write|blockemail|'+sa,function(sn) {  sfn('send real email:'+sn);       }); }
                          else { sb=fs.rpostlget(10000,sip,'write|blockemail|'+sa); return('send real email:'+sb); }
}
funcsecure.prototype.emailputdata=function(sip,semailaddress,ssubject,docname,doc,sbody,sfn) { 
  var sb,sa;
  if(docname=='') { sa=semailaddress+'|'+ssubject+'||'+sbody; } 
            else { sa=semailaddress+'|'+ssubject+'|'+docname+','+fs.x64s(doc)+'|'+sbody;  }
   if(typeof(sfn)=='function') { fs.rpostl(10000,sip,'write|blockemaildata|'+sa,function(sn) {  sfn('send real email:'+sn);       }); }
                          else { sb=fs.rpostlget(10000,sip,'write|blockemaildata|'+sa); return('send real email:'+sb); }
}

//*****************************************************user*******************************************************************

funcsecure.prototype.userput=function(sip,userpassword,username,sfn) { 
     var sa,loc=fs.rpostget(sip,'write|blockloc|');
     var skey=fs.dbkey(userpassword); 
     var ssend=fs.transsend42(skey.pub,username,loc,'0.0.0.0:0',skey.pri); 
     if(typeof(sfn)=='function') { fs.rpost(sip,'write|blockminingdo|30,'+ssend,function(sn) { sfn(sn); }); } 
                            else { sa=fs.rpostget(sip,'write|blockminingdo|30,'+ssend); return(sa); }
}
funcsecure.prototype.userexist=function(sip,username,sfn) { 
var sa;
     if(typeof(sfn)=='function') { fs.rpost(sip,'write|addressgetnameadr|'+username,function(sn) { sfn(sn); }); } 
                            else { sa=fs.rpostget(sip,'write|addressgetnameadr|'+username);  return(sa); }
}   
funcsecure.prototype.useraddress=function(sip,useraddress,sfn) {  //useraddress=userpublicaddress
var sa; 
// if(typeof(sfn)=='function') { fs.rpost(sip,'write|blockcheckaddress|'+useraddress,function(sn) { sfn(sn); }); } 
//                       else {  sa=fs.rpostget(sip,'write|blockcheckaddress|'+useraddress);  return(sa); }
if(typeof(sfn)=='function') { fs.rpost(sip,'write|addressget|'+useraddress,function(sn) { if(sn=='') { sfn('no'); return; } else { sfn(fs.xs64(sn)); }}); } 
                       else {  sa=fs.rpostget(sip,'write|addressget|'+useraddress);  if(sa=='') return('no'); else return(fs.xs64(sa)); }
}    
funcsecure.prototype.userpublicaddress=function(userpassword) {  //get the user public address from his password
    var skey=fs.dbkey(userpassword);
    return(fs.xhexs(skey.pub));
}
//************************************** data fields ****************************************************************
//************************************** fields ****************************************************************
//************************************** fields ****************************************************************
//************************************** fields ****************************************************************
//************************************** fields ****************************************************************
funcsecure.prototype.dopenold=function(sip,fname) {  //get the user public address from his password
  var i,sm;
  for(i=1;i<600;i++) { if(dai[i]==undefined) { break; } }
  if(i>=600) { i=0;  }
  sm=fs.dataget(sip,fname,'x99master',1); if(sm.length==0) return(0);
  dai[i]=fs.xos(sm[0]); recip[i]=sip;
  return(i);
}

//**************************************** read/write private***************************************************
funcsecure.prototype.dopen=function(sip,fname,sr,sfn) {  //get the user public address from his password
  var i,sm;
  
  if(sr==undefined) sr='';
  for(i=1;i<600;i++) { if(dai[i]==undefined) { break; } }
  if(i>=600) { i=0;  }
  if(typeof(sfn)=='function') {  if(fname=='') { sfn(0); return; }
        fs.dataget(sip,fname,'x99master',1,sr,function(sx) { if(sx.length==0) { sfn(0); return; };   dai[i]=fs.xos(sx[0]); recip[i]=sip; recpass[i]=sr; sfn(i);    });
  } else {  if(fname=='') return(0);
    sm=fs.dataget(sip,fname,'x99master',1,sr);               if(sm.length==0) return(0);   dai[i]=fs.xos(sm[0]); recip[i]=sip; recpass[i]=sr; return(i);
  }    
}
funcsecure.prototype.wopen=async function(sip,fname,sr) {  
      var sa=await new Promise(function(resolve, reject)  {  fs.dopen(sip,fname,sr,function(ba) {resolve(ba); });    });
      return(sa);
}    
//**************************************** read private /write public***************************************************
funcsecure.prototype.dkeyname = function(sip,spubname) { // public name -> key.pub
    var sc,sb,sa={};    
       sc=fs.rpostget(sip,'write|addressgetnameadr|'+spubname); // sc=fs.xhexs(fs.xl(fs.xshex(sc),dblen));
       if(sc.length==64) {       sb=fs.xshex(sc);        sa['pri']=sb; sa['pub']=sb;  return(sa);       }    
       else return('');
}
funcsecure.prototype.dkeyhalf = function(sip,spubname) { // public name -> key.pub
    var sc,sb,sa={};    
       sc=fs.rpostget(sip,'write|addressgetnameadr|'+spubname); // sc=fs.xhexs(fs.xl(fs.xshex(sc),dblen));
       if(sc.length==64) {       return(fs.left(sc,20));       }    
       else return('');
}
funcsecure.prototype.dopenread=function(sip,spubname,sr,sfn) {  //get the user public address from his password
  var i,sm;
  var fname=fs.dkeyname(sip,spubname);
  if(sr==undefined) sr='';
  for(i=1;i<600;i++) { if(dai[i]==undefined) { break; } }
  if(i>=600) { i=0;  }
  if(typeof(sfn)=='function') {  if(fname=='') { sfn(0); return; }
        fs.dataget(sip,fname,'x99master',1,sr,function(sx) { if(sx.length==0) { sfn(0); return; };   dai[i]=fs.xos(sx[0]); recip[i]=sip; recpass[i]=sr; sfn(i);    });
  } else {  if(fname=='') return(0);
    sm=fs.dataget(sip,fname,'x99master',1,sr);               if(sm.length==0) return(0);   dai[i]=fs.xos(sm[0]); recip[i]=sip; recpass[i]=sr; return(i);
  }    
}
funcsecure.prototype.wopenread=async function(sip,fname,sr) {  
      var sa=await new Promise(function(resolve, reject)  {  fs.dopenread(sip,fname,sr,function(ba) {resolve(ba); });    });
      return(sa);
}    
funcsecure.prototype.useradd = function(sip,suser,spass) {  // add a new user
      if(suser=='') { return(false); } // check if user exist
      if(spass=='') { return(false); } //check if password exist
      if(fs.userexist(sip,suser)=='') { } else {  return(false);  }  
      var skey=fs.dbkey(spass); 
      var sa=fs.useraddress(sip,fs.xhexs(skey.pub));   
      if(sa=='no') {  fs.userput(sip,spass,suser); return(true); } 
      return(false);
}

funcsecure.prototype.dinfo=function(hd,sr) {  //get the user public address from his password
  var sip=recip[hd]; 
  var sm,fname=dai[hd]['list_filename'];
  sm=fs.dataget(sip,fname,'x99master',1,sr); 
  return(sm);
}

funcsecure.prototype.dclose=function(hd) { dai[hd]=undefined; }
funcsecure.prototype.drec=function(hd,sdat) {     if(sdat==undefined) {  } else { recdata[hd]=sdat; }    return(recdata[hd]); }    
funcsecure.prototype.drecs=function(hd) {   return(recs[hd]); }    
funcsecure.prototype.dfields=function(hd) { var sm=dai[hd]['list_fields'];    return(sm); }    
funcsecure.prototype.dn=function(hd,sname) { 
    var ln,ofs,ofsb,stype,sn,sa,sm=dai[hd][sname]; if(sm==undefined) return('');
    stype=sm[2]; 
    if(stype=='m') { 
      sa=recdata[hd].substr(sm[1],recdata[hd].length-sm[1]); ofs=0; ofsb=0;
      if(sa.length==0) { sn=''; } else { for(var i=0;i<=sm[3];i++) {  ln=fs.ascd(sa.substr(ofs,4)); ofsb=ofs;   ofs=4+ln;    } }        
      sn=sa.substr(ofsb+4,ln); 
    } else {   
        sn=recdata[hd].substr(sm[1],sm[0]); 
        if(sm[2]=='l') sn=fs.ascddr(sn);
        else if(sm[2]=='i') sn=fs.ascdr(sn);
        else if(sm[2]=='w') sn=fs.ascwr(sn);
        else if(sm[2]=='b') sn=fs.ascb(sn);
    }
    if(stype=='s') return(sn.trim()); else return(sn);
}
funcsecure.prototype.dnw=function(hd,sname) { 
    var ln,ofs,ofsb,stype,sn,sa,sm=dai[hd][sname]; if(sm==undefined) return('');
    stype=sm[2]; 
    if(stype=='m') { 
      sa=recdata[hd].substr(sm[1],recdata[hd].length-sm[1]); ofs=0; ofsb=0;
      if(sa.length==0) { sn=''; } else { for(var i=0;i<=sm[3];i++) {  ln=fs.ascd(sa.substr(ofs,4)); ofsb=ofs;   ofs=4+ln;    } }        
      sn=sa.substr(ofsb+4,ln);
    } else {   
        sn=recdata[hd].substr(sm[1],sm[0]); 
        if(sm[2]=='l') sn=fs.ascddr(sn);
        else if(sm[2]=='i') sn=fs.ascdr(sn);
        else if(sm[2]=='w') sn=fs.ascwr(sn);
        else if(sm[2]=='b') sn=fs.ascb(sn);
    }
    return(sn);
}

funcsecure.prototype.dnx=function(hd,sname) { 
    var ln,ofs,ofsb,stype,sn,sa,sm=dai[hd][sname]; if(sm==undefined) return('');
    stype=sm[2]; 
    if(stype=='m') { 
      sa=recdata[hd].substr(sm[1],recdata[hd].length-sm[1]); ofs=0; ofsb=0;
      if(sa.length==0) { sn=''; } else { for(var i=0;i<=sm[3];i++) {  ln=fs.ascd(sa.substr(ofs,4)); ofsb=ofs;   ofs=4+ln;    } }        
      sn=sa.substr(ofsb+4,ln);
    } else {   
        sn=recdata[hd].substr(sm[1],sm[0]); 
    }
    return(sn);
}
funcsecure.prototype.dnno=function(hd,n,m) { 
      var ss=dai[hd]['list_fields'];
      if(m==undefined)  return(fs.dn(hd,fs.itemget(ss,n))); else return(fs.itemcount(ss));
}    
funcsecure.prototype.dnputno=function(hd,n,sdat) { 
      var ss=dai[hd]['list_fields'];
      fs.dnput(hd,fs.itemget(ss,n),sdat);
}    
funcsecure.prototype.dindexno=function(hd,n,m) { // give the name
      var ss=dai[hd]['list_indexnames'];
      if(m==undefined) return(fs.itemget(ss,n)); else return(fs.itemcount(ss));
}    
funcsecure.prototype.dnput=function(hd,sname,sdat) { 
    var ln,ofs,ofsb,stype,sn,sa,sm=dai[hd][sname]; if(sm==undefined) return;
    stype=sm[2]; //0=ln 1=ofs 2=type 3=memono
    if(stype=='m') { 
      sa=recdata[hd].substr(sm[1],recdata[hd].length-sm[1]); ofs=0; ln=0; ofsb=0;
      if(sa.length==0) { } else { for(var i=0;i<=sm[3];i++) {  ln=fs.ascd(sa.substr(ofs,4));  ofsb=ofs; ofs=4+ln;    } }        
        sn=recdata[hd];
        recdata[hd]=sn.substr(0,sm[1]+ofsb)+fs.chrd(sdat.length)+sdat+sn.substr(sm[1]+ofsb+4+ln,sn.length-(sm[1]+ofsb+4+ln)); 
    } else {  
        if(stype=='s') { sdat=fs.xl(sdat,sm[0]);} 
        else if(stype=='f') { sdat=fs.xr(fs.xfs(sdat),sm[0]);  }
        else if(stype=='a') { sdat=fs.xr(fs.xns(sdat),sm[0]);  }
        else if(stype=='q') { sdat=fs.xr(fs.xqs(sdat),sm[0]);  }
        else if(stype=='l') { sdat=fs.chrddr(sdat);  }
        else if(stype=='i') { sdat=fs.chrdr(sdat);  }
        else if(stype=='w') { sdat=fs.chrwr(sdat);  }
        else if(stype=='b') { sdat=fs.chrb(sdat);  }
        sn=recdata[hd];
        recdata[hd]=sn.substr(0,sm[1])+sdat+sn.substr(sm[1]+sm[0],sn.length-(sm[1]+sm[0])); 
    }
}    
funcsecure.prototype.dcreate=function(sip,sdat,srr,nx) { //sdat=custfile|acc,6|name,30|address,30|amount,f|datetime,14|memo,m#acckey,acc|namekey,name,key
 var sb='',sf,snl,sinx,inx,sfname,fld,s1,s2,s3,s33,s4,s5,s6,s7='',ss='',sinxlist='',sr,sro,si,cm,ln,lnn,l,k=0,km=0,kn=0,knt=0,kntn=0,ki=0,sii,ba=false;
  if(srr==undefined) srr='';
  try {
  sb=sdat
  sb=fs.strout(sb,' '); sb=fs.strout(sb,'\n');sb=fs.strout(sb,'\r'); sb=fs.lcase(sb);
  sinx=fs.xitemlast(sb,1,'#'); inx=sinx.split('|');
  sf=fs.xitemget(sb,1,'#'); //sf='itemstamp,32|timestart,24|'
  fld=sf.split('|');
  sfname=fld[0]; ss=''; k=0; snl=''; km=0;
  
  for(var i=1;i<fld.length;i++) {
    s1=fld[i];  if(s1=='') continue;
    s2=fs.itemget(s1,1); s3=fs.itemget(s1,2).trim(); s33=fs.itemget(s1,3);
    if(s3=='a') { ln=12; }
    else if(s3=='f') { ln=12;}
    else if(s3=='q') { ln=25;}
    else if(s3=='d') { ln=8; }
    else if(s3=='m') { ln=0; }
    else if(s3=='b') { ln=1; }
    else if(s3=='w') { ln=2; }
    else if(s3=='i') { ln=4; }
    else if(s3=='l') { ln=8; }
    else { ln=fs.xis(s3); s3='s'; }
    if(s3=='m') { 
        ss+='"'+s2+'":['+ln+','+k+',"'+s3+'",'+km+'],\n'; km++; 
    } else { lnn=ln; 
        if(s33=='') { lnn=ln; } else { lnn=fs.xis(s33); if(lnn==0) lnn=ln; }
        ss+='"'+s2+'":['+ln+','+k+',"'+s3+'",'+lnn+'],\n'; 
    }
    k+=ln; snl+=s2+',';
  }
  si=''; sr=fs.xleft(fs.xleft('{\n'+ss));  sr+='\n}\n'; knt=0; kntn=0; sro=fs.xos(sr); //indexes
  for(var i=0;i<inx.length;i++) {
    s1=inx[i];  if(s1=='') continue;
    if(nx==undefined) s4=fs.itemget(s1,1); else s4=fs.xleft(fs.xleft(fs.itemget(s1,1))); 
    sinxlist+=s4+',';
    si+='"'+s4+'":["x'+fs.right('00'+i,2)+'"'; s2=fs.itemlast(s1,1); ln=fs.itemcount(s2);
    sii=''; kn=0;
    for(var j=1;j<=fs.itemcount(s2);j++) {
        s3=fs.itemget(s2,j); if(s3=='') continue;
        sii+='"'+s3+'",';  l=sro[s3][3];     kn+=l+1; 
    }
    kn+=3; //if(kn>reckeylen) { kn=reckeylen; }
    if((knt+kn)>=inxmax) {  kntn++; knt=kn; } else { knt+=kn; }
    si+=','+kntn+','+fs.xleft(sii)+'],\n'
  }
  if(si=='') { si='{},\n'; } else {   si=fs.xleft(fs.xleft('{\n'+si));    si+='\n},\n'; }
  //alert(si);                                       //  acc:[ln,ofs,type(s,f,a,d)],name:[ln,ofs,type],....
  ss+='"list_filename":"'+sfname+'",\n';             //  'dcust'
  ss+='"list_indexes":'+si;                         // { surname=['x01',0,'name','acc'],rep=['x02',1,'rep','acc'],...}
  ss+='"list_fields":"'+fs.xleft(snl)+'",\n';       //acc,name,rep,amount,...
  ss+='"list_indexnames":"'+fs.xleft(sinxlist)+'"'; //number,surname,rep..
  ss='{\n'+ss;  ss+='\n}\n';
  fs.dataputpass(sip,sfname,'x99master',ss,srr);
  return(ss);
  } catch(e) { return('error'); }
} //j
funcsecure.prototype.dinsertold=function(hd) {  // build indexes
      var sip=recip[hd]; 
      var sa,si,ss='',sf,k=0,km=0,kf=0,kl=0;
      var fname=dai[hd]['list_filename'];
      var inx=dai[hd]['list_indexes'];
      sf=fname;
     for(var key in inx) {
         si=''; 
         for(var j=2;j<inx[key].length;j++) { 
             si+=fs.dn(hd,inx[key][j]);
         }
         si=fs.strrep(si,'#',' '); 
         si='x'+fs.right('00'+k,2)+si; //if(si.length>reckeylen) { si=fs.left(si,reckeylen); } // make it 32 length
         
         k++; kl+=si.length+1; //alert(kl+'>>'+si+'>>'+ss);
         if(kl>=inxmax) {  ss+='|'+si;  km++; kl=si.length+1; sf+='^'+fname+km; }
         else { if(ss=='') ss=si; else ss+='#'+si; }
         
     }
     //alert(sf+'>>>'+ss);
     fs.dataput(sip,sf,fs.lcase(ss),recdata[hd]); //ip,filename,key,record    (filename==PrivateKey)
}
funcsecure.prototype.dinsertreal=function(hd,sfn,lc) {  // build indexes
      var sip=recip[hd]; 
      var spass=recpass[hd]; 
      var sret,sa,si,sr,sm,sn,ss=[],sf,k=0,km=0,kf=0,kl=0,iss=0;
      var fname=dai[hd]['list_filename'];
      var inx=dai[hd]['list_indexes'];
      sf=fname; ss[iss]='';
     for(var key in inx) {
         si=''; 
         for(var j=2;j<inx[key].length;j++) { 
             sr=inx[key][j]; sm=dai[hd][sr]; sn=fs.dnx(hd,inx[key][j]); 
             if((sm[2]=='s')||(sm[2]=='a')||(sm[2]=='f')) sn=sn;
             if(sm[2]=='s') if(sm[3]==undefined) { } else { sn=sn.substr(0,sm[3]); }
             si+=sn;
         }
         if(lc==undefined) { } else { si=fs.lcase(si); }    
         si='x'+fs.right('00'+k,2)+si; // alert(si); //si=fs.lcase(si); 
         k++; kl+=si.length+1; //alert(kl+'>>'+si+'>>'+ss);
         if(kl>=inxmax) { iss++; ss[iss]=fs.chrb(250)+fs.chrb(si.length)+si+fs.chrb(0);  km++; kl=si.length+1; sf+='^'+fname+km; }
         else {  if(ss[iss]=='') ss[iss]=fs.chrb(250)+fs.chrb(si.length)+si+fs.chrb(0); else ss[iss]=fs.xleft(ss[iss])+fs.chrb(si.length)+si+fs.chrb(0); }
         
     }
     
     if(typeof(sfn)=='function') {     fs.dataputexpass(sip,sf,ss,recdata[hd],spass,function(sx) { sfn(sx);  }); }
                            else {   sret=fs.dataputexpass(sip,sf,ss,recdata[hd],spass);  return(sret); }
}
funcsecure.prototype.dinsert=function(hd,sfn) {  return(fs.dinsertreal(hd,sfn,1));  }
funcsecure.prototype.dinsertcase=function(hd,sfn) {  return(fs.dinsertreal(hd,sfn));  }
funcsecure.prototype.winsert=async function(hd) {  
      var sa=await new Promise(function(resolve, reject)  {  fs.dinsertreal(hd,function(ba) {resolve(ba); },1);    });
      return(sa);
}    


funcsecure.prototype.dinsertdocreal=function(hd,docname,doc,sto,stype,sfn,lc) {  // build indexes
      var sip=recip[hd]; 
      var spass=recpass[hd]; 
      var sret,sa,si,sr,sm,sn,ss=[],sf,k=0,km=0,kf=0,kl=0,iss=0;
      var fname=dai[hd]['list_filename'];
      var inx=dai[hd]['list_indexes'];
      sf=fname; ss[iss]='';
     for(var key in inx) {
         si=''; 
         for(var j=2;j<inx[key].length;j++) { 
             sr=inx[key][j]; sm=dai[hd][sr]; sn=fs.dnx(hd,inx[key][j]); 
             if((sm[2]=='s')||(sm[2]=='a')||(sm[2]=='f')) sn=sn;
             if(sm[2]=='s') if(sm[3]==undefined) { } else { sn=sn.substr(0,sm[3]); }
             si+=sn;
         }
         if(lc==undefined) { } else { si=fs.lcase(si); }    
         si='x'+fs.right('00'+k,2)+si; // alert(si); //si=fs.lcase(si); 
         k++; kl+=si.length+1; //alert(kl+'>>'+si+'>>'+ss);
         if(kl>=inxmax) { iss++; ss[iss]=fs.chrb(250)+fs.chrb(si.length)+si+fs.chrb(0);  km++; kl=si.length+1; sf+='^'+fname+km; }
         else {  if(ss[iss]=='') ss[iss]=fs.chrb(250)+fs.chrb(si.length)+si+fs.chrb(0); else ss[iss]=fs.xleft(ss[iss])+fs.chrb(si.length)+si+fs.chrb(0); }
         
     }
     //alert('('+ss+')');
     if(typeof(sfn)=='function') {     fs.dataputdocex(sip,sf,ss,recdata[hd],docname,doc,sto,stype,spass,function(sx) { sfn(sx);  }); }
                            else {     sret=fs.dataputdocex(sip,sf,ss,recdata[hd],docname,doc,sto,stype,spass); return(sret); }
}
funcsecure.prototype.dinsertdoc=function(hd,docname,doc,sto,stype,sfn) { return(fs.dinsertdocreal(hd,docname,doc,sto,stype,sfn,1)) }
funcsecure.prototype.dinsertdoccase=function(hd,docname,doc,sto,stype,sfn) { return(fs.dinsertdocreal(hd,docname,doc,sto,stype,sfn)) }


funcsecure.prototype.dkey=function(hd,sindex,lc) {  // build indexes
  var si='',sn,sr,sm,inx=dai[hd]['list_indexes'];
     if(inx[sindex]==undefined) return('');
     for(var j=2;j<inx[sindex].length;j++) {  
         sr=inx[sindex][j]; sm=dai[hd][sr]; sn=fs.dnx(hd,inx[sindex][j]); 
         if(sm[2]=='s') if(sm[3]==undefined) { } else { sn=sn.substr(0,sm[3]); }
         //sn=fs.dnx(hd,inx[sindex][j]); 
         si+=sn;
     }
     if(lc==undefined) { } else { si=fs.lcase(si); }    
     return(si);
}


funcsecure.prototype.dclear=function(hd) {  // build indexes
       var sf=dai[hd]['list_fields'];
       var sa=fs.itemgetback(sf,1);
       var sb=dai[hd][sa];
       var ln=sb[1];
       recdata[hd]=fs.strdup(' ',ln);
}
funcsecure.prototype.dfindid=function(hd,key,cnt,sfn) {  // build indexes
      var sa,sip=recip[hd],spass=recpass[hd]; 
      var fname=dai[hd]['list_filename']; 
      if(cnt==undefined) cnt=1;
      if(typeof(sfn)=='function') { 
        fs.dataget(sip,fname,'x00'+key,cnt,spass,function(sa) {     
         if(sa.length>0) {  recdata[hd]=sa[0]; recs[hd]=sa; recscur[hd]=0; sfn(true);  } else sfn(false);
        });
      } else {
       sa=fs.dataget(sip,fname,'x00'+key,cnt,spass);
       if(sa.length>0) {  recdata[hd]=sa[0]; recs[hd]=sa; recscur[hd]=0; return(true);  } else return(false);
      } 
}
funcsecure.prototype.wfindid=async function(hd,key,cnt) { 
    var sa=await new Promise(function(resolve, reject)  {  fs.dfindid(hd,key,cnt,function(ba) {resolve(ba); });    });
    return(sa);
}
funcsecure.prototype.dfindidlist=function(hd,keys,sfn) {  // keys=1002,1005,1003...
      var sa,sip=recip[hd],spass=recpass[hd],sb='',bu=keys.split(','); 
      var fname=dai[hd]['list_filename'];
      for(var i=0;i<bu.length;i++) { if(bu[i]=='') continue; sb+='x00'+bu[i]+','; }
      if(typeof(sfn)=='function') { 
        fs.datagetlist(sip,fname,sb,spass,function(sa) {     
         if(sa.length>0) {  recdata[hd]=sa[0]; recs[hd]=sa; recscur[hd]=0; sfn(true);  } else sfn(false);
        });
      } else {
       sa=fs.datagetlist(sip,fname,sb,spass);
       if(sa.length>0) {  recdata[hd]=sa[0]; recs[hd]=sa; recscur[hd]=0; return(true);  } else return(false);
      } 
}
funcsecure.prototype.wfindidlist=async function(hd,keys) { 
    var sa=await new Promise(function(resolve, reject)  {  fs.dfindidlist(hd,keys,function(ba) {resolve(ba); });    });
    return(sa);
}





funcsecure.prototype.dfindiddoc=function(hd,key,cnt,sfn) { // build indexes
      var sa,sip=recip[hd],spass=recpass[hd]; 
      var fname=dai[hd]['list_filename'];
      if(cnt==undefined) cnt=1;
      if(typeof(sfn)=='function') { 
        fs.datagetdoc(sip,fname,'x00'+key,cnt,spass,function(sa) {     
         if(sa.record.length>0) {   recs[hd]=sa.record; recsdoc[hd]=sa.doc; recsitem[hd]=sa.item; recskey[hd]=sa.key; recscur[hd]=0; recdata[hd]=recs[hd][0]; sfn(true);  } else sfn(false);
        });
      } else {
       sa=fs.datagetdoc(sip,fname,'x00'+key,cnt,spass);     //
       if(sa.record.length>0) {   recs[hd]=sa.record; recsdoc[hd]=sa.doc; recsitem[hd]=sa.item; recskey[hd]=sa.key; recscur[hd]=0; recdata[hd]=recs[hd][0]; return(true);  } else return(false);
      } 

}

funcsecure.prototype.dfind=function(hd,sindex,sfrom,sto,sfilter,cnt,sfn) {  // build indexes
      var sip=recip[hd],spass=recpass[hd]; 
      var sa,sb;
      var fname=dai[hd]['list_filename'];
      var sinxnames=dai[hd]['list_indexnames'];
      var indexes=dai[hd]['list_indexes'];
      var sinx='x00';
function subdfind() { 
    var sb=indexes[sindex]; 
    if(sb==undefined) return('x00'); else  return(sb[0]); 
}
  if(sindex=='x00') sindex='x01';
  if(sindex==undefined) sinx='x00'; else { if((sindex.length==3)&&(fs.left(sindex,1)=='x')&&(fs.xis(fs.right(sindex,2))>0)) { sinx='x'+fs.right('00'+(fs.xis(fs.right(sindex,2))-1),2); } else { sinx=subdfind(); } }
  if(sfrom==undefined) sfrom=sinx; else sfrom=sinx+sfrom;
  if(sto==undefined) sto=sinx; else sto=sinx+sto;
  if(sfilter==undefined) sfilter=''; else sfilter=sfilter;
  if(cnt==undefined) cnt='0';
  sa=fs.itemget(sinxnames,fs.xis(fs.right(sinx,2))+1); sb=indexes[sa]; if(sb[1]==0) { } else { fname+=sb[1]; }
  //alert(sa+':'+fname+':'+sinx+'>>'+sfrom+'=='+sto);
  if(typeof(sfn)=='function') { fs.datafrom(sip,fname,sfrom,sto,sfilter,cnt,spass,function(sn) { if(sn.length>0) { recs[hd]=sn; sfn(true);  } else { sfn(false); }  }); }
                         else { sa=fs.datafrom(sip,fname,sfrom,sto,sfilter,cnt,spass); if(sa.length>0) { recs[hd]=sa; return(true);  } else { return(false); } }
}
funcsecure.prototype.wfind=async function(hd,sindex,sfrom,sto,sfilter,cnt) {  // build indexes
     var sa=await new Promise(function(resolve, reject)  {  fs.dfind(hd,sindex,sfrom,sto,sfilter,cnt,function(ba) {resolve(ba); });    });
     return(sa);
}


funcsecure.prototype.dfindall=function(hd,sindex,sfrom,sto,sfilter,cnt,sfn) {  // build indexes
      var sip=recip[hd],spass=recpass[hd]; 
      var sa,sb;
      var fname=dai[hd]['list_filename'];
      var sinxnames=dai[hd]['list_indexnames'];
      var indexes=dai[hd]['list_indexes'];
      var sinx='x00';
function subdfind() { 
    var sb=indexes[sindex]; 
    if(sb==undefined) return('x00'); else  return(sb[0]); 
}
  if(sindex=='x00') sindex='x01';
  if(sindex==undefined) sinx='x00'; else { if((sindex.length==3)&&(fs.left(sindex,1)=='x')&&(fs.xis(fs.right(sindex,2))>0)) { sinx='x'+fs.right('00'+(fs.xis(fs.right(sindex,2))-1),2); } else { sinx=subdfind(); } }
  if(sfrom==undefined) sfrom=sinx; else sfrom=sinx+sfrom;
  if(sto==undefined) sto=sinx; else sto=sinx+sto;
  if(sfilter==undefined) sfilter=''; else sfilter=sfilter;
  if(cnt==undefined) cnt='0';
  sa=fs.itemget(sinxnames,fs.xis(fs.right(sinx,2))+1); sb=indexes[sa]; if(sb[1]==0) { } else { fname+=sb[1]; }
  //alert(sa+':'+fname+':'+sinx+'>>'+sfrom+'=='+sto);
  if(typeof(sfn)=='function') { fs.datafromall(sip,fname,sfrom,sto,sfilter,cnt,spass,function(sn) { if(sn.length>0) { recs[hd]=sn; sfn(true);  } else { sfn(false); }  }); }
                         else { sa=fs.datafromall(sip,fname,sfrom,sto,sfilter,cnt,spass); if(sa.length>0) { recs[hd]=sa; return(true);  } else { return(false); } }

}


funcsecure.prototype.dfinddoc=function(hd,sindex,sfrom,sto,sfilter,cnt,sfn) {  // build indexes
      var sip=recip[hd],spass=recpass[hd]; 
      var sa,sb;
      var fname=dai[hd]['list_filename'];
      var sinxnames=dai[hd]['list_indexnames'];
      var indexes=dai[hd]['list_indexes'];
      var sinx='x00';
function subdfind() { 
    var sb=indexes[sindex]; 
    if(sb==undefined) return(''); else  return(sb[0]); 
}
  if(sindex=='x00') sindex='x01';
  if(sindex==undefined) sinx='x00'; else { if((sindex.length==3)&&(fs.left(sindex,1)=='x')&&(fs.xis(fs.right(sindex,2))>0)) { sinx='x'+fs.right('00'+(fs.xis(fs.right(sindex,2))-1),2); } else { sinx=subdfind(); } }
  if(sfrom==undefined) sfrom=sinx; else sfrom=sinx+sfrom;
  if(sto==undefined) sto=sinx; else sto=sinx+sto;
  if(sfilter==undefined) sfilter=''; else sfilter=sfilter;
  if(cnt==undefined) cnt='0';
  if(sinx=='') { } else { sa=fs.itemget(sinxnames,fs.xis(fs.right(sinx,2))+1); sb=indexes[sa]; if(sb[1]==0) { } else { fname+=sb[1]; } }
  //alert(sa+':'+fname+':'+sinx+'>>'+sfrom+'=='+sto);
  if(typeof(sfn)=='function') { fs.datafromdoc(sip,fname,sfrom,sto,sfilter,cnt,spass,function(sn) { if(sn.record.length>0) { recs[hd]=sn.record; recsdoc[hd]=sn.doc; recsitem[hd]=sn.item; recskey[hd]=sn.key; sfn(true);  } else { sfn(false); }  }); }
                         else { sa=fs.datafromdoc(sip,fname,sfrom,sto,sfilter,cnt,spass);  if(sa.record.length>0) { recs[hd]=sa.record; recsdoc[hd]=sa.doc; recsitem[hd]=sa.item; recskey[hd]=sa.key; return(true);   } else { return(false); } }
}



funcsecure.prototype.dfindalldoc=function(hd,sindex,sfrom,sto,sfilter,cnt,sfn) {  // build indexes
      var sip=recip[hd],spass=recpass[hd]; 
      var sa,sb;
      var fname=dai[hd]['list_filename'];
      var sinxnames=dai[hd]['list_indexnames'];
      var indexes=dai[hd]['list_indexes'];
      var sinx='x00';
function subdfind() { 
    var sb=indexes[sindex]; 
    if(sb==undefined) return(''); else  return(sb[0]); 
}
  if(sindex=='x00') sindex='x01';
  if(sindex==undefined) sinx='x00'; else { if((sindex.length==3)&&(fs.left(sindex,1)=='x')&&(fs.xis(fs.right(sindex,2))>0)) { sinx='x'+fs.right('00'+(fs.xis(fs.right(sindex,2))-1),2); } else { sinx=subdfind(); } }
  if(sfrom==undefined) sfrom=sinx; else sfrom=sinx+sfrom;
  if(sto==undefined) sto=sinx; else sto=sinx+sto;
  if(sfilter==undefined) sfilter=''; else sfilter=sfilter;
  if(cnt==undefined) cnt='0';
  if(sinx=='') { } else { sa=fs.itemget(sinxnames,fs.xis(fs.right(sinx,2))+1); sb=indexes[sa]; if(sb[1]==0) { } else { fname+=sb[1]; } }
  if(typeof(sfn)=='function') { fs.datafromalldoc(sip,fname,sfrom,sto,sfilter,cnt,spass,function(sn) { if(sn.record.length>0) { recs[hd]=sn.record; recsdoc[hd]=sn.doc; recsitem[hd]=sn.item; recskey[hd]=sn.key;  sfn(true);  } else { sfn(false); }  }); }
                         else { sa=fs.datafromalldoc(sip,fname,sfrom,sto,sfilter,cnt,spass); if(sa.record.length>0) { recs[hd]=sa.record; recsdoc[hd]=sa.doc; recsitem[hd]=sa.item; recskey[hd]=sa.key;  return(true);  } else { return(false); } }

}

funcsecure.prototype.dfindkeydoc=function (hd,key,cnt,sfn) { // key=meta1^meta2 .. for chats
  var sa;
  var sip=recip[hd],spass=recpass[hd]; 
  var fname=dai[hd]['list_filename'];
  var skey=fs.dbkey(fname); 
  var keys=fs.friendaddress(sip,key); 
  if(cnt==undefined) cnt='0';
  if(typeof(sfn)=='function') { 
      fs.rpost(sip,'write|'+fs.datakey()+'|key,'+fs.xhexs(skey.pub)+','+keys+','+cnt,function(ss) {  sa=fs.dataformatdoc(sip,ss,skey,spass,1);     
        if(sa.record.length>0) { recs[hd]=sa.record; recsdoc[hd]=sa.doc; recsitem[hd]=sa.item; recskey[hd]=sa.key;  sfn(true);  } else { sfn(false); }  
      }); 
  }  else { 
      sa=fs.rpostget(sip,'write|'+fs.datakey()+'|key,'+fs.xhexs(skey.pub)+','+keys+','+cnt); sa=fs.dataformatdoc(sip,sa,skey,spass,1); 
      if(sa.record.length>0) { recs[hd]=sa.record; recsdoc[hd]=sa.doc; recsitem[hd]=sa.item; recskey[hd]=sa.key;  return(true);  } else { return(false); }
  }
} //dataget



funcsecure.prototype.ddoc=function(hd) { if(recsdoc[hd]==undefined) return('');// record document
  var sm=recsdoc[hd][recscur[hd]];
  if(sm==undefined) return('');
  if(sm=='') { return(''); } else { return(fs.datadoc(sm)); }
}
//sitem[j]=fs.datetrans(ndate)+','+ssitem+','+isf+','+isdoc+','+nadr;
//date,itemno,isf,isdoc,toaddress
funcsecure.prototype.ditem=function(hd) { if(recsitem[hd]==undefined) return('');// record document
  var sm=recsitem[hd][recscur[hd]]; 
  if(sm==undefined) return('');
  return(sm);
}
funcsecure.prototype.did=function(hd) { if(recskey[hd]==undefined) return('');// record document
  var sm=recskey[hd][recscur[hd]];
  if(sm==undefined) return('');
  return(sm);
}

funcsecure.prototype.deof=function(hd) {  // build indexes
    if(recs[hd]==undefined) return;
    if(recscur[hd]==undefined) return;
    if(recscur[hd]>=recs[hd].length) return(true);
    if((recscur[hd])<0) return(true);
    return(false);
}
funcsecure.prototype.dfirst=function(hd) {  // build indexes
    if(recs[hd]==undefined) return;
    if(recs[hd].length>0) { recdata[hd]=recs[hd][0];  recscur[hd]=0; } 
}
funcsecure.prototype.dnext=function(hd) {  // build indexes
    if(recs[hd]==undefined) return;
    if(recscur[hd]==undefined) return;
    recscur[hd]++; 
    if(recscur[hd]>=recs[hd].length) {  } else { recdata[hd]=recs[hd][recscur[hd]];  } 
}
funcsecure.prototype.dprev=function(hd) {  // build indexes
    if(recs[hd]==undefined) return;
    if(recscur[hd]==undefined) return;
    recscur[hd]--;
    if((recscur[hd])<0) {  } else { recdata[hd]=recs[hd][recscur[hd]];  } 
}

funcsecure.prototype.dlast=function(hd) {  // build indexes
    var ln;
    if(recs[hd]==undefined) return;
    var ln=recs[hd].length; 
    if(ln>0) { recdata[hd]=recs[hd][ln-1]; recscur[hd]=ln-1;  } 
}


//*******************************************************************************************************    
//*******************************************************************************************************    
//*******************************************************************************************************    
}  //  fc.chrb main function  

//    fs.dataput(IP,filename,key,record,[callback]);   //   IP=IPaddress filename==PrivateKey[^pkey1^pkey2..]  key=key[|key1|key2..]   key=key#key1#key2.. (97) 
//    fs.dataputpass(IP,filename,key,record,[pass],[callback]);   //   IP=IPaddress filename==PrivateKey[^pkey1^pkey2..]  key=key[|key1|key2..]   key=key#key1#key2.. (97) 
//    fs.dataget(IP,filename,key,[count],[callback]);   //  return=array[n] (filename==PrivateKey)
//    fs.datafrom(IP,filename,[from],[to],[filter],[count],[pass],[callback]);   //  return=array[n] (filename==PrivateKey)
//    fs.datafromall(IP,filename,[from],[to],[filter],[count],[pass],[callback]);   //  return=array[n] (filename==PrivateKey)

//    fs.dataputdoc(IP,filename,key,record,docname,doc,[callback]);   //   (filename==PrivateKey)
//    fs.datagetdoc(IP,filename,key,[count],[callback]);   //  return={record:srecarray,doc:sdocarray,item:array,key=array} sa.record[n] fs.datadoc(sa.doc[n]) (filename==PrivateKey)
//    fs.datafromdoc(IP,filename,[from],[to],[filter],[count],[callback]);   // return={record:srecarray,doc:sdocarray}  (filename==PrivateKey)
//    fs.datafromalldoc(IP,filename,[from],[to],[filter],[count],[callback]);   // return={record:srecarray,doc:sdocarray}  (filename==PrivateKey)

//    fs.chatput(IP,userpkey,friendname(s),chatinfo,[callback])  //userprivatekey friend1^friend2
//    fs.chatget(IP,userpkey,friendname(s),[count],[callback]);   //  return=array (filename==PrivateKey)
//    fs.chatputdoc(IP,userpkey,friendname(s),chatinfo,docname,doc,[callback])  //userprivatekey
//    fs.chatgetdoc(IP,userpkey,friendname(s),[count],[callback]);   // return={record:srecarray,doc:sdocarray} (filename==PrivateKey)


//    fs.userput(sip,userpassword,username,[callback])      // new user
//    fs.userexist(sip,username,[callback]);                // return=useraddress/''  dbkey(password).pub/pri 
//    fs.useraddress(sip,useraddress,[callback])  //useraddress=userpublicaddress
//    fs.userpublicaddress(userpassword)  //get the user public address from his password

//    fs.emailput(sip,semailaddress,ssubject,sfile,sbody,[callback])   // sfile='c:\dir\file.txt'
//    fs.emailputdata(sip,semailaddress,ssubject,docname,doc,sbody,[callback])   // docname='file.txt' doc='document info......'

//     fs.dcreate(sip,sdat) //sdat=custfile|acc,6|name,30|address,30|amount,f|datetime,14|memo,m#acckey,acc|namekey,name,acc  //types=s d f=12 a=12 q=24 b=byte1 w=word2 i=integer4 l=long8
//     hd=fs.dopen(sip,fname,[pass]);                                        //fname=custfile
//     if(fs.dfind(hd,sindex,sfrom,sto,sfilter,cnt,[callback])==true) { // eg.if(dfind(hd,'surname','a','b','',10)==true) {  }
//        dfirst(hd)                                                  // fs.dlast(hd)
//        for(;;) { 
//          if(fs.deof(hd)) break;
//          ....fs.dn(hd,'number')... fs.dn(hd,'name')...
//          fs.dnext(hd);                                              // fs.dprev(hd)
//        } 
//      } 
//     fs.dclose(hd);
//     if(fs.dfindall(hd,sindex,sfrom,sto,sfilter,cnt,[callback])==true) { } 
//     fs.dclear(hd) ... fs.dnput(hd,'number','...data...')           // empty record and fill in fields
//     fs.dinsert(hd,[callback])                                                 // write record
//     if(fs.dfindid(hd,'number',[cnt],[callback])==true) {  ..dn(hd,'name').. }       // find one record
//     fs.dkey(hd,'index')                                               // get fields of an index eg. ss=fs.dkey(hd,'surname')
//     fs.dnno(hd,n) fs.dnputno(hd,n,data)                                  // get or set a field by number
//     fs.drec(hd,[data])                                                // get or set a whole record
//     fs.drecs(hd)                                                      // array of records after a dfind/dfindall/dfindid
//     fs.dinfo(hd) .. fs.dfields(hd)                                    // get record layout .. or record fields
//     fs.dfindiddoc(hd,'number',[cnt],[callback])
//     fs.dfinddoc(hd,sindex,sfrom,sto,sfilter,cnt,[callback])
//     fs.dfindalldoc(hd,sindex,sfrom,sto,sfilter,cnt,[callback])
//     fs.dfindkeydoc(hd,'meta1^meta2',cnt,[callback])
//     fs.dinsertdoc(hd,docname,doc,[sto],[type],[callback])                   // sto='meta1^meta2'  type='0111' (chat)
//     fs.ddoc(hd)                                                       // file.txt:....document...........
//     fs.ditem(hd)                                                     // get timestamp24 and itemstamp64,isf,isdoc,adrto of transaction
//     fs.did(hd)                                                     // callup key

// fc.chrb fc.chrddr
function funchtml() {
    var xx=1,yy=1,xxfont=1;
    funchtml.prototype.html = function (ss,sdat) { if(sdat==undefined) return(document.getElementById(ss).innerHTML); else document.getElementById(ss).innerHTML=sdat; }
    funchtml.prototype.val = function (ss,sdat) {         var sid;
        if(sdat==undefined) {   sid=document.getElementById(ss);        return(sid.value);       } 
        else { sid=document.getElementById(ss); sid.value=sdat; }
    }
    funchtml.prototype.attr = function (ss,sw,sdat) { if(sdat==undefined) return(document.getElementById(ss).getAttribute(sw)); else document.getElementById(ss).setAttribute(sw,sdat);  }
    funchtml.prototype.attrdel = function (ss,sw) { document.getElementById(ss).removeAttribute(sw);  }
    funchtml.prototype.nstyle = function (ss,sw,sdat) { if(sdat==undefined) return(document.getElementById(ss).style[sw]); else document.getElementById(ss).style[sw]=sdat;  }
    funchtml.prototype.ncreate = function (ss) { return(document.createElement(ss));  }

    funchtml.prototype.tag = function (ss) { return (document.getElementById(ss)); }
//****************************************
    funchtml.prototype.confirm = function (ss) { return (confirm(ss)); };
    funchtml.prototype.trigger = function (ss,typ) {
        var elem=document.getElementById(ss)
        var ev = document.createEvent("MouseEvents");
        ev.initMouseEvent(typ, true, true, elem.ownerDocument.defaultView,  0, 0, 0, 0, 0, false, false, false, false, 0, null);
        elem.dispatchEvent(ev);
   }

//*************************************************
    funchtml.prototype.at = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("~" + sum + ""); };
    
    funchtml.prototype.svg = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<svg " + att + ">" + sum + "</svg>");
    };
    // funchtml.prototype.line = function () {
    //     var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
    //     for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<line " + att + ">" + sum + "</line>");
    // };
    funchtml.prototype.text = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<text " + att + ">" + sum + "</text>");
    };
    funchtml.prototype.tspan = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<tspan " + att + ">" + sum + "</tspan>");
    };
    funchtml.prototype.g = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<g " + att + ">" + sum + "</g>");
    };
    funchtml.prototype.stylesheet = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<style " + att + ">" + sum + "</style>");
    };

    funchtml.prototype.foreignobject = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<foreignObject " + att + ">" + sum + "</foreignObject>");
    };
    // funchtml.prototype.circle = function () {
    //     var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
    //     for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<circle " + att + ">" + sum + "</circle>");
    // };
    

    // funchtml.prototype.path = function () {
    //     var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
    //     for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<path " + att + ">" + sum + "</path>");
    // };
    funchtml.prototype.filter = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<filter " + att + ">" + sum + "</filter>");
    };
    funchtml.prototype.defs = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<defs " + att + ">" + sum + "</defs>");
    };
    // funchtml.prototype.rect = function () {
    //     var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
    //     for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<rect " + att + ">" + sum + "</rect>");
    // };
    // funchtml.prototype.image = function () {
    //     var sum = "", att = "", ss = "", k = 0; 
    //     if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
    //     for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<image " + att + ">" + sum + "</image>");
    // };

    // M = moveto
    // L = lineto
    // H = horizontal lineto
    // V = vertical lineto
    // C = curveto
    // S = smooth curveto
    // Q = quadratic Bézier curve
    // T = smooth quadratic Bézier curveto
    // A = elliptical Arc
    // Z = closepath

    funchtml.prototype.image = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<image " + sum + " ></image>"); };
    funchtml.prototype.rect = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<rect " + sum + " ></rect>"); };
    funchtml.prototype.path = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<path " + sum + " ></path>"); };
    funchtml.prototype.circle = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<circle " + sum + " ></circle>"); };
    funchtml.prototype.line = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<line " + sum + " ></line>"); };
    funchtml.prototype.polygon = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<polygon " + sum + " ></polygon>"); };
    funchtml.prototype.polyline = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<polyline " + sum + " />"); };
    //funchtml.prototype.text = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<text " + sum + " ></text>"); };
    
    
    funchtml.prototype.img = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<img " + att + ">" + sum + "</img>");
    };
    funchtml.prototype.input = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<input " + att + ">" + sum + "</input>");
    };
        funchtml.prototype.link = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i] } return ("<a " + att + ">" + sum + "</a>");
    };
    funchtml.prototype.span = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i] } return ("<span " + att + ">" + sum + "</span>");
    };
    funchtml.prototype.div = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i] } return ("<div " + att + ">" + sum + "</div>");
    };
    funchtml.prototype.canvas = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i] }         return ("<canvas " + att + ">" + sum + "</canvas>");
    };
    funchtml.prototype.textarea = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i] } return ("<textarea " + att + ">" + sum + "</textarea>");
    };
    funchtml.prototype.table = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<table " + att + ">" + sum + "</table>");
    };
    funchtml.prototype.tr = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<tr " + att + ">" + sum + "</tr>");
    };
    funchtml.prototype.td = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<td " + att + ">" + sum + "</td>");
    };
    funchtml.prototype.objecttag = function () {
        var sum = "", att = "", ss = "", k = 0; if (arguments.length > 0) { ss = arguments[0]; if (ss.length > 0) { if (ss[0] == '~') { att = ss.substr(1, ss.length - 1); k = 1; } } }
        for (var i = k; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<object " + att + ">" + sum + "</object>");
    };


    funchtml.prototype.bold = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<b>" + sum + "</b>"); };
    funchtml.prototype.small = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<small>" + sum + "</small>"); };
    funchtml.prototype.big = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<big>" + sum + "</big>"); };
    funchtml.prototype.italic = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i]; } return ("<i>" + sum + "</i>"); };
    funchtml.prototype.under = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i]; } return("<u>" + sum + "</u>"); };
    funchtml.prototype.br = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i] } return ("<br/>"); };
    funchtml.prototype.func = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i] } return (sum); };



    funchtml.prototype.st = function (ss) { return (ss); };
    funchtml.prototype.styl = function (ss,sa) { return (ss+"='"+sa+"' "); };

    funchtml.prototype.transform = function (ss) {  return ("transform='" + ss + "' "); };
    funchtml.prototype.cfill = function (ss) {  return ("fill='" + ss + "' "); };
    funchtml.prototype.cfilter = function (ss) { return ("filter='url(#" + ss + ")' "); };
    funchtml.prototype.xlink = function (ss) { return ("xlink:href='" + ss + "' "); };
    funchtml.prototype.viewbox = function () {  
        var ba=false,k,sa,sum = ""; 
        for(var i=0;i<arguments.length;i++) {        k=arguments[i]; sa=' ';        sum=sum+k+' ';       }
        return ("viewbox='" + fs.xleft(sum) + "' preserveAspectRatio='none'"); 
    }; //x y w h


    funchtml.prototype.points = function () { 
        var ba=false,k,sa,sum = ""; 
        for(var i=0;i<arguments.length;i++) {
            if(ba==false) { k=arguments[i]*xx; ba=true; sa=','; } else { k=arguments[i]*yy; ba=false; sa=' ';}
            sum=sum+k+sa;
        }
        return ("points='" + fs.xleft(sum) + "' "); 
    };
    funchtml.prototype.npoints = function () { 
        var ba=false,k,sa,sum = ""; 
        for(var i=0;i<arguments.length;i++) {
            if(ba==false) { k=arguments[i]; ba=true; sa=','; } else { k=arguments[i]; ba=false; sa=' ';}
            sum=sum+k+sa;
        }
        return ("points='" + fs.xleft(sum) + "' "); 
    };
    funchtml.prototype.d = function (ss) {  return ("d='" + ss + "' "); };
    funchtml.prototype.x = function (ss) {  return ("x='" + ss*xx + "' "); };
    funchtml.prototype.y = function (ss) {  return ("y='" + ss*yy + "' "); };
    funchtml.prototype.xy = function (x,y) {  return ("x='"+x*xx+"' y='"+y*yy+"' "); };
    funchtml.prototype.wh = function (w,h) {  return ("width='"+w*xx+"' height='"+h*yy+"' "); };
    funchtml.prototype.xywh = function (x,y,w,h) {  return ("x='"+x*xx+"' y='"+y*yy+"' width='"+w*xx+"' height='"+h*yy+"' "); };
    funchtml.prototype.xyxy = function (x,y,w,h) {  return ("x='"+x*xx+"' y='"+y*yy+"' width='"+(w-x)*xx+"' height='"+(h-y)*yy+"' "); };
    funchtml.prototype.nwh = function (w,h) {  return ("width='"+w+"' height='"+h+"' "); };
    funchtml.prototype.nxy = function (x,y) {  return ("x='"+x+"' y='"+y+"' "); };
    funchtml.prototype.nxywh = function (x,y,w,h) {  return ("x='"+x+"' y='"+y+"' width='"+w+"' height='"+h+"' "); };
    funchtml.prototype.nxyxy = function (x,y,w,h) {  return ("x='"+x+"' y='"+y+"' width='"+(w-x)+"' height='"+(h-y)+"' "); };
    funchtml.prototype.dx = function (ss) {  return ("dx='" + ss*xx + "' "); };
    funchtml.prototype.dy = function (ss) {  return ("dy='" + ss*yy + "' "); };
    funchtml.prototype.rx = function (ss) {  return ("rx='" + ss + "' "); };
    funchtml.prototype.ry = function (ss) {  return ("ry='" + ss + "' "); };
    funchtml.prototype.cx = function (ss) {  return ("cx='" + ss*xx + "' "); };
    funchtml.prototype.cy = function (ss) {  return ("cy='" + ss*yy + "' "); };
    funchtml.prototype.r = function (ss) {  return ("r='" + ss + "' "); };
    funchtml.prototype.x1y1 = function (x1,y1,x2,y2) {  return ("x1='" + x1*xx + "' y1='" + y1*yy + "'  x2='" + x2*xx + "' y2='" + y2*yy + "' ");};
    funchtml.prototype.x1 = function (ss) {  return ("x1='" + ss*xx + "' "); };
    funchtml.prototype.x2 = function (ss) {  return ("x2='" + ss*xx + "' "); };
    funchtml.prototype.y1 = function (ss) {  return ("y1='" + ss*yy + "' "); };
    funchtml.prototype.y2 = function (ss) {  return ("y2='" + ss*yy + "' "); };
    funchtml.prototype.xyset = function(x,y) { xx=x;yy=y; return('x'); }
    funchtml.prototype.xyget = function() {  return(xxfont); }
    funchtml.prototype.xysetfont = function(n) { xxfont=n; }
    
    
    funchtml.prototype.hint = function (ss) {  return ("placeholder='" + ss + "' "); };
    funchtml.prototype.cwidth = function (ss) {  return ("width='" + ss*xx + "' "); };   //?
    funchtml.prototype.cheight = function (ss) {  return ("height='" + ss*yy + "' "); }; //?
    funchtml.prototype.nwidth = function (ss) {  return ("width='" + ss + "px' "); };   //?
    funchtml.prototype.nheight = function (ss) {  return ("height='" + ss + "px' "); }; //?
    funchtml.prototype.ndata = function (ss) {  return ("data='" + ss + "' "); };
    funchtml.prototype.ntype = function (ss) { return ("type='" + ss + "' "); };
    funchtml.prototype.alt = function (ss) { return ("alt='" + ss + "' "); };
    funchtml.prototype.id = function (ss) { return ("id='" + ss + "' "); };
    funchtml.prototype.wrap = function (ss) { return ("wrap='" + ss + "' "); };
    funchtml.prototype.cols = function (ss) { return ("cols='" + ss + "' "); };
    funchtml.prototype.valign = function (ss) { return ("valign='" + ss + "' "); };
    funchtml.prototype.multiple = function (ss) { return ("multiple "); };
    funchtml.prototype.rows = function (ss) { return ("rows='" + ss + "' "); };
    funchtml.prototype.wrap = function (ss) { return ("wrap='" + ss + "' "); };
    funchtml.prototype.value = function (ss) { return ("value='" + ss + "' "); };
    funchtml.prototype.href = function (ss) { return ("href='" + ss + "' "); };
    funchtml.prototype.name = function (ss) { return ("name='" + ss + "' "); };
    funchtml.prototype.align = function (ss) { return ("align='" + ss + "' "); };
    funchtml.prototype.checked = function (ss) { return ("checked='" + ss + "' "); };
    funchtml.prototype.maxlength = function (ss) { return ("maxlength='" + ss + "' "); };
    funchtml.prototype.placeholder = function (ss) { return ("placeholder='" + ss + "' "); };
    funchtml.prototype.size = function (ss) { return ("size='" + ss + "' "); };                                                                   
    funchtml.prototype.src = function (ss) { return ("src='" + ss + "' "); };
    funchtml.prototype.onload = function (ss) { return ("onload='" + ss + "' "); };
    funchtml.prototype.class = function (ss) { return ("class='" + ss + "' "); };
    funchtml.prototype.spellcheck = function (ss) { return ("spellcheck='" + ss + "' "); };
    funchtml.prototype.title = function (ss) { return ("title='" + ss + "' "); };
    funchtml.prototype.disabled = function (ss) { if(ss) return ("disabled='" + ss + "' "); else return(''); };
    funchtml.prototype.readonly = function (ss) { return ("readonly='" + ss + "' "); };
    funchtml.prototype.colspan = function (ss) { return ("colspan='" + ss + "' "); };
    funchtml.prototype.rowspan = function (ss) { return ("rowspan='" + ss + "' "); };
    funchtml.prototype.cellpadding = function (ss) { return ("cellpadding='" + ss + "px' "); };
    funchtml.prototype.cellspacing = function (ss) { return ("cellspacing='" + ss + "px' "); };

    funchtml.prototype.onclick = function (ss) { return ("onclick='" + ss + "' "); };
    funchtml.prototype.onblur = function (ss) { return ("onblur='" + ss + "' "); };
    funchtml.prototype.onchange = function (ss) { return ("onchange='" + ss + "' "); };
    funchtml.prototype.onfocus = function (ss) { return ("onfocus='" + ss + "' "); };
    funchtml.prototype.onselect = function (ss) { return ("onselect='" + ss + "' "); };
    funchtml.prototype.onsubmit = function (ss) { return ("onsubmit='" + ss + "' "); };
    funchtml.prototype.ondblclick = function (ss) { return ("ondblclick='" + ss + "' "); };
    funchtml.prototype.onmousedown = function (ss) { return ("onmousedown='" + ss + "' "); };
    funchtml.prototype.onmouseup = function (ss) { return ("onmouseup='" + ss + "' "); };
    funchtml.prototype.onmouseout = function (ss) { return ("onmouseout='" + ss + "' "); };
    funchtml.prototype.onmouseover = function (ss) { return ("onmouseover='" + ss + "' "); };
    funchtml.prototype.onmousemove = function (ss) { return ("onmousemove='" + ss + "' "); };
    funchtml.prototype.onkeydown = function (ss) { return ("onkeydown='" + ss + "' "); };
    funchtml.prototype.onkeyup = function (ss) { return ("onkeyup='" + ss + "' "); };
    funchtml.prototype.onkeypress = function (ss) { return ("onkeypress='" + ss + "' "); };

  //*********************************** style ***************************************************************
    funchtml.prototype.att = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i] }  return ("style='" + sum + "' ");    };
    funchtml.prototype.font_face = function () { var sum = ""; for (var i = 0; i < arguments.length; i++) { sum = sum + arguments[i] }  return ("@font-face {" + sum + "} ");    };
    funchtml.prototype.stroke = function (ss) { return ("stroke:" + ss + "; "); };
    funchtml.prototype.stroke_width = function (ss) { return ("stroke-width:" + ss + "; "); };
    funchtml.prototype.stroke_opacity = function (ss) { return ("stroke-opacity:" + ss + "; "); };
    funchtml.prototype.stroke_linecap = function (ss) { return ("stroke-linecap:" + ss + "; "); };
    funchtml.prototype.stroke_dasharray = function (ss) { return ("stroke-dasharray:" + ss + "; "); };
    
    
    funchtml.prototype.fill = function (ss) { return ("fill:" + ss + "; "); };
    funchtml.prototype.fill_opacity = function (ss) { return ("fill-opacity:" + ss + "; "); };
    funchtml.prototype.swh = function (w,h) {  return ("width:"+w*xx+"; height:"+h*yy+"; "); };
    funchtml.prototype.snwh = function (w,h) {  return ("width:"+w+"; height:"+h+"; "); };
    funchtml.prototype.sfont_size = function (ss) {return ("font-size:" + ss*yy + "; "); };
    funchtml.prototype.snfont_size = function (ss) {return ("font-size:" + ss + "; "); };
    funchtml.prototype.font_size = function (ss) {return ("font-size:" + ss + "pt; "); };
    funchtml.prototype.spfont_size = function (ss) {return ("font-size:" + ss*yy + "pt; "); };
  
    funchtml.prototype.color = function (ss) { return ("color:" + ss + "; "); };
    funchtml.prototype.background_color = function (ss) { return ("background-color:" + ss + "; "); };
    funchtml.prototype.background_image = function (ss) { return ("background-image:url('" + ss + "'); "); };
    funchtml.prototype.background_repeat = function (ss) { return ("background-repeat:" + ss + "; "); };
    funchtml.prototype.background_size = function (ss) { return ("background-size:" + ss + "; "); };
    funchtml.prototype.opacity = function (ss) { return ("opacity:" + ss + "; "); };
    funchtml.prototype.font = function (ss) { return ("font:" + ss + "; "); };
    funchtml.prototype.font_family = function (ss) { return ("font-family:" + ss + "; "); };
    funchtml.prototype.cfont_size = function (ss) {return ("font-size:" + ss + "; "); };
    funchtml.prototype.font_num = function (ss) { return ("font-size:" + ss + "pt; "); };
    funchtml.prototype.font_weight = function (ss) { return ("font-weight:" + ss + "; "); };
    funchtml.prototype.height = function (ss) { return ("height:" + ss + "px; "); };
    funchtml.prototype.width = function (ss) {  return ("width:" + ss + "px; "); };
    funchtml.prototype.sheight = function (ss) { return ("height:" + ss*yy + "px; "); };
    funchtml.prototype.swidth = function (ss) {  return ("width:" + ss*xx + "px; "); };
    funchtml.prototype.cursor = function (ss) { return ("cursor:" + ss + "; "); };
    funchtml.prototype.heightper = function (ss) { return ("height:" + ss + "%; "); };
    funchtml.prototype.widthper = function (ss) { return ("width:" + ss + "%; "); };
    funchtml.prototype.top = function (ss) { return ("top:" + ss + "px; "); };
    funchtml.prototype.bottom = function (ss) { return ("bottom:" + ss + "px; "); };
    funchtml.prototype.left = function (ss) { return ("left:" + ss + "px; "); };
    funchtml.prototype.z_index = function (ss) { return ("z-index:" + ss + "; "); };
    funchtml.prototype.margin = function (ss) { return ("margin:" + ss + "; "); };
    funchtml.prototype.margin_left = function (ss) { return ("margin-left:" + ss + "px; "); };
    funchtml.prototype.margin_right = function (ss) { return ("margin-right:" + ss + "px; "); };
    funchtml.prototype.margin_top = function (ss) { return ("margin-top:" + ss + "px; "); };
    funchtml.prototype.margin_bottom = function (ss) { return ("margin-bottom:" + ss + "px; "); };
    funchtml.prototype.overflow = function (ss) { return ("overflow:" + ss + "; "); };
    funchtml.prototype.overflow_x = function (ss) { return ("overflow-x:" + ss + "; "); };
    funchtml.prototype.overflow_y = function (ss) { return ("overflow-y:" + ss + "; "); };
    funchtml.prototype.visibility = function (ss) { return ("visibility:" + ss + "; "); };
    funchtml.prototype.display = function (ss) { return ("display:" + ss + "; "); };
    funchtml.prototype.white_space = function (ss) { return ("white-space:" + ss + "; "); }; //nowrap
    funchtml.prototype.word_wrap = function (ss) { return ("word_wrap:" + ss + "; "); }; //break-word
    funchtml.prototype.outline = function (ss) { return ("outline:" + ss + "; "); };
    funchtml.prototype.background = function (ss) { return ("background:" + ss + "; "); };
    funchtml.prototype.padding = function (ss) { return ("padding:" + ss + "px; "); };
    funchtml.prototype.padding_left = function (ss) { return ("padding-left:" + ss + "px; "); };
    funchtml.prototype.padding_right = function (ss) { return ("padding-right:" + ss + "px; "); };
    funchtml.prototype.padding_top = function (ss) { return ("padding-top:" + ss + "px; "); };
    funchtml.prototype.padding_bottom = function (ss) { return ("padding-bottom:" + ss + "px; "); };
    funchtml.prototype.position = function (ss) { return ("position:" + ss + "; "); };
    funchtml.prototype.border = function (ss) { return ("border:" + ss + "; "); }; // width solid red
    funchtml.prototype.border_width = function (ss) { return ("border-width:" + ss + "; "); };
    funchtml.prototype.border_radius = function (ss) { return ("border-radius:" + ss + "; "); }; 
    funchtml.prototype.border_top = function (ss) { return ("border-top:" + ss + "; "); }; 
    funchtml.prototype.border_left = function (ss) { return ("border-left:" + ss + "; "); }; 
    funchtml.prototype.border_right = function (ss) { return ("border-right:" + ss + "; "); }; 
    funchtml.prototype.border_bottom = function (ss) { return ("border-bottom:" + ss + "; "); }; 
    funchtml.prototype.border_color = function (ss) { return ("border-color:" + ss + "; "); };
    funchtml.prototype.border_style = function (ss) { return ("border-style:" + ss + "; "); }; //top right bottom left ... top right bottom ... top right
    funchtml.prototype.border_collapse = function (ss) { return ("border-collapse:" + ss + "; "); };
    funchtml.prototype.text_align = function (ss) { return ("text-align:" + ss + "; "); };
    funchtml.prototype.text_number = function (ss) { return ("text-align:right; padding-right:5px; "); };


funchtml.prototype.drawwidth = function(wi,hi,wreal) {  
if(wi>=wreal) return;
    var k=wreal-wi;
    var n=k/2; k=k-n;
    c.nstyle('idxleft','width',n);
    c.nstyle('idxright','width',k);
    
}
funchtml.prototype.cratio = function(x,y) {  xx=x;yy=y;  }
funchtml.prototype.cline = function(context, x1, y1, x2, y2,w,col) {
  context.beginPath();
  context.strokeStyle = col;
  context.lineWidth = w;
  context.moveTo(x1*xx, y1*yy);
  context.lineTo(x2*xx, y2*yy);
  context.stroke();
  context.closePath();
}
funchtml.prototype.crectcol = function(ctx, x1, y1, w,h,col) {
ctx.fillStyle = col;
ctx.fillRect(x1*xx,y1*yy,w*xx,h*yy);
}
funchtml.prototype.ctext = function(ctx,mess,x,y,col,ft) {
        ctx.textBaseLine="top"; //
        ctx.textAlign = 'left';
        ctx.font =ft; //'30px'; //ctx.font = "italic bold 10pt Courier";
        ctx.fillStyle =col;
        ctx.fillText(mess,x*xx,y*yy);
        //10px sans-serif  default
        //serif
}
funchtml.prototype.cpic = function(ctx,ss,x,y,x1,y1,sfn) {
   var im=new Image();
   im.onload= function() {       ctx.drawImage(im, x*xx,y*yy,x1*xx,y1*yy);  sfn('ok');  }
   im.src=fs.picget(ss);
}
funchtml.prototype.drawsrc = function(can,x,y,w,h) {
  var    sr=can.toDataURL({
        left:x,
        top: y,
        width: w,
        height: h
    });
    return(sr);
}    

//*************************************************************    
}    //funchtml

var c = new funchtml();
var fs = new funcsecure();
//}} //js asm
