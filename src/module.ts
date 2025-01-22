import { parse } from "acorn";
import { existsSync, readFileSync } from "fs";
import { dirname, resolve } from "path";

export default (...path: string[]) => {
    const importmap: Map<string, Set<string>> = new Map;
    const read = (...parr: string[]) => {
        const path = resolve(...parr);
        if(importmap.has(path)){
            return;
        }else{
            const code = readFileSync(path).toString().replaceAll("\r","");
            const ast = parse(code, {
                ecmaVersion: "latest",
                sourceType: "module"
            })
            const list: Set<string> = new Set;
            ast.body.forEach(e=>{
                if(e.type == "ImportDeclaration"){
                    const p = e.source.value;
                    if(typeof p == "string"){
                        const fname = resolve(dirname(path), /\.js$/.test(p) ? p : p+".js");
                        if(existsSync(fname)){
                            list.add(fname)
                            read(fname);
                        }else if(existsSync(resolve(dirname(path), p, "index.js"))){
                            list.add(resolve(dirname(path), p, "index.js"));
                            read(resolve(dirname(path), p, "index.js"));
                        }
                    }
                }
            })
            importmap.set(path, list);
        }
    }
    read(...path);
    return importmap
}