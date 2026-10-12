// Decoupe le mot ALPHA dans un logo du site (PNG a fond transparent).
const fs=require('fs'),zlib=require('zlib');
const crc=(()=>{const t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return b=>{let c=0xFFFFFFFF;for(const x of b)c=t[(c^x)&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0}})();
function readPng(file){
 const b=fs.readFileSync(file);if(b.readUInt32BE(0)!==0x89504E47)throw new Error('pas un PNG');
 let p=8,w,h,bd,ct,il,pal,trns;const idat=[];
 while(p<b.length){const n=b.readUInt32BE(p),t=b.toString('latin1',p+4,p+8),d=b.subarray(p+8,p+8+n);
  if(t==='IHDR'){w=d.readUInt32BE(0);h=d.readUInt32BE(4);bd=d[8];ct=d[9];il=d[12]}
  else if(t==='PLTE')pal=d;else if(t==='tRNS')trns=d;else if(t==='IDAT')idat.push(d);
  p+=12+n}
 const ch={0:1,2:3,3:1,4:2,6:4}[ct];
 const low=bd<8&&(ct===0||ct===3)&&(bd===1||bd===2||bd===4);
 if((bd!==8&&!low)||il!==0||!ch)throw new Error('format PNG non gere '+bd+'/'+ct+'/'+il);
 const raw=zlib.inflateSync(Buffer.concat(idat)),st=Math.ceil(w*ch*bd/8),fu=low?1:ch,mx=(1<<bd)-1,px=Buffer.alloc(w*h*4);
 let prev=Buffer.alloc(st),o=0;
 for(let y=0;y<h;y++){
  const f=raw[o++],row=Buffer.from(raw.subarray(o,o+st));o+=st;
  for(let i=0;i<st;i++){
   const a=i>=fu?row[i-fu]:0,u=prev[i],c=i>=fu?prev[i-fu]:0;let v=0;
   if(f===1)v=a;else if(f===2)v=u;else if(f===3)v=(a+u)>>1;
   else if(f===4){const pp=a+u-c,pa=Math.abs(pp-a),pb=Math.abs(pp-u),pc=Math.abs(pp-c);v=pa<=pb&&pa<=pc?a:pb<=pc?u:c}
   row[i]=(row[i]+v)&255}
  for(let x=0;x<w;x++){
   const q=(y*w+x)*4,i=x*ch,k=low?(row[(x*bd)>>3]>>(8-bd-((x*bd)&7)))&mx:row[i];let r,g,bl,al=255;
   if(ct===6){r=row[i];g=row[i+1];bl=row[i+2];al=row[i+3]}
   else if(ct===2){r=row[i];g=row[i+1];bl=row[i+2]}
   else if(ct===4){r=g=bl=row[i];al=row[i+1]}
   else if(ct===0){r=g=bl=Math.round(k*255/mx);if(trns&&trns.length>1&&trns.readUInt16BE(0)===k)al=0}
   else{r=pal[k*3];g=pal[k*3+1];bl=pal[k*3+2];al=trns&&k<trns.length?trns[k]:255}
   px[q]=r;px[q+1]=g;px[q+2]=bl;px[q+3]=al}
  prev=row}
 return {w,h,px}}
function writePng(file,w,h,px){
 const raw=Buffer.alloc((w*4+1)*h);
 for(let y=0;y<h;y++)px.copy(raw,y*(w*4+1)+1,y*w*4,(y+1)*w*4);
 const ck=(t,d)=>{const l=Buffer.alloc(4);l.writeUInt32BE(d.length);const td=Buffer.concat([Buffer.from(t,'latin1'),d]),c=Buffer.alloc(4);c.writeUInt32BE(crc(td));return Buffer.concat([l,td,c])};
 const ih=Buffer.alloc(13);ih.writeUInt32BE(w,0);ih.writeUInt32BE(h,4);ih[8]=8;ih[9]=6;
 fs.writeFileSync(file,Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),ck('IHDR',ih),ck('IDAT',zlib.deflateSync(raw,{level:9})),ck('IEND',Buffer.alloc(0))]))}
function cropWord(src,dst){
 const {w,h,px}=readPng(src);
 const ink=(x,y)=>px[(y*w+x)*4+3]>=128;
 let clear=0;for(let i=3;i<px.length;i+=4)if(px[i]<128)clear++;
 if(clear<w*h*0.2)throw new Error('logo sans fond transparent');
 const rows=[];for(let y=0;y<h;y++){let on=false;for(let x=0;x<w&&!on;x++)on=ink(x,y);rows.push(on)}
 const gap=Math.max(3,Math.round(h*0.015)),bands=[];let s=-1,last=-1;
 for(let y=0;y<h;y++)if(rows[y]){if(s<0)s=y;else if(y-last>gap){bands.push([s,last]);s=y}last=y}
 if(s>=0)bands.push([s,last]);
 let best=null;
 for(const [y0,y1] of bands){let x0=w,x1=-1;for(let y=y0;y<=y1;y++)for(let x=0;x<w;x++)if(ink(x,y)){if(x<x0)x0=x;if(x>x1)x1=x}
  if(!best||x1-x0>best.x1-best.x0)best={x0,x1,y0,y1}}
 if(!best)throw new Error('logo vide');
 const ratio=(best.x1-best.x0+1)/(best.y1-best.y0+1);
 if(bands.length<2||ratio<3||ratio>8)throw new Error('mot ALPHA introuvable ('+bands.length+' bandes, ratio '+ratio.toFixed(2)+')');
 const pad=4,X0=Math.max(0,best.x0-pad),Y0=Math.max(0,best.y0-pad),X1=Math.min(w-1,best.x1+pad),Y1=Math.min(h-1,best.y1+pad);
 const cw=X1-X0+1,chh=Y1-Y0+1,out=Buffer.alloc(cw*chh*4);
 for(let y=0;y<chh;y++)px.copy(out,y*cw*4,((Y0+y)*w+X0)*4,((Y0+y)*w+X1+1)*4);
 writePng(dst,cw,chh,out);return cw+'x'+chh}
module.exports=cropWord;
