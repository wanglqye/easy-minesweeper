<script setup lang="ts">
import { onMounted, ref } from 'vue';

const el = ref<HTMLCanvasElement>()

const WIDTH = 600
const HEIGHT = 600

interface Point{
  x:number,
  y:number
}

interface Branch {
  start:Point,
  length:number,
  theta:number
}

function init(){
  const canvas = el.value!
  const ctx = canvas.getContext('2d')!
  ctx.strokeStyle = "pink"

  const branch:Branch = {
    start:{ x:WIDTH /2,y:HEIGHT},
    length:40,
    theta:-Math.PI / 2
  }
  step(branch)
  // lineTo(startPoint,endPoint)
  // lineTo(endPoint,{x:WIDTH/2+50,y:10})
  
}


function step(b:Branch){
  const end = getBranch(b)
  drawBranch(b)
  const endPoint = {
    x:WIDTH/2,
    y:HEIGHT/2
  }
  if(Math.random() < 0.5){
    step( {
      start: end,
      length: b.length,
      theta: b.theta - 0.2
    })
  }
  if(Math.random() < 0.5){
    step({
      start: end,
      length: b.length,
      theta: b.theta + 0.2
    })
  }

  // let leftPoint = {
  //   start: end,
  //   length: 100,
  //   theta: b.theta - 0.1
  // }

  // drawBranch(leftPoint)

  // let rightPoint = {
  //   start: end,
  //   length: 100,
  //   theta: b.theta + 0.1
  // }
  // drawBranch(rightPoint)
}

function lineTo(p1:Point,p2:Point){
  const canvas = el.value!
  const ctx = canvas.getContext('2d')!
  ctx.beginPath()
  ctx.moveTo(p1.x,p1.y)
  ctx.lineTo(p2.x,p2.y)
  ctx.stroke()
}

function getBranch(b:Branch){
  const { start,length,theta } = b
  return {
     x:start.x +length * Math.cos(theta),
      y:start.y +length * Math.sin(theta),
  }
}

function drawBranch(b:Branch){
  const { start,length,theta } = b
  // const end = {
  //   x:start.x +length * Math.cos(theta),
  //   y:start.y +length * Math.sin(theta),
  // }
  lineTo(start,getBranch(b))
}

onMounted(() => {
  init()
})
</script>

<template>
    <canvas ref="el" width="500" height="500 " style="border: 1px solid #fff"></canvas>
    <div>hi</div>
</template>

<style scoped>
</style>
