<template>
  <div class="grid" :class="{ editing: isEditing }" @wheel="onWheel">
    <svg class="grid__background" ref="background">
      <defs>
        <pattern
          id="gridPattern"
          :width="tileSize" :height="tileSize"
          :x="position.x" :y="position.y"
          :patternTransform="`scale(${zoom})`"
          patternUnits="userSpaceOnUse">
          <rect
            class="grid__pattern"
            :x="0" :y="0"
            :width="tileSize" :height="tileSize"
          />
        </pattern>
      </defs>
      <rect class="grid__background" width="150%" height="150%" fill="url(#gridPattern)" />
    </svg>
    <div
      class="grid__foreground"
      :style="{
        transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
      }">
      <Tile
        v-for="(tile, index) in tiles"
        :key="index"
        ref="tiles"
        :tile="tile"
        :position="getTilePosition(tile)"
        :grid-zoom="zoom"
        :size="tileSize"
        :cells="tileCells"
        :time="time"
        @grab="() => onTileGrab(index)"
        @release="(offset) => onTileRelease(index, offset)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DragHandler, { DragEvent } from 'drag-handler';
// TODO: Move to separate repo
import Vector2 from 'drag-handler/Vector2';
import { clamp, roundToNearest } from '../math-utils';
import TileComponent from './Tile.vue';
import Tile from '../models/Tile';

export type GridEvent = {
  originalEvent: Event;
  gridPosition: Vector2;
};

@Component({
  components: {
    Tile: TileComponent,
  },
})
export default class Grid extends Vue {
  @Prop() private tiles!: Tile[];

  @Prop() private tileSize!: number;

  @Prop() private tileCells!: number;

  @Prop() private time!: number;

  @Prop({ default: 0.1 }) private minZoom!: number;

  @Prop({ default: 2 }) private maxZoom!: number;

  @Prop({ default: 0.1 }) private zoomSpeed!: number;

  position = new Vector2();

  zoom = 1;

  dragHandler: DragHandler|null = null;

  isEditing = false;

  isDragging = false;

  mounted() {
    this.dragHandler = new DragHandler(this.$refs.background as Element, {
      onDragMove: this.onGridMove.bind(this),
      onDragCancel: this.onGridClick.bind(this),
    });
  }

  getGridPosition(position: Vector2): Vector2 {
    return new Vector2(
      roundToNearest(position.x, this.tileSize) / this.tileSize,
      roundToNearest(position.y, this.tileSize) / this.tileSize,
    );
  }

  getTilePosition(tile: Tile) {
    return new Vector2(
      tile.gridX * this.tileSize,
      tile.gridY * this.tileSize,
    );
  }

  windowToView(position: Vector2) {
    const background = this.$refs.background as Element;
    const bgRect = background.getBoundingClientRect();
    return position.subtract(new Vector2(bgRect.left, bgRect.top));
  }

  zoomToTarget(delta: number, target: Vector2) {
    const updatedZoom = clamp(this.zoom + delta, this.minZoom, this.maxZoom);
    const prevScaledPointerPosition = target.multiplyByScalar(1 / this.zoom);
    const scaledPointerPosition = target.multiplyByScalar(1 / updatedZoom);
    const originOffset = scaledPointerPosition.subtract(prevScaledPointerPosition);
    this.zoom = updatedZoom;
    this.position = this.position.add(originOffset);
  }

  getTileAtPosition(x: number, y: number): Tile|null {
    return this.tiles.find((tile) => tile.gridX === x && tile.gridY === y) || null;
  }

  onWheel(event: WheelEvent) {
    if (event.deltaY) {
      this.zoomToTarget(
        (event.deltaY > 1 ? -1 : 1) * this.zoomSpeed,
        this.windowToView(new Vector2(event.clientX, event.clientY)),
      );
    }
    if (event.deltaX) {
      this.position = this.position.add(new Vector2(-event.deltaX, 0));
    }
  }

  onGridClick({ pointerEvent }: DragEvent) {
    const pointerOffset = new Vector2(pointerEvent.offsetX, pointerEvent.offsetY);
    this.$emit('click', {
      event: pointerEvent,
      gridPosition: this.getGridPosition(this.position.add(pointerOffset)),
    });
  }

  onGridMove({ dragOffsetDelta }: DragEvent) {
    if (dragOffsetDelta) {
      const delta = dragOffsetDelta.multiplyByScalar(1 / this.zoom);
      this.position = this.position.add(delta);
    }
  }

  onTileGrab(tileIndex: number) {
    this.isEditing = true;
  }

  onTileRelease(tileIndex: number, offset: Vector2) {
    this.isEditing = false;
    const tile = this.tiles[tileIndex];
    const gridPosition = this.getGridPosition(new Vector2(
      tile.gridX + offset.x,
      tile.gridY + offset.y,
    ));
    const blockingTile = this.getTileAtPosition(gridPosition.x, gridPosition.y);
    if (!blockingTile) {
      tile.gridX = gridPosition.x;
      tile.gridY = gridPosition.y;
    }
  }
}
</script>

<style scoped>
.grid {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.grid.editing .grid__pattern {
  opacity: 1;
}

.grid__background {
  width: 100%;
  height: 100%;
}

.grid__pattern {
  stroke: white;
  stroke-width: 1;
  opacity: 0.5;
  transition: opacity 250ms ease-in-out;
}

.grid__foreground {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transform-origin: top left;
}

.grid__foreground > * {
  pointer-events: auto;
}
</style>
