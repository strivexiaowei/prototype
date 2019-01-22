//开启one这个作用域
var app = new Vue({
  //对应id为one的元素在这个元素内部开启作用域
  el:'#one',
  //在这里可以声明一些变量
  data:{
	showw: false,
    yanse:[
	  'red',
	  'yellow',
	  'blue',
	  'green',
	  'orange',
	  'zise'
	],
	jiashuju:[{id:0,name:'',yanse:'',wancheng:false,tudo:[]}],
	shuju:[],
	content:'',
	younei:[]
  },
//  在这里 可以写一些函数 这是计算属性 还有computed和watch
  methods:{
	//创建
    add:function (){
      var len = this.shuju.length;
	  var id;
	  var min = -Infinity;
	  if(len>min){
		min = len;
		id = min + 1;
	  }
	  var lis  = {id:id,name:'新列表'+(id),yanse:this.yanse[len%6],wancheng:false,tudo:[]};
	  this.shuju.push(lis);
	  console.dir(this.shuju)
	},
	//保存
	save:function (){
	  localStorage.aaa=JSON.stringify(this.shuju);
	},
	//在嵌套数组里添加
	tianjia:function (id){
	  var idb;
	  if(!this.shuju[id-1].tudo.length){
		idb = 1;
	  }else {
		idb=this.shuju[id-1].tudo.length+1;
	  }
	  this.shuju[id-1].tudo.push(
		{id:idb,name:this.content,fin:true}
	  )
	},
	//删除
	del:function (index){
	  if(index!==0){
		aa = index;
	  }else {
		aa=0;
	  }
	  var arr = [];
	  for(var i = 0; i<this.shuju.length; i++){
		if(aa!==this.shuju[i].id) {
		  arr.push(this.shuju[i])
		}
	  }
	  this.shuju = arr;
	  this.younei = this.shuju[0];
	  console.log(aa)
	},
	//删除右边
	dell:function (idf){
	  //console.log(idf)
	  //var arr = [];
	  //for(i=0;i<this.younei.tudo.length;i++){
		//if(idf!==this.younei.tudo[i].id){
		//  arr.push(this.younei.tudo[i]);
		//}
	  //}
	  this.younei.tudo.splice(idf, 1);
	},
	//换掉右边内容
	huan:function (id){
	  var aa;
	  if(id===undefined){
		aa = 0;
	  }else {
		aa = id;
	  }
	  this.younei = this.shuju[aa];
	  console.log(aa)
	},
	//哎 真他妈不好用啊
	gaibiana:function (id){
	  console.log(id)
	}
  },
  computed: {
	//过滤
	guolv:function (){
	  var aa = [];
	  var tt = this.younei.tudo;
	  var len = tt.length;
	  for (var i =0;i<len ;i++){
		if(tt[i].fin===true){
		  aa.push(tt[i]);
		}
	  }
	  return aa;
	},
	guolvf:function (){
	  var aa = [];
	  var tt = this.younei.tudo;
	  var len = tt.length;
	  for (var i =0;i<len ;i++){
		if(tt[i].fin===false){
		  aa.push(tt[i]);
		}
	  }
	  return aa;
	}
  }
})

if(localStorage.aaa){
  app.shuju=JSON.parse(localStorage.aaa);
}else {
  app.shuju=[];
}
if(app.shuju.length){
  app.younei = app.shuju[0]
}else {
  app.younei = app.jiashuju[0]
}
