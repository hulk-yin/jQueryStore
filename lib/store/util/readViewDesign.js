define(["jquery"],function($){

   var loadDesign=function(options){
        var host =    window.location.host
        var default_Options = { }
       options.host = options.host || host
        var _self = this, options = $.extend(true,default_Options,options),deferred = new $.Deferred() ,doneFn=function(module){
             deferred.resolve(__designToLayout(module.column,options))
        } ,errFn=function(err){
            deferred.reject(err)
        } ,viewPath =  options.host+options.db+"/"+options.view

        if (host!=options.host){
            var _url ="//"+options.host+"/iNotes/forms8.nsf/iNotes/Proxy/?OpenDocument"
            _url+="&Form=s_JSONPViewDesign"
            _url+="&PresetFields=DBName;"+options.db
            _url+=",FolderName;"+options.view
            //var modulename =options.view+"/"+ (new Date()).getTime()+"/"+Math.random().toString().substr(2);
            var  modulename =  viewPath.replace(/[\.]/gi,"/").replace(/\/\//gi,"/")
            var _q = {
                module:modulename
            }
            _url+="&"+ $.param(_q)
            require([_url],function(){
                require([modulename],doneFn,errFn)
            },errFn) 

        }else{
            var _url ="//"+viewPath  +"?readDesign"
            var _q = {
                "outputformat":"json"
            }
             $.ajax({
                url:_url,
                dataType:"json",
                data:_q
            }).pipe(doneFn,errFn)
        }

        return deferred

    },

    __designToLayout=function(designObj,options){
        var result =  $.map(designObj,function(col,i){
            if(options.cate&&i==0)return null
            var item = {}

            $.each(col,function(n,v){
                if(n.substr(0,1)=="@"){
                    var _n = n.substr(1)
                    switch(_n){
                        case "align":
                            item[_n] = v="2"?"center":"right"
                        case "name":
                            item[_n]= v.toLowerCase().replace(/^\$/gi,"_")
                            break;
                        case "width":
                            if(col["@resize"]=="true"){
                               // item[_n]="auto"
                              //  break;
                            }
                        default:
                            item[_n]=v
                    }
                }else{
                    item[n]=v
                }
            })
            return item

        })
        designObj = null
        delete  designObj

        return result
    }


  return    loadDesign


})
