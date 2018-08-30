module.exports = {
    name: "PopupHandler",
    dependencies: [],
    get() {
        var core = this;

        return {

            clearData(){
                core.plugins.popovers.set(['popup','data'],{});
            },

            addData(data){
                core.plugins.popovers.set(['popup','data'],data);
            },

            disableOkBtn(){
                core.plugins.popovers.set(['popup','disable'],true);
            },

            enableOkBtn(){
                core.plugins.popovers.set(['popup','disable'],false);
            },

        };
    }
}
