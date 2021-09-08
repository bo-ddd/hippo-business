let obj = Symbol('obj');
class Inplemen{
    constructor(){
        this.obj={};
    }
    get(key){
        return this.obj[key];
    }
    set(key,value){
        this.obj[key]=value;
    }
}

let inpleme;

inpleme=retuFn();

function retuFn(){
    if(!inpleme){
       inpleme = new Inplemen();
    }
    return inpleme;
}

export default inpleme;