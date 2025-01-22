import import_map from "./module"
if(process.argv.length != 3){
    console.log("usage: import-map [entrypoint]");
}else{
    import_map(process.cwd(), process.argv[2])
}