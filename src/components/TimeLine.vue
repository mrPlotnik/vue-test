<template>
  <div class="container">

    <div class="task">
      <p>
        Необходимо написать компонент, который будет отображать таймлайн и картинку превью. На вход будет предоставлена продолжительность таймлайна и объект данных превью.
      </p>
      <p>
        При наведении на таймлайн, над курсором пользователя отобразить изображение превью данного отрезка и под изображением число в секундах текущего превью (Важно: должна быть видна только часть изображения из чанка.
      </p>
      <p>
        Плюсом будет вывести секунды в удобочитаемый вид
      </p>
    </div>

    <div
      class="timeline-outer"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
      @blur="onMouseLeave"
    >

      <div class="timeline-inner"></div>

      <div
        v-if="previewVisible"
        class="preview-container"
        :style="previewContainerPosition"
      >
        <div
          class="preview-image"
          alt=""
          :style="previewImageStyle"
        ></div>
        <div class="preview-time">{{ formattedTime }}</div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  props: {
    mosaic: { type: Object, required: true },
    duration: { type: Number, required: true },
  },
  data() {
    return {
      formattedTime: '',
      currentChunkIndex: null,
      currentImageIndex: null,
      previewVisible: false,
      previewLeft: 0,
    };
  },
  computed: {
    // Положение контейнера превью относительно таймлайна
    previewContainerPosition() {
      return {
        top: `calc(-${this.mosaic.snapshot_height}px - 1.25em)`,
        left: `${this.previewLeft}px`,
      };
    },
    currentChunkLink() {
      return this.mosaic.tile[this.currentChunkIndex];
    },
    backgroundPositionX() {
      return this.mosaic.snapshot_width * this.currentImageIndex;
    },
    previewImageStyle() {
      return {
        width: `${this.mosaic.snapshot_width}px`,
        height: `${this.mosaic.snapshot_height}px`,
        'background-image': `url(${this.currentChunkLink})`,
        'background-position-x': `-${this.backgroundPositionX}px, 0px`,
      };
    },
  },
  methods: {
    onMouseMove(e) {
      // Размер и позиция таймлайна
      const rect = e.currentTarget.getBoundingClientRect();
      // От левого края таймлайна до курсора
      const x = e.clientX - rect.left;
      // На каком проценте таймлайна находится курсор
      const percent = Math.floor((x / rect.width) * 100);
      // Определяем секунду
      const seconds = Math.floor(percent % 60);
      // Определяем минуту
      const minutes = Math.floor((percent / 60) % 60);
      this.formattedTime = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;

      // Всего картинок
      const totalTiles = this.mosaic.cols * this.mosaic.rows * this.mosaic.files;
      // Индекс картинки относительно положения курсора
      const index = Math.floor(((percent / 100) * totalTiles) % totalTiles);

      // Определяем индекс чанка и картинки в чанке
      this.chunkAndImageIndex(index);

      // Половина длины каринки
      const prewiewHalfWidth = this.mosaic.snapshot_width / 2;
      // Положение курсора на таймлайне от которой начинается прилипание превью
      const rightZone = rect.width - prewiewHalfWidth;
      // Крайнее правое положение превью
      const previewRightPosition = rect.width - this.mosaic.snapshot_width;

      // Положение контейнера превью (от левого края)
      if (x < prewiewHalfWidth) this.previewLeft = 0;
      else if (x > prewiewHalfWidth && x < rightZone) this.previewLeft = x - prewiewHalfWidth;
      else if (x > rightZone) this.previewLeft = previewRightPosition;

      this.previewVisible = true;
    },

    chunkAndImageIndex(index) {
      const [integerPart, fractionalPart] = (index / this.mosaic.files).toFixed(1).toString().split('.');
      this.currentChunkIndex = +integerPart;
      this.currentImageIndex = +fractionalPart;
    },
    formatTime(unit) {
      return unit.toString().padStart(2, '0');
    },
    onMouseLeave() {
      this.previewVisible = false;
    },
  },
};
</script>

<style scoped lang="scss">
.task {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-bottom: 2em;
  font-size: 0.75em;
  color: #fff;
}
.timeline {
  &-outer {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 10px;
    padding: 1em 0;
    cursor: pointer;
    &:hover {
      .timeline-inner {
        height: 10px;
      }
    }
  }
  &-inner {
    width: 100%;
    height: 5px;
    border-radius: .5em;
    background-color: #888888;
    transition: height, .1s ease;
  }
}
.preview {
  &-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1.5em;
    border-radius: .5em;
  }
  &-image {
    border-radius: .5em;
    border: 2px solid #fff;
    box-sizing: content-box;
    background-color: #fff;
  }
  &-time {
    position: absolute;
    bottom: .25em;
    border-radius: .5em;
    font-weight: bold;
    font-size: 12px;
    color: #fff;
    text-shadow: 0px 0px 2px rgba(0, 0, 0, .85);
  }
}
</style>
