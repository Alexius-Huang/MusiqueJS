# Musique JS
Swiftly Parse Your Audio Player
Author: Maxwell Alexius

## Getting Started
Download and clone the repository, then include the files (assume you placed the files into assets folder) :

```html
<link rel="stylesheet" href="./assets/css/musique.css">
<script src="./assets/css/musique.js"></script>
```

## Parse Basic HTML5 Audio
To parse out plain HTML5 audio API, it is simple as below, specify your render element's ID and the source URL of the audio :

```js
<div id="audio-player"></div>

<script>
  var musique = new Musique({
    render: 'audio-player',
    sourceURL: AUDIO_SOURCE_URL
  });
</script>
```

You can also render 'player' type :

```js
<div id="audio-player"></div>

<script>
  var musique = new Musique({
    render: 'audio-player',
    sourceURL: AUDIO_SOURCE_URL,
    type: 'player'
  });
</script>
```