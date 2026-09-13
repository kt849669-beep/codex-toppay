import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
const name='__Host-toppay-admin';
const attempts=new Map();
const empty={slides:[],banner:{enabled:false,title:'Special update',src:''},telegram:{enabled:false,url:'https://t.me/'},media:{enabled:false,title:'Latest announcement',src:'',kind:'image'}};
const unavailable={error:'Database and media storage are not connected. No changes were saved.'};
const sign=(value,key)=>createHmac('sha256',key).update(value).digest('base64url');
function readSession(cookie,key){
 try{
  const raw=String(cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(name+'='))?.slice(name.length+1);
  if(!raw)return null;const [body,mac]=raw.split('.');const expected=sign(body,key);
  if(!mac||mac.length!==expected.length||!timingSafeEqual(Buffer.from(mac),Buffer.from(expected)))return null;
  const claims=JSON.parse(Buffer.from(body,'base64url').toString());return claims.role==='admin'&&claims.exp>Date.now()?claims:null;
 }catch{return null}
}
export default async function handler(req,res){
 const send=(code,data)=>{res.statusCode=code;res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));};
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Robots-Tag','noindex,nofollow');res.setHeader('X-Frame-Options','DENY');
 try{
  const secret=process.env.TOPPAY_ADMIN_SESSION_SECRET, encoded=process.env.TOPPAY_ADMIN_CREDENTIAL;
  if(!secret||secret.length<64||!encoded)return send(503,{error:'Admin authentication is not configured.'});
  const credential=JSON.parse(Buffer.from(encoded,'base64').toString());
  const route=String(req.query?.route||'').replace(/^\/+|\/+$/g,'');
  const host=req.headers.host,origin=req.headers.origin;
  if(!['GET','HEAD'].includes(req.method)&&origin!=='https://'+host)return send(403,{error:'Request origin rejected'});
  const session=readSession(req.headers.cookie,secret);
  if(route==='admin/session'&&req.method==='GET')return send(200,{authenticated:!!session});
  const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
  if(route==='admin/login'&&req.method==='POST'){
   const ip=String(req.headers['x-forwarded-for']||'unknown').split(',')[0];
   const now=Date.now(), record=attempts.get(ip)||{count:0,until:0};
   if(record.until>now)return send(429,{error:'Too many attempts. Wait five minutes.'});
   const password=body.password;
   const correct=typeof password==='string'&&password.length<=128&&body.email===credential.email&&timingSafeEqual(scryptSync(password,credential.salt,64),Buffer.from(credential.hash,'hex'));
   if(!correct){record.count++;if(record.count>=3){record.until=now+300000;record.count=0;}attempts.set(ip,record);if(attempts.size>10000)attempts.clear();return send(401,{error:'Email or password is incorrect.'})}
   attempts.delete(ip);
   const data=Buffer.from(JSON.stringify({role:'admin',id:randomBytes(16).toString('hex'),iat:now,exp:now+43200000})).toString('base64url');
   res.setHeader('Set-Cookie',name+'='+data+'.'+sign(data,secret)+'; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=43200');
   return send(200,{authenticated:true});
  }
  if(!session)return send(401,{error:'Sign in required'});
  if(route==='admin/session'&&req.method==='DELETE'){res.setHeader('Set-Cookie',name+'=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0');return send(200,{ok:true})}
  if(route==='admin/state'&&req.method==='GET')return send(200,{settings:empty,users:[],trash:[],revision:0,storageConfigured:false});
  if(route==='admin/devices'&&req.method==='GET')return send(200,{devices:[],limit:6});
  if(['settings','users','media','admin/password','admin/devices'].includes(route))return send(503,unavailable);
  return send(404,{error:'Not found'});
 }catch{return send(400,{error:'Request could not be processed'});}
}
