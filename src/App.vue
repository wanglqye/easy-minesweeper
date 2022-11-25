<script setup lang="ts">
import {  onMounted, ref } from 'vue';

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
    theta:- Math.PI / 2
  }
  step(branch)
  // lineTo(startPoint,endPoint)
  // lineTo(endPoint,{x:WIDTH/2+50,y:10})
  
}

// 把所有step 添加到pending 等待执行
let pendingTasks: Function[] = []

// 动画
function frame() {
  // 浅拷贝一下pendingTasks
  const tasks = [...pendingTasks]
  pendingTasks.length = 0
  tasks.forEach(fn => {
    fn()
  } )
}

// 通过requestAnimationFrame去执行frame（递归一下
let framCount = 0
function startFrame(){
  requestAnimationFrame(() => {
    framCount += 1
    if(framCount % 10 ){
      frame()
      startFrame()
    }
  })
  
}

function step(b:Branch,depth=0){
  const end = getBranch(b)
  drawBranch(b)
  if(depth < 4 || Math.random() < 0.5){
    // 添加pending
    pendingTasks.push(() => 
      step({
        start: end,
        length: b.length +( Math.random() * 10 - 5),
        theta: b.theta - 0.4 * Math.random()
      })
    )
  }
  if (depth < 4 || Math.random() < 0.5){
    pendingTasks.push(() => 
      step({
        start: end,
        length: b.length + (Math.random() * 10 - 5),
        theta: b.theta + 0.4 * Math.random()
      })
    )
  }
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
  lineTo(start,getBranch(b))
}

onMounted(() => {
  let num = 0;
  let timer =  setInterval(() => {
    const canvas = el.value!
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    pendingTasks.length = 0
    num +=1;
    if(num >= 5) {
      clearInterval(timer)
    }
    init()
    startFrame() 
  }, 2000);

 
  // haha.value?.innerHTML = res
})


</script>

<template>
    <canvas ref="el" width="600" height="600" style="border: 1px solid #fff"></canvas>
    <div>hi</div>

    <div id="test" ></div>
</template>

<style scoped>
</style>
