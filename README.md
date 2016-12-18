# Musique JS
Swiftly Parse Your Audio Player
Author: Maxwell Alexius

## Getting Started
Download and clone the repository, then include the files (assume you placed the files into assets folder) :

```html
<link rel="stylesheet" href="./assets/css/musique.css">
<script src="./assets/js/musique.js"></script>
```

## Parse Basic Audio Player
To parse out plain HTML5 audio API, it is simple as below, specify your render element's ID and the source URL of the audio :

```javascript
<div id="audio-player"></div>

<script>
  var musique = new Musique({
    render: 'audio-player',
    sourceURL: AUDIO_SOURCE_URL
  });
</script>
```

<div style="text-align: center;"><img src="./readmeImages/img_001.png" alt="Basic HTML5 Audio Player" /></div>

You can also render 'player' type, it will have buttons that controls the player :

```javascript
<div id="audio-player"></div>

<script>
  var musique = new Musique({
    render: 'audio-player',
    sourceURL: AUDIO_SOURCE_URL,
    type: 'player'
  });
</script>
```

<div style="text-align: center"><img src="./readmeImages/img_002.png" alt="Player type basic"></div>

You can assign timer into your player :

```javascript
<div id="audio-player"></div>

<script>
  var musique = new Musique({
    render: 'audio-player',
    sourceURL: AUDIO_SOURCE_URL,
    type: 'player',
    timer: true
  });
</script>
```

<div style="text-align: center"><img src="./readmeImages/img_003.png" alt="Player type basic"></div>

## Style Audio Player

So far it does not contains only these small tricks, it can also customize the style by adding style option with an object type of value. For example :

```javascript
<script>
  var musique = new Musique({
    render: 'example',
    sourceURL: AUDIO_SOURCE_URL,
    type: 'player',
    style: {
      bgc: '#0a6298',
      borderRadius: 40,
      btnRadius: 15,
      btnTextColor: '#b5cfe0',
      btnBgc: '#5391b6',
      btnHoverTextColor: '#eee',
      btnHoverBgc: '#84b0cb',
    }
  });
</script>
```

<div style="text-align: center"><img src="./readmeImages/img_004.png" alt="Player type basic"></div>

For another example :

```javascript
<script>
  var musique = new Musique({
    render: 'example',
    sourceURL: AUDIO_SOURCE_URL,
    type: 'player',
    timer: true,
    timerPosition: 'left',
    showButtonIcon: true,
    buttonIconType: 'white',
    style: {
      bgc: '#fb5c5c',
      btnSpacing: 7,
      btnTextColor: '#eee',
      btnBgc: '#fc8585',
      btnHoverTextColor: '#eee',
      btnHoverBgc: '#fdadad',
      timerSpacing: 10,
      timerColor: '#eee',
      timerBgc: '#fc8585',
      timerBorder: 'none'
    }
  });
</script>
```

<div style="text-align: center"><img src="./readmeImages/img_005.png" alt="Player type basic"></div>

Here are available styles you can append

| Style Options | Format | Default Value | Description | 
| ------------- |:------:|:-------------:|-------------|
| width | number | Depend on customization | Width of the music player in "pixels" |
| height | number | Depend on custimization | Height of the music player in "pixels" |
| padding | number | 8 | Padding of the music player in "pixels" |
| bgc | string | '#555' | Background color of the music player with hex color format such as "#abcdef" or via "rgb()" or "rgba()" color |
| borderRadius | number | 5 | The border radius of the music player in "pixels" |
| btnSpacing | number | 3 | The left and right margin between buttons in "pixels" |
| btnRadius | number | 3 or '50%' | Radius of the button in 'pixels'. if the roundedButton option is set to true, btnRadius will be automatically set to '50%' |
| btnTextColor | string | '#555' | Text color of the button with hex color format such as "#abcdef" or via "rgb()" or "rgba()" color |
| btnBgc | string | '#ccc' | Background color of the button with hex color format such as "#abcdef" or via "rgb()" or "rgba()" color |
| btnHoverTextColor | string | '#777' | Text color of the button when hovering with hex color format such as "#abcdef" or via "rgb()" or "rgba()" color |
| btnHoverBgc | string | '#fff' | Background color of the button when hovering with hex color format such as "#abcdef" or via "rgb()" or "rgba()" color |
| btnTransitionSec | number | 0 | Transition time of the background color and text color of the button when hovered |
| timerSpacing | number | 10 | The left and right margin of the timer in "pixels" |
| timerRadius | number | 3 | The border radius of the timer in "pixels" |
| timerColor | string | '#aaa' | Text color of the timer with hex color format such as "#abcdef" or via "rgb()" or "rgba()" color |
| timerBgc | string | '#333' | Background color of the timer with hex color format such as "#abcdef" or via "rgb()" or "rgba()" color |
| timerBorder | string | '1px solid #aaa' | The border of the timer |