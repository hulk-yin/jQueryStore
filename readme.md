#JQueryStore 

定义jQuery的数据存储统一对象，最初是为解决在Domino环境下 Readviewentires URL命令返回的DXL格式数据，后来参考Dojo的Store 设计重新对Store对象进行了定义，抽出Store API。扩展Memory / LocalStore/DXLStore等对象。

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

_Summary_
		
		一个 transaction 方法返回的对象,表示一事务操作

<a name="Store.Transaction.commit"/>

####commit（）

_Summary_

		执行一个事务，事务提交失败可能抛出一个错误；在异步模式下会返回一个promise，最终会返回事务执行成功或失败
		
<a name="Store.Transaction.abort"/>


####abort(callback, thisObject)

_Summary_

		终止一个事务，终止操作失败可能抛出一个错误；在异步模式下会返回一个promise，最终会返回终止操作的成功或失败
 
##对象属性

<a name="idProperty" />

###idProperty 

_Summary_

<a name="quertEngine" />
###quertEngine

_Summary_

<a name="transaction" />
###transaction

_Summary_

##对象方法

<a name="get" />
###get

_Summary_

<a name="getIdentity" />
###getIdentity

_Summary_


<a name="put" />
###put

_Summary_

<a name="add" /> 
###add

_Summary_

<a name="remove" />
###remove

_Summary_

<a name="getChildren" />
###getChildren

_Summary_

<a name="getMetadata" />
###getMetadata

_Summary_ 