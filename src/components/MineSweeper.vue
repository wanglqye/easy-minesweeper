<template>
    <div class="box  flex-row">
        <div v-for="row,y in state" :key="y">
            <MineBlock
                v-for="block,x in row"
                :key="x"
                :block="block"
                @click="clickBlock(block)"
             />
        </div>
    </div>
</template>

<script lang='ts' setup>
import { reactive } from 'vue';
import MineBlock from './MineBlock.vue'
import type { BlockState } from '../types'

const WIDTH = 10
const HEIGHT = 10

const diretions = [
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
]
const state = reactive(
    Array.from({ length:HEIGHT},(_,y) =>
        Array.from({ length: WIDTH }, (_, x): BlockState => (
            {
                x,
                y,
                adjacentMines: 0,
                revealed: false
            }
        ))
    )
)

const clickBlock = (block:BlockState) => {
    console.log('ss',block)
    block.revealed = true
    if(block.mine){
        gameOver('lost')
    }
    expendZero(block)
}

const expendZero = (block:BlockState) => {
    if(block.adjacentMines) return;
    getSiblings(block)
}
// 获取相邻格子
const getSiblings = (block:BlockState) => {
   return diretions.map(([dx,dy]) => {
        const x2 = block.x + dx
        const y2 = block.y + dy
    })
}

const gameOver = (status:string) =>{
    alert(status)
}
</script>

<style  scoped>
.box{
    width: 300px;
    height: 300px;
    background: pink;
}
.flex-row{
    display: flex;

}
</style>
