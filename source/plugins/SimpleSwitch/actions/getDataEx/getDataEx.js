module.exports = {
    name: "getDataEx",
    dependencies: ['SimpleSwitch.Helper','SimpleSwitch.DataModelsEntry'],
    get(Helper, DataModelsEntry) {
        
        var core = this;

        return (data, promise) => {
            var { BaseApi } = core.plugins.SimpleSwitch;
            core.request.post(BaseApi+'/getDataEx', { "pram": data.id })
            .then( ({results,error}) => {

                if(error){
                  Helper.handleActionError(error,promise,'title');
                  return;
                }   
                    
                
                let exampleResults = [{
                    id: 'ex123',
                    name: 'ex',
                    type: 'person'
                }];

                res = DataModelsEntry.navigateDataToConstructor(exampleResults);

                promise.resolve(res);  // results replace by res for example
            });
        };
    }
}