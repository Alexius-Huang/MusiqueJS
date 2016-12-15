/*
 *
 * Copyright (c) 2016, Maxwell Alexius All rights reserved.
 * Version: 1.0.0 beta
 * Created at: Wed Dec 14 2016 23:38:04 GMT+0800
 *
 */

function Musique(params) {

  /* * * * * * * * * * * * * * * * * * * * Helper Functions Starts * * * * * * * * * * * * * * * * * * * * * */

    /* General Functions */
    function randomString(length, chars) {
      var result = '';
      if (!chars) { chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; }
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }
    
    var _inputSpecified = function(input) { return input !== undefined; }

    var _isFunction = function(input) { return typeof input === "function"; }

    var _integer = function(input) { return Math.floor(input); }

    var _getElement = function(elementID) { return document.getElementById(elementID); }

    /* Developer Input Validations */
    // var _validate = function(v_case) {
    //   switch (v_case) {
    //     case 'showCurrentTime and showRemainTime should not be true at the same time':
    //       if (_t_showCurrentTime && _t_showRemainTime) {
    //         console.error('[Musique Conflict] You can not specify showCurrentTime and showRemainTime in timer at the same time!');
    //         console.warn('[Musique Correction] showCurrentTime will be set to true while showRemainTime is set to false.');
    //         _t_showRemainTime = false;
    //       } break;
    //     case 'false in showTimer while "timer" feature as "plain"':
    //       if (!_timer.showTimer) {
    //         console.error('[Musique Conflict] You can not specify "false" in showTimer while you set "timer" feature as "plain"!');
    //         console.warn('[Musique Correction] showTimer is forced to set to true.');
    //       } break;
    //     case 'no skippable in "timer" feature as "plain"':
    //       if (_timer.skippable !== undefined) {
    //         console.warn('[Musique Hint] No skippable feature in "timer" feature as "plain".');
    //         console.warn('[Musique Correction] skippable in "timer" feature has been ignored.');
    //       } break;
    //     case 'false in showTimer while showDurationTime, showCurrentTime or showRemainTime is/are true':
    //       if (!_timer.showTimer && (_timer.showDurationTime || _timer.showCurrentTime || _timer._t_showRemainTime)) {
    //         console.error('[Musique Conflict] You can not specify showDurationTime, showCurrentTime or showRemainTime as true while showTimer is false!');
    //         console.warn('[Musique Correction] showDurationTime, showCurrentTime and showRemainTime are forced to set false.');
    //         _t_showDurationTime = false;
    //         _t_showCurrentTime  = false;
    //         _t_showRemainTime   = false;
    //       }
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
  var _customClass = _inputSpecified(params.customClass) ? params.customClass : '';
  var _autoPlay    = _inputSpecified(params.autoPlay)    ? params.autoPlay    : false;

  if (_type != 'default') {
    /* Features */
    var _waveform = _inputSpecified(params.waveform) && params.waveform instanceof Object ? params.waveform : false;
    if (_waveform) {
      var _wf_enabled       = true;
      var _wf_type          = _inputSpecified(_waveform.type)          ? _waveform.type          : '';
      var _wf_audioRate     = _inputSpecified(_waveform.audioRate)     ? _waveform.audioRate     : 1;
      var _wf_waveColor     = _inputSpecified(_waveform.waveColor)     ? _waveform.waveColor     : '#999';
      var _wf_progressColor = _inputSpecified(_waveform.progressColor) ? _waveform.progressColor : '#555';
      var _wf_cursorWidth   = _inputSpecified(_waveform.cursorWidth)   ? _waveform.cursorWidth   : 1;
      var _wf_cursorColor   = _inputSpecified(_waveform.cursorColor)   ? _waveform.cursorColor   : '#333';

      var _wf_zoomSlide     = undefined;
      var _wf_waveHeight    = undefined;

      if (_wf_type == 'bar') {
        var _wf_barWidth = _waveform.barWidth >= 1 ? _waveform.barWidth : 3;
      }
    } else var _wf_enabled = false;

    var _timer = params.timer !== undefined && (params.timer instanceof Object || typeof params.timer === "boolean") ? params.timer : false;
    if (_timer) {
      var _t_enabled            = true;
      var _t_withProgressBar    = _inputSpecified(_timer.withProgressBar)    && typeof _timer.withProgressBar === "boolean" ? _timer.withProgressBar : true ;
      var _t_progressBarType    = _inputSpecified(_timer.progressBarType)    ? _timer.progressBarType : 'plain';
      var _t_timerOnProgressBar = _inputSpecified(_timer.timerOnProgressBar) ? _timer.timerOnProgressBar : false;
      // var _t_type    = _timer.type !== undefined && _timer.type instanceof String ? _timer.type : 'plain'; 
      /* type: 'plain' | 'progressBar' */
      
      // switch (_t_type) {
      //   case 'plain':
      //     var _t_showTimer       = true;
      //     var _t_skippable       = false;
      //     // var _t_showDurationTime = _timer.showDurationTime !== undefined && _timer.showDurationTime instanceof Boolean ? _timer.showDurationTime : true;
      //     // var _t_showCurrentTime  = _timer.showCurrentTime  !== undefined && _timer.showCurrentTime  instanceof Boolean ? _timer.showCurrentTime  : true;
      //     // var _t_showRemainTime   = _timer.showRemainTime   !== undefined && _timer.showRemainTime   instanceof Boolean ? _timer.showRemainTime   : false;
          
      //     /* Error input corrections */
      //     // _validate('showCurrentTime and showRemainTime should not be true at the same time');
      //     // _validate('false in showTimer while "timer" feature as "plain"');
      //     // _validate('no skippable in "timer" feature as "plain"');
      //     break;
      //   case 'progressBar':
      //     var _t_showTimer       = _timer.showTimer !== undefined && _timer.showTimer instanceof Boolean ? _timer.showTimer : true;
      //     var _t_showProgressBar = true;
      //     var _t_skippable       = _timer.skippable !== undefined && _timer.showTimer instanceof Boolean ? _timer.skippable : true;
      //     // var _t_showDurationTime = _timer.showDurationTime !== undefined && _timer.showDurationTime instanceof Boolean && _t_showTimer? _timer.showDurationTime : true;
      //     // var _t_showCurrentTime  = _timer.showCurrentTime  !== undefined && _timer.showCurrentTime  instanceof Boolean && _t_showTimer? _timer.showCurrentTime  : true;
      //     // var _t_showRemainTime   = _timer.showRemainTime   !== undefined && _timer.showRemainTime   instanceof Boolean && _t_showTimer? _timer.showRemainTime   : false;
          
      //     /* Error input corrections */
      //     // _validate('false in showTimer while showDurationTime, showCurrentTime or showRemainTime is/are true');
      //     // if (_t_showTimer) {
      //     //   _validate('showCurrentTime and showRemainTime should not be true at the same time');
      //     //   _validate('')
      //     // }
      //     break;
      //   default:
      // }
    } else var _t_enabled = false;

    var _image = _inputSpecified(params.imageURL) && params.image instanceof Object ? params.imageURL : null;
    if (_image) {
      var _i_enabled = true;
      var _i_url     = _inputSpecified(_image.url) && _image.url instanceof String ? _image.url : null;
    } else var _i_enabled = false;

    /* Interact with CSS */
    var _style = _inputSpecified(params.style) && params.style instanceof Object ? params.style : undefined;
    
    /* Main Part */  
    var _width        = _style && _inputSpecified(_style.width)        ? _style.width        : 0;
    var _height       = _style && _inputSpecified(_style.height)       ? _style.height       : 0;
    var _padding      = _style && _inputSpecified(_style.padding)      ? _style.padding      : 8;
    var _bgc          = _style && _inputSpecified(_style.bgc)          ? _style.bgc          : '#555';
  
    /* Button Part */
    var _btnRadius    = _style && _inputSpecified(_style.btnRadius)    ? _style.btnRadius    : 3;
    var _btnSpacing   = _style && _inputSpecified(_style.btnSpacing)   ? _style.btnSpacing   : 3;
    var _btnAlign     = _style && _inputSpecified(_style.btnAlign)     ? _style.btnAlign     : 'center';
  
    /* Timer Part */
    var _timerSpacing = _style && _inputSpecified(_style.timerSpacing) ? _style.timerSpacing : 10;
    var _timerColor   = _style && _inputSpecified(_style.timerColor)   ? _style.timerColor   : '#aaa'
    var _timerPadding = _style && _inputSpecified(_style.timerPadding) ? _style.timerPadding : 3;
    var _timerBgc     = _style && _inputSpecified(_style.timerBgc)     ? _style.timerBgc     : '#333';
    var _timerBorder  = _style && _inputSpecified(_style.timerBorder)  ? _style.timerBorder  : '1px solid #aaa';
    var _timerRadius  = _style && _inputSpecified(_style.timerRadius)  ? _style.timerRadius  : 3;
    
    /* Control Attribute */
    var _showControlButtons = _inputSpecified(params.showControlButtons) ? params.showControlButtons : true;
    var _skipLength         = _inputSpecified(params.skipLength)         ? params.skipLength         : 5;
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

  /* * * * * * * * * * * * * * * * * * * * * Parameters Start * * * * * * * * * * * * * * * * * * * * * * * * */

  /* Property (Immuteble) Params */
  var $musiqueID        = randomString(10) + String(Date.now());
  var $musiqueRootID    = 'musique-'         + $musiqueID;
  var $musiqueAudioID   = 'musique-audio-'   + $musiqueID;
  var $musiqueControlID = 'musique-control-' + $musiqueID;
  var $musiqueTimerID   = 'musique-timer-'   + $musiqueID;
  var $durationTime     = NaN; // Integer type, should be get after "ready" event

  /* CSS Style Params */
  $controlButtonsWidth = 300;
  $buttonHeight        = 25;
  $timerWidth          = 100;

  /* State (Mutable) Params (Should be get after "ready" event) */
  var $_currentTime = NaN; // Integer Type
  var $_remainTime  = NaN; // Integer Type
  var $_audioPlayingIntervalID = null;

  /* * * * * * * * * * * * * * * * * * * * * Parameters End * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * Musique procedural private functions start * * * * * * * * * * * * * * * */
  // var _createNode = function(element, obj) {
  //   var node = document.createElement(element);
  //   if (obj.class) node.className = obj.class;
  //   if (obj.id)    node.id        = obj.id;
  //   if (obj.text)  node.innerHTML = obj.text;
  //   return node;
  // }
  
  var _timerEnabled = function() { return _t_enabled; }

  var _waveformEnabled = function() { return _wf_enabled; }

  var _imageEnabled = function() { return _i_enabled; }
  
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
    
    switch(element.toLowerCase()) {
      case 'div':
        break;
      case 'a':        
        node.href   = attr && _inputSpecified(attr.href)   ? attr.href   : '#';
        node.target = attr && _inputSpecified(attr.target) ? attr.target : '_self';
        event && _isFunction(event.click)    ? node.addEventListener('click',     event.click,    false) : undefined;
        event && _isFunction(event.hoverIn)  ? node.addEventListener('mouseover', event.hoverIn,  false) : undefined;
        event && _isFunction(event.hoverOut) ? node.addEventListener('mouseout',  event.hoverOut, false) : undefined;
        break;
      case 'img':
        node.src = attr && _inputSpecified(attr.src) ? attr.src : 'no source specified';
        node.alt = attr && _inputSpecified(attr.alt) ? attr.alt : 'no alt specified';
        break;
      case 'button':
        node.disable = attr && _inputSpecified(attr.disable) ? attr.disable : true;
        event && _isFunction(event.click)    ? node.addEventListener('click',     event.click,    false) : undefined;
        event && _isFunction(event.hoverIn)  ? node.addEventListener('mouseover', event.hoverIn,  false) : undefined;
        event && _isFunction(event.hoverOut) ? node.addEventListener('mouseout',  event.hoverOut, false) : undefined;
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
      return true;
    } else return false;
  }
  
  var _pauseAudio = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    if (audioElement && _isPlaying(audioTagID)) {
      /* Default "pause" Actions Here */
      audioElement.pause();
      return true;
    } else return false;
  }
  
  var _stopAudio = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    if (audioElement) {
      /* Default "stop" Actions Here */
      _pauseAudio(audioTagID);
      _setCurrentTime(0, audioTagID);
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
      } else if (nextTime >= duration) {
        if (_isPlaying(audioTagID)) { _pauseAudio(audioTagID); }
        _setCurrentTime(0, audioTagID);
      }
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
      } else if (nextTime <= 0) {
        if (_isPlaying(audioTagID)) { _pauseAudio(audioTagID); }
        _setCurrentTime(0, audioTagID);
      }
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

  var _setAudioPlayingInterval = function() {
    $_audioPlayingIntervalID = setInterval(function() {
      $_currentTime = _integer(_getCurrentTime());
      $_remainTime  = $durationTime - $_currentTime;
      if (_timer) { _setTimerText(); }
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
      /* Default "ready" Actions Here */
      return true;
    } else return false;
  }
  
  var _audioPlaying = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = _getElement(ID);
    if (audioElement) {
      /* Default "playing" Actions Here */
      return true;
    } else return false;
  }

  /* * * * * * * * * * * * * * * Musique procedural private functions end   * * * * * * * * * * * * * * * */


  /* * * * * * * * * * * * * * * * Musique event private functions start * * * * * * * * * * * * * * * * */
  var __playAudio__ = function(event) {
    if (_play && _isFunction(_play))         { _play(event);     }
    if (!event.defaultPrevented)             { _playAudio();     }
    /* Forced Executed Actions */
  }

  var __pauseAudio__ = function(event) {
    if (_pause && _isFunction(_pause))       { _pause(event);    }
    if (!event.defaultPrevented)             { _pauseAudio();    }
    /* Forced Executed Actions */
    _unsetAudioPlayingInterval();
  }

  var __stopAudio__ = function(event) {
    if (_stop && _isFunction(_stop))         { _stop(event);     }
    if (!event.defaultPrevented)             { _stopAudio();     }
    /* Forced Executed Actions */
    $_currentTime = 0;
    $_remainTime  = $durationTime;
    if (_timer) { _setTimerText(); }
    _unsetAudioPlayingInterval();
  }

  var __forwardAudio__ = function(event) {
    if (_forward && _isFunction(_forward))   { _forward(event);  } 
    if (!event.defaultPrevented)             { _forwardAudio();  }
    /* Forced Executed Actions */
    $_currentTime = _integer(_getCurrentTime());
    $_remainTime  = $durationTime - $_currentTime;
    if (_timer) { _setTimerText(); }
  }

  var __backwardAudio__ = function(event) {
    if (_backward && _isFunction(_backward)) { _backward(event); }
    if (!event.defaultPrevented)             { _backwardAudio(); }
    /* Forced Executed Actions */
    $_currentTime = _integer(_getCurrentTime());
    $_remainTime  = $durationTime - $_currentTime;
    if (_timer) { _setTimerText(); }
  }

  var __audioReady__ = function(event) {
    if (_ready && _isFunction(_ready))       { _ready(event);    }
    if (!event.defaultPrevented)             { _audioReady();    }
    /* Forced Executed Actions */
    $durationTime = _integer(_getDurationTime());
    $_currentTime = 0;
    $_remainTime  = $durationTime;
    if (_timer) { _setTimerText(); }
    if (_autoPlay && !_isPlaying()) { _playAudio(); }
  }

  var __audioPlaying__ = function(event) {
    if (_playing && _isFunction(_playing))   { _playing(event);  }
    if (!event.defaultPrevented)             { _audioPlaying();  }
    /* Forced Executed Actions */
    _setAudioPlayingInterval();
  }

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
   *   Remove the Musique object and following player associated elements
   */
  // this.unmount = _unmount;
  
  if (_waveform) /* Waveform attr. enabled */ {
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
      var musiqueControlNode = {
        element: 'div',
        class: 'musiqe-control',
        id: $musiqueControlID,
        style: { 'text-align': _btnAlign },
        child: []
      };

      /* Button Control Part */
      if (_showControlButtons) {
        if (!_inputSpecified(params.width)) { _width += $controlButtonsWidth; }
        
        var btnStyle = {
          'height':        String($buttonHeight) + 'px',
          'border-radius': String(_btnRadius)    + 'px',
          'margin-left':   String(_btnSpacing)   + 'px',
          'margin-right':  String(_btnSpacing)   + 'px',
        };
        var btnClass = [], btnText = [], btnEvent = [];
        btnClass.push('musique-btn musique-btn-stop');     btnText.push('Stop');
        btnClass.push('musique-btn musique-btn-pause');    btnText.push('Pause');
        btnClass.push('musique-btn musique-btn-play');     btnText.push('Play');
        btnClass.push('musique-btn musique-btn-forward');  btnText.push('Forward');
        btnClass.push('musique-btn musique-btn-backward'); btnText.push('Backward');

        btnEvent.push(__stopAudio__);
        btnEvent.push(__pauseAudio__);
        btnEvent.push(__playAudio__);
        btnEvent.push(__forwardAudio__);
        btnEvent.push(__backwardAudio__);

        for (var i = 0; i < btnClass.length; i++) {
          var controlBtnNode = {
            element: 'button',
            class:   btnClass[i],
            text:    btnText[i],
            style:   btnStyle,
            event:   {}
          };
          controlBtnNode.event.click = btnEvent[i];
          musiqueControlNode.child.push(controlBtnNode);
        }
        
        if (!_inputSpecified(params.height)) { _height += $buttonHeight; }
        
        if (_t_enabled) {
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
              'padding':          String(_timerPadding) + 'px',
              'border-radius':    String(_timerRadius)  + 'px',
              'background-color': _timerBgc,
              'border':           _timerBorder,
              'color':            _timerColor,
              'font-size':        'small',
            }
          }
          if (!_inputSpecified(params.width)) { _width += $timerWidth; }
          musiqueControlNode.child.push(timerNode);
        }
      }

      var audioNodeInfo = {
        class: 'musique-audio',
        id:    $musiqueAudioID,
        attr:  { src: _sourceURL },
        event: {
          ready:   __audioReady__,
          playing: __audioPlaying__,
        },
        child: []
      };

      var renderTask = new Promise(function(resolve, reject) {
        _appendNode(renderElement, 'audio', audioNodeInfo);

        _appendNode(renderElement, 'div', {
          class: 'musique musique-player ' + _customClass,
          id: 'musique-' + $musiqueID,
          style: {
            'width':    String(_width)   + 'px',
            'height':   String(_height)  + 'px',
            'padding':  String(_padding) + 'px',
            'overflow': true,
            'background-color': _bgc
          },
          child: musiqueControlNode
        });

        resolve();
      });

      renderTask.then(function() {
        var rootElement    = _getElement($musiqueRootID);
        var timerElement   = _getElement($musiqueTimerID);
        var controlElement = _getElement($musiqueControlID);
      });
      break;
    /*
    case 'playlist':
      break;
    
    case 'upload':
      break;
    */
    
    default:
  }
  
};