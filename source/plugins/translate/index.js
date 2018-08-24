
function parseAsTemplateString(str, args){
  var array = str.split('${');
  var parts = [];
  var current = [];
  var result = [];
  var isVeriable = false;
  if(!args) { args = {}; }
  var k, i, value, part, char;
  for (i = 0; i < str.length; i++) {
    char = str[i];
    if((char === '$') && (str[i + 1] === '{')){
      i++;
      isVeriable = true;
      if(current.length){
        value = current.join('');
        if(value){
          parts.push({ type: 'string', value: value });
        }        
      }
      current = [];
    }
    else if(char === '}' && isVeriable){
      isVeriable = false;
      if(current.length){
        value = current.join('').trim();
        if(value){
          parts.push({ type: 'variable', value: value });
        }        
      }
      current = [];
    }
    else{
      current.push(char);
    }
  }
  if(current.length){
    value = current.join('');
    if(value){
      parts.push({ type: 'string', value: value });
    }        
  }
  // console.dir(argsArray);
  // console.dir(bodyParts);
  for (k = 0; k < parts.length; k++) {
    part = parts[k];
    if(part.type === 'string') result.push(part.value);
    else {
      result.push(args[part.value] || '')
    }
  }
  return result.join('');
}


module.exports = {
    name: 'translate',
    dependencies: ['core.plugin.tree'],
    tree: {
        dictionary: {}
    },
    extend: {
        
        translate(key, defaultValue, args) {
            var core = this;

            var language = core.plugins.translate.get(['dictionary']);
            if (!core.isString(key)) {
                return console.trace('core.translate() expects a string. got', key);  
            };
            if (core.translateKeysFlag) {
                return key;
            };
            // path = path.split('.');
            if (core.isArray(defaultValue)) {
                var v = args;
                args = defaultValue;
                defaultValue = v;
            }

            if (!language) return defaultValue;
            var value = language[key];
            
            var stringValue;

            if (!value) {
                value = (defaultValue || key.split('.').pop());
                // value = (defaultValue || '') + '!';
            }
            var type = core.typeOf(value);
            if (type === 'string') {
                stringValue = value;
            } else if (type === 'object') {
                stringValue = ((value.value === null) ? value.defaultValue : value.value);
            }

            if (stringValue && (stringValue.indexOf('${') > -1)) {
                stringValue = parseAsTemplateString(stringValue, args);
            }
            // value = value + '*';
            return stringValue;
        }
    },

    init(def, done){

        var core = this;

        done({
            load(language){
                this.set('language', language)
            },
            merge(merge){
                if(!core.isObject(merge)){
                    throw new Error(`translate.merge() expects an object, got ${ core.typeOf(merge) }`);
                }
                this.set('language', { ...this.get('language'), ...merge });
            }
        });
    }
};