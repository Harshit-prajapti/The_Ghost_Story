import { rejects } from "assert";
import { promises } from "dns";
import { IncomingForm, File } from "formidable";
import fs from "fs/promises";
import { resolve } from "path";

export const parseForm = async(req:Request) : Promise<{fields : any, files : File[][]}>=>{
    const form = new IncomingForm({multiples : false});

    return new Promise((resolve,reject)=>{
        form.parse(req as any, (err,fields,files)=>{
            if(err) reject(err)
            else resolve({fields, files: (files.file) ? [files.file] : []})
        });
    });
};
export const readFile = async (file : File):Promise<Buffer> => {
    return fs.readFile(file.filepath)
};