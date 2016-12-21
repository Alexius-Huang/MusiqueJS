/*
 *
 * Copyright (c) 2016, Maxwell Alexius All rights reserved.
 * Version: 0.0.0 beta
 * Created at: Wed Dec 14 2016 23:38:04 GMT+0800
 *
 */

function Musique(params) {

  /* * * * * * * * * * * * * * * * * * * * Helper Functions Starts * * * * * * * * * * * * * * * * * * * * * */

  function randomString(length, chars) {
    var result = '';
    if (!chars) { chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; }
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  
  var _inputSpecified = function(input) { return input !== undefined; };

  var _isFunction = function(input) { return typeof input === "function"; };

  var _isBoolean = function(input) { return typeof input === "boolean"; }

  var _integer = function(input) { return Math.floor(input); };

  var _getElement = function(elementID) { return document.getElementById(elementID); };

  var _getChildNodes = function(elementID) { return (_getElement(elementID) ? _getElement(elementID).childNodes : null ); };

  var _getLastChildNode = function(elementID) { return (_getChildNodes(elementID) ? _getChildNodes(elementID)[_getChildNodes(elementID).length - 1] : null ); };

  var _getWidth = function(element) { return element ? element.offsetWidth : 0 };

  var _getHeight = function(element) { return element ? element.offsetHeight : 0 };

  var _getClickedPosition = function(eventObject) { return { x: eventObject.offsetX, y: eventObject.offsetY }; };

  var _matches = function(testString, type) {
    switch(type) {
      case "numeral":               return /^\d+$/.test(testString);
      case "alphabet":              return /^[a-zA-Z]+$/.test(testString);
      case "alphanumeral":          return /^[a-zA-Z0-9]+$/.test(testString);
      case "upperCaseAlphabet":     return /^[A-Z]+$/.test(testString);
      case "upperCaseAlphanumeral": return /^[A-Z0-9]+$/.test(testString);
      case "lowerCaseAlphabet":     return /^[a-z]+$/.test(testString);
      case "lowerCaseAlphanumeral": return /^[a-z0-9]+$/.test(testString);
      default: return (type instanceof RegExp ? type.test(testString) : false);
    }
  }

  var _importScript = function(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
  }

  var _scriptAlreadyExist = function(url) {
    if (!url) return null;
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length; i--;) {
      if (scripts[i].src == url) return true;
    }
    return false;
  }

  // var _cssValue = function(input) {
  //   if (typeof input == "number") {
  //     return String(input) + 'px';
  //   } else if (typeof input == "string") {
      
  //   }
  // }

  /* * * * * * * * * * * * * * * * * * * * Helper Functions  Ends  * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * * * * * * * Inputs Fields Start * * * * * * * * * * * * * * * * * * * * * * */
  
  /* Required Field */
  var _render    = params.render;
  var _sourceURL = _inputSpecified(params.sourceURL) ? params.sourceURL : null;
  var _type      = _inputSpecified(params.type)      ? params.type      : 'default';
  /* Types
   *   default  : Plain HTML5 Audio API
   *   player   : Audio API with basic control buttons bind with methods, 'play', 'pause', 'stop', 'forward', 'backward'
   *   playlist : Playlist with multiple song
   *   upload   : Having upload field and it can preview uploaded audio file
   */

  /* Optional Field */
  var _customClass    = _inputSpecified(params.customClass)    ? params.customClass    : '';
  var _autoPlay       = _inputSpecified(params.autoPlay)       ? params.autoPlay       : false;
  var _renderSequence = _inputSpecified(params.renderSequence) ? params.renderSequence : ['progressBar', 'control', 'waveform'];
    
  if (_type != 'default') {
    /* Control Attribute */
    var _showControlButtons = _inputSpecified(params.showControlButtons) ? params.showControlButtons : true;
    var _roundedButton      = _inputSpecified(params.roundedButton)      ? params.roundedButton      : false;
    var _buttonIconType     = _inputSpecified(params.buttonIconType)     ? params.buttonIconType     : 'dark';
    var _skipLength         = _inputSpecified(params.skipLength)         ? params.skipLength         : 5;
    if (_roundedButton) {
      var _showButtonText = false;
      var _showButtonIcon = true;
    } else {
      var _showButtonText = _inputSpecified(params.showButtonText) ? params.showButtonText : true;
      var _showButtonIcon = _inputSpecified(params.showButtonIcon) ? params.showButtonIcon : false;  
    }
    
    /* Waveform Features */
    var _showWaveform      = _inputSpecified(params.showWaveform)      && _isBoolean(params.showWaveform)      ? params.showWaveform      : false;
    var _waveformSkippable = _inputSpecified(params.waveformSkippable) && _isBoolean(params.waveformSkippable) ? params.waveformSkippable : true; 

    //   var _wf_type          = _inputSpecified(_waveform.type)          ? _waveform.type          : '';
    //   var _wf_audioRate     = _inputSpecified(_waveform.audioRate)     ? _waveform.audioRate     : 1;
    //   var _wf_waveColor     = _inputSpecified(_waveform.waveColor)     ? _waveform.waveColor     : '#999';
    //   var _wf_progressColor = _inputSpecified(_waveform.progressColor) ? _waveform.progressColor : '#555';
    //   var _wf_cursorWidth   = _inputSpecified(_waveform.cursorWidth)   ? _waveform.cursorWidth   : 1;
    //   var _wf_cursorColor   = _inputSpecified(_waveform.cursorColor)   ? _waveform.cursorColor   : '#333';

    //   var _wf_zoomSlide     = undefined;
    //   var _wf_waveHeight    = undefined;

    //   if (_wf_type == 'bar') {
    //     var _wf_barWidth = _waveform.barWidth >= 1 ? _waveform.barWidth : 3;
    //   }
    // } else var _wf_enabled = false;

    /* Timer Feature */
    var _showTimer     = _inputSpecified(params.showTimer) && _isBoolean(params.showTimer) ? params.showTimer : false;
    var _timerPosition = _inputSpecified(params.timerPosition) ? params.timerPosition : 'right'; /* 'left' or 'right' */
    
    /* Progress Bar Feature */
    var _showProgressBar     = _inputSpecified(params.showProgressBar)     && _isBoolean(params.showProgressBar)    ? params.showProgressBar     : false;
    // var _timerOnProgressBar  = _inputSpecified(params.timerOnProgressBar)  && _isBoolean(params.timerOnProgressBar) ? params.timerOnProgressBar  : false;
    // var _progressBarPosition = _inputSpecified(params.progressBarPosition) && !_timerOnProgressBar                  ? params.progressBarPosition : 'top';  /* 'top' or 'bottom' */
    var _progressBarStart    = _inputSpecified(params.progressBarStart)                                             ? params.progressBarStart    : 'left'; /* 'left' or 'right' */
    var _progressSkippable   = _inputSpecified(params.progressSkippable)   && _isBoolean(params.progressSkippable)  ? params.progressSkippable   : true; 
    
    /* Image Feature */
    // var _image = _inputSpecified(params.imageURL) && params.image instanceof Object ? params.imageURL : null;
    // if (_image) {
    //   var _i_enabled = true;
    //   var _i_url     = _inputSpecified(_image.url) && _image.url instanceof String ? _image.url : null;
    // } else var _i_enabled = false;

    /* Interact with CSS */
    var _style = _inputSpecified(params.style) && params.style instanceof Object ? params.style : undefined;
    
      /* Main Part */  
      var _width        = _style && _inputSpecified(_style.width)        ? _style.width        : 0;
      var _height       = _style && _inputSpecified(_style.height)       ? _style.height       : 0;
      var _padding      = _style && _inputSpecified(_style.padding)      ? _style.padding      : 8;
      var _bgc          = _style && _inputSpecified(_style.bgc)          ? _style.bgc          : '#555';
      var _borderRadius = _style && _inputSpecified(_style.borderRadius) ? _style.borderRadius : 5;

      /* Button Control Part */
      var _controlBgc        = _style && _inputSpecified(_style.controlBgc)        ? _style.controlBgc        : null;
      var _btnSpacing        = _style && _inputSpecified(_style.btnSpacing)        ? _style.btnSpacing        : 3;
      var _btnTextColor      = _style && _inputSpecified(_style.btnTextColor)      ? _style.btnTextColor      : '#555';
      var _btnBgc            = _style && _inputSpecified(_style.btnBgc)            ? _style.btnBgc            : '#ccc';
      var _btnHoverTextColor = _style && _inputSpecified(_style.btnHoverTextColor) ? _style.btnHoverTextColor : '#777';
      var _btnHoverBgc       = _style && _inputSpecified(_style.btnHoverBgc)       ? _style.btnHoverBgc       : '#fff';
      var _btnTransitionSec  = _style && _inputSpecified(_style.btnTransitionSec)  ? _style.btnTransitionSec  : 0;
      var _btnIconSize       = 15; // _style && _inputSpecified(_style.btnIconSize) ? _style.btnIconSize  : 15;
      if (_roundedButton) {
        var _btnRadius = 'rounded'; // Change Radius After Rendering
      } else {
        var _btnRadius = _style && _inputSpecified(_style.btnRadius) ? _style.btnRadius : 3;  
      }
      
      /* Timer Part */
      var _timerSpacing = _style && _inputSpecified(_style.timerSpacing) ? _style.timerSpacing : 10;
      var _timerColor   = _style && _inputSpecified(_style.timerColor)   ? _style.timerColor   : '#aaa'
      var _timerPadding = _style && _inputSpecified(_style.timerPadding) ? _style.timerPadding : 3;
      var _timerBgc     = _style && _inputSpecified(_style.timerBgc)     ? _style.timerBgc     : '#333';
      var _timerBorder  = _style && _inputSpecified(_style.timerBorder)  ? _style.timerBorder  : '1px solid #aaa';
      var _timerRadius  = _style && _inputSpecified(_style.timerRadius)  ? _style.timerRadius  : 3;

      /* Progress Bar & Trace Part */
      var _progressBarBgc     = _style && _inputSpecified(_style.progressBarBgc)     ? _style.progressBarBgc     : _bgc;
      var _progressBarColor   = _style && _inputSpecified(_style.progressBarColor)   ? _style.progressBarColor   : '#2187e7';
      var _progressBarHeight  = _style && _inputSpecified(_style.progressBarHeight)  ? _style.progressBarHeight  : 5;
      var _progressBarPadding = _style && _inputSpecified(_style.progressBarPadding) ? _style.progressBarPadding : 0;
      var _progressBarRadius  = _style && _inputSpecified(_style.progressBarRadius)  ? _style.progressBarRadius  : 5;
      var _progressBarShadow  = _style && _inputSpecified(_style.progressBarShadow)  ? _style.progressBarShadow  : '0px 0px 10px 1px rgba(0,198,255,0.7)';
      var _progressBarSpacing = _style && _inputSpecified(_style.progressBarSpacing) ? _style.progressBarSpacing : 0;
      var _progressTraceColor = _style && _inputSpecified(_style.progressTraceColor) ? _style.progressTraceColor : '#aaa';

      /* Waveform Part */
      var _waveformType            = _style && _inputSpecified(_style.waveformType)            ? _style.waveformType            : 'bar';
      var _waveformHeight          = _style && _inputSpecified(_style.waveformHeight)          ? _style.waveformHeight          : 50;
      var _waveformBgc             = _style && _inputSpecified(_style.waveformBgc)             ? _style.waveformBgc             : '#555';
      var _waveformProgressColor   = _style && _inputSpecified(_style.waveformProgressColor)   ? _style.waveformProgressColor   : '#2187e7';
      var _waveformColor           = _style && _inputSpecified(_style.waveformColor)           ? _style.waveformColor           : '#aaa';
      var _waveformCursorColor     = _style && _inputSpecified(_style.waveformCursorColor)     ? _style.waveformCursorColor     : 'transparent';
      var _waveformCursorWidth     = _style && _inputSpecified(_style.waveformCursorWidth)     ? _style.waveformCursorWidth     : 1;
      var _waveformSpacing         = _style && _inputSpecified(_style.waveformSpacing)         ? _style.waveformSpacing         : 10;
      var _waveformVerticalSpacing = _style && _inputSpecified(_style.waveformVerticalSpacing) ? _style.waveformVerticalSpacing : 10;
      if (_waveformType === 'bar') {
        var _waveformBarWidth = _style && _inputSpecified(_style.waveformBarWidth) ? _style.waveformBarWidth : 3;  
      } else if (_waveformType === 'wave') {
        var _waveformBarWidth = null;
      }
      
    /* Control Events */
    var _play     = _inputSpecified(params.play)     && _isFunction(params.play)     ? params.play     : null ;
    var _pause    = _inputSpecified(params.pause)    && _isFunction(params.pause)    ? params.pause    : null ;
    var _stop     = _inputSpecified(params.stop)     && _isFunction(params.stop)     ? params.stop     : null ;
    var _forward  = _inputSpecified(params.forward)  && _isFunction(params.forward)  ? params.forward  : null ;
    var _backward = _inputSpecified(params.backward) && _isFunction(params.backward) ? params.backward : null ;
    // var _volumeSlide = params.volumeSlide !== undefined && _isFunction(params.volumeSlide) ? params.volumeSlide : null ;
  
    /* Lifecycle Events */
    var _ready    = _inputSpecified(params.ready)    && _isFunction(params.ready)    ? params.ready    : null ;
    var _playing  = _inputSpecified(params.playing)  && _isFunction(params.playing)  ? params.playing  : null ;
  }

  /* * * * * * * * * * * * * * * * * * * * * Inputs Fields End * * * * * * * * * * * * * * * * * * * * * * * */

  if (_showWaveform) { 
    try { WaveSurfer } catch (e) {
      console.error('[Musique Error] WaveSurfer.js is not included, please view https://cdnjs.com/libraries/wavesurfer.js');
      _showWaveform = false;
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * Parameters Start * * * * * * * * * * * * * * * * * * * * * * * * */

  /* Property (Immuteble) Params */
  var $musiqueID                 = randomString(10) + String(Date.now());
  var $musiqueRootID             = 'musique-'                    + $musiqueID;
  var $musiqueAudioID            = 'musique-audio-'              + $musiqueID;
  var $musiqueControlID          = 'musique-control-'            + $musiqueID;
  var $musiqueProgressBarID      = 'musique-progress-bar-'       + $musiqueID;
  var $musiqueProgressBarTraceID = 'musique-progress-bar-trace-' + $musiqueID;
  var $musiqueProgressBarPGID    = 'musique-progress-bar-pg-'    + $musiqueID;
  var $musiqueStopBtnID          = 'musique-stop-'     + $musiqueID; var $stopBtnImgID     = 'img-stop-btn-'     + $musiqueID; var $stopBtnSpanID     = 'span-stop-btn-'     + $musiqueID;
  var $musiquePauseBtnID         = 'musique-pause-'    + $musiqueID; var $pauseBtnImgID    = 'img-pause-btn-'    + $musiqueID; var $pauseBtnSpanID    = 'span-pause-btn-'    + $musiqueID;
  var $musiquePlayBtnID          = 'musique-play-'     + $musiqueID; var $playBtnImgID     = 'img-play-btn-'     + $musiqueID; var $playBtnSpanID     = 'span-play-btn-'     + $musiqueID;
  var $musiqueForwardBtnID       = 'musique-forward-'  + $musiqueID; var $forwardBtnImgID  = 'img-forward-btn-'  + $musiqueID; var $forwardBtnSpanID  = 'span-forward-btn-'  + $musiqueID;
  var $musiqueBackwardBtnID      = 'musique-backward-' + $musiqueID; var $backwardBtnImgID = 'img-backward-btn-' + $musiqueID; var $backwardBtnSpanID = 'span-backward-btn-' + $musiqueID;
  var $musiqueTimerID            = 'musique-timer-'    + $musiqueID;
  
  var $musiqueWaveformID          = 'musique-waveform-'           + $musiqueID;
  var $musiqueWaveformContainerID = 'musique-waveform-container-' + $musiqueID;
  var $musiqueWaveformLoadingID   = 'musique-waveform-loading-'   + $musiqueID;

  var $durationTime              = NaN; // Integer type, should be get after "ready" event
  var $stableWidth               = NaN; // Integer type, should be get after "ready" event

  /* CSS Style Params */
  $controlButtonsWidth = 300;
  $buttonHeight        = 25;
  $timerWidth          = 100;

  /* State (Mutable) Params (Should be get after "ready" event) */
  var $_currentTime = NaN; // Integer Type
  var $_remainTime  = NaN; // Integer Type
  var $_audioPlayingIntervalID = null;
  var $_waveform    = undefined;

  /* * * * * * * * * * * * * * * * * * * * * Parameters End * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * * * * * * * Base 64 Images Start  * * * * * * * * * * * * * * * * * * * * * */
  
  var $_base64_audioBackwardWhite = "data:image/png;base64,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";
  var $_base64_audioBackwardDark  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAADQCAYAAAB2pO90AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAEuxJREFUeNrsnct1G8cShts43AMZADcCUhFgbgSCN95yFIHgCARGICgCAVtvDETgYQQCMwAiuEQEulNUjT2C8ejqx0w//jpnDmWaeHRPf/1XVVf3/PL9+3cF82u//fbbpP7Rvkb19cD/m/59b/jWh/ra87/3fL3W145+/vHHHzv0vl/7BQA5BaUBo+Cf9N/Tnr9WA1nFP3cACwCFAkwDSwPMOKKv/8xQEUxVDdUr7igA6sIVm7WgGSbUvBcGalPDVOFuAyBX0BQMzSwyhbGxYwMTAwV1AkBiaEqGZogeUVvABIB03LN5ZkpjokwE0gpuHgBqwClZbaYYDiKj7N6qvpY5q1KWAHG6ec7gQG3sbc0g7QBQ+m7aor4eA/tqz2d+d+oiTfg6/d04sHYscnLvsgCoZ3Aobtjx9doCY+fS9eE1qWYhl34Wyq7KwcZeWJFWAAjgSOOCBpbKNSQW/VCwWjULv/cdgjRPWZGSBIhjnGUH4BwYlLerHij7iPqoYJhmHQCVrGuXHED1wFhwgsDX+s1W/bNiv0+kz0YtmGae+26eSr8lBVA9CGasOmNPNz6bhUTuS18wHfk+JZH+jh4gjnPohrz3EQirzFffWzC5dofJ/S1jd+uiBqi+uXNOEriaJZuV9iVK/s+6eSW7xy5VfssgvQKgblVnpdxVDxwYRNR66ScgFg77/8gQbQBQXKrzzGqzARbGE9nCoXsXnRpFAxC7ECtHsU52K+YRgRRVbBQFQOwybByoTvILewmB9FTfpwUAcuOyfXYR4+RQWhLIPaOKh6WDGIk8hVnILl2wADly2ZJac4g02UD30CZrd2CIdgBINoNRx9uUmCS36h0xSOSKfbKcCOchehDBAcTwVBbxTrQp0Qzio5WlWxdcXBQUQLw79Kul6pRw14KPaRcWE+S6vr8lAHKbLIDq5KVGlE0tQpgogwCo7lDqTNPUZ/CZGpiX2CgIiHoHyBKeKNYKYFfvf6HM1/h6h6hXgCzgObLqVBiCSUA0YohMXLpe09y9AWQBTzD+L8z5mKA1u4+GE2rRB0S9AGQBT1AZGJiXsUH396shRA9dr/sNIoLnCfCkb7xY+o6BkBjFUBt2B9MEyAKeD0gWZAURuWIFu+sSo8qVqkuIOnPhDNd5sL6D5EKl5CVdncXJg446ojSEpwA8WSvRq4USLZNQIK5t+2YID84lgNkokfek06ADeCrAA+tJiR7Z+4lPgQxnDcAD86FE73yNKZ8KtAI8sECUyFtmbuBppqCMm3QnaQl4YJ4gGhqEEv0AxMWB0ozbB2TbYEKIZkq22HrPpULhxkAsk3slq6xFRTXMdLyZ7F7+1eVk7VqBVsLGrAEPzEKJyOUvpWPUZTw0cDgbSOOeF9S2wRxARGryJIyHwlKg1oF6unbkQBAGcwERjb2t4CVTnvCDUSCp64Yt2DDXRt6MJDO34Im/X4CYZMlOwifsJIV5UKFXhkg3Mzfkid/KrLJwTPBOoD7PdUPhusG8mUHV/+/1mDROb9sq0FIAz9s5BrjFMM9KtBTGQwubrNzAgnSCQZJ1w4GHsC7jIYkr14sCST50i0oDWA/xkK49cgVNNwDxgXi6J+4flXyxCwazhWgjdOWWnQDE/qIkhw7XDRaDK3dvsnfIRIEkiQO4brC+XTnJZL/wChCnrXVP1TkKvzwM5gOilfpxfrqOjTk88aZAkjdf4uFWsEBMMpHPJWltbYCE6nNQHZ2KAoNpqBAt9n/R/POhBDiJAknUZ4HEASwwWwgSCtoqpAWQUH1e8DRsWKAJBV2vSFuFBgJ6ffibMFiXthSoUOkEIJYyXfV5RqU1LHAV0hWDsc66kI4Cec2jw2AdQ0QqdHA1nu9cSRnUx8z4YAxS+V0KiZdI2kMxus6zWUmFimvj+u5GZxA8ujVvSFvLBtqc1X3c+t2afhcjSJG1Z8nfVaeihhi4CNDVDXV1B9ALdXabHupOmgAL7RmaZsBLp7ZG9QjLWNsjfEL4fy4VBQyufMBE6W/VRuyjf9O+qetHHt+rSDKZrDpVpO1ZCf52ZpJE0G00pQVRMHpjlq6vnWDGmwXengl7J58FblBoyQRSlLXmn89NANK9iStUHdycpW+pzrlZO+T27JTsIJlxoM3RVaExu6p6SQTenYfkgeUszTdomkh7RuxpTFO5R5Rdq9t10Bzr5TklGlhK7gsqrp3N0iG3h7yRfUrwGAhAqa1AAvcN6pO+6lB73id821ZK7xisIU0kpxtEBxfcN90dp0ge/DxLp6g6KcPTlPfonp1Q6CiQrvpskTxIb5bm9izq62NGt3Gjef9mp3HQwAKgDeBJa5Zm72OXGTySsfyvbNzdGR9+DICgOjkZeVJ1H2wFKrS7pEBw3/Rn6VTgechUdUwFobjmwhWab1LlqDr8jM2/VLgLg9I2kep8S6U9lqY7pqft7d6mAG0yg8dFbEAlT78q/SOWvKqOsLToUns+hNAeR24cxbK6zxcq/gUQS7lO+vqQ0+KpI9Uh/3oSwiGTmgWtt4ygeUjw7ItKCtAd3LerscHKcqC9nQseCDgT9hxs27OweZ5OBHGQjpfxcM6FA0B+ZukQ4GlKi1y0J9nqE8GO6uk5BXrIHSCHqhPELO2wtOiJH+Sbgz3r9Fez1XvA/zHS9PGTjX8Mtx0EO0s7KmiloPpdRvAo1Vrj0XHj7oTqs0sQHFez9O+BgONqkfcpM3DaHtZHKUBFjgDxLE2DZGjxNi+cKNgF0J4Zw2PTHtofMwuhPSkqUJUIOEnFBg5V54vK/FxzClHq/jxqTEL3bYAmuSiQo1k6RdUpca7fT+NcJ5HwcNem6YYdY56ZUpulHRaAZq86pgDVNrpjdyZp9UltlubSImqPTXVEMIu8Adpe8++Ku5TdN6jORdsqPPzZxVgfSQB6jQyepGZpXuTdQHWCUqCHgQCgKhJwRgkXgNq05zmU9oRukmIBUqBRKg1PVHWoPSgA7d50zoubkgIlUYWAbQcXVecB8Phz4+503y3UgDPhWfpTYu1J0gYxu3CYpc9a8zgRwGNnWjH/nebgew4MHMQG5y3XAtDe7C62L8wFoJ8t3yaYUhyHqlNmXAAKgDTAmShsDjtnX+r2zDGUA08i9AxPqX4cZJ9EAagjQwFoRAC99gjPxAE8yamOQgFoVC5cn7P2wgKe1GZpqE5gNojgO04sZumHhAbbNrH2AKCA7e3Bxwm5ONQePIsWABmZyaAhl+8vKu9pn2McsVF7/qzbskqkPdkBNOnxO9osdNK+md2lJyxHaI/cngJDFwBpGfv8HyzegopLv3HZTwo2Tkxd4cJ1ANFK/XiywdHibT7REwkSUqOPUCOvNkoGIIZow0poU5d3n6oaYbw7t4ekAGKIXuuLZtzfoUY/q1Fi7YnKhTsEnkQ4B9KSZwhbNaq4ODUFS01dowFor+kqhKZGewdqROnhz/WgqwTHe4Vun6BGTmyiC1DUxmpEIL1YvM2UA/KQ1MhFrIcq7Q4A0lEgFfKMRhXW9UXf78nibdpqNAqgTS5ivdTUNVoXjiz4NQeuuH7nQI32fJppCrFeiOoag+nsOzsQQLqlMlH41A7ViEpnNn2rUSvWc6WuUCN3tieAtI8xjSw2IjX6r9LLMl6y9wGpkSt13YXQnpBNsDi9lyhQEVtHcBkQqdEXB2q0CkCNklLXgG2kDZBgi3OUnc2Lr3MHahRMIacjNQpGXQM07cNGmzS2zsC6j7lHWmq0tnibYAo5eeIrHKkr1MgMoNcGoL1j3zBkNSqVfWFqEIWcDtW1UaMC7OgD9Pdj7pX+kxcmKfROqzB160KNEor1st8mwW3Xqbx5m7BECqQiSWULZu+ZCzUKoXTmRI2iV9cY4p82QLqJhOQ6NbVtEqxGztQ1QzUqxAAJMnH3KfZYatskXKqr+lGxnlNhqm5bq7YCKd0ZOGVpd7hNIohCTkexXm7bJOQKJEwkJO0bO9omQRZE6UxLjT4obEK8JQ4PSu8Qz0NzxNjglKjcATpRI2prEtsk+FwJV+qaqhrpju2/xcZEgaa5BJYetkn0rUZ7h7FeioWp5gCxJL04/qBUQKIZ10khpwpgLc3lNgmV0NKG+rGgbKxAEhXKrn7KoRqNA2mPq20SwxTur6AmkOKf/SWANgBIS41sS2dSU9cUTHdM/8TI4KQzK03feJhzFa+j0pnU1DUXgKqLAMGNEw06V4WcUKMw3LehZh9tbgEEN85MjdaJtMfFNolU1edfC9I2AA2xGesnNSqVfekM1DWi+OcsQJzO3jr+4FxAclE6g1gvUPdNCyChCj1iJ+PZ2dtFIWdoapREe85Yqeu+nXtC4DWAjo6/QK5q9JxYe7ap3COupNBdPD0rKoNLs45AhXBg3/XZmwJyaenMNuD2mKhrqFk93cn/yLWEegCxrTTffIy99DcHnrR0ZhN4e6RqtAq0KXPb+zG4EUDqZmAWwOTmoNMt5DyGDtCJGkXZnnrSLwXJg6UYIOHMMcWRsSI1Ki6oEU1YRUyPs7+hrk179gF+dd1J/+Xaju1fvn//fo1SyrD9T/OD1rwWAtOfBWngNUsBu9NVbrTH2/ekCewvzT//cCn+uQkQfxi9+FHzw/4T6GwDg7XHNIUnOk9fIPdzcs0j0HnAluTcM8RCsNDhKTTheRv7t9zpmwCx/6ebPXpELAQL3CST/M0cwMDDh0KFYCmoz1onHNECiFPauothj3jALSxQWwn+VksIJA8ZXnr6WxisC/Uplf52+rVuMkwbIE7l6arQFNUJsIDgGSlPyTDpY+4ldW8r3DpYQIkD3aqDtWQpRgQQx0K6GblxRsfBwsJVH4rHP/pQHxMFkn7AJ6S1YT2bxHX7Ii0EEAPEKiQpt4crB+tLfSjk0E1bH5XBEszA8LvNlf5+kGkIZ0PDsoNnIgRiYVLEawQQy5woqwFXDtaxrQSJgxeuKledANTyLXX3Cw3hysECdd0aj0p1ChDLXSl4yRRZOVgH8FDW7bPgJWuO67sFyDCh8AkLrDCP8IyEns5RWZ7pMXDwvUslO2Big6OwYJ6MwgrJc3xL292/1gAZuHIUD21wr2GO1YfG4KPgJVsXO2ZdKFBzSovElaN4CAWnMJdxz1eh61a6+OyBw3bQF5Kco/yRZw0YzAaeidJ/okhjM1cHtzgDyMCVI/uKvUMwy6TBRsmekvfFJuvmU4GarJz0IU0VIIIZ2kaYNHjhc75VkAAxRAslOw/6bZEVmTmYUH1WSrZYSnGP86eJDDy1byaMh+5ZiQARTBeeR+HLSh9HrnkBiOOhmZKtDwEimA48cwN4nnwd8njzYEXLxlJS4avwZbRtPKrjbWGdwWMynryemDvw2WA+R0GaVIASwVxOxl630nhVIEufFUoEa7ttn4Uvu3ksbzQAcSfslCzlCIhgppPvkcfNzvf3G3TYF4WSP6mscecmGEqAJzR4OlUg7hCKayoDJeq0U2C9g9NUGEwNXn71cSQxK1CT3i6U/GnPQ1aiGYZX8vBMeJINHp7OAXIA0Z/Y1Zo0PFTSZRIr9wJP5y7cmc6qlKwQsDHaOlEiuZAUPKWSp6l7hadXgFpyLS0IbOyFIUJcFH+8szRIFvQOTy8u3Ik7t1dm2Tml/snQ4cy5uF22yhCeY9/w9K5AJ7NQZahEcOnihMdkcbQNTxBZ2SAAciTlR4YI5y2EDQ657aQa09jhCQqgVgevLCCCGoWvOgtlljhq4t6gKlOCA4g7ulTmGZlmlpr37R/Dfop1lhaqQ7bmexrUxBgkQCcB5tDibZ6505Gp688tJ8X5aPlWT7zTOTgLFiBHyYXGvijD0/dhVl7E0nICDD6uDRqg1s1YOpjFjnxDlwDJ670qOEkwtnwrindmPrZhZwcQ35iZkj2y4hpIC9PHWcCugrOwjHP+9hhcn56TPUB8kybKLgXatgO/FxQpHHCOrDpVLO2PCqDWTbNNh55z7VahuwsBxjgLB65aY1EuP0QJkAc1amzNIFVA5GKfEzhzR5NXFImCJAHypEZt965RpVeA8xZ/EjjvHb91kGs7WQHEN9i2DOiWa0Gz4yYnmBia5ho6fvsXBid6pU8CoJOAVvqQJROYqhTjJc/QNO5aUhnQpADyGOBemkUrVqYq0n6iao+Cr/eePy7JxewkAWoNkIXjgPeaUdnQjqHahaZQ7OY2wDQ/u+iXNYOzT3GMJQ1Qa+DMOwSp7a7s+No3P7sYSOzKNsA017jjrk8anGwAOgNS2cNgOrUDQ6XUz09X27d+f8kaMBqb8EU2DaCrswAnO4B6iJFysmwXo7ME6MTVIZgewYCRvTA4m1zXy7IGqAUSuUAzdvGgSrfVhlL5S+yzAkDnYHpgkHythcRqW1aaFboCAOnC1CwqFpkqU5ZVGADInzI1ME0TbeZB/VNpgdONAJA3mEbqnxX8h4iBImCq5sJ2DgDUJ1QNTM11HyAszcIuAbODWwaAYnD7GrVqL4BOPUKyb10Eyyv2N/mz/wswACzoOT1dOdapAAAAAElFTkSuQmCC";
  var $_base64_audioForwardWhite  = "data:image/png;base64,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";
  var $_base64_audioForwardDark   = "data:image/png;base64,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";
  var $_base64_audioPauseWhite    = "data:image/png;base64,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";
  var $_base64_audioPauseDark     = "data:image/png;base64,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";
  var $_base64_audioPlayWhite     = "data:image/png;base64,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";
  var $_base64_audioPlayDark      = "data:image/png;base64,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";
  var $_base64_audioStopWhite     = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAADQCAYAAAB2pO90AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADthJREFUeNrsnbFv20gWh1+ELa44wDpgiwBbWOnSSakOW4XbbWfnL7C2u6uiAAccrorTbRe5ynWRu+ssV1tG7pJqpWrThaouW53dpfPxxY9rxpGtecMZcjjz+4BBgoSiZXI+vjdvhuS9y8tLAk4ZFK1ftPvS+O/fFe1b+T+Sf+tv+LuWc2k3/57Ln++L9nvRPko7r/wfcMA9CFRblqxoI2mPO/K9V0VbFG0pf0IqCNQIHCn2RRpuu5H8XmsRidu8EskABKrNSGQZF22YyO+8EpHmEqUABFJLM5Zos5v4sViLSDPIBIG2jWf2E4s0NjJNRSiMmyDQZ0pp9tAdVJxKVJpDoDSLARMRZxcu1I5KM4lM5xAofnGmEnV20Pedc1y0w5TSu5QE4jHOiRQI2rpS55V2fmNQvlDuL6v8fSQXh0GltRlZ/160f0OgeMThq+JBgz/zgq4nKfnPt3S1EqBpskprWqozSZOXEAjibKOc2S+FyQM+JqOKVE1UG6NO62IUqC8n7KnndGxekea8w8eqlMn3nNeRnJdzCBQuEzlJPgoEHGVmlSgTI75XXVzI+ZlCoLDI5KS4PukpTxwOJCpNPESmlex3AYHiS9cuRJgpYelKNTJNyH35/1j2ew6BmmdfUipXJ3RViTZYjXz7BauMSq6i/YWkjHMI1NxJZHFcLb05FXEW8EOdNk8cn4dx1y5eXRMokyuVi6iT3Ky5x7ESH0cX0wUXEuEWEMg9U0djHYgTvkhHEt0gkKMTM3eUcyezxKTl8+ViydRKolEOgdovFJzJ1RHjnOYk4vNW9xkRwRcYQhaIO/xzBydgIicTNM9YzmPdeaQXsh8IZEB5y0HdXDrKpSMdxNVcXZBVutAE6kuaVWe8s5IDjUnQsBhJJlD33AY1LgpJoJHIU2e8E2yoB85Sc07Ls1AukKEIlFG9+R1EnbSiUTDzRSEIxB3/NcY6GBtZ8BO1XCBqW6A68nR6DRX4g7pTFa1K1JZA/ND1V3LwtHCadiwHDVEnnmjEF8MDspuAncv4d5mKQCeW8jyjiG7GAhvhebuXlp991LREbQhkk7ZhQhRpnWkkehKzQLbyZIQKW2rYTms0OiZqUiCW4I3yM2u5GkGedCViGbTl7ifUUHGpKYFsriYrkQ6FAhQYFkqJGstamhCID0AOeUALEo3I87If3wLZ/OKQB3SmL/kWiPPQPcgDWpTolOymTFoX6JB0iwYhD/AlkbdFxr4EYuNPFNuvJV+FPMCXRF4qcz4EGtBV9cO0aIB5HmCDtrLrpajgQ6Cl4soAeUCTEq3I8fuheo5/Ie3zqSeQB9S8WI8V2w/J8VpKlxGII4lmpQEWhgJXaBeg/kCObsZzJZB2spSvHI9w3oFDZmT+IJoLGavXLlr1HH55zUqDY5xv4CEKmb5Gc4ccLTh1EYG0JWtn9gNwg5+L9k/F9rVL23UFslnn1thKWZAcD4v2W5MX87op3KFSniPIAzzyXvqYKdx3axWy6kSgjHRVNyzVAU2hmYtkrKtydQTSfsnG71cHycKTpb8qtl9LKtdYCqd9xd8LyAMajkAvFNvvkuViU5sIpC0cOF8+AYCHLMmqoGATgbSFgzHOI2gJTd+zKihoIxAb+kGxfWde1QeihS/4mvvSHpBixbZWoBm1sFwCgBr0JZUzfcnXsSZyaQTSRp/WH/wNgKBdLWNc1tYIpIk+/E7SDOcNBAQL8dh1/zUVSBt9nC0XB8ARLMQb133YRKC+/GDTUnTIr5L/c9H+UbS/0tW6KeAOXkbzTs79x0C/I49tXit+n++3jeFNBNKkbqoBWAscUv03f4O74eIRv77mU6Dfz2l/3iaQdtJUVQJsgV+K9iP6uHf4yv020O+mHY785a4otG0idaKQ5zhweQhpG46z9FHNDZ2TOhGIf5hp/fxBBwT6QJaLBoGK0KcwNFHozoWmd0WgfYU8px2QBwCbKLR71ziot6ViYQqergO6hiZC7msF4pBl+lB4Xm29wPkAHWMhfdeEvdvSuJ7WOEQfEBGavjvWFBFM76Po2oJRkyLCM8LNf7fBk+kmDzDs0jpI7rsmleaNxYRvbjlIpjchzSm+1dZLpKTJjYWeGhYTRjcvrj0UDwAEsk/jejXGP2ukOiCSjMO0mLC/TaARmc/9IPqA1KJQmcbdKlCm+KF4QCKIBU1f3r9LINPxD4e8HMcdREJum8ZVBeKV16bVtxmOOUg0jWNHBpsE0kyeLnC8QcJpXLZJINPxD6pvINY0bt2EQCgegNSj0FcCcU5nWr5G+gZixbRv75bjoJ4y+kAggAhUcaYUyPSJO1zqw5NGQcyc2QhkGoEQfQDSuErQKQUaQiAAPmNaYR6WAg087ByA2CPQ58yNBeobbsw3z+U4viByeIxvOh80YoHuI/oAYNXXBxqBMP4BEGhDBOo73ikASQn0neHGb3FcQSKY9vUdFuhbgw15UPURxxUkAvd1o/uDTMvYOY4pSIxzU4EIAgFgNw4yLSJAIIAIVEMgLCAFqZGbCuQsnAGQokB9HCsA7IBAANQcA5mwwPEEibF0KRAAAAIBAIEAgEAAQCAAIBAAAAIBAIEAgEAAQCAAAAQCIAiBMhwqkBgjU4FwsxwAX9OHQAAEksKNcKhAYgxcRiDcdAcgUA2BBjieAGMg+xQOAoHUMK7C5RAIAPsI9Mlgu10cT5AYQ1OBcsMdZjimIBFM+/onFuh3CASAVV9/xwJ9hEAAfIHpvOdSI9AAxxVAoC/INUt5diERSIA+mRfNlpoigsZMAGIf/zCLciJ15WHnAMScvn12phRoAYEAUPXxZVUg0/f/DAkLS0HcPDZN32wiEKIQiJl9zfinKlBOV6+yh0AA6dt21uLMF6uxFx4sBSDGCPSHKzYCcY0c5WwQGwMyn//ZKNAc4yCA6GMvEK9IMJ0PGuN4g8gw7dMrqiw+uHlHqmkUGhKW9YC40reh4bZfDHVsBUIxAaSavs3uEognVE3L2RMcd5BY+ramG4sONj1UxDQKoRoHYmCkSN++cqO3LUQhCgFEn9vd+GbDRmUaZ1IT59yR18bF9HhgRNW0jo11+nabQMy0aC8NdrojEs0iOqAv4UlS0WfHNvrclsJpxkFI40CX0fRdlUB50U4Nd8wDsAznAnSMTFE8OKNb7tzuaY1DFAIoHlxz7/Ly8q4P5mS+wO4B6Z6v0AYfCCsomuCnwMfFA+kLJlzQHTeR9mzN28Ah+g3oCJq+Or3rP7dFIDbvf4ofFnoU+qVoP6L/eOf7or2NIPps7dPbIhDP7xxHFIXeoW97h1OeZcDfT9NHj7cFhG0RyLmxLXO/aO/JvPYP9PJkAQvkvC+bCMT8rWivDH8oH7wnAUv0J7qaUX+I/u6U93LuPwX6/e5LCm+6muKFSbQyFYhZkPkjf84Ic0MgLLz0X41AbO6vii8ceikTpAMvNztRbP8DGT4jRCMQiRAHhtuuRbpznD/QIn1JLU3nM09JcYOdViDtIOyIsEoBtAuPY567LBzUEYjhiaWniu0fUdhlTRAv2mEHl63Hmh9gI1BfDDUtBa8I99iAduALt+mC0QvJsFRDjp7Flzon3WTUkLDMB7STug0V209txus2EcjGbqRyIOTUbU2Wi4zrCJQV7Y1i+5V8BlU5EFLqxhiXrV2kcCUL0q2TQyoHmmCqlOfUVp66EcimoMDwMp85zjPwAC/P+k2xvVXhwFUEKgsKY+VnZoS33AE/jC22rzWkqBuBSjii7Cm2f0ZbblQCwIL/0tWiUdPUrfbjqV0JpE3leJD3COcbOIQzG9NlZrVTN1cpXDWV09jMZUYs8QEuU7cD5fZOqsGuIlCJdpkPCgqgLtqV1k7XZ7oWqEzPNMsnMsIEK7CDM5kF6ZaVZeRwLtKHQAMRYgcSAY8E0c98CGQTVrFKAWjoS+TRTJh6GS74Eog5JN19GJAI+JLH231pPgUi0s8PQSLgWh4n8z1tCWTzC0Mi0Jm+5Fsgm8EeJAIu5OGiAVfpcp9frAmBiPTlRkgE6sqTUQOV3aYEItLfP1RKNCaUuFNlIOPoofJzjU3QNykQiQyvlZ/BPFGa2GQtTKPPI2xaoDoSjQnLflKhfO+uVp65RB+KWSDmhOxKi7gNIn5sLrAljT93oy2BtA99qMK3kU9QXIgSjjoHlp9t5VHSbQlUSvTcMhJ9FJH4gL1Hv+s0D+n6doT7Fp/ntO1FW2PkNgVyEbIZPD64u2hvfwki6oQmUJ1BYwnK3d1iJOd7aPn5YIpKoQhUHtQF1Xt7nNFLkUCrHJJukfEmebJQLpYhCcQMyG7iDNEo/qhTnlvOVvJQfqnQBGL6cqD3au7nSK52qNa1fz4nNaMOc0oOn2UQs0CuQj2zlpOHCdj2xrZcKNituZ9gC0UhC+SiuFByJkIu0KcbgcvR/yHzd5IGXyzoqkCuxkUleG9rM+frhOq/E6oTY9leB05ILifjyMG+XotAA/RzL+Lwsf3gQB4+1xl1oBDUhQhUJZNotONgX8eS1uXo+7XF4eN44GBfnVs03DWBGFdVuqpIM4yPrC5mY0fiMEFW2WIUyHWBoZpzTzFG2spY2mNH++v0rSpdFqiMRlOHV8HyhM6kYTL2ilFFnB2H++1k1IlJoGo6wR1+1/F+V7LfeYJjpYFEee7gQ8f7Xst+O582xyJQCQ9mJ46vkinJ5FOaMrpPKaL1irEJ5Cut23QFncsVdEHdXi60LxF830MErxLljZAxClS9mh56FqnkTERaBi5UX2QZyZ+PG/iZpyJOlFE7ZoGq46PDhjpLNUItK+0tXd1F28bvXgoz8hxhNl1UDiny6YEUBKp2pld0dQtxG6wkMi3lz7xyVS7/XcOIrl/WPJDWr/z7sMVj/a+i/ZxCp0pJoKbGRymT3OqO1ASqisR5+bjhtCZGysrajBJcFpWqQFVYIq5A7cEF9RhnRomv3IBA1wzoerYdUWkz64o0OQ4HBLprgF5Gpl1I83nOi6XB0iYIZCXTvrRhIr8zVwwXkAYC+UjzskqLJTqt6XpVxQLpGQRqQ6hRhyLUiq5XTUAYCBQUpUwDul4BsNPSd/lUtHciS16RBjji/wIMADP2rLJltcOaAAAAAElFTkSuQmCC";
  var $_base64_audioStopDark      = "data:image/png;base64,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";
  var $_base64_audioVolumeWhite   = "data:image/png;base64,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";
  var $_base64_audioVolumeDark    = "data:image/png;base64,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";

  /* * * * * * * * * * * * * * * * * * * * * Base 64 Images  Ends  * * * * * * * * * * * * * * * * * * * * * */  

  /* * * * * * * * * * * * * * * Musique procedural private functions start * * * * * * * * * * * * * * * */
  // var _createNode = function(element, obj) {
  //   var node = document.createElement(element);
  //   if (obj.class) node.className = obj.class;
  //   if (obj.id)    node.id        = obj.id;
  //   if (obj.text)  node.innerHTML = obj.text;
  //   return node;
  // }
  
  var _waveformAvailable = function() { return _showWaveform && $_waveform; }

  var _appendNode = function(parentElement, element, obj) {
    var node = document.createElement(element);
    if (obj.class) node.className = obj.class;
    if (obj.id)    node.id        = obj.id;
    if (obj.text)  node.innerHTML = obj.text;
    if (obj.style && obj.style instanceof Object) {
      for (var key in obj.style) {
        if (obj.style.hasOwnProperty(key)) {
          node.style[key] = obj.style[key];
          // console.log(key);
          // console.log(obj.style[key]);
        }
      }
    }
    
    var attr = obj.attr, event = obj.event;

    if (obj.child) {
      if (obj.child instanceof Array && obj.child.length != 0) {
        for (var i = 0; i < obj.child.length ; i++) {
          if (!obj.child[i].element) { continue; }
          _appendNode(node, obj.child[i].element, obj.child[i])
        }
      } else if (obj.child instanceof Object && obj.child.element) {
        _appendNode(node, obj.child.element, obj.child);
      }
    }

    /* Event Constructor */
    event && _isFunction(event.click)    ? node.addEventListener('click',     event.click,    false) : undefined;
    event && _isFunction(event.hoverIn)  ? node.addEventListener('mouseover', event.hoverIn,  false) : undefined;
    event && _isFunction(event.hoverOut) ? node.addEventListener('mouseout',  event.hoverOut, false) : undefined;

    switch(element.toLowerCase()) {
      case 'div':
        break;
      case 'span':
        break;
      case 'a':
        node.href   = attr && _inputSpecified(attr.href)   ? attr.href   : '#';
        node.target = attr && _inputSpecified(attr.target) ? attr.target : '_self';
        break;
      case 'img':
        node.src = attr && _inputSpecified(attr.src) ? attr.src : 'no source specified';
        node.alt = attr && _inputSpecified(attr.alt) ? attr.alt : 'no alt specified';
        break;
      case 'button':
        node.disable = attr && _inputSpecified(attr.disable) ? attr.disable : true;
        break;
      case 'audio':
        node.controls = attr && _inputSpecified(attr.controls) ? attr.controls : false;
        node.id       = $musiqueAudioID;
        if (attr && attr.src) {
          var fileExt = attr.src.split('.').pop().toLowerCase();
          var mimeType = undefined;
          switch (fileExt) {
            case 'mp3': mimeType = 'audio/mpeg'; break;
            case 'ogg': mimeType = 'audio/ogg' ; break;
            case 'wav': mimeType = 'audio/wav' ; break;
          }
          _appendNode(node, 'source', { attr: { src: attr.src, type: mimeType } });
        }
        event && _isFunction(event.ready)   ? node.addEventListener('canplay', event.ready,   false) : undefined;
        event && _isFunction(event.playing) ? node.addEventListener('playing', event.playing, false) : undefined;
        break;
      case 'source':
        node.src  = attr && _inputSpecified(attr.src)  ? attr.src  : 'no source specified';
        node.type = attr && _inputSpecified(attr.type) ? attr.type : 'no mime type specified';
        break;
    }
    parentElement.appendChild(node);
  }
  
  var _playAudio = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    if (audioElement && !_isPlaying(audioTagID)) {
      /* Default "play" Actions Here */
      audioElement.play();
      if (_showWaveform && $_waveform && !$_waveform.isPlaying()) { $_waveform.play(); }
      return true;
    } else return false;
  }
  
  var _pauseAudio = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    if (audioElement && _isPlaying(audioTagID)) {
      /* Default "pause" Actions Here */
      audioElement.pause();
      if (_showWaveform && $_waveform && $_waveform.isPlaying()) { $_waveform.pause(); }
      _unsetAudioPlayingInterval();
      return true;
    } else return false;
  }
  
  var _stopAudio = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    if (audioElement) {
      /* Default "stop" Actions Here */
      _pauseAudio(audioTagID);
      if (_showWaveform && $_waveform) {
        if ($_waveform.isPlaying()) { $_waveform.pause(); }
        $_waveform.seekTo(0);
      }
      _setCurrentTime(0, audioTagID);
      $_currentTime = 0;
      $_remainTime  = $durationTime;
      if (_showTimer) { _setTimerText(); }
      if (_showProgressBar) { _setProgressBarWidth(0); }
      _unsetAudioPlayingInterval();
      return true;
    } else return false;
  }

  var _forwardAudio = function(skipLength, audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    if (!skipLength) { skipLength = _skipLength; }

    if (audioElement) {
      /* Default "forward" Actions Here */
      var currentTime = _getCurrentTime(audioTagID);
      var duration    = _getDurationTime(audioTagID);
      var nextTime    = currentTime + skipLength;
      if (nextTime < duration) {
        _setCurrentTime(nextTime, audioTagID);
        if (_waveformAvailable()) { $_waveform.seekTo(nextTime / duration); }
      } else if (nextTime >= duration) {
        if (_isPlaying(audioTagID)) { _pauseAudio(audioTagID); }
        _setCurrentTime(0, audioTagID);
        if (_waveformAvailable()) {
          if ($_waveform.isPlaying()) { $_waveform.pause(); }
          $_waveform.seekTo(0);
        }
      }
      $_currentTime = _integer(_getCurrentTime());
      $_remainTime  = $durationTime - $_currentTime;
      if (_showTimer) { _setTimerText(); }
      if (_showProgressBar) { _setProgressBarWidth(); }
      return true;
    } else return false;
  }

  var _backwardAudio = function(skipLength, audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    if (!skipLength) { skipLength = _skipLength; }

    if (audioElement) {
      /* Default "backward" Actions Here */
      var currentTime = _getCurrentTime(audioTagID);
      var duration    = _getDurationTime(audioTagID);
      var nextTime    = currentTime - skipLength;
      if (nextTime > 0) {
        _setCurrentTime(nextTime, audioTagID);
        if (_waveformAvailable()) {
          $_waveform.seekTo(nextTime / duration);
        }
      } else if (nextTime <= 0) {
        if (_isPlaying(audioTagID)) { _pauseAudio(audioTagID); }
        _setCurrentTime(0, audioTagID);
        if (_waveformAvailable()) {
          if ($_waveform.isPlaying()) {$_waveform.pause(); }
          $_waveform.seekTo(0);
        }
      }
      $_currentTime = _integer(_getCurrentTime());
      $_remainTime  = $durationTime - $_currentTime;
      if (_showTimer) { _setTimerText(); }
      if (_showProgressBar) { _setProgressBarWidth(); }
      return true;
    } else return false;
  }

  var _skipAudioTo = function(sec, audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    
    if (audioElement || !sec || sec < 0 || sec > $durationTime) {
      /* Default "skipAudioTo" Actions Here */
      _setCurrentTime(sec, audioTagID);
      $_currentTime = _integer(_getCurrentTime());
      $_remainTime  = $durationTime - $_currentTime;
      if (_showTimer) { _setTimerText(); }
      if (_showProgressBar) { _setProgressBarWidth(); }
      return true;
    } else return false;
  }

  var _isPlaying = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    if (audioElement) {
      return !audioElement.paused;
    } else return false;
  }

  var _getDurationTime = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    if (audioElement) {
      return audioElement.duration;
    } else return NaN;
  }

  var _getCurrentTime = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    if (audioElement) {
      return audioElement.currentTime;
    } else return NaN;
  }

  var _getTimerText = function() {
    var durationTime = $durationTime;
    var currentTime  = $_currentTime;
    var remainTime   = $_remainTime;
    var durationMin  = String(_integer($durationTime / 60));
    var currentMin   = String(_integer($_currentTime / 60));
    var remainMin    = String(_integer($_remainTime  / 60));
    var currentSec   = String($_currentTime % 60);
    var durationSec  = String($durationTime % 60);
    var remainSec    = String($_remainTime  % 60);

    durationMin = durationMin.length == 2 ? durationMin : ("0" + durationMin) ;
    durationSec = durationSec.length == 2 ? durationSec : ("0" + durationSec) ;
    currentMin  = currentMin.length  == 2 ? currentMin  : ("0" + currentMin)  ;
    currentSec  = currentSec.length  == 2 ? currentSec  : ("0" + currentSec)  ;
    remainMin   = remainMin.length   == 2 ? remainMin   : ("0" + remainMin)   ;
    remainSec   = remainSec.length   == 2 ? remainSec   : ("0" + remainSec)   ;
    return " " + currentMin + " : " + currentSec + " | " + durationMin + " : " + durationSec + " ";
  }

  var _getVolume = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    if (audioElement) {
      return audioElement.volume * 100;
    } else return NaN;
  }

  var _setCurrentTime = function(sec, audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    if (audioElement) {
      audioElement.currentTime = sec;
      // $_currentTime = _integer(sec);
      // $_remainTime  = $durationTime - $_currentTime;
      return true;
    } else return false;
  }

  var _setVolume = function(percentage, audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    if (audioElement) {
      audioElement.volume = percentage / 100;
      return true;
    } else return false;
  }

  var _setTimerText = function() {
    var timerText    = _getTimerText();
    var timerElement = _getElement($musiqueTimerID);
    timerElement.innerHTML = timerText;
  }

  var _setProgressBarWidth = function(r) {
    var progressBarPGElement = _getElement($musiqueProgressBarPGID);
    var progressBarTraceElement = _getElement($musiqueProgressBarTraceID);
    var ratio = _inputSpecified(r) ? r : ($_currentTime / $durationTime * progressBarTraceElement.offsetWidth) ;
    progressBarPGElement.style['width'] = String(ratio) + 'px';
  }

  var _setWaveform = function(waveformTagID) {
    var ID = waveformTagID ? waveformTagID : $musiqueWaveformID;
    var waveSurfer = WaveSurfer.create({
      container:     '#' + ID,
      barWidth:      _waveformBarWidth ? _waveformBarWidth : undefined,
      height:        _waveformHeight,
      progressColor: _waveformProgressColor,
      waveColor:     _waveformColor,
      cursorColor:   _waveformCursorColor,
      cursorWidth:   _waveformCursorWidth,
      skipLength:    _skipLength
    });
    waveSurfer.load(_sourceURL);
    waveSurfer.on('ready', function() {
      var loadingElement  = _getElement($musiqueWaveformLoadingID);
      var waveformElement = _getElement($musiqueWaveformID);
      waveSurfer.zoom(20);
      waveSurfer.setVolume(0);
      waveSurfer.on('seek', function(progress) {
        var duration = _getDurationTime();
        var seconds  = progress * duration;
        _skipAudioTo(seconds);
      });
      loadingElement.style['display']  = 'none';
      waveformElement.style['display'] = 'block';
      $_waveform = waveSurfer;

      if (_autoPlay) { _playAudio(); }
    });
  }

  var _setAudioPlayingInterval = function() {
    $_audioPlayingIntervalID = setInterval(function() {
      $_currentTime = _integer(_getCurrentTime());
      $_remainTime  = $durationTime - $_currentTime;
      if (_showTimer)           { _setTimerText(); }
      if (_showProgressBar) { _setProgressBarWidth(); }
    }, 100);
  }

  var _unsetAudioPlayingInterval = function() {
    clearInterval($_audioPlayingIntervalID);
    $_audioPlayingIntervalID = null;
  }

  var _toggleMute = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    if (audioElement) {
      audioElement.muted = !audioElement.muted;
      return true;
    } else return false;
  }

  var _audioReady = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    if (audioElement) {
      $durationTime = _integer(_getDurationTime());
      $_currentTime = 0;
      $_remainTime  = $durationTime;
      if (_showTimer) { _setTimerText(); }
      if (_autoPlay && !_isPlaying() && !_showWaveform) { _playAudio(); }   
      return true;
    } else return false;
  }
  
  var _audioPlaying = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    if (audioElement) {
      /* Default "playing" Actions Here */
      _setAudioPlayingInterval();
      return true;
    } else return false;
  }

  /* * * * * * * * * * * * * * * Musique procedural private functions end   * * * * * * * * * * * * * * * */


  /* * * * * * * * * * * * * * * * Musique event private functions start * * * * * * * * * * * * * * * * */
  var __playAudio__ = function(event) {
    if (_play && _isFunction(_play))         { _play(event);     }
    if (!event.defaultPrevented)             { _playAudio();     }
  };

  var __pauseAudio__ = function(event) {
    if (_pause && _isFunction(_pause))       { _pause(event);    }
    if (!event.defaultPrevented)             { _pauseAudio();    }
  };

  var __stopAudio__ = function(event) {
    if (_stop && _isFunction(_stop))         { _stop(event);     }
    if (!event.defaultPrevented)             { _stopAudio();     }
  };

  var __forwardAudio__ = function(event) {
    if (_forward && _isFunction(_forward))   { _forward(event);  } 
    if (!event.defaultPrevented)             { _forwardAudio();  }
  };

  var __backwardAudio__ = function(event) {
    if (_backward && _isFunction(_backward)) { _backward(event); }
    if (!event.defaultPrevented)             { _backwardAudio(); }
  };

  var __audioReady__ = function(event) {
    if (_ready && _isFunction(_ready))       { _ready(event);    }
    if (!event.defaultPrevented)             { _audioReady();    }
  };

  var __audioPlaying__ = function(event) {
    if (_playing && _isFunction(_playing))   { _playing(event);  }
    if (!event.defaultPrevented)             { _audioPlaying();  }
  };

  var __progressBarSkippable__ = function(event) {
    var elementWidth = _getWidth(_getElement($musiqueProgressBarTraceID));
    var xCoord = _getClickedPosition(event).x;
    var seconds = (xCoord / elementWidth * $durationTime);
    if (_waveformAvailable()) {
      $_waveform.seekTo(xCoord / elementWidth);
    }
    _skipAudioTo(seconds);
  };

  /* * * * * * * * * * * * * * * * Musique event private functions end   * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * * Musique object member functions start * * * * * * * * * * * * * * * * */

  /*
   *   Audio Player Action
   */
  this.playAudio = _playAudio;

  /*
   *   Audio Player Action
   */
  this.pauseAudio = _pauseAudio;

  /*
   *   Audio Player Action
   */
  this.stopAudio = _stopAudio;

  /*
   *   Audio Player Action
   */
  this.forwardAudio = _forwardAudio;

  /*
   *   Audio Player Action
   */
  this.backwardAudio = _backwardAudio;


  /*
   *   Returns a boolean type value which specify whether user is playing
   *   the audio or not.
   */
  this.isPlaying = _isPlaying;
  
  /*
   *   Returns a number value which specify the audio's playing time in
   *   seconds.
   */
  this.getCurrentTime = _getCurrentTime;

  /*
   *   Returns a number type value which specify the total duration time
   *   of the audio in seconds.
   */  
  this.getDurationTime = _getDurationTime;
  
  /*
   *   Returns a number type value in range 0..100 which specifies the
   *   current level of audio's volume.
   */
  this.getVolume = _getVolume;
  
  /*
   *   Set the current time of the audio, input value should be unsigned
   *   integer which represent the seconds of the audio time
   */
  this.setCurrentTime = _setCurrentTime;

  /*
   *   Set the volume of the audio, input value should be number in range
   *   0..100 which represent the percentage
   */
  this.setVolume = _setVolume;
  
  /*
   *   Toggle between mute or unmute the audio
   */
  this.toggleMute = _toggleMute;

  /*
   *   Skip audio player to assigned seconds which is an integer
   */
  this.skipAudioTo = _skipAudioTo;

  /*
   *   Remove the Musique object and following player associated elements
   */
  // this.unmount = _unmount;
  
  if (_showWaveform) /* Waveform attr. enabled */ {
    this.zoomWave = function() {
      /* Dynamically zoom the wave */
    }
  }
 
  /* * * * * * * * * * * * * * * * Musique object member functions end  * * * * * * * * * * * * * * * * */

  /* Render Musique Player */
  var renderElement = _getElement(_render);
  
  switch(_type) {
    case 'default':
      _appendNode(renderElement, 'audio', {
        class: 'musique musique-default',
        attr: { src: _sourceURL, controls: true }
      });
      break;
   
    case 'player':
      /* Define Nodes */
      var audioNode = {
        class: 'musique-audio',
        id:    $musiqueAudioID,
        attr:  { src: _sourceURL },
        event: {
          ready:   __audioReady__,
          playing: __audioPlaying__,
        },
      };

      /* * * * * * * * * * * * * * * Progress Bar Node Part Start * * * * * * * * * * * * * * * */
      if (_showProgressBar) {
        var progressBarNode = {
          class: 'musique musique-progress-bar',
          id:    $musiqueProgressBarID,
          style: {
            'width':            '100%',
            'padding':          String(_progressBarPadding) + 'px 0px',
            'height':           String(_progressBarHeight) + 'px',
            'background-color': _progressBarBgc ? _progressBarBgc : _bgc
          },
          child: []
        };
        progressBarNode.child.push({
          element: 'span',
          class:   'musique musique-progress-bar-trace',
          id:      $musiqueProgressBarTraceID,
          style:   {
            'width': '100%',
            'height': String(_progressBarHeight) + 'px',
            'background-color': _progressTraceColor,
            'display': 'block',
            'position': 'absolute',
            'border-radius': String(_progressBarRadius) + 'px',
            'margin': '0 ' + String(_progressBarSpacing) + 'px',
            'cursor': (_progressSkippable ? 'pointer' : 'default')
          },
          event: { click: (_progressSkippable ? __progressBarSkippable__ : null) }
        });
        progressBarNode.child.push({
          element: 'span',
          class:   'musiuqe musique-progress-bar-pg',
          id:      $musiqueProgressBarPGID,
          style:   {
            'width': '0.1%',
            'height': String(_progressBarHeight) + 'px',
            'background-color': _progressBarColor,
            'display': 'block',
            'position': 'relative',
            'float': _progressBarStart,
            'border-radius': String(_progressBarRadius) + 'px',
            'margin': '0 ' + String(_progressBarSpacing) + 'px',
            'box-shadow': _progressBarShadow,
            'cursor': (_progressSkippable ? 'pointer' : 'default')
          },
          event: { click: (_progressSkippable ? __progressBarSkippable__ : null) }
        });
      }
      /* * * * * * * * * * * * * * * Progress Bar Node Part  End  * * * * * * * * * * * * * * * */

      /* * * * * * * * * * * * * * * Musique Control Node Part Start * * * * * * * * *  * * * * * * */
      if (_showControlButtons) {  
        var musiqueControlNode = {
          element: 'div',
          class: 'musique-control',
          id: $musiqueControlID,
          style: { 'text-align': 'center' },
          child: []
        };

        var btnStyle = {
          'height':           String($buttonHeight) + 'px',
          'border-radius':    String(_btnRadius)    + 'px',
          'margin-left':      String(_btnSpacing)   + 'px',
          'margin-right':     String(_btnSpacing)   + 'px',
          'background-color': String(_btnBgc),
          'color':            String(_btnTextColor)
        };
        var btnClass = [], btnID = [], btnText = [], btnEvent = [];
        btnClass.push('musique-btn musique-btn-stop');     btnID.push($musiqueStopBtnID);
        btnClass.push('musique-btn musique-btn-pause');    btnID.push($musiquePauseBtnID);
        btnClass.push('musique-btn musique-btn-play');     btnID.push($musiquePlayBtnID);
        btnClass.push('musique-btn musique-btn-forward');  btnID.push($musiqueForwardBtnID);
        btnClass.push('musique-btn musique-btn-backward'); btnID.push($musiqueBackwardBtnID);

        var stopBtnText = "", pauseBtnText = "", playBtnText = "", forwardBtnText = "", backwardBtnText = "";
        if (_showButtonIcon) {
          switch(_buttonIconType) {
            case 'dark':
              stopBtnText     += '<img id="' + $stopBtnImgID     + '" src="' + $_base64_audioStopDark      + '" alt="stop button icon"     style="height: ' + String(_btnIconSize) + 'px;" /> ';
              pauseBtnText    += '<img id="' + $pauseBtnImgID    + '" src="' + $_base64_audioPauseDark     + '" alt="pause button icon"    style="height: ' + String(_btnIconSize) + 'px;" /> ';
              playBtnText     += '<img id="' + $playBtnImgID     + '" src="' + $_base64_audioPlayDark      + '" alt="play button icon"     style="height: ' + String(_btnIconSize) + 'px;" /> ';
              forwardBtnText  += '<img id="' + $forwardBtnImgID  + '" src="' + $_base64_audioForwardDark   + '" alt="forward button icon"  style="height: ' + String(_btnIconSize) + 'px;" /> ';
              backwardBtnText += '<img id="' + $backwardBtnImgID + '" src="' + $_base64_audioBackwardDark  + '" alt="backward button icon" style="height: ' + String(_btnIconSize) + 'px;" /> ';
              break;
            case 'white':
              stopBtnText     += '<img id="' + $stopBtnImgID     + '" src="' + $_base64_audioStopWhite     + '" alt="stop button icon"     style="height: ' + String(_btnIconSize) + 'px;" /> ';
              pauseBtnText    += '<img id="' + $pauseBtnImgID    + '" src="' + $_base64_audioPauseWhite    + '" alt="pause button icon"    style="height: ' + String(_btnIconSize) + 'px;" /> ';
              playBtnText     += '<img id="' + $playBtnImgID     + '" src="' + $_base64_audioPlayWhite     + '" alt="play button icon"     style="height: ' + String(_btnIconSize) + 'px;" /> ';
              forwardBtnText  += '<img id="' + $forwardBtnImgID  + '" src="' + $_base64_audioForwardWhite  + '" alt="forward button icon"  style="height: ' + String(_btnIconSize) + 'px;" /> ';
              backwardBtnText += '<img id="' + $backwardBtnImgID + '" src="' + $_base64_audioBackwardWhite + '" alt="backward button icon" style="height: ' + String(_btnIconSize) + 'px;" /> ';
              break;
            default:
              break;
          }
        }
        if (_showButtonText) {
          stopBtnText     += "<span id=\"" + $stopBtnSpanID     + "\">Stop</span>";
          pauseBtnText    += "<span id=\"" + $pauseBtnSpanID    + "\">Pause</span>";
          playBtnText     += "<span id=\"" + $playBtnSpanID     + "\">Play</span>";
          forwardBtnText  += "<span id=\"" + $forwardBtnSpanID  + "\">Forward</span>";
          backwardBtnText += "<span id=\"" + $backwardBtnSpanID + "\">Backward</span>";
        }
        btnText.push(stopBtnText);     btnEvent.push(__stopAudio__);
        btnText.push(pauseBtnText);    btnEvent.push(__pauseAudio__);
        btnText.push(playBtnText);     btnEvent.push(__playAudio__);
        btnText.push(forwardBtnText);  btnEvent.push(__forwardAudio__);
        btnText.push(backwardBtnText); btnEvent.push(__backwardAudio__);

        for (var i = 0; i < btnClass.length; i++) {
          var controlBtnNode = {
            element: 'button',
            class:   btnClass[i],
            id:      btnID[i],
            text:    btnText[i],
            style:   btnStyle,
            event:   {}
          };
          controlBtnNode.event.click = btnEvent[i];
          controlBtnNode.event.hoverIn = function(event) {
            this.style['color'] = _btnHoverTextColor;
            this.style['background-color'] = _btnHoverBgc;
            this.style['transition'] = 'background-color ' + String(_btnTransitionSec) + 's, color ' + String(_btnTransitionSec) + 's';
          };
          controlBtnNode.event.hoverOut = function(event) {
            this.style['color'] = _btnTextColor;
            this.style['background-color'] = _btnBgc;
            this.style['transition'] = 'background-color ' + String(_btnTransitionSec) + 's, color ' + String(_btnTransitionSec) + 's';
          };
          musiqueControlNode.child.push(controlBtnNode);
        }
        
        if (!_inputSpecified(params.height)) { _height += $buttonHeight; }
        
        if (_showTimer) {
          timerText = " | ";
          timerNode = {
            element: 'span',
            id:      $musiqueTimerID,
            class:   'musique-timer',
            text:    ' -- : -- | -- : -- ',
            style: {
              // 'height':           String($buttonHeight) + 'px',
              // 'width':            String($timerWidth)   + 'px',
              'margin-left':      String(_timerSpacing) + 'px',
              'margin-right':     String(_timerSpacing) + 'px',
              'padding':          String(_timerPadding) + 'px ' + String(_padding + 3) + 'px',
              'border-radius':    String(_timerRadius)  + 'px',
              'background-color': _timerBgc,
              'border':           _timerBorder,
              'color':            _timerColor,
              'font-size':        'small',
            }
          }
          if (_timerPosition == 'right') {
            musiqueControlNode.child.push(timerNode);
          } else if (_timerPosition == 'left') {
            musiqueControlNode.child.unshift(timerNode);  
          } else {

          }
        }

        var controlNodeInfo = {
          class: 'musique musique-player ' + _customClass,
          id: 'musique-' + $musiqueID,
          style: {
            //'width':        String(_width)   + 'px',
            'height':       String(_height)  + 'px',
            'padding':      String(_padding) + 'px',
            'overflow': true,
            'background-color': _controlBgc ? _controlBgc : _bgc,
          },
          child: musiqueControlNode
        }
      }
      /* * * * * * * * * * * * * * * Musique Control Node Part  End  * * * * * * * * * * * * * * * */

      /* * * * * * * * * * * * * * * Waveform Surfer Node Part Start * * * * * * * * * * * * * * * */
      if (_showWaveform) {
        var waveformNode = {
          class: 'musique musique-waveform-container',
          id:    $musiqueWaveformContainerID,
          style: {
            'padding': String(_waveformVerticalSpacing) + 'px ' + String(_waveformSpacing) + 'px'
          },
          child: [
            {
              element: 'div',
              class:   'musique musique-waveform-loading',
              id:      $musiqueWaveformLoadingID,
              text:    'Audio Waveform Loading...',
              style:   {
                'background-color': _waveformBgc,
                'text-align': 'center'
              }
            },
            {
              element: 'div',
              class:   'musique musique-waveform',
              id:      $musiqueWaveformID,
              style:   {
                'background-color': _waveformBgc,
                'display': 'none'
              }
            }
          ]
        }
      }
      /* * * * * * * * * * * * * * * Waveform Surfer Node Part  End * * * * * * * * * * * * * * * */
      
      /* * * * * * * * * * * * * * * * * * Main Rendering Start * * * * * * * * * * * * * * * * * * */
      var renderTask = new Promise(function(resolve, reject) {
        if (_sourceURL) { _appendNode(renderElement, 'audio', audioNode); } else { console.error('[Musique Error] Required sourceURL is undefined!'); }

        for (component of _renderSequence) {
          switch(component) {
            case 'control':     if (_showControlButtons) _appendNode(renderElement, 'div', controlNodeInfo); break;
            case 'progressBar': if (_showProgressBar)    _appendNode(renderElement, 'div', progressBarNode); break;
            case 'waveform':    if (_showWaveform)       _appendNode(renderElement, 'div', waveformNode);    break;
          }
        }

        // if (_showProgressBar && _progressBarPosition === 'top') { _appendNode(renderElement, 'div', progressBarNode); }

        // if (_showControlButtons) { _appendNode(renderElement, 'div', controlNodeInfo) }

        // if (_showProgressBar && _progressBarPosition === 'bottom') { _appendNode(renderElement, 'div', progressBarNode); }

        // if (_showWaveform) { _appendNode(renderElement, 'div', waveformNode) }

        setTimeout(function() { resolve() }, 100);
      });

      /* Append CSS */
      renderTask.then(function() {
        var rootElement          = _getElement($musiqueRootID);
        var timerElement         = _getElement($musiqueTimerID);
        var controlElement       = _getElement($musiqueControlID);
        var progressBarElement   = _getElement($musiqueProgressBarID);
        var progressBarPGElement = _getElement($musiqueProgressBarPGID);
        var barTraceElement      = _getElement($musiqueProgressBarTraceID);

        _width = 0;

        if (_showControlButtons) {
          var stopBtn     = _getElement($musiqueStopBtnID);
          var pauseBtn    = _getElement($musiquePauseBtnID);
          var playBtn     = _getElement($musiquePlayBtnID);
          var forwardBtn  = _getElement($musiqueForwardBtnID);
          var backwardBtn = _getElement($musiqueBackwardBtnID);
          if (_showButtonText) {
            var stopSpanText     = _getElement($stopBtnSpanID);
            var pauseSpanText    = _getElement($pauseBtnSpanID);
            var playSpanText     = _getElement($playBtnSpanID);
            var forwardSpanText  = _getElement($forwardBtnSpanID);
            var backwardSpanText = _getElement($backwardBtnSpanID);
            if (_showButtonIcon) {
              stopSpanText.style['position']     = 'relative'; stopSpanText.style['top']     = (_btnIconSize / -5) + 'px';
              pauseSpanText.style['position']    = 'relative'; pauseSpanText.style['top']    = (_btnIconSize / -5) + 'px';
              playSpanText.style['position']     = 'relative'; playSpanText.style['top']     = (_btnIconSize / -5) + 'px';
              forwardSpanText.style['position']  = 'relative'; forwardSpanText.style['top']  = (_btnIconSize / -5) + 'px';
              backwardSpanText.style['position'] = 'relative'; backwardSpanText.style['top'] = (_btnIconSize / -5) + 'px';
            }
          }
        }

        if (_showControlButtons && _btnRadius === 'rounded') {
          stopBtn.style['border-radius']     = '50%';
          pauseBtn.style['border-radius']    = '50%';
          playBtn.style['border-radius']     = '50%';
          forwardBtn.style['border-radius']  = '50%';
          backwardBtn.style['border-radius'] = '50%';
        }

        if (_showControlButtons) {
          _width += 2 * _btnSpacing; _width += _getWidth(stopBtn);
          _width += 2 * _btnSpacing; _width += _getWidth(pauseBtn);
          _width += 2 * _btnSpacing; _width += _getWidth(playBtn);
          _width += 2 * _btnSpacing; _width += _getWidth(forwardBtn);
          _width += 2 * _btnSpacing; _width += _getWidth(backwardBtn);
        }

        if (_showTimer) {
          _width += _getWidth(timerElement);
          _width += 2 * _timerSpacing + 10;
        }

        _width += 2 * _padding + 15;
        $stableWidth = _width;

        renderElement.style['width'] = String(_inputSpecified(_style) && _inputSpecified(_style.width) ? _style.width : _width) + 'px';

        _getChildNodes(_render)[1].style['border-top-left-radius']     = String(_borderRadius) + 'px';
        _getChildNodes(_render)[1].style['border-top-right-radius']    = String(_borderRadius) + 'px';
        _getLastChildNode(_render).style['border-bottom-left-radius']  = String(_borderRadius) + 'px';
        _getLastChildNode(_render).style['border-bottom-right-radius'] = String(_borderRadius) + 'px';

        if (_showProgressBar) {
          progressBarPGElement.style['max-width'] = String(_width - 2 * _progressBarSpacing) + 'px';
          barTraceElement.style['max-width'] = String(_width - 2 * _progressBarSpacing)+ 'px';
        }

        if (_showWaveform) { _setWaveform(); }

      });
      break;
      /* * * * * * * * * * * * * * * * * * Main Rendering  End  * * * * * * * * * * * * * * * * * * */
      
    /*
    case 'playlist':
      break;
    
    case 'upload':
      break;
    */
    
    default:
  }
  
};