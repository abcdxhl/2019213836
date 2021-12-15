var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext("2d");
let gridSize = 70;
let canvasWidth = ctx.canvas.width;
let canvasHeight = ctx.canvas.height;
let xLineTotal = Math.floor(canvasHeight / gridSize);
let yLineTotal = Math.floor((canvasWidth - 230) / gridSize);
for (let i = 0; i <= xLineTotal; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * gridSize - 0.5);
    ctx.lineTo(canvasWidth - 230, i * gridSize - 0.5);
    ctx.strokeStyle = '#eee';
    ctx.stroke();
}
for (let i = 0; i <= yLineTotal; i++) {
    ctx.beginPath();
    ctx.moveTo(i * gridSize - 0.5, 0);
    ctx.lineTo(i * gridSize - 0.5, canvasHeight);
    ctx.strokeStyle = '#eee';
    ctx.stroke();
}
//第一层地图
var map1 = [
    ["14", "0", "11", "11", "11", "0", "0", "0", "0", "0", "0"],
    ["2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "0"],
    ["7", "0", "0", "3", "0", "2", "12", "5", "0", "2", "0"],
    ["6", "9", "0", "2", "0", "2", "13", "7", "0", "2", "0"],
    ["2", "3", "2", "2", "0", "2", "2", "2", "3", "2", "0"],
    ["0", "0", "0", "2", "0", "3", "11", "11", "11", "2", "0"],
    ["6", "10", "0", "2", "0", "2", "2", "2", "2", "2", "0"],
    ["2", "3", "2", "2", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "2", "2", "3", "2", "2", "2", "3", "2"],
    ["7", "0", "5", "2", "5", "0", "5", "2", "0", "11", "0"],
    ["7", "0", "5", "2", "0", "1", "0", "2", "11", "8", "11"],
];
//第二层地图
var map2 = [
    ["5", "7", "5", "2", "16", "17", "18", "2", "0", "7", "0"],
    ["5", "7", "5", "2", "0", "0", "0", "2", "5", "0", "8"],
    ["6", "11", "6", "2", "0", "0", "0", "2", "0", "10", "0"],
    ["2", "3", "2", "2", "2", "4", "2", "2", "2", "3", "2"],
    ["0", "0", "0", "3", "0", "11", "0", "0", "9", "0", "0"],
    ["0", "0", "0", "2", "2", "2", "2", "2", "2", "2", "2"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "5"],
    ["0", "2", "2", "3", "2", "2", "2", "3", "2", "2", "0"],
    ["0", "2", "5", "11", "5", "2", "5", "11", "5", "2", "0"],
    ["0", "2", "0", "8", "0", "2", "0", "8", "0", "2", "1"],
    ["14", "2", "0", "12", "0", "2", "0", "13", "0", "2", "15"],
];
//第三层地图
var map3 = [
    ["0", "0", "0", "0", "0", "19", "0", "0", "0", "0", "0"],
    ["2", "2", "2", "2", "0", "0", "0", "2", "2", "2", "2"],
    ["9", "9", "9", "2", "2", "0", "2", "2", "9", "9", "9"],
    ["12", "10", "0", "4", "12", "8", "13", "4", "0", "10", "13"],
    ["2", "2", "2", "2", "8", "8", "8", "2", "2", "2", "2"],
    ["0", "0", "9", "2", "7", "7", "7", "2", "9", "12", "9"],
    ["0", "10", "0", "2", "2", "0", "2", "2", "0", "10", "0"],
    ["7", "0", "0", "2", "2", "0", "2", "2", "0", "0", "0"],
    ["0", "2", "3", "2", "2", "4", "2", "2", "3", "2", "3"],
    ["1", "2", "0", "2", "8", "0", "8", "2", "0", "2", "0"],
    ["15", "2", "0", "11", "0", "0", "0", "11", "0", "2", "8"],
];
//map为当前地图的指针
var map = map1;
//主角类
var people = {
    hp: 100, //生命值
    atk: 10, //攻击力
    def: 10, //防御力
    money: 0, //钱
    yellowkey: 0, //黄钥匙
    bluekey: 0, //银钥匙
    x0: 10, //当前坐标
    y0: 5,
    floor: 1, //当前楼层
    ff: 0, //标记是否击败骷髅王
    getred: function() { //喝下红药水
        this.hp += 100;
    },
    getblue: function() { //喝下蓝药水
        this.hp += 50;
    },
    getyellowkey: function() { //获得黄钥匙
        this.yellowkey += 1;
    },
    getbluekey: function() { //获得银钥匙
        this.bluekey += 1;
    },
    useyellowkey: function() { //使用黄钥匙
        this.yellowkey -= 1;
    },
    usebluekey: function() { //使用银钥匙
        this.bluekey -= 1;
    },
    getatk: function() { //使用红水晶
        this.atk += 5;
    },
    getdef: function() { //使用蓝水晶
        this.def += 5;
    },
    getmoney: function(k) { //增加钱
        this.money += k;
    },
    buy: function() { //商店购买消耗
        this.money -= 100;
    },
    fight: function(k) { //对战
        var nn = k.hp / (this.atk - k.def);
        nn = Math.ceil(nn);
        console.log("战斗次数：" + nn);
        var hh = k.atk - this.def;
        if (hh < 0)
            hh = 0
        console.log("单次战斗伤害：" + hh);
        if (this.hp > nn * hh) { //可以战胜
            if (nn * hh == 0 && k.name == '9') //伤害过低
                this.hp -= 1;
            else if (nn * hh == 0 && k.name == '10') //伤害过低
                this.hp -= 5;
            else if (nn * hh == 0 && k.name == '11') //伤害过低
                this.hp -= 3;
            else //伤害正常
                this.hp -= nn * hh;
            console.log("可以战胜");
            this.getmoney(k.money);
            console.log("钱：" + me.money);
        } else { //无法战胜
            alert("无法战胜");
            me.ff = 1;
            console.log("无法战胜");
        }
    },
    reset: function() { //重置角色数据
        this.hp = 100;
        this.atk = 10;
        this.def = 10;
        this.money = 0;
        this.yellowkey = 0;
        this.bluekey = 0;
        this.x0 = 10;
        this.y0 = 5;
        this.floor = 1;
        this.ff = 0;
    }
};
//怪物类
var monster = {
    name: 0,
    hp: 0,
    atk: 0,
    def: 0,
    money: 10,
    set: function(n, a, b, c, d) { //初始化数据
        this.name = n;
        this.hp = a;
        this.atk = b;
        this.def = c;
        this.money = d;
    }
};
//生成主角实例
var me = Object.create(people);
//生成怪物实例
//骷髅
var monster_9 = Object.create(monster);
monster_9.set(9, 10, 15, 10, 20);
//骷髅骑士
var monster_10 = Object.create(monster);
monster_10.set(10, 10, 20, 15, 50);
//法师
var monster_11 = Object.create(monster);
monster_11.set(11, 10, 15, 5, 20);
//骷髅王
var monster_19 = Object.create(monster);
monster_19.set(19, 1000, 80, 20, 100);
//计时器
var ts = 0;
var tm = 0;

function timer() {
    ts = ts + 1;
    if (ts >= 60) {
        ts = 0;
        tm = tm + 1;
    }
    look();
}
var time = setInterval('timer()', 1000);
//地图输出
function look() {
    //清除上一次画的
    var w = canvas.width;
    var h = canvas.height;
    canvas.width = w;
    canvas.height = h;
    //输出地图
    for (x = 0; x < 11; x++)
        for (y = 0; y < 11; y++) {
            var img = document.getElementById(map[y][x]);
            ctx.drawImage(img, x * 70, y * 70);
        };
    img = document.getElementById("20");
    ctx.drawImage(img, 770, 0)
        //输出角色信息
    ctx.font = 30 + 'px Arial';
    ctx.fillText("第" + me.floor + "层", 800, 50);
    if (tm < 10 && ts < 10)
        ctx.fillText("时间:0" + tm + ":0" + ts, 800, 140);
    else if (tm >= 10 && ts < 10)
        ctx.fillText("时间:" + tm + ":0" + ts, 800, 140);
    else if (tm < 10 && ts >= 10)
        ctx.fillText("时间:0" + tm + ":" + ts, 800, 140);
    else if (tm >= 10 && ts >= 10)
        ctx.fillText("时间:" + tm + ":" + ts, 800, 140);
    ctx.fillText("生命值:" + me.hp, 800, 230);
    ctx.fillText("攻击力:" + me.atk, 800, 320);
    ctx.fillText("防御力:" + me.def, 800, 410);
    ctx.fillText("金币:" + me.money, 800, 500);
    ctx.fillText("黄钥匙:" + me.yellowkey, 800, 590);
    ctx.fillText("蓝钥匙:" + me.bluekey, 800, 680);
    //输出存档和读档按钮
    ctx.rect(800, 700, 80, 65); //存档按钮
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.rect(890, 700, 80, 65); //读档按钮
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.fillText("存档", 810, 740);
    ctx.fillText("读档", 900, 740);
    ctx.stroke();
}
look();
//主角移动取代的坐标内容
var n = 0;
//主角退回但是当前位置未填充
function reback(k) {
    if (k == 1)
        me.y0 = me.y0 + 1;
    else if (k == 2)
        me.x0 = me.x0 + 1;
    else if (k == 3)
        me.y0 = me.y0 - 1;
    else if (k == 4)
        me.x0 = me.x0 - 1;
    map[me.x0][me.y0] = '1';
    look();
}
//判断主角碰到的事件
function Judge(k) {
    console.log(n);
    console.log(k);
    if (n == 2) { //碰到墙壁
        map[me.x0][me.y0] = '2';
        reback(k);
    } else if (n == 3) { //碰到黄门
        if (me.yellowkey === 0) { //黄钥匙不够
            map[me.x0][me.y0] = '3';
            reback(k);
        } else { //黄钥匙足够
            me.useyellowkey();
            look();
        }
    } else if (n == 4) { //碰到银门
        if (me.bluekey === 0) { //银钥匙不够
            map[me.x0][me.y0] = '4';
            reback(k);
        } else { //蓝钥匙足够
            me.usebluekey();
            look();
        }
    } else if (n == 5) { //碰到黄钥匙
        me.getyellowkey();
        look();
    } else if (n == 6) { //碰到银钥匙
        me.getbluekey();
        look();
    } else if (n == 7) { //碰到红药水
        me.getred();
        look();
    } else if (n == 8) { //碰到蓝药水
        me.getblue();
        look();
    } else if (n == 9) { //碰到骷髅
        me.fight(monster_9);
        if (me.ff == '1') {
            map[me.x0][me.y0] = '9';
            reback(k);
        }
        me.ff = 0;
        look();
    } else if (n == 10) { //碰到骷髅骑士
        me.fight(monster_10);
        if (me.ff == '1') {
            map[me.x0][me.y0] = '10';
            reback(k);
        }
        me.ff = 0;
        look();
    } else if (n == 11) { //碰到法师
        me.fight(monster_11);
        if (me.ff == '1') {
            map[me.x0][me.y0] = '11';
            reback(k);
        }
        me.ff = 0;
        look();
    } else if (n == 12) { //碰到红水晶
        me.getatk();
        look();
    } else if (n == 13) { //碰到蓝水晶
        me.getdef();
        look();
    } else if (n == 14) { //碰到楼梯上
        me.floor = me.floor + 1;
        if (me.floor == 2) {
            map1[0][0] = '14';
            map1[0][1] = '1';
            map = map2;
            me.x0 = 9;
            me.y0 = 10
            look();
        } else if (me.floor == 3) {
            map2[10][0] = '14';
            map2[9][0] = '1';
            map = map3;
            me.x0 = 9;
            me.y0 = 0;
            look();
        }
    } else if (n == 15) { //碰到楼梯下
        me.floor = me.floor - 1;
        if (me.floor == 2) {
            map3[10][0] = '15';
            map3[9][0] = '1';
            map = map2;
            me.x0 = 9;
            me.y0 = 0;
            look();
        } else if (me.floor == 1) {
            map2[10][10] = '15';
            map2[9][10] = '1';
            map = map1;
            me.x0 = 0;
            me.y0 = 1;
            look();
        }
    } else if (n == 16 || n == 17 || n == 18) { //碰到商店
        map[me.x0][me.y0] = n;
        reback(k);
        //购买页面
        var t = prompt("100金币购买100血量或者1点攻击或者1点防御（分别输入1、2、3）", t);
        if (me.money < 100) { //钱不够
            alert("金币不足100，无法购买");
        } else if (t == '1') { //购买100生命值
            me.buy();
            me.getred();
            console.log("购买生命值");
            alert("生命值购买成功");
        } else if (t == '2') { //购买5点攻击力
            me.buy();
            me.getatk();
            console.log("购买攻击力");
            alert("攻击力购买成功");
        } else if (t == '3') { //购买5点防御力
            me.buy();
            me.getdef();
            console.log("购买防御力");
            alert("防御力购买成功");
        }
        look();
    } else if (n == 19) { //碰到骷髅王
        me.fight(monster_19);
        if (me.ff == '1') {
            map[me.x0][me.y0] = '19';
            reback(k);
        }
        me.ff = 0;
        look();
    }
}
//重置数据，游戏重新开始
function restart() {
    me.reset(); //角色数据重置
    //时间重置
    ts = 0;
    tm = 0;
    var time = setInterval('timer()', 1000);
    //地图数据重置
    //第一层地图
    map1 = [
        ["14", "0", "11", "11", "11", "0", "0", "0", "0", "0", "0"],
        ["2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "0"],
        ["7", "0", "0", "3", "0", "2", "12", "5", "0", "2", "0"],
        ["6", "9", "0", "2", "0", "2", "13", "7", "0", "2", "0"],
        ["2", "3", "2", "2", "0", "2", "2", "2", "3", "2", "0"],
        ["0", "0", "0", "2", "0", "3", "11", "11", "11", "2", "0"],
        ["6", "10", "0", "2", "0", "2", "2", "2", "2", "2", "0"],
        ["2", "3", "2", "2", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "2", "2", "3", "2", "2", "2", "3", "2"],
        ["7", "0", "5", "2", "5", "0", "5", "2", "0", "11", "0"],
        ["7", "0", "5", "2", "0", "1", "0", "2", "11", "8", "11"],
    ];
    //第二层地图
    map2 = [
        ["5", "7", "5", "2", "16", "17", "18", "2", "0", "7", "0"],
        ["5", "7", "5", "2", "0", "0", "0", "2", "5", "0", "8"],
        ["6", "11", "6", "2", "0", "0", "0", "2", "0", "10", "0"],
        ["2", "3", "2", "2", "2", "4", "2", "2", "2", "3", "2"],
        ["0", "0", "0", "3", "0", "11", "0", "0", "9", "0", "0"],
        ["0", "0", "0", "2", "2", "2", "2", "2", "2", "2", "2"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "5"],
        ["0", "2", "2", "3", "2", "2", "2", "3", "2", "2", "0"],
        ["0", "2", "5", "11", "5", "2", "5", "11", "5", "2", "0"],
        ["0", "2", "0", "8", "0", "2", "0", "8", "0", "2", "1"],
        ["14", "2", "0", "12", "0", "2", "0", "13", "0", "2", "15"],
    ];
    //第三层地图
    map3 = [
        ["0", "0", "0", "0", "0", "19", "0", "0", "0", "0", "0"],
        ["2", "2", "2", "2", "0", "0", "0", "2", "2", "2", "2"],
        ["9", "9", "9", "2", "2", "0", "2", "2", "9", "9", "9"],
        ["12", "10", "0", "4", "12", "8", "13", "4", "0", "10", "13"],
        ["2", "2", "2", "2", "8", "8", "8", "2", "2", "2", "2"],
        ["0", "0", "9", "2", "7", "7", "7", "2", "9", "12", "9"],
        ["0", "10", "0", "2", "2", "0", "2", "2", "0", "10", "0"],
        ["7", "0", "0", "2", "2", "0", "2", "2", "0", "0", "0"],
        ["0", "2", "3", "2", "2", "4", "2", "2", "3", "2", "3"],
        ["1", "2", "0", "2", "8", "0", "8", "2", "0", "2", "0"],
        ["15", "2", "0", "11", "0", "0", "0", "11", "0", "2", "8"],
    ];
    //地图指针重置
    map = map1;
    //重新绘制画面
    look();
}
//判断游戏结束
function gameover() {
    if (me.x0 == 0 && me.y0 == 5 && me.floor == 3 && me.ff == 0) {
        clearInterval(time);
        var re = window.confirm("游戏结束,用时" + tm + "分" + ts + "秒" + "，是否重新开始");
        if (re == true) {
            console.log("重新开始");
            restart(); //重置数据
        } else { //回到主菜单
            window.location.href = "../html/index.html";
        }
    }
}
document.addEventListener('keyup', function(e) {
    // 利用keycode返回的ASCII码值来判断用户按下了那个键
    if (e.keyCode === 37) { //左移
        if (me.y0 === 0) {
            console.log("左移失败！");
        } else {
            n = map[me.x0][me.y0 - 1];
            map[me.x0][me.y0] = '0';
            map[me.x0][me.y0 - 1] = '1';
            me.y0 = me.y0 - 1;
            look();
            Judge(1);
        }
        gameover();
    } else if (e.keyCode === 38) { //上移
        if (me.x0 === 0) {
            console.log("上移失败！");
        } else {
            n = map[me.x0 - 1][me.y0];
            map[me.x0][me.y0] = '0';
            map[me.x0 - 1][me.y0] = '1';
            me.x0 = me.x0 - 1;
            look();
            Judge(2);
        }
        gameover();
    } else if (e.keyCode === 39) { //右移
        if (me.y0 === 10) {
            console.log("右移失败！");
        } else {
            n = map[me.x0][me.y0 + 1];
            map[me.x0][me.y0] = '0';
            map[me.x0][me.y0 + 1] = '1';
            me.y0 = me.y0 + 1;
            look();
            Judge(3);
        }
        gameover();
    } else if (e.keyCode === 40) { //下移
        if (me.x0 === 10) {
            console.log("下移失败！");
        } else {
            n = map[me.x0 + 1][me.y0];
            map[me.x0][me.y0] = '0';
            map[me.x0 + 1][me.y0] = '1';
            me.x0 = me.x0 + 1;
            look();
            Judge(4);
        }
        gameover();
    }
});



//存档事件
function load() {
    alert("存档成功");
    //存地图
    localStorage.setItem('map1', JSON.stringify(map1));
    localStorage.setItem('map2', JSON.stringify(map2));
    localStorage.setItem('map3', JSON.stringify(map3));
    //存地图指针
    if (map == map1)
        localStorage.setItem('map', JSON.stringify('1'));
    else if (map == map2)
        localStorage.setItem('map', JSON.stringify('2'));
    else if (map == map3)
        localStorage.setItem('map', JSON.stringify('3'));
    //存时间
    localStorage.setItem('ts', JSON.stringify(ts));
    localStorage.setItem('tm', JSON.stringify(tm));
    //存角色信息
    localStorage.setItem('hp', JSON.stringify(me.hp));
    localStorage.setItem('def', JSON.stringify(me.def));
    localStorage.setItem('money', JSON.stringify(me.money));
    localStorage.setItem('yellowkey', JSON.stringify(me.yellowkey));
    localStorage.setItem('bluekey', JSON.stringify(me.bluekey));
    localStorage.setItem('x0', JSON.stringify(me.x0));
    localStorage.setItem('y0', JSON.stringify(me.y0));
    localStorage.setItem('floor', JSON.stringify(me.floor));
    localStorage.setItem('ff', JSON.stringify(me.ff));
}
//读档事件
function reload() {
    if (JSON.stringify(localStorage) == "{}" ? false : true) { //判断有无存档
        alert("读档");
        //读地图
        map1 = JSON.parse(localStorage.getItem('map1'));
        map2 = JSON.parse(localStorage.getItem('map2'));
        map3 = JSON.parse(localStorage.getItem('map3'));
        //读地图指针
        let t = JSON.parse(localStorage.getItem('map'));
        if (t == '1')
            map = map1;
        else if (t == '2')
            map = map2;
        else if (t == '3')
            map = map3;
        ts = JSON.parse(localStorage.getItem('ts'));
        tm = JSON.parse(localStorage.getItem('tm'));
        //读角色信息
        me.hp = JSON.parse(localStorage.getItem('hp'));
        me.def = JSON.parse(localStorage.getItem('def'));
        me, money = JSON.parse(localStorage.getItem('money'));
        me.yellowkey = JSON.parse(localStorage.getItem('yellowkey'));
        me.bluekey = JSON.parse(localStorage.getItem('bluekey'));
        me.x0 = JSON.parse(localStorage.getItem('x0'));
        me.y0 = JSON.parse(localStorage.getItem('y0'));
        me.floor = JSON.parse(localStorage.getItem('floor'));
        me.ff = JSON.parse(localStorage.getItem('ff'));
        //刷新地图
        look();
    } else {
        alert('没有存档')
    }
}
//画布点击事件
canvas.addEventListener("click", function __handler__(evt) {
    var x = evt.clientX;
    var y = evt.clientY;
    var rect = canvas.getBoundingClientRect();
    x -= rect.left;
    y -= rect.top;
    //存档按钮
    if (x >= 800 && x <= 880 && y >= 700 && y <= 765)
        load();
    //读档按钮
    if (x >= 890 && x <= 970 && y >= 700 && y <= 765)
        reload();
}, false);
//清除缓存
localStorage.clear();