$(function () {
  // 上部分轮播图
  var width = 625;
  var num = 0;
  var next = 0;
  var swite = true;
  var as = $('.slide-body .pic');
  var spot = $('.spot .spot-list');
  for(var i = 0;i<as.length;i++){
    if(i==0){
        continue;
    }
    as.eq(i).css({left:width});
  }
  $('.slide-body ').on('mouseover',function(){
      clearInterval(t);
  })
  $('.slide-body ').on('mouseout',function(){
      t=setInterval(moveLeft,4000);
  })
  var moveLeft = function () {
    next++;
    if (next === as.length) {
      next = 0;
    }
    as.eq(next).css({left:width});
    as.eq(num).animate({left: -width}, function () {
      swite = true;
    });
    as.eq(next).animate({left: 0});
    num = next;
    for (j = 0; j < spot.length; j++) {
      spot.eq(j).removeClass('active');
    }
    spot.eq(num).addClass('active');
  }
  spot.on('click', function () {
    if (swite) {
      swite = false;
      var index = $(this).index();
      var len = spot.length;
      for (var i = 0; i < len; i++) {
        spot.eq(i).removeClass('active');
        as.eq(i).css({left:width});
      }
      $(this).addClass('active');
      as.eq(index).animate({left:0},function(){
        swite = true;
      });
      num = index;
      next = num;
    } else {
      return;
    }
  });
  // 下部tab图标转换
  var t = setInterval(moveLeft, 2000);
  var tab = $('.tab-wrap .tab');
  var tabWrap = $('.live-report-wrap .live-list-wrap');
  tab.on('click', function () {
    var index = $(this).index();
    for (var i = 0; i < tab.length; i++) {
      tab.eq(i).removeClass('active');
      tabWrap.eq(i).removeClass('active');
    }
    tab.eq(index).addClass('active');
    tabWrap.eq(index).addClass('active');
  });
  var dbTab = $('.tab-warp .tab-box');
  var liveBox = $('.tab-live .content-live-box');
  var feIcon = ['textfi.png', 'videofi.png', 'picfi.png'];
  var icone = ['textic.png', 'videoic.png', 'picic.png'];
  dbTab.on('click', function () {
    var index = $(this).index();
    var nowSrc = 'images/' + feIcon[index];
    dbTab.removeClass('active');
    liveBox.removeClass('active');
    dbTab.eq(index).addClass('active');
    liveBox.eq(index).addClass('active');
    for (var c = 0; c < dbTab.length; c++) {
      var oldSrc = 'images/' + icone[c]
      dbTab.eq(c).find('img').attr('src', oldSrc);
    }
    dbTab.eq(index).find('img').attr('src', nowSrc);
    if (index === 1) {
      var player = new Plyr('#aaaa', {
        /* options */
      });
    }
  });
  // 手动自动刷新
  var isAuto = $('.is-auto-wrap span');
  isAuto.on('click', function () {
    var index = $(this).index;
    isAuto.removeClass('active');
    $(this).addClass('active');
  });
  // 查看图片
  var srclist = [
    {name: '司法部法律援助工作司司长白萍1', src: 'images/body-bg.png'},
    {name: '司法部法律援助工作司司长白萍2', src: 'images/ex-pic17.jpg'},
    {name: '司法部法律援助工作司司长白萍3', src: 'images/ex-pic07.jpg'},
    {name: '司法部法律援助工作司司长白萍4', src: 'images/ex-pic18.jpg'},
    {name: '司法部法律援助工作司司长白萍5', src: 'images/ex-pic17.jpg'},
    {name: '司法部法律援助工作司司长白萍6', src: 'images/ex-pic07.jpg'},
    {name: '司法部法律援助工作司司长白萍7', src: 'images/body-bg.png'},
    {name: '司法部法律援助工作司司长白萍8', src: 'images/ex-pic17.jpg'},
    {name: '司法部法律援助工作司司长白萍9', src: 'images/ex-pic07.jpg'},
    {name: '司法部法律援助工作司司长白萍10', src: 'images/ex-pic18.jpg'},
    {name: '司法部法律援助工作司司长白萍11', src: 'images/ex-pic17.jpg'},
    {name: '司法部法律援助工作司司长白萍12', src: 'images/ex-pic07.jpg'}
  ]
  var watchPic = function (list) {
    var arr = list?list:[];
    var picPar = $('.pic-lis-wrap');
    var picCh = picPar.find('ul');
    var picLi = picCh.find('.list');
    var width = 130 * arr.length;
    for (var i = 0; i < arr.length; i++) {
      var src = arr[i].src;
      var name = arr[i].name;
      var li = $('<li class="list" data-src="'+src+'">' +
          '<img class="listImg" src="'+src+'" alt="">' +
        '</li>');
      var listLi = $('<li class="list" data-index="'+i+'" data-src="'+arr[i].src+'">' +
          '<img src="'+arr[i].src+'" alt="">' +
          '<span class="name">'+arr[i].name+'</span>' +
        '</li>')
      picCh.append(li);
      $('.live-pic-list').append(listLi);
    }
    picCh.css('width', width + 'px');
    var ylIndex = 0;
    $('.live-pic-list').find('.list').on('click', function () {
      var src = $(this).data('src');
      var index = $(this).data('index');
      var name = arr[index].name;
      $('.see-pic-wrap').addClass('active');
      $('.see-pic-wrap').find('.zimg').attr('src', src);
      $('.see-pic-wrap').find('.namt-text').text(name);
      picCh.find('.list').removeClass('active');
      picCh.find('.list').eq(index).addClass('active');
      ylIndex = index;
      var left = parseInt(100*ylIndex);
      if (dbSwite) {
        if (left > 400) {
          dbSwite = false;
          picCh.animate({left: -left}, function () {
            leftNum = parseInt(picCh.offset().left);
            nowLeft = left;
            dbSwite = true;
          });
        } else if (left === 400) {
          picCh.animate({left: 0}, function () {
            leftNum = parseInt(picCh.offset().left);
            nowLeft = left;
            dbSwite = true;
          });
        }
      }
    });
    $('.close-box').on('click', function () {
      $('.see-pic-wrap').removeClass('active');
    });
    var rightFn = function () {
      ylIndex++;
      if(ylIndex >= arr.length) {
        ylIndex = 0;
        leftNum = 0;
        dbSwite = false;
        picCh.animate({left: leftNum}, function () {
          dbSwite = true;
        });
      }
      var src = arr[ylIndex].src;
      var textCone = arr[ylIndex].name;
      $('.see-pic-wrap').find('.namt-text').text(textCone);
      $('.see-pic-wrap').find('.zimg').attr('src', src);
    }
    var leftFn = function () {
      ylIndex--;
      if(ylIndex < 0) {
        ylIndex = arr.length - 1;
      }
      var src = arr[ylIndex].src;
      var textCone = arr[ylIndex].name;
      $('.see-pic-wrap').find('.namt-text').text(textCone);
      $('.see-pic-wrap').find('.zimg').attr('src', src);
    }
    var leftNum = 0;
    var nowLeft = 0;
    var dbSwite = true;
    $('.see-pic-wrap').find('.arow').on('click', function () {
      if (dbSwite) {
        var fx = $(this).data('fx');
        if (fx === 'left') {
          leftFn();
        } else {
          rightFn();
        }
        picCh.find('li').removeClass('active');
        picCh.find('li').eq(ylIndex).addClass('active');
        var left = parseInt(100*ylIndex);
        if (left > 400) {
          dbSwite = false;
          picCh.animate({left: -left}, function () {
            leftNum = parseInt(picCh.offset().left);
            nowLeft = left;
            dbSwite = true;
          });
        } else if (left === 400) {
          picCh.animate({left: 0}, function () {
            leftNum = parseInt(picCh.offset().left);
            nowLeft = left;
            dbSwite = true;
          });
        }
      }
    });
    picCh.find('li').on('click', function () {
      var src = $(this).data('src');
      var index = $(this).index();
      var textCone = arr[index].name;
      ylIndex = index;
      $('.see-pic-wrap').find('.zimg').attr('src', src);
      $('.see-pic-wrap').find('.namt-text').text(textCone);
      picCh.find('li').removeClass('active');
      picCh.find('li').eq(index).addClass('active');
      var left = parseInt(100*index);
      if (dbSwite) {
        if (left > 400) {
          dbSwite = false;
          picCh.animate({left: -left}, function () {
            leftNum = parseInt(picCh.offset().left);
            nowLeft = left;
            dbSwite = true;
          });
        } else if (left === 400) {
          picCh.animate({left: 0}, function () {
            leftNum = parseInt(picCh.offset().left);
            nowLeft = left;
            dbSwite = true;
          });
        }
      }
    });
  };
  watchPic(srclist);
});