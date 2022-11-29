<template>
    <div class="lottery-base">
        <div
            v-for="item in realViewData"
            class="lottery-item"
            :class="{ 'is-btn': item.id === '__btn__', 'active': item.id != '__btn__' && prizeActiveState[`active${item.id}`] }"
            :key="item.id"
            @click="start(item.id)">{{item.name}}</div>
    </div>
</template>

<script lang='ts' setup>
import type { Tuple8, CallbackType, LType, LDataType } from '../types'
import data from '../data'
import { ref } from 'vue';

const realViewData = [
    ...data.slice(0,4),
    {
        'id':'__btn__',
        'name':'抽奖'
    },
    ...data.slice(4)
]

let prizeActiveState = ref()

prizeActiveState.value= data.reduce((pre,cur) => {
   return {
        ...pre,
        ['active' + cur.id]: false
    }
},{},)

// 整个开关
let flag = ref(true)

const start = (id:string | number) => {
    console.log('flag', flag.value)

    if(id != '__btn__') return;
    if(!flag.value) return;
    flag.value = false



    // 顺时针
    const path = [0, 1, 2, 4, 7, 6, 5, 3];
    let curIndex = 0;
    let stop = false;
    const luckyRewardsIndex = Math.floor(Math.random() * path.length);
    setTimeout(() => {
        stop = true;
    }, 3000);

    const intervalId = setInterval(() => {
        curIndex++;
        if(curIndex > 7)
            curIndex = 0;
        if (stop && curIndex === luckyRewardsIndex){
            flag.value = true
            clearInterval(intervalId)
        }


        // 设置最后item 为active
        prizeActiveState.value = data.reduce((pre, cur) => {
            if (cur.id == data[path[curIndex]].id) {
                return {
                    ...pre,
                    ['active' + cur.id]: true,
                }
            } else {
                return {
                    ...pre,
                    ['active' + cur.id]: false,
                }
            }
        }, {})
    },100)

    console.log(prizeActiveState)

}


</script>

<style scoped>
.lottery-base {
  display: flex;
  width: 300px;
  height: 300px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-self: space-between;
}
  .lottery-item {
    text-align: center;
    line-height: 90px;
    width: 90px;
    height:90px;
    border-radius: 5px;
    background-color: rgb(222, 220, 220);
  }
  .active{
    background-color: pink;
  }

  .is-btn {
    background-color: rgb(33, 194, 140);
    color: azure;
    cursor: pointer;
  }
</style>
