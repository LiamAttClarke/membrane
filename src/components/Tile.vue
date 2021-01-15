<template>
  <div
    class="tile"
    :class="{ dragging: isDragging }"
    :style="{
      left: `${tilePosition.x}px`,
      top: `${tilePosition.y}px`,
    }">
    <canvas
      class="tile__canvas"
      ref="canvas"
      :width="size"
      :height="size"></canvas>
    <div
      class="tile__overlay"
      :style="{
        borderRadius: `${cellWidth / 2}px`,
      }"></div>
  </div>
</template>

<style scoped>
.tile {
  position: absolute;
}

.tile:hover .tile__overlay {
  background-color: rgba(255, 255, 255, 0.25);
}

.tile.dragging .tile__overlay {
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.5);
}

.tile__canvas {
  display: block;
}

.tile__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
  transition: background-color 250ms ease-in-out;
}
</style>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import DragHandler, { DragEvent, DragState } from 'drag-handler';
import Vector2 from 'drag-handler/Vector2';
import { clamp } from '../math-utils';
import TileModel from '../models/Tile';

const NEGATIVE_COLOR = '#FFE600';
const POSITIVE_COLOR = '#FFFFFF';
const CELL_SCALE = 0.9;

@Component
export default class Tile extends Vue {
  @Prop() private tile!: TileModel;

  @Prop() private size!: number;

  @Prop() private cells!: number;

  @Prop() private position!: Vector2;

  @Prop() private gridZoom!: number;

  @Prop() private time!: number;

  dragHandler: DragHandler|null = null;

  dragOffset: Vector2 = new Vector2();

  context: CanvasRenderingContext2D|null = null;

  paused = false;

  get cellWidth(): number {
    return this.size / this.cells;
  }

  get tilePosition(): Vector2 {
    return this.position.add(this.dragOffset);
  }

  get isDragging(): boolean {
    return this.dragHandler?.dragState === DragState.Dragging;
  }

  mounted() {
    this.dragHandler = new DragHandler(this.$refs.canvas as Element, {
      onDragGrab: this.onTileGrab.bind(this),
      onDragMove: this.onTileMove.bind(this),
      onDragCancel: this.onTileRelease.bind(this),
      onDragEnd: this.onTileRelease.bind(this),
    });
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    this.context = canvas.getContext('2d');
    this.draw();
  }

  clear() {
    if (this.context) {
      this.context.clearRect(0, 0, this.size, this.size);
    }
  }

  @Watch('time')
  draw() {
    if (!this.context || this.paused) return;
    this.clear();
    for (let x = 0; x < this.cells; x += 1) {
      for (let y = 0; y < this.cells; y += 1) {
        const halfCellWidth = this.cellWidth / 2;
        const cellX = (x * this.cellWidth) + halfCellWidth;
        const cellY = (y * this.cellWidth) + halfCellWidth;
        const cellValue = this.getCellValue(x, y);
        const radius = this.getCellRadius(cellValue);
        // draw
        this.context.beginPath();
        this.context.arc(cellX, cellY, radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = cellValue > 0 ? POSITIVE_COLOR : NEGATIVE_COLOR;
        this.context.fill();
      }
    }
  }

  getCellValue(x: number, y: number): number {
    const scale = this.tile.eval(
      x,
      y,
      this.time,
    );
    return clamp(scale, -1, 1);
  }

  getCellRadius(cellValue: number) {
    return Math.abs(cellValue * CELL_SCALE) * (this.cellWidth / 2);
  }

  onTileGrab(event: DragEvent) {
    this.$emit('grab');
  }

  onTileMove({ dragOffsetDelta }: DragEvent) {
    if (dragOffsetDelta) {
      this.paused = true;
      const delta = dragOffsetDelta.multiplyByScalar(1 / this.gridZoom);
      this.dragOffset = this.dragOffset.add(delta);
    }
  }

  onTileRelease() {
    this.clear();
    this.paused = false;
    this.$emit('release', this.dragOffset);
    this.dragOffset = new Vector2();
  }
}
</script>
