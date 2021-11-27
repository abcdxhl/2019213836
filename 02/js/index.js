function mouseover1() {
    document.getElementById('classname').innerHTML = '课程名：人工智能';
    document.getElementById('teacher').innerHTML = '教师：郭京蕾';
    document.getElementById('classroom').innerHTML = '教室：n108';
    document.getElementById('time').innerHTML = '上课时间：1-19周';
    document.getElementById('type').innerHTML = '课程性质：个性发展课';
}

function mouseover2() {
    document.getElementById('classname').innerHTML = '课程名：世界性民间文学经典赏析';
    document.getElementById('teacher').innerHTML = '教师：孙正国';
    document.getElementById('classroom').innerHTML = '教室：n301';
    document.getElementById('time').innerHTML = '上课时间：1-19周';
    document.getElementById('type').innerHTML = '课程性质：通识核心课';
}

function mouseover3() {
    document.getElementById('classname').innerHTML = '课程名：Web程序设计';
    document.getElementById('teacher').innerHTML = '教师：涂新辉';
    document.getElementById('classroom').innerHTML = '教室：n108';
    document.getElementById('time').innerHTML = '上课时间：1-18周';
    document.getElementById('type').innerHTML = '课程性质：个性发展课';
}

function mouseover4() {
    document.getElementById('classname').innerHTML = '课程名：操作系统原理';
    document.getElementById('teacher').innerHTML = '教师：喻莹';
    document.getElementById('classroom').innerHTML = '教室：n213';
    document.getElementById('time').innerHTML = '上课时间：1-19周';
    document.getElementById('type').innerHTML = '课程性质：专业主干课';
}

function mouseover5() {
    document.getElementById('classname').innerHTML = '课程名：社会公正：从理念到实践';
    document.getElementById('teacher').innerHTML = '教师：郑广怀';
    document.getElementById('classroom').innerHTML = '教室：8109';
    document.getElementById('time').innerHTML = '上课时间：1-19周';
    document.getElementById('type').innerHTML = '课程性质：通识核心课';
}

function mouseover6() {
    document.getElementById('classname').innerHTML = '课程名：信息检索技术';
    document.getElementById('teacher').innerHTML = '教师：张茂元';
    document.getElementById('classroom').innerHTML = '教室：n108';
    document.getElementById('time').innerHTML = '上课时间：1-19周';
    document.getElementById('type').innerHTML = '课程性质：个性发展课';
}

function mouseover7() {
    document.getElementById('classname').innerHTML = '课程名：习近平新时代中国特色社会主义思想概论';
    document.getElementById('teacher').innerHTML = '教师：吕惠东';
    document.getElementById('classroom').innerHTML = '教室：n223';
    document.getElementById('time').innerHTML = '上课时间：1-19周';
    document.getElementById('type').innerHTML = '课程性质：通识必修课';
}

function mouseover8() {
    document.getElementById('classname').innerHTML = '课程名：编译原理';
    document.getElementById('teacher').innerHTML = '教师：张青';
    document.getElementById('classroom').innerHTML = '教室：n108';
    document.getElementById('time').innerHTML = '上课时间：1-19周';
    document.getElementById('type').innerHTML = '课程性质：个性发展课';
}

function mouseover9() {
    document.getElementById('classname').innerHTML = '课程名：微机原理与接口技术';
    document.getElementById('teacher').innerHTML = '教师：陈怡';
    document.getElementById('classroom').innerHTML = '教室：n211';
    document.getElementById('time').innerHTML = '上课时间：1-19周';
    document.getElementById('type').innerHTML = '课程性质：专业主干课';
}

function mouseout() {
    document.getElementById('classname').innerHTML = '课程名：';
    document.getElementById('teacher').innerHTML = '教师：';
    document.getElementById('classroom').innerHTML = '教室：';
    document.getElementById('time').innerHTML = '上课时间：';
    document.getElementById('type').innerHTML = '课程性质：';
}

const courses1 = document.getElementsByClassName('人工智能');
for (const course1 of courses1) {
    course1.addEventListener('mouseover', mouseover1);
    course1.addEventListener('mouseout', mouseout);
}

const courses2 = document.getElementsByClassName('民间文学');
for (const course2 of courses2) {
    course2.addEventListener('mouseover', mouseover2);
    course2.addEventListener('mouseout', mouseout);
}

const courses3 = document.getElementsByClassName('web');
for (const course3 of courses3) {
    course3.addEventListener('mouseover', mouseover3);
    course3.addEventListener('mouseout', mouseout);
}

const courses4 = document.getElementsByClassName('操作系统');
for (const course4 of courses4) {
    course4.addEventListener('mouseover', mouseover4);
    course4.addEventListener('mouseout', mouseout);
}
const courses5 = document.getElementsByClassName('社会公正');
for (const course5 of courses5) {
    course5.addEventListener('mouseover', mouseover5);
    course5.addEventListener('mouseout', mouseout);
}

const courses6 = document.getElementsByClassName('信息检索技术');
for (const course6 of courses6) {
    course6.addEventListener('mouseover', mouseover6);
    course6.addEventListener('mouseout', mouseout);
}
const courses7 = document.getElementsByClassName('习近平思想');
for (const course7 of courses7) {
    course7.addEventListener('mouseover', mouseover7);
    course7.addEventListener('mouseout', mouseout);
}
const courses8 = document.getElementsByClassName('编译原理');
for (const course8 of courses8) {
    course8.addEventListener('mouseover', mouseover8);
    course8.addEventListener('mouseout', mouseout);
}
const courses9 = document.getElementsByClassName('微机原理');
for (const course9 of courses9) {
    course9.addEventListener('mouseover', mouseover9);
    course9.addEventListener('mouseout', mouseout);
}