import { issueSignedToken } from "@vercel/blob";
import { handleUploadPresigned, type HandleUploadPresignedBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";

const allowedFolders=["perfil/","aparencia/","especialidades/"];

export async function POST(request:Request){
  try{
    const body=await request.json() as HandleUploadPresignedBody;
    if(body.type==="blob.generate-presigned-url"&&!(await isAdmin()))return NextResponse.json({error:"Sessão expirada. Entre novamente no painel."},{status:401});
    const response=await handleUploadPresigned({request,body,getSignedToken:async pathname=>{
      if(!allowedFolders.some(folder=>pathname.startsWith(folder)))throw new Error("Destino de imagem inválido.");
      const allowedContentTypes=["image/jpeg","image/png","image/webp"];
      const maximumSizeInBytes=12_000_000;
      const validUntil=Date.now()+10*60*1000;
      const token=await issueSignedToken({pathname,operations:["put"],allowedContentTypes,maximumSizeInBytes,validUntil});
      return {token,urlOptions:{allowedContentTypes,maximumSizeInBytes,validUntil}};
    }});
    return NextResponse.json(response);
  }catch(error){
    const message=error instanceof Error?error.message:"Falha no envio da imagem.";
    return NextResponse.json({error:message},{status:400});
  }
}
