// 分享按钮组监听事件
var dom = `<li class='top'><img src="./images/nav_icon4.png" alt="" /></li>`;
var tag = true;
(function ($) {
  $(function () {
    const $shareGroup = $('.share');
    var scrollTop = $(document).scrollTop();
    var windowH = $(window).height();
    if (scrollTop >= windowH) {
      if (tag) {
        $shareGroup.append(dom);
        tag = false;
        $('.top').click(function () {
          $('html,body').animate({
            'scrollTop': 0
          }, 1000);
        });
      }
    } else {
      $('.top').remove();
      tag = true;
    }
  });
})(jQuery);

$(function () {
  const $shareGroup = $('.share');
  $(window).scroll(function () {
    var scrollTop = $(document).scrollTop();
    var windowH = $(window).height();
    if (scrollTop >= windowH) {
      if (tag) {
        $shareGroup.append(dom);
        tag = false;
        $('.top').click(function () {
          $('html,body').animate({
            'scrollTop': 0
          }, 1000);
        });
      }
    } else {
      $('.top').remove();
      tag = true;
    }
  });
});

// 平面案例和影视案例的面包屑导航栏
$(function () {
  //给导航栏绑定hover事件
  let first = true;
  $("#breadcrumb-nav-right > ol > li").hover(function () {
      $(this).addClass("example-nav-act");
    },
    function () {
      if ($(this).siblings(".example-nav-act").hasClass("example-nav-act") || first) {
        $(this).removeClass("example-nav-act");
      }
    });

  // 给导航绑定点击事件
  $("#breadcrumb-nav-right > ol > li").on('click', function () {
    first = false;
    $(this).siblings(".example-nav-act").removeClass("example-nav-act");
    $(this).addClass("example-nav-act");
  });
})

// 核心服务列表图标切换
$(function () {
  const list = $('.service-card-box .service-card-top-img-box .service-card-top-img');
  list.each(function (index) {
    $(this).mouseenter(function () {
      $(this).attr('src', `./images/icon-0${index + 5}.png`);
    });
    $(this).mouseleave(function () {
      $(this).attr('src', `./images/icon-0${index + 1}.png`);
    });
  });
})

$(function () {
  $('.bd_weixin_popup_close').on('click', function () {
    $("#wecaht-qrcode").css({
      left: -400 + 'px',
      top: -400 + 'px'
    })
  })
})

// 是否已经生成过二维码
let DONE = false;
// 微博、qq、微信分享
function shareTo(stype) {
  // 分享title
  let stitle = '壹盏灯摄影摄像网站';
  let shref = document.location.href;
  let idx = shref.indexOf('#');
  if (idx > 0) {
    shref = shref.substring(0, idx);
  }
  // 新浪微博接口的传参
  if (stype == 'sina') {
    window.open('http://service.weibo.com/share/share.php?url=' + shref + '&sharesource=weibo&title=' + stitle + '&summary=' + stitle);
  }
  // qq好友接口的传参
  if (stype == 'qq') {
    window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + shref + '&sharesource=qzone&title=' + stitle + '&summary=' + stitle);
  }
  // 微信分享，生成二维码，在手机端微信扫一扫分享
  if (stype == 'wechat') {
    $("#wecaht-qrcode").css({
      position: 'fixed',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)'
    })
    if (!DONE) {
      DONE = true;
      $(function () {
        $('#qrcode').qrcode({
          width: 200,
          height: 190,
          text: 'https://lanhuapp.com/web/#/user/login'
        });
      })
    }
  }
}

// 小屏幕时平面案例和影视案例的筛选按钮
$(function () {
  $('.example-nav-dropdown-icon').on('click', function () {
    $('.example-nav-dropdown').css({
      display: 'block'
    })
  })
})

// 平面案例和影视案例的类型筛选
$(function () {
  //给导航栏绑定hover事件
  let first = true;
  // 给导航绑定点击事件
  $(".example-nav-dropdown >ul > li").on('click', function () {
    first = false;
    $(this).siblings(".example-nav-dropdown-item-act").removeClass("example-nav-dropdown-item-act");
    $(this).addClass("example-nav-dropdown-item-act");
    $('.example-nav-dropdown').css({
      display: 'none'
    })
  });
})

// 屏幕蒙层 
$(function () {
  const screenMask = $('.screen-mask');
  const mainmenu = $('#menu-title').next('ul');
  const menuButton = $('#menu-button');
  var TAG = false;
  // 判断是否为移动端设备
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    screenMask.click(function () {
      mainmenu.hide().removeClass('open');
      screenMask.css({
        'opacity': '0',
        'height': '0',
        'z-index': '-100'
      });
    })
    //右上角菜单按钮事件
    menuButton.click(function () {
      if (!TAG) {
        TAG = true;
        screenMask.css({
          'opacity': '1',
          'height': '100%',
          'z-index': '2000'
        });
      } else {
        TAG = false;
        mainmenu.hide().removeClass('open');
        screenMask.css({
          'opacity': '0',
          'height': '0',
          'z-index': '-100'
        });
      }
    })
  }
})

// 优秀案例灰线变红出现more
$(function () {
  const cartLineList = $('.case-card .case-card-desc .line');
  $(window).scroll(function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      const scrollTop = $(document).scrollTop();
      const windowH = $(window).height();
      cartLineList.each(function (index) {
        const $this = $(this);
        const caseCardScrollT = $this.offset().top;
        //元素距离屏幕顶部高度
        const cs = caseCardScrollT - scrollTop;
        if ((cs + 200) >= (windowH / 2) && (cs - 250) <= (windowH / 2)) {
          $this.css('border-top', '2px solid #b33d33');
          $this.parent().find('a').css({
            'transform': 'scale(1)',
            // 'right': '29px',
            'color': '#b33d33'
          });
        } else {
          $this.css('border-top', '2px solid #bbb2ab');
          $this.parent().find('a').css({
            'transform': 'scale(0)',
            // 'right': '0',
            'color': '#bbb2ab'
          });
        }
      })
    }
  });
});

$(function () {
  new WOW().init();
});