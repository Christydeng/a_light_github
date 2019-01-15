(function ($) {

  $.fn.menumaker = function (options) {

    var cssmenu = $(this),
      settings = $.extend({
        title: "Menu",
        format: "dropdown",
        sticky: false
      }, options);

    return this.each(function () {
      cssmenu.prepend(`<div id="menu-title">
      ` + settings.title + `
      <div id='menu-button'>
        <span></span>
        <span></span>
        <span></span>
      </div>`);
      $(this).find("#menu-button").on('click', function () {
        $(this).toggleClass('menu-opened');
        var mainmenu = $('#menu-title').next('ul');
        if (mainmenu.hasClass('open')) {']\
        +'
          mainmenu.hide().removeClass('open');
        } else {
          mainmenu.show().addClass('open');
          $('.open').css('color','red');
          if (settings.format === "dropdown") {
            mainmenu.find('ul').show();
          }
        }
      });

      cssmenu.find('li ul').parent().addClass('has-sub');
      multiTg = function () {
        cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
        cssmenu.find('.submenu-button').on('click', function () {
          $(this).toggleClass('submenu-opened');
          if ($(this).siblings('ul').hasClass('open')) {
            $(this).siblings('ul').removeClass('open').hide();
          } else {
            $(this).siblings('ul').addClass('open').show();
          }
        });
      };

      if (settings.format === 'multitoggle') multiTg();
      else cssmenu.addClass('dropdown');

      if (settings.sticky === true) cssmenu.css('position', 'fixed');

      resizeFix = function () {
        if ($(window).width() > 1024) {
          $('.logo').css({
            'margin-left': 0
          }); //响应式设置logo的边距
          $('#logo').show(); //显示展开的logo
          cssmenu.find('ul').show();
        }

        if ($(window).width() <= 1024) {
          $('#logo').hide(); //隐藏展开的logo
          cssmenu.find('ul').hide();
        }
      };
      resizeFix();
      return $(window).on('resize', resizeFix);

    });
  };
})(jQuery);

(function ($) {
  $(document).ready(function () {
    $("#cssmenu").menumaker({
      title: `<a class='logo' href='#'>壹盏灯<a>`, //logo或标题
      format: "multitoggle"
    });

    $("#cssmenu").prepend("<div id='menu-line'></div>");

    var foundActive = false,
      activeElement, linePosition = 0,
      menuLine = $("#cssmenu #menu-line"),
      lineWidth, defaultPosition, defaultWidth;

    $("#cssmenu > ul > li").each(function () {
      if ($(this).hasClass('active')) {
        activeElement = $(this);
        foundActive = true;
      }
    });

    if (foundActive === false) {
      activeElement = $("#cssmenu > ul > li").first();
    }

    lineWidth = localStorage.getItem('lineWidth');
    linePosition = localStorage.getItem('linePosition');
    
    //获取宽度和位置
    if(lineWidth&&linePosition){
      defaultWidth = lineWidth;
      defaultPosition = linePosition;    
    }else{
      defaultWidth = lineWidth = activeElement.width();
      defaultPosition = linePosition = activeElement.position().left;
    }

    menuLine.css({
      "width": lineWidth,
      "left": linePosition+'px'
    });

    //给导航栏绑定hover事件
    $("#cssmenu > ul > li").hover(function () {
        if ($(window).width() > 1024) {
          activeElement = $(this);
          lineWidth = activeElement.width();
          linePosition = activeElement.position().left;
          menuLine.css("width", lineWidth);
          menuLine.css("left", linePosition);
        }

      },
      function () {
        menuLine.css({
          "width": defaultWidth,
          "left": defaultPosition+'px'
        });
      });

    // 给导航绑定点击事件
    $("#cssmenu > ul > li").on('click', function () {
      if ($(window).width() > 1024) {
        activeElement = $(this);
        defaultWidth = activeElement.width();
        defaultPosition = activeElement.position().left;
        menuLine.css("width", defaultWidth);
        menuLine.css("left", defaultPosition);
        localStorage.setItem('lineWidth',defaultWidth);
        localStorage.setItem('linePosition',defaultPosition);
      }
    });

  });
})(jQuery);