/**
 * 计算价值
 * @param {*} createTime 创建时间
 * @param {*} count 字数
 * @param {*} viewTimes 查看次数
 * @param {*} likeTimes 点赞次数
 * @param {*} replyTimes 回复次数
 * @param {*} threshold 权值
 * 创建时间：2017/8/28
 * 创建人： 于震
 */
function estimate(createTime, count, viewTimes, likeTimes, replyTimes, threshold){
    const min = 1, max = 1000;
    const countCoin = (count / 100);
    // const disTime = new Date().getTime() - createTime;
    // const second = disTime / 1000;
    // const minute = second / 60;
    // const hour = minute / 60;
    // const day = hour / 24;
    // const month = day / 30;
    // const year = month / 12;
    // const total = ((viewTimes / day) * 0.1 + (likeTimes / day) * 0.5 + (replyTimes / day)) * 3;
    const total = (viewTimes * 0.1 + likeTimes * 0.5 + replyTimes);
    // const dayCoin = day / 3;
    // const hourCoin = (total / hour) * 100;
    const totalCoin = Math.floor((total + countCoin) * 1.11);
    if(totalCoin < min)
        return min+threshold;
    else if(totalCoin+threshold > max)
        return max+threshold;
    else
        return totalCoin + threshold;
}

export default estimate;