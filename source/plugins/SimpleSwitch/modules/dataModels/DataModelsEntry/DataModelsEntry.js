module.exports = {
    name: "DataModelsEntry",
    dependencies: ['SimpleSwitch.Basic'],
    get(basic) {

        return {

            navigateDataToConstructor (data){
                let modifyData;

                if(Array.isArray(data)){
                    modifyData = data.map(this.findConstructor)
                } else {
                    modifyData = [this.findConstructor(data)];
                }

                return modifyData;
            },

            findConstructor(item){
                let types = ['basic'];
                let constructor = item.type;
                if( types.indexOf(constructor) === -1 ) constructor = basic;
                
                var entity = new constructor(item);
                return(entity)
            },

        };
    }
}
