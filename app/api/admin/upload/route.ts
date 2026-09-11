import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";

const allowedFolders=["perfil/","aparencia/","especialidades/"];

export async function POST(request:Request){
  try{
    const body=await request.json() as HandleUploadBody;
    if(body.type==="blob.generate-client-token"&&!(await isAdmin()))return NextResponse.json({error:"Sessão expirada. Entre novamente no painel."},{status:401});
    const response=await handleUpload({request,body,onBeforeGenerateToken:async pathname=>{
      if(!allowedFolders.some(folder=>pathname.startsWith(folder)))throw new Error("Destino de imagem inválido.");
      return {allowedContentTypes:["image/jpeg","image/png","image/webp"],maximumSizeInBytes:12_000_000,addRandomSuffix:true};
    },onUploadCompleted:async()=>{}});
    return NextResponse.json(response);
  }catch(error){
    const message=error instanceof Error?error.message:"Falha no envio da imagem.";
    return NextResponse.json({error:message},{status:400});
  }
}
