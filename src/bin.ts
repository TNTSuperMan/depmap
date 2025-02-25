import { writeFileSync } from "fs";
import depmap from "./module"
import { resolve } from "path";
if(process.argv.length != 4){
    console.log("usage: import-map [entrypoint] [outfile]");
}else{
    const data = depmap(process.cwd(), process.argv[2]);
    writeFileSync(resolve(process.cwd(), process.argv[3]),
        JSON.stringify(Object.fromEntries(
            data.keys().map(e=>[e, Array.from(data.get(e)??[])]))))
}