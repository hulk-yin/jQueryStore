#JQueryStore 

定义jQuery的数据存储统一对象，最初是为解决在Domino环境下 Readviewentires URL命令返回的DXL格式数据，后来参考Dojo的Store 设计重新对Store对象进行了定义，抽出Store API。扩展Memory / LocalStore/DXLStore等对象。

微博 http://weibo.com/ivy203
##StoreAPI

对DojoStoreAPI进行的移植  

###类成员
* [PutDirectives](#Store.PutDirectives)  
* [SortInformation](#Store.SortInformation)  
* [QueryOptions](#Store.QueryOptions)  
* [QueryResults](#Store.QueryResults)  
  * [forEach/each](#Store.QueryResults.forEach)   
  * [filter/grep](#Store.QueryResults.filter)
  * [map](#Store.QueryResults.map)
  * [then](#Store.QueryResults.then)
  * [observe](#Store.QueryResults.observer)
  * [total](#Store.QueryResults.total)
* [Transaction](#Store.Transaction)  
  * [commit](#Store.Transaction.commit)		
  * [abort](#Store.Transaction.abort)		

###对象成员

* [idProperty](#idProperty)  
* [queryEngine](#queryEngine)  
* [get](#get)  
* [getIdentity](#getIdentity)  
* [put](#put)  
* [add](#add)  
* [remove](#remove)  
* [query](#query)  
* [transaction](#transaction) 
* [getChildren](#getChildren) 
* [getMetadata](#getMetadata) 
 
## 类方法

<a name="Store.PutDirectives" />

###Store.PutDirectives(id,before,parent,overwrite)
__Summary__

		将指令传递给  put() 和 add() ，以更新这两个操作对对象内容的更新和创建 

__Arguments__

		id  {String|Number} 如果创建一个新的Store对象，则为对象的id  
		before {Object?}  如果存在该对象，则表示将新的对象添加到改对象之前，为null则将新添加对象追加到最后  
		parent {Object?}  在分层存储时，该对象表示要更新的对象的父对象  
		overwrite {Boolean?}  表示是否更新对象，如果为true，则如果对象存在，则更新对，为false则表示无论创建一个新对象。这个方法错误add()的补充
		
---------------------------------------------

<a name="Store.SortInformation"/>

###Store.SortInformation(attribute, descending)

__Summary__
  
		对象排序属性的方式（指定的属性 attribute排序方式）

__Arguments__

		 attribute {String}	排序属性名称.   
		 descending { Boolean}排序方法，缺省为 flase  
  
----------------------------------------------

<a name="Store.QueryOptions">

###Store.QueryOptions(sort,start,count)

__Summary__

		用于设置默认查询参数
  
__Arguments__

		sort {Store.SortInformation[]?} 设置排序方式对象数组  
		start {Numnber?}  返回记录集和开始处的指针  
		count {count ?} 返回记录集和长度   
		
----------------------------------------------

<a name="Store.QueryResults">

###Store.QueryResults

__Summary__

		Store查询返回的记录集，在处理具有延迟调查询时，可以返回一个Promise(参考jQuery.Deferred)。
		在使用过程中，用户不用担心异步处理以及延迟带来的问题
		
  [jQuery.Deferred](http://api.jquery.com/category/deferred-object/)  

<a name="Store.QueryResults.forEach"/>

####forEach/each(calllback,thisObject)


__Summary__

		遍历集和，如有是一个promise，则在对象返回后执行遍历.
		此处使用each方法和forEach是方便jQuery开发习惯
		参考：https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/forEach
  
__Arguments__

		callback {function} 对每一个元素进行处理的方法
		   
		
		thisObject (object?) callback内作为this使用的对象
		

<a name="Store.QueryResults.filter"/>

####filter/grep(calllback,thisObject)

__Summary__

		 对返回结果继续条件过滤
		 grep是考虑jQuery开发习惯，建议使用 filter 
		 参考： https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter.
		  
 __Arguments__

		callback {function} 对每一个元素进行处理的方法，返回true表示保留此元素，返回false表示过滤此元素
		   
		
		thisObject (object?) callback内作为this使用的对象		 
 

<a name="Store.QueryResults.map"/>

####map(calllback,thisObject)

__Summary__

		 参考： https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map.
		  
 __Arguments__

		callback {function} 对每一个元素进行处理的方法，返回true表示保留此元素，返回false表示过滤此元素
		   
		
		thisObject (object?) callback内作为this使用的对象		

<a name="Store.QueryResults.then"/>

####then(callback,errorHandler)

__Summary__

		 Promise 返回后执行
		  
 __Arguments__

		callback {function} 要执行的函数  
		
		errorHandler (object?) callback内作为this使用的对象		
		

<a name="Store.QueryResults.observe"/>

####observe(listener, includeAllUpdates)
  
__Summary__

		注册一个查询结果修改的事件（观察者模式）
		
__Arguments__

		listerner {Function} 当查询结构进行修改时该函数被调用，具体参考listerner函数的书面  
		includeAllUpdates {Boolean ?} 表示是否对结果集产生影响，默认为false，既修改不会对结果集和数据顺序等产生任何用心。

#####listener(object, removedFrom, insertedInto)

		object {object} 被修改（创建，修改，删除）的对象参数
		removedFrom {Number} object 在结果数组的索引. 如果值是-1，对象不再这个结果集和内
		insertedInto {Number} object 现在在结果数组的索引. 如果值是-1，那么是一个从集和内移除的对象
   
		
  
<a name="Store.QueryResults.total"/>

####total  
__Summary__
		
		返回一个Number 或者 Promise
  
------------------------------------------------


<a name="Store.Transaction"/>

###Store.Transaction

__Summary__
		
		一个 transaction 方法返回的对象,表示一事务操作

<a name="Store.Transaction.commit"/>

####commit（）

__Summary__

		执行一个事务，事务提交失败可能抛出一个错误；在异步模式下会返回一个promise，最终会返回事务执行成功或失败
		
<a name="Store.Transaction.abort"/>


####abort(callback, thisObject)

__Summary__

		终止一个事务，终止操作失败可能抛出一个错误；在异步模式下会返回一个promise，最终会返回终止操作的成功或失败
 
##对象属性

<a name="idProperty" />

###idProperty 

__Summary__
		
		如果Store对象具有主见，则表示该属性值是记录的身份标识，记录的该属性值必须唯一 ，Store会根据该属性创建索引
		
		
##对象方法


<a name="quertEngine" />
###quertEngine

__Summary__

		对Store进行查询的函数/方法，并返回一个结果集合，该方法可以进行替换  
		该方法存在两个参数，第一个为Query Params ，第二关参数为 option 如排序分页等  
		该方法返回一个匹配的数组。 		
		var query =QueryEngin(query,option)
__Arguments__

		query Params {Object} 要查询的条件，查询格式{ name:"*/habq/hik",age:{val:16,condition:">"},city:"shanghai"} 
		option	{Object?}  排序，查询记录数等信息
		
		

<a name="get" />
###get(id)

__Summary__
			
		根据Identity返回一个记录对象
		
__Arguments__
		
		id {String|Number} Store 记录的 Identitiy
		
		returns { Object} 返回一个记录对象

<a name="getIdentity" />
###getIdentity(object)

__Summary__

		根据一个记录对象返回该记录的Identity

__Arguments__

		object {Obejct} 要查询的Item对象
		
		returns{String|Number}发挥记录对象的Identity
		
	
<a name="put" />
###put(object,directives)

__Summary__

		存入Stores 的记录对象

__Arguments__

		object{object} 要存入度对象
		 
		directives{Store.PutDirectives}  put 更新制冷对象
		 
		returns: {Number|String} 
		
<a name="add" /> 
###add(object,directives)

__Summary__

		存入Stores 的记录对象 ，如果该对象存在，则抛出一个错误

__Arguments__

		object{object} 要存入度对象
		 
		directives{Store.PutDirectives}  put 更新制冷对象
		 
		returns: {Number|String} 

<a name="remove" />
###remove(id)

__Summary__

		根据identity 删除Store内地一个记录，该方法会删除记录及Store的索引
		
__Arguments__

		id {Number|String} 要删除的记录的Identity
		
<a name="query" />

#query(query,options)

__Summary__
				
		查询对象内的记录，但给对象不会给改变，返回查询记录的集合
__Arguments__

		query{String|Object|Function} 从Store内进行搜索使用
		
		options{Store.QueryOptions} 可选参数，用于查询结果集的处理
		
		returns{Store.QueryResults} 查询的结果集合，并扩展了一些方法
__Example__

		//		给定一个存在的store
		//
		//	...查找所有属性 primes 为 true的items :
		//
		store.query({ prime: true }).forEach(function(object){
				// handle each object
		});
<a name="getChildren" />
###getChildren(parent, options)
	
__Summary__

		获取一个对象的子元素
		
__Arguments__

		parent{object} 要查找的子对象所对应的父对象
		
		options {Stroe.QueryOptions} 可选参数，用于对资源是的查询
		
		returns {Store.QueryResults} 查询到的子对象的结果集
		
<a name="getMetadata" />
###getMetadata(object)

__Summary__

	返回对象的原始数据
	
__Arguments__

		object {object} 要返回的原始数据对象
 
<a name="transaction" />

###transaction()
	
 __Summary__
 
		创建一个新的事务，并返回一个 Store.Transaction 对象