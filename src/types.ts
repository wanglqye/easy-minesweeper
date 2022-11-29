export interface BlockState {
    x: number
    y: number
    revealed: boolean
    mine?: boolean
    flagged?: boolean
    adjacentMines: number
}

// sweepstakes
// 奖项数据 「九宫格抛弃抽奖按钮占去一个外，还剩下8个」
export type Tuple8<TItem> = [TItem,...TItem[]] & { length: 8 }

// 抽奖运动时间
export type CallbackType = (arg:LDataType) => void

export interface LType {
    data:Tuple8<LDataType>
    time?:number
    useCustomProbability?:boolean
    callback?:CallbackType
}

export interface LDataType {
    id:string | number
    name:string
    probability?:number
}
