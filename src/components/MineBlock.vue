<template>
    <div
        class="btn"
        @mousedown="whiceButtons"
        :class="getBlcokClass(props.block)">
        <div>
            <!-- {{block.adjacentMines}} -->
        </div>
    </div>
</template>

<script lang='ts' setup>
import type { BlockState } from '../types'
const props = defineProps<{ block: BlockState }>()
const whiceButtons = (event:MouseEvent) => {
    event.cancelBubble = true;
    console.log(event.buttons)
    if(event.buttons == 3){
        console.log('haha')
    }
}
const getBlcokClass = (block:BlockState) => {
    if(block.flagged){
        return 'bg-red'
    }
    if(!block.revealed){
        return 'bg-black'
    }
    return 'bg-lightgreen'
}
</script>

<style scoped>
.btn {
    width: 28px;
    height: 28px;
    background-color: saddlebrown;
    border: 1px solid white
}
.bg-red{
    background-color: red;
}
.bg-black{
    background-color: gray;
}
.bg-lightgreen{
    background-color: lightcoral;
}
</style>
