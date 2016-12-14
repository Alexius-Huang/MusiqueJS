/*
 *
 * Copyright (c) 2016, Maxwell Alexius All rights reserved.
 * Version: 1.0.0 beta
 * Created at: Wed Dec 14 2016 23:38:04 GMT+0800
 *
 */

function Musique(params) {
  /* Required Field */
  var _render      = params.render;
  var _sourceURL   = params.sourceURL   !== undefined ? params.sourceURL   : null;
  var _type        = params.type        !== undefined ? params.type        : 'default';
  /* Types
   *   default  : Plain HTML5 Audio API
   *   player   : Audio API with basic control buttons bind with methods, 'play', 'pause', 'stop', 'forward', 'backward'
   *   playlist : Playlist with multiple song
   *   upload   : Having upload field and it can preview uploaded audio file
   */
  
  /* * * * * * * * * * * * * * * * * * * * Helper Functions Starts * * * * * * * * * * * * * * * * * * * * * */

    /* General Functions */
    function randomString(length, chars) {
      var result = '';
      if (!chars) { chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; }
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }

    var _isFunction = function(input) { return typeof input === "function"; }

    /* Developer Input Validations */
    var _validate = function(v_case) {
      switch (v_case) {
        case 'showCurrentTime and showRemainTime should not be true at the same time':
          if (_t_showCurrentTime && _t_showRemainTime) {
            console.error('[Musique Conflict] You can not specify showCurrentTime and showRemainTime in timer at the same time!');
            console.warn('[Musique Correction] showCurrentTime will be set to true while showRemainTime is set to false.');
            _t_showRemainTime = false;
          } break;
        case 'false in showTimer while "timer" feature as "plain"':
          if (!_timer.showTimer) {
            console.error('[Musique Conflict] You can not specify "false" in showTimer while you set "timer" feature as "plain"!');
            console.warn('[Musique Correction] showTimer is forced to set to true.');
          } break;
        case 'no skippable in "timer" feature as "plain"':
          if (_timer.skippable !== undefined) {
            console.warn('[Musique Hint] No skippable feature in "timer" feature as "plain".');
            console.warn('[Musique Correction] skippable in "timer" feature has been ignored.');
          } break;

      }
    }

  /* * * * * * * * * * * * * * * * * * * * Helper Functions  Ends  * * * * * * * * * * * * * * * * * * * * * */
  
  if (_type != 'default') {
    /* Features */
    var _waveform = params.waveform !== undefined && params.waveform instanceof Object ? params.waveform : false;
    if (_waveform) {
      var _wf_enabled       = true;
      var _wf_type          = _waveform.type          !== undefined ? _waveform.type          : '';
      var _wf_audioRate     = _waveform.audioRate     !== undefined ? _waveform.audioRate     : 1;
      var _wf_waveColor     = _waveform.waveColor     !== undefined ? _waveform.waveColor     : '#999';
      var _wf_progressColor = _waveform.progressColor !== undefined ? _waveform.progressColor : '#555';
      var _wf_cursorWidth   = _waveform.cursorWidth   !== undefined ? _waveform.cursorWidth   : 1;
      var _wf_cursorColor   = _waveform.cursorColor   !== undefined ? _waveform.cursorColor   : '#333';

      var _wf_zoomSlide     = undefined;
      var _wf_waveHeight    = undefined;

      if (_wf_type == 'bar') {
        var _wf_barWidth = _waveform.barWidth >= 1 ? _waveform.barWidth : 3;
      }
    } else var _wf_enabled = false;

    var _timer = params.timer !== undefined && (params.timer instanceof Object || params.timer instanceof Boolean) ? params.timer : false;
    if (_timer) {
      var _t_enabled = true;
      var _t_type    = _timer.type !== undefined && _timer.type instanceof String ? _timer.type : 'plain'; 
      /* type: 'plain' | 'progressBar' */
      switch (_t_type) {
        case 'plain':
          var _t_showTimer        = true;
          var _t_showProgressBar  = false;
          var _t_skippable        = false;
          var _t_showDurationTime = _timer.showDurationTime !== undefined && _timer.showDurationTime instanceof Boolean ? _timer.showDurationTime : true;
          var _t_showCurrentTime  = _timer.showCurrentTime  !== undefined && _timer.showCurrentTime  instanceof Boolean ? _timer.showCurrentTime : true;
          var _t_showRemainTime   = _timer.showRemainTime   !== undefined && _timer.showRemainTime   instanceof Boolean ? _timer.showRemainTime : false;
          
          /* Error input corrections */
          _validate('showCurrentTime and showRemainTime should not be true at the same time');
          _validate('false in showTimer while "timer" feature as "plain"');
          _validate('no skippable in "timer" feature as "plain"');
          break;
        case 'progressBar':
          var _t_showTimer       = _timer.showTimer !== undefined && _timer.showTimer instanceof Boolean ? _timer.showTimer : true;
          var _t_showProgressBar = true;
          var _t_skippable       = _timer.skippable !== undefined && _timer.showTimer instanceof Boolean ? _timer.skippable : true;
          break;
        default:
      }
    } else var _t_enabled = false;

    var _image = params.imageURL !== undefined && params.image instanceof Object ? params.imageURL : null;
    if (_image) {
      var _i_enabled = true;
      var _i_url     = _image.url !== undefined && _image.url instanceof String ? _image.url : null;
    } else var _i_enabled = false;

    /* Interact with CSS */
    var _customClass = params.customClass !== undefined ? params.customClass : '';
    var _style       = params.style       !== undefined ? params.style       : 'default';
    var _width       = params.width       !== undefined ? params.width       : 300;
    var _height      = params.height      !== undefined ? params.height      : 0;
    var _padding     = params.padding     !== undefined ? params.padding     : 5;
    var _bgc         = params.bgc         !== undefined ? params.bgc         : '#555';
    var _btnRadius   = params.btnRadius   !== undefined ? params.btnRadius   : 5;
    var _btnSpacing  = params.btnSpacing  !== undefined ? params.btnSpacing  : 3;
    var _btnAlign    = params.btnAlign    !== undefined ? params.btnAlign    : 'center';

    /* Control Attribute */
    var _showControlButtons = params.showControlButtons !== undefined ? params.showControlButtons : true;
    var _skipLength         = params.skipLength         !== undefined ? params.skipLength         : 5;
    var _play        = params.play        !== undefined && _isFunction(params.play)        ? params.play        : null ;
    var _pause       = params.pause       !== undefined && _isFunction(params.pause)       ? params.pause       : null ;
    var _stop        = params.stop        !== undefined && _isFunction(params.stop)        ? params.stop        : null ;
    var _forward     = params.forward     !== undefined && _isFunction(params.forward)     ? params.forward     : null ;
    var _backward    = params.backward    !== undefined && _isFunction(params.backward)    ? params.backward    : null ;
    var _volumeSlide = params.volumeSlide !== undefined && _isFunction(params.volumeSlide) ? params.volumeSlide : null ;
  }

  /* API Default Params */
  var $musiqueID = randomString(10) + String(Date.now());
  var $musiqueAudioID   = 'musique-audio-' + $musiqueID;
  var $musiqueControlID = 'musique-control-' + $musiqueID;

  /* CSS Style Default Params */
  $buttonHeight = 30;

  /* Define Basic Functions */
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
        node.href   = attr && attr.href   !== undefined? attr.href   : '#';
        node.target = attr && attr.target !== undefined? attr.target : '_self';
        event && _isFunction(event.click)    ? node.addEventListener('click',     event.click,    false) : undefined;
        event && _isFunction(event.hoverIn)  ? node.addEventListener('mouseover', event.hoverIn,  false) : undefined;
        event && _isFunction(event.hoverOut) ? node.addEventListener('mouseout',  event.hoverOut, false) : undefined;
        break;
      case 'img':
        node.src = attr && attr.src !== undefined ? attr.src : 'no source specified';
        node.alt = attr && attr.alt !== undefined ? attr.alt : 'no alt specified';
        break;
      case 'button':
        node.disable = attr && attr.disable !== undefined ? attr.disable : true;
        event && _isFunction(event.click)    ? node.addEventListener('click',     event.click,    false) : undefined;
        event && _isFunction(event.hoverIn)  ? node.addEventListener('mouseover', event.hoverIn,  false) : undefined;
        event && _isFunction(event.hoverOut) ? node.addEventListener('mouseout',  event.hoverOut, false) : undefined;
        break;
      case 'audio':
        node.controls = attr && attr.controls !== undefined ? attr.controls : false;
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
        break;
      case 'source':
        node.src  = attr && attr.src  !== undefined ? attr.src  : 'no source specified';
        node.type = attr && attr.type !== undefined ? attr.type : 'no mime type specified';
        break;
    }
    parentElement.appendChild(node);
  }
  
  var _playAudio = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = document.getElementById(ID);
    if (audioElement && !_isPlaying(audioTagID)) {
      audioElement.play();
      return true;
    } else return false;
  }
  
  var _pauseAudio = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = document.getElementById(ID);
    if (audioElement && _isPlaying(audioTagID)) {
      audioElement.pause();
      return true;
    } else return false;
  }
  
  var _stopAudio = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = document.getElementById(ID);
    if (audioElement) {
      _pauseAudio(audioTagID);
      _setCurrentTime(0, audioTagID);
      return true;
    } else return false;
  }

  var _forwardAudio = function(skipLength, audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = document.getElementById(ID);
    if (!skipLength) { skipLength = _skipLength; }

    if (audioElement) {
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
    var audioElement = document.getElementById(ID);
    if (!skipLength) { skipLength = _skipLength; }

    if (audioElement) {
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
    var audioElement = document.getElementById(ID);
    if (audioElement) {
      return !audioElement.paused;
    } else return false;
  }

  var _getDurationTime = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = document.getElementById(ID);
    if (audioElement) {
      return audioElement.duration;
    } else return NaN;
  }

  var _getCurrentTime = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = document.getElementById(ID);
    if (audioElement) {
      return audioElement.currentTime;
    } else return NaN;
  }

  var _getVolume = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = document.getElementById(ID);
    if (audioElement) {
      return audioElement.volume * 100;
    } else return NaN;
  }

  var _setCurrentTime = function(sec, audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = document.getElementById(ID);
    if (audioElement) {
      audioElement.currentTime = sec;
      return true;
    } else return false;
  }

  var _setVolume = function(percentage, audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = document.getElementById(ID);
    if (audioElement) {
      audioElement.volume = percentage / 100;
      return true;
    } else return false;
  }

  var _toggleMute = function(audioTagID) {
    var ID = audioTagID ? audioTagID : $musiqueAudioID;
    var audioElement = document.getElementById(ID);
    if (audioElement) {
      audioElement.muted = !audioElement.muted;
      return true;
    } else return false;
  }

  /* Musique Event Functions used in Event Listening */
  var __playAudio__ = function(event) {
    if (_play && _isFunction(_play)) {
      _play(event);
    } else {
      _playAudio();
    }
  }

  var __pauseAudio__ = function(event) {
    if (_pause && _isFunction(_pause)) {
      _pause(event);
    } else {
      _pauseAudio();
    }
  }

  var __stopAudio__ = function(event) {
    if (_stop && _isFunction(_stop)) {
      _stop(event);
    } else {
      _stopAudio();
    }
  }

  var __forwardAudio__ = function(event) {
    if (_forward && _isFunction(_forward)) {
      _forward(event);
    } else {
      _forwardAudio();
    }
  }

  var __backwardAudio__ = function(event) {
    if (_backward && _isFunction(_backward)) {
      _backward(event);
    } else {
      _backwardAudio();
    }
  }

  /* Musique object member functions */

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
  
  /* Render Musique Player */
  var renderElement = document.getElementById(_render);
  
  switch(_type) {
    case 'default':
      appendNode(renderElement, 'audio', {
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
        if (!params.height) { _height += $buttonHeight; }
      } else {
      
      }
      _appendNode(renderElement, 'audio', {
        class: 'musique-audio',
        id: $musiqueAudioID,
        attr: { src: _sourceURL },
        child: []
      });
      _appendNode(renderElement, 'div', {
        class: 'musique musique-player',
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