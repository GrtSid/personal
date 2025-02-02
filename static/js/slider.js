/*********************
 *	Helpers Code
 ********************/
/**
                        *  @function   DOMReady
                        *
                        *  @param callback
                        *  @param element
                        *  @param listener
                        *  @returns {*}
                        *  @constructor
                        */
$(document).ready(function(){
  $('#btn_upload').click(function(){

    var fd = new FormData();
    var files = $('#file')[0].files[0];
    fd.append('file',files);

    // AJAX request
    $.ajax({
      url: 'project/',
      type: 'post',
      data: fd,
      contentType: false,
      processData: false,
      success: function(response){
        if(response != 0){
            $('#fashion').html("<b>Output: </b> " + response['value']);
          // Show image preview
          $('#preview').append("<img src='"+response['url']+"' width='100' height='100' style='display: inline-block;'>");
        }else{
          alert('file not uploaded');
        }
      }
    });
  });
});

const DOMReady = (
callback = () => {},
element = document,
listener = 'addEventListener') =>
{
  return element[listener] ? element[listener]('DOMContentLoaded', callback) : window.attachEvent('onload', callback);
};

/**
    *  @function   ProjectAPI
    *
    *  @type {{hasClass, addClass, removeClass}}
    */
const ProjectAPI = (() => {
  let hasClass,
  addClass,
  removeClass;

  hasClass = (el, className) => {
    if (el === null) {
      return;
    }

    if (el.classList) {
      return el.classList.contains(className);
    } else
    {
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
  };

  addClass = (el, className) => {
    if (el === null) {
      return;
    }

    if (el.classList) {
      el.classList.add(className);
    } else
    if (!hasClass(el, className)) {
      el.className += ' ' + className;
    }
  };

  removeClass = (el, className) => {
    if (el === null) {
      return;
    }

    if (el.classList) {
      el.classList.remove(className);
    } else
    if (hasClass(el, className)) {
      let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');

      el.className = el.className.replace(reg, ' ');
    }
  };

  return {
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass };

})();


/*********************
       *	Application Code
       ********************/
/**
                              *  @function   readyFunction
                              *
                              *  @type {Function}
                              */
const readyFunction = () => {

  const KEY_UP = 38;
  const KEY_DOWN = 40;

  let scrollingClass = 'js-scrolling',
  scrollingActiveClass = scrollingClass + '--active',
  scrollingInactiveClass = scrollingClass + '--inactive',

  scrollingTime = 1350,
  scrollingIsActive = false,

  currentPage = 1,
  countOfPages = document.querySelectorAll('.' + scrollingClass + '__page').length,

  prefixPage = '.' + scrollingClass + '__page-',

  _switchPages,
  _scrollingUp,
  _scrollingDown,

  _mouseWheelEvent,
  _keyDownEvent,

  init;

  /**
         *  @function _switchPages
         *
         *  @private
         */
  _switchPages = () => {

    let _getPageDomEl;

    /**
                         *  @function _getPageDomEl
                         *
                         *  @param page
                         *  @returns {Element}
                         *  @private
                        */
    _getPageDomEl = (page = currentPage) => {
      return document.querySelector(prefixPage + page);
    };

    scrollingIsActive = true;


    ProjectAPI.removeClass(
    _getPageDomEl(),
    scrollingInactiveClass);

    ProjectAPI.addClass(
    _getPageDomEl(),
    scrollingActiveClass);


    ProjectAPI.addClass(
    _getPageDomEl(currentPage - 1),
    scrollingInactiveClass);


    ProjectAPI.removeClass(
    _getPageDomEl(currentPage + 1),
    scrollingActiveClass);



    setTimeout(
    () => {
      return scrollingIsActive = false;
    },
    scrollingTime);

  };
  /**
       *  @function _scrollingUp
       *
       *  @private
       */
  _scrollingUp = () => {
    if (currentPage === 1) {
      return;
    }

    currentPage--;

    _switchPages();
  };
  /**
       *  @function _scrollingDown
       *
       *  @private
       */
  _scrollingDown = () => {
    if (currentPage === countOfPages) {
      return;
    }

    currentPage++;

    _switchPages();
  };
  /**
       *  @function _mouseWheelEvent
       *
       *  @param e
       *  @private
       */
  _mouseWheelEvent = e => {
    if (scrollingIsActive) {
      return;
    }

    if (e.wheelDelta > 0 || e.detail < 0) {
      _scrollingUp();
    } else
    if (e.wheelDelta < 0 || e.detail > 0) {
      _scrollingDown();
    }
  };
  /**
       *  @function _keyDownEvent
       *
       *  @param e
       *  @private
       */
  _keyDownEvent = e => {
    if (scrollingIsActive) {
      return;
    }

    let keyCode = e.keyCode || e.which;

    if (keyCode === KEY_UP) {
      _scrollingUp();
    } else
    if (keyCode === KEY_DOWN) {
      _scrollingDown();
    }
  };

  /**
      *  @function init
      *
      *  @note     auto-launch
      */
  init = (() => {
    document.addEventListener(
    'mousewheel',
    _mouseWheelEvent,
    false);

    document.addEventListener(
    'DOMMouseScroll',
    _mouseWheelEvent,
    false);


    document.addEventListener(
    'keydown',
    _keyDownEvent,
    false);

  })();

};


/**
    *  Launcher
    */
DOMReady(readyFunction);