"use server";
import { redirect } from "next/navigation"; import { getSql } from "@/lib/db";
const value=(fd:FormData,key:string)=>{const raw=fd.get(key);return typeof raw==="string"?raw.trim():"";};
export async function requestQuote(fd:FormData){const name=value(fd,"name"),phone=value(fd,"phone").replace(/\D/g,""),bodyArea=value(fd,"bodyArea"),size=value(fd,"size"),style=value(fd,"style"),idea=value(fd,"idea");if(!name||phone.length<10||!bodyArea||!idea)throw new Error("Preencha os campos obrigatórios.");const sql=await getSql();await sql`INSERT INTO quote_request (name,phone,body_area,approximate_size,style,idea,status,created_at) VALUES (${name},${phone},${bodyArea},${size},${style},${idea},'novo',NOW())`;redirect("/orcamento?enviado=1");}
