const fs = require('node:fs');
const CircularJSON = require('circular-json');


class Utils{    

    static #logFile = fs.createWriteStream(__dirname + '/../../log.log', {flags : 'a'});

    static getMomento(){
        let momento=new Date();
        momento=momento.getDate().toString().padStart(2,'0')+'/'+((momento.getMonth()+1).toString().padStart(2,'0'))+'/'+momento.getFullYear()+' '+momento.getHours()+':'+momento.getMinutes()+':'+momento.getSeconds()+'.'+momento.getMilliseconds();
        return momento;
    };

    static logi(p_nome_classe,p_nome_funcao){
        try {
            if (typeof p_nome_funcao !== "undefined") {
                Utils.log('Inicio ',p_nome_classe + "." + p_nome_funcao);
            } else {
                Utils.log('Inicio ',p_nome_classe);
            }
        }catch(e){
            Utils.log(e);					  
            alert(e.message || e);									
        }
    };

    static logf(p_nome_classe,p_nome_funcao){		
        try {
            if (typeof p_nome_funcao !== "undefined") {
                Utils.log('Fim ',p_nome_classe + "." + p_nome_funcao);
            } else {
                Utils.log('Fim ',p_nome_classe);
            }
        }catch(e){
            Utils.log(e);					  
            alert(e.message || e);								
        }
    };

    

    static typeOf(value){
        let r = typeof value;
        if (typeof NodeList != 'undefined') {
            if (Array.isArray(value) || value instanceof NodeList || value instanceof Array) {
                r = "array";
            }
        } else {
            if (Array.isArray(value) || value instanceof Array) {
                r = "array";
            }
        }
        return r;
    }

    static isArray(obj){
        return Utils.typeOf(obj) == "array";
    }

    

    static hasValue(pValue) {
        let result = false;
        let tpof = Utils.typeOf(pValue);
        if (tpof !== "undefined" && pValue != null) {
            if (tpof == "object") {
                if (Object.keys(pValue).length > 0 
                    || ['DATE'].indexOf(pValue?.constructor?.name?.toUpperCase()) > - 1
                ) {
                    result = true;
                } 
            } else if (tpof == "array") {
                if (pValue.length > 0) {
                    result = true;
                }
            } else if (tpof == "string") {
                if (pValue.trim().length > 0) {
                    result = true;
                }
            } else {
                result = true;
            }
        }
        return result;
    }

    static isNotNull(obj){
        if (typeof obj !== "undefined" && obj !== null) {
            return true;
        }
        return false;
    }

    static firstValid(arr_valores,check_null) {
        try {
            //this.logi(this.constructor.name,"firstValid");
            if (typeof arr_valores !== "undefined") {
                check_null = check_null === false ? false : true;
                if (arr_valores !== null) {            
                    if (Utils.typeOf(arr_valores) === "array") {
                        let q = arr_valores.length;                
                        if (check_null) {
                            for (let i = 0; i < q; i++) {
                                if (typeof arr_valores[i] !== "undefined" && arr_valores[i] !== null) {
                                    return arr_valores[i];
                                };
                            }
                        } else {
                            for (let i = 0; i < q; i++) {
                                if (typeof arr_valores[i] !== "undefined") {
                                    return arr_valores[i];
                                }
                            }
                        }
                    } else {
                        throw new Error("tipo nao esperado: " + Utils.typeOf(arr_valores));
                    }
                } 
            }            
            //this.logf(this.constructor.name,"firstValid");
            return null;
        }catch(e){
            Utils.log(e);
            alert(e.message || e);            
            return null;
        } 
    };

    static toBool(pValue) {
        let result = false;
        if (typeof pValue !== "undefined" && pValue != null) {
            if (typeof pValue == "boolean") {
                result = pValue;
            } else if (typeof pValue == "string") {
                if (pValue.trim() == "true") {
                    result = true;
                }
            } else if (typeof pValue == "number") {
                if (pValue != 0) {
                    return true;
                }
            } else {
                result = pValue?true:false;
            }
        }
        return result;
    }

    static getDeepProperty(obj,arrayOfDeepProps){
        let _return = null;
        let obj_temp = obj;
        for(let key in arrayOfDeepProps) {
            obj_temp = obj_temp[arrayOfDeepProps[key]];
            if (!Utils.isNotNull(obj_temp)) {
                break;
            }
        }
        _return = obj_temp;
        return _return;
    }

    

    static getKey(obj, key) {
        let result = null;
        try {
            if (typeof obj !== "undefined" && obj != null) {
                if (typeof obj == "object") {
                    if (typeof key !== "undefined" && key != null) {
                        let objKeys = Object.keys(obj);
                        let keyTemp = key.trim().toLowerCase();
                        for(let i = 0; i < objKeys.length; i++) {
                            if (objKeys[i].trim().toLowerCase() == keyTemp) {
                                result = objKeys[i];
                                break;
                            }
                        }
                    }                    
                }
            }
        }catch(e){
           Utils.showError(e);
        }
        return result;
    }

    
    static toNumber(v) {
        let r = null;
        try {
            let t = typeof v;
            if (t == 'number') {
                r = v;
            } else {
                if (t == 'boolean') {
                    r = Number(v);  
                } else if (t == 'string') {
                    r = Number(v);
                    if (isNaN(r)) {
                        v = v.replace(/[^\d|\,|\.|\-|\+]+/ig,'');
                        if (v.length > 0) { 
                            if (v.indexOf(",") > -1 && v.indexOf(".") <= -1) {
                                r = Number(v.replace(",","."));
                            } else {
                                throw new Error("invalid number: " + v);
                            }
                        }
                    }
                }
            }
        } catch(e) {
            Utils.showError(e);
        }
        return r;
    }

    static log(...values) {
        if ((process.env.NODE_ENV || 'development') == 'production' && false) {
            let log = [Utils.getMomento()];
            for(let key in values) {
                switch(Utils.typeOf(values[key])) {
                    case 'object':
                    case 'array':
                        log.push(CircularJSON.stringify(values[key]));
                        break;
                    case 'function':
                        log.push(values[key].name);
                        break;
                    default:
                        log.push(values[key]);
                        break;
                }
            }
            Utils.#logFile.write(log.join(' ') + '\n');
        } else {
            console.log(...values);
        }
    }

    static closeLogFile(){
        Utils.#logFile.close();
    }

    static deleteNotExistsProperty(object,properties) {
        for(let k2 in object) {
            if (properties.indexOf(k2.toUpperCase().trim()) == -1) {
              delete object[k2];
            }
          }
    }
}

module.exports = { Utils }