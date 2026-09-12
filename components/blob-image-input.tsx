"use client";

import { uploadPresigned } from "@vercel/blob/client";
import { useEffect, useRef, useState } from "react";

const UPLOAD_EVENT = "andre-cms-upload";

function safeName(name:string){
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9._-]+/g,"-").toLowerCase();
}

export function BlobImageInput({name,folder,label,help,maxBytes=12_000_000,className,onUploaded}:{name:string;folder:string;label:string;help:string;maxBytes?:number;className?:string;onUploaded?:(url:string)=>void}){
  const [status,setStatus]=useState("");
  const [progress,setProgress]=useState(0);
  const [url,setUrl]=useState("");
  const [fileName,setFileName]=useState("Nenhum arquivo escolhido");
  const inputRef=useRef<HTMLInputElement>(null);

  async function select(file?:File){
    setUrl(""); setProgress(0);
    if(!file){setStatus("");setFileName("Nenhum arquivo escolhido");return;}
    setFileName(file.name);
    if(!["image/jpeg","image/png","image/webp"].includes(file.type)){setStatus("Use uma imagem JPG, PNG ou WebP.");return;}
    if(file.size>maxBytes){setStatus(`A imagem deve ter no máximo ${Math.floor(maxBytes/1_000_000)} MB.`);return;}
    setStatus("Enviando imagem…");
    window.dispatchEvent(new CustomEvent(UPLOAD_EVENT,{detail:1}));
    try{
      const blob=await uploadPresigned(`${folder}/${Date.now()}-${safeName(file.name)}`,file,{access:"public",handleUploadUrl:"/api/admin/upload",multipart:file.size>4_000_000,onUploadProgress:({percentage})=>setProgress(Math.round(percentage))});
      setUrl(blob.url); onUploaded?.(blob.url); setStatus("Imagem pronta para salvar."); setProgress(100);
    }catch(error){
      console.error(error); setStatus(error instanceof Error?`Não foi possível enviar: ${error.message}`:"Não foi possível enviar a imagem.");
    }finally{
      window.dispatchEvent(new CustomEvent(UPLOAD_EVENT,{detail:-1}));
    }
  }

  return <div className={`blob-image-field ${className||""}`}><strong>{label}</strong><div className="file-picker"><button type="button" onClick={()=>inputRef.current?.click()}>Escolher imagem</button><span title={fileName}>{fileName}</span></div><input ref={inputRef} className="hidden-file-input" type="file" accept="image/jpeg,image/png,image/webp" onChange={event=>void select(event.target.files?.[0])}/><input type="hidden" name={name} value={url}/>{status&&<small className={url?"upload-success":"upload-status"}>{status}{progress>0&&progress<100?` ${progress}%`:""}</small>}<small>{help}</small></div>;
}

export function CmsSaveButton(){
  const [uploads,setUploads]=useState(0);
  useEffect(()=>{const listener=(event:Event)=>setUploads(value=>Math.max(0,value+Number((event as CustomEvent).detail||0)));window.addEventListener(UPLOAD_EVENT,listener);return()=>window.removeEventListener(UPLOAD_EVENT,listener);},[]);
  return <div className="admin-savebar"><span>{uploads?"Aguarde a imagem terminar de enviar.":"As alterações aparecem no site assim que forem salvas."}</span><button type="submit" disabled={uploads>0}>{uploads?"Enviando imagem…":"Salvar alterações"}</button></div>;
}
