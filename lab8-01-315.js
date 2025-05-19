// 学生名单
const students = [
    "白林涵", "陈昊妍", "董萌萌", "范昱涵", "高一涵",
    "郭超", "侯宪坤", "黄博", "姜子超", "鞠忠宏",
    "李茂川", "李永乐", "李云", "林佳祺", "吕君蕊",
    "秦金龙", "秦士淞", "孙家豪", "孙若冰", "孙义凯",
    "孙子凌", "索京奥", "王朝闻", "王俊豪", "王梦月",
    "王文昌", "王运旺", "王祉盛", "卫学振", "武启航",
    "徐浩文", "许广洋", "许源赫", "薛景文", "张丁文",
    "张静", "张俊飞", "张艳可", "张云翔", "张志恒",
    "赵宝华", "赵家豪", "周政涟", "邹谦慧"
];

// DOM元素
const studentList = document.getElementById('studentList');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const selectedStudent = document.getElementById('selectedStudent');
let studentCards = []; // 存储学生卡片元素

let isRunning = false;
let currentStudent = null;
let timer = null;
let lastSelectedIndex = -1; // 记录上次选中的索引

// 初始化学生列表
function renderStudents() {
    studentList.innerHTML = students.map(name => `
        <div class="student-card">${name}</div>
    `).join('');
    
    // 获取所有学生卡片并缓存
    studentCards = document.querySelectorAll('.student-card');
}

// 生成随机颜色
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// 开始随机选择
function startSelection() {
    if (isRunning) return;
    
    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    
    // 重置所有卡片样式
    resetCards();
    
    timer = setInterval(() => {
        // 生成不重复的随机索引（避免连续选中同一人）
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * students.length);
        } while (randomIndex === lastSelectedIndex && students.length > 1);
        
        lastSelectedIndex = randomIndex;
        currentStudent = students[randomIndex];
        
        // 重置所有卡片颜色
        resetCards();
        
        // 当前选中卡片高亮
        const card = studentCards[randomIndex];
        card.style.backgroundColor = getRandomColor();
        card.classList.add('active');
        
        // 更新显示
        selectedStudent.querySelector('span').textContent = currentStudent;
    }, 100); // 100ms切换一次
}

// 停止随机选择
function stopSelection() {
    if (!isRunning) return;
    
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timer);
    
    // 最终选中的学生高亮
    if (lastSelectedIndex !== -1) {
        const card = studentCards[lastSelectedIndex];
        
        // 添加最终选中的动画效果
        card.style.transition = 'all 0.5s ease';
        card.style.backgroundColor = '#d4edda'; // 浅绿色
        card.style.boxShadow = '0 0 20px rgba(40, 167, 69, 0.7)';
        card.style.transform = 'scale(1.15)';
        
        // 延迟恢复正常大小
        setTimeout(() => {
            card.style.transform = 'scale(1.05)';
        }, 500);
        
        selectedStudent.querySelector('span').style.color = '#28a745';
        alert(`选中学生：${currentStudent}`);
    }
}

// 重置所有卡片样式
function resetCards() {
    studentCards.forEach(card => {
        card.style.backgroundColor = '';
        card.style.boxShadow = '';
        card.style.transform = '';
        card.style.transition = '';
        card.classList.remove('active');
    });
}

// 绑定事件
startBtn.addEventListener('click', startSelection);
stopBtn.addEventListener('click', stopSelection);

// 初始化
renderStudents();