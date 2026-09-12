"use client";

import { useState } from "react";
import { BlobImageInput } from "@/components/blob-image-input";

export function LogoBrandEditor({logoUrl,initials,initialSize,showBrandText,goldColor,goldBrightColor}:{logoUrl:string;initials:string;initialSize:string;showBrandText:boolean;goldColor:string;goldBrightColor:string}){
  const [previewUrl,setPreviewUrl]=useState(logoUrl);
  const [size,setSize]=useState(Math.min(110,Math.max(60,Number(initialSize)||86)));
  return <div className="logo-brand-editor">
    <div className="logo-admin-preview">
      {previewUrl?<img src={previewUrl} alt="Prévia da logo do André" style={{width:size,height:size}}/>:<div className="preview-brand" style={{width:size,height:size,color:goldBrightColor,borderColor:goldColor}}>{initials}</div>}
      <span>Prévia da logo em tamanho real</span>
    </div>
    <div className="form-grid admin-editor-grid logo-controls">
      <BlobImageInput className="full" name="logoImageUrl" folder="aparencia/logo" label="Arquivo da logo" help="Use PNG ou WebP com fundo transparente e formato quadrado. Máximo 8 MB." maxBytes={8_000_000} onUploaded={setPreviewUrl}/>
      <label className="logo-size-control"><span><strong>Tamanho da logo</strong><output>{size}px</output></span><input name="logoSize" type="range" min="60" max="110" value={size} onChange={event=>setSize(Number(event.target.value))}/><small>A altura e a largura mudam juntas para não deformar a imagem.</small></label>
      <label className="check-field"><input name="showBrandText" type="checkbox" defaultChecked={showBrandText}/><span>Mostrar “André Ribeiro Tattoo” ao lado da logo</span></label>
    </div>
  </div>;
}
