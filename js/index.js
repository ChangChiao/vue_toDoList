new Vue({
    el:"#app",
    data:{
      isFinish:null,
      isDone:false,
      ifTop:'false',
      nowType:'all',
      isImportant:false,
      listItem:'',
      toDoTime:'',
      toDoTitle:'',
      toDoComment :'',
      toDoFile:'',
      toDoClock:'',
      toUpdateTime:'',
      isEdit:false,
      menuList:[
        {title:'My Tasks', type:'all'},
        {title:'In Progress', type:'progress'},
        {title:'Completed', type:'completed'},
      ],
      list:[
        {name:'煮泡麵',time:'05/17',comment:'45465464654',file:'',Sticky:false,complete:false},
        {name:'煎蛋',time:'06/21',comment:'00000000000',file:'',Sticky:false,complete:false},
        {name:'炒高麗',time:'10/14',comment:'00000000000',file:'',Sticky:false,complete:false},
      ],
      finishList:[]
    },
    computed:{
      listItemRow:function(){
        let self = this;
        let arr = [];
        if(this.nowType=='all'){
          return self.sortData(this.list);
          console.log(data);
        }else if(this.nowType=='progress'){
          this.list.forEach(function(item) {
            if (!item.complete) {
              arr.push(item);
           }
          })
           console.log('p' + JSON.stringify(arr));
           return self.sortData(arr); 
        }else if(this.nowType=='completed'){
          this.list.forEach(function(item) {
            if (item.complete) {
              arr.push(item);
           }
          })
           console.log('c' + JSON.stringify(arr));
           return self.sortData(arr); 
        }else{
          return arr;
        }
      },
    },
    methods:{
      sortData(data){
          return data.sort((a,b)=>{
          let scoreA = (a.Sticky?-10000:0) + (a.complete?20000:0)
          let scoreB = (b.Sticky?-10000:0 )+ (b.complete?20000:0)
          console.log(scoreA,scoreB)
          
          if(scoreA>scoreB)
            return 1
          else if (scoreA==scoreB)
            return 0
          else
            return -1
          
        })
      },
      showEdit:function(){
        $('.edit').css('height','auto');
      },
      changeType: function(param){
        this.nowType = param;
      },
      addItem:function(){
        if(this.listItem != ''){
            let s = {};
            s.name = this.listItem
            this.list.push(s);
            this.listItem='';
        }
      },
      removeItem:function(index){
        this.list.splice(index,1);
      },
      finishItem:function(index){ 
        this.list[index].complete = !this.list[index].complete;
        // this.finishList.push(this.list[index]);
        // this.list.splice(index,1);
        // console.log(this.finishList);
      },
      fileSelected: function(e){ //上傳檔案
        // const file = evt.target.files.item(0);
        // const reader = new FileReader();
        // reader.addEventListener('load' , this.imageLoaded);
        // reader.readAsDataURL(file);
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
        this.toUpdateTime = this.getUploadTime();
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;
  
        reader.onload = (e) => {
          vm.toDoFile = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      removeImage: function (e) {
        this.toDoFile = '';
      },
      getUploadTime: function(){
          var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
        let date = new Date()
        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();
  
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
      },
      toTop:function(index){ //置頂
        this.list[index].Sticky = !this.list[index].Sticky;
        console.log('work');
        // this.ifTop = !this.ifTop;
        // let x = this.list[index];
        // x.Sticky = !(x.Sticky);
        // if(this.ifTop){
        //     this.list.splice(index,1);
        //     this.list.unshift(x);
        // }else{
        //     var y = this.list[0];
        //     this.list.splice(0,1);
        //     this.list.push(y);
        // }
  
      },
      keepItem:function(index){ 
        // this.list.push(this.finishList[index]);
        // this.finishList.splice(index,1);
        this.list[index].complete = true;
      },
      isToTop:function(){ //辦別是否置頂
        this.isImportant = !this.isImportant;
      },
      cancelAdd:function(){ //
        $('.edit').css('height','0');
      },
      comfirmAdd:function(){ //新增功能
        var item ={};
        item.name = this.toDoTitle;
        item.comment = this.toDoComment;
        item.uploadTime = this.toUpdateTime;
        if(this.toDoTime != ''){
          item.time = this.getTime(this.toDoTime);
        }
        if(this.isImportant){
          this.list.unshift(item);
        }else{
          this.list.push(item);
        }
        if(this.isEdit){
          this.removeItem(item);   
        }
        this.isEdit = !this.isEdit;
        // console.log('time' + this.toDoTime);
        this.clearData();
      },
      clearData: function(){
          this.toDoTitle ='';
          this.toDoTime = '';
          this.toDoComment ='';
          this.toDoFile ='';
          this.toUpdateTime ='';
      },
      getTime: function(time){ //轉換時間格式 取日/月
        let arr = time.split('-');
        return arr[1] + '/' + arr[2];
      },
      editItem:function(index){ //編輯項目
        $('.edit').css('height','auto');
        this.isEdit = !this.isEdit;
          this.toDoTitle = this.list[index]['name'];
          this.toDoTime = this.list[index]['time'] ;
          this.toDoComment = this.list[index]['comment'];
          this.toDoFile = this.list[index]['file'];
          this.toUpdateTime = this.list[index]['uploadTime'];
      },
    },
    mounted:function(){
      $('.edit').css('height','0');
      for(var i=0; i<this.list.length;i++){
        console.log(i + ':' + this.list[i].Sticky);
      }
    }
  });
  
  //jquery
  
  // $('.fa-star').on('click', function(){
  //   $(this).toggleClass('active');
  // })
  
  $('.list_type li').on('click', function(){
    $('.list_type li').removeClass('active');
    $(this).addClass('active');
  })
  
  // 拖曳套件
    $(function() {
      $( "#move_area" ).sortable({
        revert: true
      });
      $( "move_area > div" ).disableSelection();
      // $( "#datepicker" ).datepicker(); //時間套件 異常 停用
    });
  
  //時間套件 wickedpicker 異常 停用
  // $('.timepicker').wickedpicker();
  
  