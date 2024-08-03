<template>
  <div id="app">
    <TimeLine
      :duration="duration"
      :mosaic="mosaic"
    />
  </div>
</template>

<script>
import TimeLine from '@/components/TimeLine.vue';

export default {
  name: 'App',
  components: {
    TimeLine,
  },

  data() {
    return {
      duration: 97620,
      mosaic: {
        cols: 10,
        rows: 1,
        fps: 1,
        snapshot_width: 164,
        snapshot_height: 93,
        files: 10,
        tile: [
          'https://images.matreshka.tv/video/pQOAELWgF-I/_ADAU-F0WPQ/tile-0000.jpeg',
          'https://images.matreshka.tv/video/pQOAELWgF-I/_ADAU-F0WPQ/tile-0001.jpeg',
          'https://images.matreshka.tv/video/pQOAELWgF-I/_ADAU-F0WPQ/tile-0002.jpeg',
          'https://images.matreshka.tv/video/pQOAELWgF-I/_ADAU-F0WPQ/tile-0003.jpeg',
          'https://images.matreshka.tv/video/pQOAELWgF-I/_ADAU-F0WPQ/tile-0004.jpeg',
          'https://images.matreshka.tv/video/pQOAELWgF-I/_ADAU-F0WPQ/tile-0005.jpeg',
          'https://images.matreshka.tv/video/pQOAELWgF-I/_ADAU-F0WPQ/tile-0006.jpeg',
          'https://images.matreshka.tv/video/pQOAELWgF-I/_ADAU-F0WPQ/tile-0007.jpeg',
          'https://images.matreshka.tv/video/pQOAELWgF-I/_ADAU-F0WPQ/tile-0008.jpeg',
          'https://images.matreshka.tv/video/pQOAELWgF-I/_ADAU-F0WPQ/tile-0009.jpeg',
        ],
      },
    };
  },
};
</script>
