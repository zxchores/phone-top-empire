let money = 2000; 
let warehouse = [];
let miningFarm = [];
let miningSlots = 10;
let statsTotalBuilt = 0;
let isProducing = false;

let upgrades = {
    speedLevel: 0,
    slotsLevel: 0,
    marketingLevel: 0,
    miningBoostLevel: 0
};

// База данных телефонов
const phonesDB = [
    // --- SAMSUNG (Шаг цены: ~1500, Шаг дохода: ~150) ---
    { name: "Samsung S26 Ultra", cost: 50000, time: 10, mine: 5000, count: 0 },
    { name: "Samsung S26+", cost: 48500, time: 10, mine: 4850, count: 0 },
    { name: "Samsung S26", cost: 47000, time: 10, mine: 4700, count: 0 },
    { name: "Samsung S25 Ultra", cost: 45500, time: 10, mine: 4550, count: 0 },
    { name: "Samsung S25+", cost: 44000, time: 10, mine: 4400, count: 0 },
    { name: "Samsung S25", cost: 42500, time: 10, mine: 4250, count: 0 },
    { name: "Samsung S25 Edge", cost: 41000, time: 10, mine: 4100, count: 0 },
    { name: "Samunsg S25 FE", cost: 39500, time: 10, mine: 3950, count: 0 },
    { name: "Samsung S24 Ultra", cost: 38000, time: 10, mine: 3800, count: 0 },
    { name: "Samsung S24+", cost: 36500, time: 10, mine: 3650, count: 0 },
    { name: "Samsung S24", cost: 35000, time: 10, mine: 3500, count: 0 },
    { name: "Samsung S24 FE", cost: 33500, time: 10, mine: 3350, count: 0 },
    { name: "Samsung S23 Ultra", cost: 32000, time: 10, mine: 3200, count: 0 },
    { name: "Samsung S23+", cost: 30500, time: 10, mine: 3050, count: 0 },
    { name: "Samsung S23", cost: 29000, time: 10, mine: 2900, count: 0 },
    { name: "Samsung S23 FE", cost: 27500, time: 10, mine: 2750, count: 0 },
    { name: "Samsung S22 Ultra", cost: 26000, time: 10, mine: 2600, count: 0 },
    { name: "Samsung S22+", cost: 24500, time: 10, mine: 2450, count: 0 },
    { name: "Samsung S22", cost: 23000, time: 10, mine: 2300, count: 0 },
    { name: "Samsung S21 Ultra", cost: 21500, time: 10, mine: 2150, count: 0 },
    { name: "Samsung S21+", cost: 20000, time: 10, mine: 2000, count: 0 },
    { name: "Samsung S21", cost: 18500, time: 10, mine: 1850, count: 0 },
    { name: "Samsung S21 FE", cost: 17000, time: 10, mine: 1700, count: 0 },
    { name: "Samsung S20 Ultra", cost: 15500, time: 10, mine: 1550, count: 0 },
    { name: "Samsung S20+", cost: 14000, time: 10, mine: 1400, count: 0 },
    { name: "Samsung S20", cost: 12500, time: 10, mine: 1250, count: 0 },
    { name: "Samsung S20 FE", cost: 11000, time: 10, mine: 1100, count: 0 },

    // --- IPHONE (Шаг цены: ~1400, Шаг дохода: ~140) ---
    { name: "iPhone 17 Pro Max", cost: 50000, time: 10, mine: 5000, count: 0 },
    { name: "iPhone 17 Pro", cost: 48600, time: 10, mine: 4860, count: 0 },
    { name: "iPhone 17 Air", cost: 47200, time: 10, mine: 4720, count: 0 },
    { name: "iPhone 17", cost: 45800, time: 10, mine: 4580, count: 0 },
    { name: "iPhone 17e", cost: 44400, time: 10, mine: 4440, count: 0 },
    { name: "iPhone 16 Pro Max", cost: 43000, time: 10, mine: 4300, count: 0 },
    { name: "iPhone 16 Pro", cost: 41600, time: 10, mine: 4160, count: 0 },
    { name: "iPhone 16 Plus", cost: 40200, time: 10, mine: 4020, count: 0 },
    { name: "iPhone 16", cost: 38800, time: 10, mine: 3880, count: 0 },
    { name: "iPhone 16e", cost: 37400, time: 10, mine: 3740, count: 0 },
    { name: "iPhone 15 Pro Max", cost: 36000, time: 10, mine: 3600, count: 0 },
    { name: "iPhone 15 Pro", cost: 34600, time: 10, mine: 3460, count: 0 },
    { name: "iPhone 15 Plus", cost: 33200, time: 10, mine: 3320, count: 0 },
    { name: "iPhone 15", cost: 31800, time: 10, mine: 3180, count: 0 },
    { name: "iPhone 14 Pro Max", cost: 30400, time: 10, mine: 3040, count: 0 },
    { name: "iPhone 14 Pro", cost: 29000, time: 10, mine: 2900, count: 0 },
    { name: "iPhone 14 Plus", cost: 27600, time: 10, mine: 2760, count: 0 },
    { name: "iPhone 14", cost: 26200, time: 10, mine: 2620, count: 0 },
    { name: "iPhone 13 Pro Max", cost: 24800, time: 10, mine: 2480, count: 0 },
    { name: "iPhone 13 Pro", cost: 23400, time: 10, mine: 2340, count: 0 },
    { name: "iPhone 13 Mini", cost: 22000, time: 10, mine: 2200, count: 0 },
    { name: "iPhone 13", cost: 20600, time: 10, mine: 2060, count: 0 },
    { name: "iPhone 12 Pro Max", cost: 19200, time: 10, mine: 1920, count: 0 },
    { name: "iPhone 12 Pro", cost: 17800, time: 10, mine: 1780, count: 0 },
    { name: "iPhone 12 Mini", cost: 16400, time: 10, mine: 1640, count: 0 },
    { name: "iPhone 12", cost: 15000, time: 10, mine: 1500, count: 0 },
    { name: "iPhone 11 Pro Max", cost: 13600, time: 10, mine: 1360, count: 0 },
    { name: "iPhone 11 Pro", cost: 12200, time: 10, mine: 1220, count: 0 },
    { name: "iPhone 11 Mini", cost: 10800, time: 10, mine: 1080, count: 0 },
    { name: "iPhone 11", cost: 9400, time: 10, mine: 940, count: 0 },

    // --- XIAOMI (Шаг цены: ~2000) ---
    { name: "Xiaomi 14 Ultra", cost: 48000, time: 10, mine: 4800, count: 0 },
    { name: "Xiaomi 14 Pro", cost: 46000, time: 10, mine: 4600, count: 0 },
    { name: "Xiaomi 14", cost: 44000, time: 10, mine: 4400, count: 0 },
    { name: "Xiaomi 14T Pro", cost: 42000, time: 10, mine: 4200, count: 0 },
    { name: "Xiaomi 14T", cost: 40000, time: 10, mine: 4000, count: 0 },
    { name: "Xiaomi 13 Ultra", cost: 38000, time: 10, mine: 3800, count: 0 },
    { name: "Xiaomi 13 Pro", cost: 36000, time: 10, mine: 3600, count: 0 },
    { name: "Xiaomi 13", cost: 34000, time: 10, mine: 3400, count: 0 },
    { name: "Xiaomi 13T Pro", cost: 32000, time: 10, mine: 3200, count: 0 },
    { name: "Xiaomi 13T", cost: 30000, time: 10, mine: 3000, count: 0 },
    { name: "Xiaomi 12S Ultra", cost: 28000, time: 10, mine: 2800, count: 0 },
    { name: "Xiaomi 12 Pro", cost: 26000, time: 10, mine: 2600, count: 0 },
    { name: "Xiaomi 12", cost: 24000, time: 10, mine: 2400, count: 0 },
    { name: "Xiaomi 12T Pro", cost: 22000, time: 10, mine: 2200, count: 0 },
    { name: "Xiaomi 11T Pro", cost: 20000, time: 10, mine: 2000, count: 0 },
    { name: "Xiaomi Mi 11", cost: 18000, time: 10, mine: 1800, count: 0 },
    { name: "Xiaomi Mi 10 Ultra", cost: 16000, time: 10, mine: 1600, count: 0 },
    { name: "Xiaomi Mi 10 Pro", cost: 14000, time: 10, mine: 1400, count: 0 },
    { name: "Xiaomi Mi 10", cost: 12000, time: 10, mine: 1200, count: 0 },

    // --- GOOGLE PIXEL (Шаг цены: ~1500) ---
    { name: "Google Pixel 10 Pro", cost: 49000, time: 10, mine: 4900, count: 0 },
    { name: "Google Pixel 10a", cost: 47500, time: 10, mine: 4750, count: 0 },
    { name: "Google Pixel 10", cost: 46000, time: 10, mine: 4600, count: 0 },
    { name: "Google Pixel 9 Pro", cost: 44500, time: 10, mine: 4450, count: 0 },
    { name: "Google Pixel 9a", cost: 43000, time: 10, mine: 4300, count: 0 },
    { name: "Google Pixel 9", cost: 41500, time: 10, mine: 4150, count: 0 },
    { name: "Google Pixel 8 Pro", cost: 40000, time: 10, mine: 4000, count: 0 },
    { name: "Google Pixel 8a", cost: 38500, time: 10, mine: 3850, count: 0 },
    { name: "Google Pixel 8", cost: 37000, time: 10, mine: 3700, count: 0 },
    { name: "Google Pixel 7 Pro", cost: 35500, time: 10, mine: 3550, count: 0 },
    { name: "Google Pixel 7a", cost: 34000, time: 10, mine: 3400, count: 0 },
    { name: "Google Pixel 7", cost: 32500, time: 10, mine: 3250, count: 0 },
    { name: "Google Pixel 6 Pro", cost: 31000, time: 10, mine: 3100, count: 0 },
    { name: "Google Pixel 6a", cost: 29500, time: 10, mine: 2950, count: 0 },
    { name: "Google Pixel 6", cost: 28000, time: 10, mine: 2800, count: 0 },
    { name: "Google Pixel 5a", cost: 26500, time: 10, mine: 2650, count: 0 },
    { name: "Google Pixel 5", cost: 25000, time: 10, mine: 2500, count: 0 },
    { name: "Google Pixel 4 XL", cost: 23500, time: 10, mine: 2350, count: 0 },
    { name: "Google Pixel 4", cost: 22000, time: 10, mine: 2200, count: 0 },
    { name: "Google Pixel 3a XL", cost: 20500, time: 10, mine: 2050, count: 0 },
    { name: "Google Pixel 3a", cost: 19000, time: 10, mine: 1900, count: 0 },
    { name: "Google Pixel 3 XL", cost: 17500, time: 10, mine: 1750, count: 0 },
    { name: "Google Pixel 3", cost: 16000, time: 10, mine: 1600, count: 0 },
    { name: "Google Pixel 2 XL", cost: 14500, time: 10, mine: 1450, count: 0 },
    { name: "Google Pixel 2", cost: 13000, time: 10, mine: 1300, count: 0 },
    { name: "Google Pixel XL", cost: 11500, time: 10, mine: 1150, count: 0 },
    { name: "Google Pixel", cost: 10000, time: 10, mine: 1000, count: 0 },

    // --- ONEPLUS (Шаг цены: ~1800) ---
    { name: "OnePlus 13", cost: 48000, time: 10, mine: 4800, count: 0 },
    { name: "OnePlus 12", cost: 46200, time: 10, mine: 4620, count: 0 },
    { name: "OnePlus 12R", cost: 44400, time: 10, mine: 4440, count: 0 },
    { name: "OnePlus 11", cost: 42600, time: 10, mine: 4260, count: 0 },
    { name: "OnePlus 10 Pro", cost: 40800, time: 10, mine: 4080, count: 0 },
    { name: "OnePlus 10T", cost: 39000, time: 10, mine: 3900, count: 0 },
    { name: "OnePlus 9 Pro", cost: 37200, time: 10, mine: 3720, count: 0 },
    { name: "OnePlus 9", cost: 35400, time: 10, mine: 3540, count: 0 },
    { name: "OnePlus 9RT", cost: 33600, time: 10, mine: 3360, count: 0 },
    { name: "OnePlus 8 Pro", cost: 31800, time: 10, mine: 3180, count: 0 },
    { name: "OnePlus 8T", cost: 30000, time: 10, mine: 3000, count: 0 },
    { name: "OnePlus 7 Pro", cost: 28200, time: 10, mine: 2820, count: 0 },
    { name: "OnePlus 7T", cost: 26400, time: 10, mine: 2640, count: 0 },
    { name: "OnePlus 6T", cost: 24600, time: 10, mine: 2460, count: 0 },
    { name: "OnePlus 6", cost: 22800, time: 10, mine: 2280, count: 0 },
    { name: "OnePlus 5T", cost: 21000, time: 10, mine: 2100, count: 0 },
    { name: "OnePlus 5", cost: 19200, time: 10, mine: 1920, count: 0 },
    { name: "OnePlus 3T", cost: 17400, time: 10, mine: 1740, count: 0 },
    { name: "OnePlus 2", cost: 15600, time: 10, mine: 1560, count: 0 },
    { name: "OnePlus One", cost: 13800, time: 10, mine: 1380, count: 0 },

    // --- VIVO (Шаг цены: ~2000) ---
    { name: "Vivo X300 Ultra", cost: 49000, time: 10, mine: 4900, count: 0 },
    { name: "Vivo X300 Pro", cost: 47000, time: 10, mine: 4700, count: 0 },
    { name: "Vivo X300", cost: 45000, time: 10, mine: 4500, count: 0 },
    { name: "Vivo X300s", cost: 43000, time: 10, mine: 4300, count: 0 },
    { name: "Vivo X300 FE", cost: 41000, time: 10, mine: 4100, count: 0 },
    { name: "Vivo X200 Ultra", cost: 39000, time: 10, mine: 3900, count: 0 },
    { name: "Vivo X200 Pro", cost: 37000, time: 10, mine: 3700, count: 0 },
    { name: "Vivo X200 Pro Mini", cost: 35000, time: 10, mine: 3500, count: 0 },
    { name: "Vivo X200", cost: 33000, time: 10, mine: 3300, count: 0 },
    { name: "Vivo X200s", cost: 31000, time: 10, mine: 3100, count: 0 },
    { name: "Vivo X200T", cost: 29000, time: 10, mine: 2900, count: 0 },
    { name: "Vivo X200 FE", cost: 27000, time: 10, mine: 2700, count: 0 },
    { name: "Vivo X100 Ultra", cost: 25000, time: 10, mine: 2500, count: 0 },
    { name: "Vivo X100 Pro", cost: 23000, time: 10, mine: 2300, count: 0 },
    { name: "Vivo X100", cost: 21000, time: 10, mine: 2100, count: 0 },
    { name: "Vivo X90 Pro+", cost: 19000, time: 10, mine: 1900, count: 0 },
    { name: "Vivo X90 Pro", cost: 17000, time: 10, mine: 1700, count: 0 },
    { name: "Vivo X90", cost: 15000, time: 10, mine: 1500, count: 0 },
    { name: "Vivo X80 Pro", cost: 13000, time: 10, mine: 1300, count: 0 },
    { name: "Vivo X80", cost: 11000, time: 10, mine: 1100, count: 0 },

    // --- HUAWEI (Шаг цены: ~2000) ---
    { name: "Huawei Pura 70 Ultra", cost: 48000, time: 10, mine: 4800, count: 0 },
    { name: "Huawei Pura 70 Pro", cost: 46000, time: 10, mine: 4600, count: 0 },
    { name: "Huawei Pura 70", cost: 44000, time: 10, mine: 4400, count: 0 },
    { name: "Huawei Mate 60 RS Ultimate", cost: 42000, time: 10, mine: 4200, count: 0 },
    { name: "Huawei Mate 60 Pro+", cost: 40000, time: 10, mine: 4000, count: 0 },
    { name: "Huawei Mate 60 Pro", cost: 38000, time: 10, mine: 3800, count: 0 },
    { name: "Huawei Mate 50 Pro", cost: 36000, time: 10, mine: 3600, count: 0 },
    { name: "Huawei P60 Pro", cost: 34000, time: 10, mine: 3400, count: 0 },
    { name: "Huawei Nova 12 Ultra", cost: 32000, time: 10, mine: 3200, count: 0 },
    { name: "Huawei Nova 12 Pro", cost: 30000, time: 10, mine: 3000, count: 0 },
    { name: "Huawei Nova 11", cost: 28000, time: 10, mine: 2800, count: 0 },
    { name: "Huawei Mate 40 Pro", cost: 26000, time: 10, mine: 2600, count: 0 },
    { name: "Huawei P40 Pro", cost: 24000, time: 10, mine: 2400, count: 0 },
    { name: "Huawei P30 Pro", cost: 22000, time: 10, mine: 2200, count: 0 },
    { name: "Huawei Mate 20 Pro", cost: 20000, time: 10, mine: 2000, count: 0 },
    { name: "Huawei P20 Pro", cost: 18000, time: 10, mine: 1800, count: 0 },
    { name: "Huawei P10", cost: 16000, time: 10, mine: 1600, count: 0 },
    { name: "Huawei Mate 10", cost: 14000, time: 10, mine: 1400, count: 0 }
];

// 1. Автоматический цикл производства
function startBuildLoop() {
    if (isProducing) return;
    isProducing = true;
    
    const phone = phonesDB[Math.floor(Math.random() * phonesDB.length)];
    const display = document.getElementById('active-phone-card');
    display.innerHTML = `<div class="item-card"><h3>Линия: ${phone.name}</h3><p>Идет сборка...</p></div>`;

    // Расчет времени с учетом скорости
    let duration = (phone.time * 1000) / (1 + upgrades.speedLevel * 0.25);
    let start = Date.now();

    const interval = setInterval(() => {
        let elapsed = Date.now() - start;
        let percent = Math.min((elapsed / duration) * 100, 100);
        
        document.getElementById('auto-progress-fill').style.width = percent + '%';
        document.getElementById('progress-percent').innerText = Math.floor(percent) + '%';
        document.getElementById('time-left').innerText = ((duration - elapsed) / 1000).toFixed(1) + 's';

        if (elapsed >= duration) {
            clearInterval(interval);
            isProducing = false;
            
            // Логика завершения
            phone.count = (phone.count || 0) + 1;
            warehouse.push({...phone, id: Date.now()});
            statsTotalBuilt++;
            
            updateUI();
            saveGame();
            startBuildLoop(); // Сразу следующий
        }
    }, 50);
}

// 2. Рендер вкладок
function renderWarehouse() {
    const grid = document.getElementById('market-sell');
    grid.innerHTML = warehouse.map(p => {
        let sellPrice = Math.floor(p.cost * (1 + upgrades.marketingLevel * 0.15));
        return `
            <div class="item-card">
                <h3>${p.name}</h3>
                <p>Цена: <b>$${sellPrice.toLocaleString()}</b></p>
                <button class="btn-action" onclick="sellPhone(${p.id})">Продать</button>
                <button class="btn-secondary" onclick="toMining(${p.id})">В майнинг</button>
            </div>
        `;
    }).join('');
}

function renderMining() {
    const grid = document.getElementById('mining-grid');
    grid.innerHTML = miningFarm.map(p => {
        let actualMine = Math.floor(p.mine * (1 + upgrades.miningBoostLevel * 0.05));
        return `
            <div class="item-card">
                <h3>${p.name}</h3>
                <p>Доход: <b>$${actualMine.toLocaleString()}/с</b></p>
                <button class="btn-secondary" onclick="removeFromMining(${p.id})">Снять</button>
            </div>
        `;
    }).join('');
}

function renderUpgrades() {
    const data = [
        { id: 'speedLevel', name: 'Конвейер', desc: '+25% к скорости', base: 1000 },
        { id: 'slotsLevel', name: 'Стеллажи', desc: '+1 место на ферме', base: 5000 },
        { id: 'marketingLevel', name: 'PR-отдел', desc: '+15% к цене продажи', base: 3000 },
        { id: 'miningBoostLevel', name: 'Оверклокинг', desc: '+5% к майнингу', base: 4500 }
    ];

    document.getElementById('upgrades-list').innerHTML = data.map(u => {
        let cost = u.base * Math.pow(1.5, upgrades[u.id]);
        return `
            <div class="item-card">
                <h3>${u.name} [Ур. ${upgrades[u.id]}]</h3>
                <p>${u.desc}</p>
                <button class="btn-action" onclick="buyUpgrade('${u.id}', ${cost})">Улучшить: $${Math.floor(cost).toLocaleString()}</button>
            </div>
        `;
    }).join('');
}

function renderIndex() {
    document.getElementById('index-grid').innerHTML = phonesDB.map(p => {
        const unlocked = p.count > 0;
        return `
            <div class="item-card ${unlocked ? '' : 'locked-card'}">
                ${unlocked ? `<div class="index-badge">${p.count} шт.</div>` : ''}
                <h3>${unlocked ? p.name : '???'}</h3>
                <p>$${p.cost.toLocaleString()} | $${p.mine}/с</p>
            </div>
        `;
    }).join('');
}

// 3. Действия
function sellPhone(id) {
    let idx = warehouse.findIndex(p => p.id === id);
    if (idx !== -1) {
        money += Math.floor(warehouse[idx].cost * (1 + upgrades.marketingLevel * 0.15));
        warehouse.splice(idx, 1);
        renderWarehouse(); updateUI(); saveGame();
    }
}

function toMining(id) {
    if (miningFarm.length >= miningSlots) return alert("Нет свободных мест на ферме!");
    let idx = warehouse.findIndex(p => p.id === id);
    if (idx !== -1) {
        miningFarm.push(warehouse[idx]);
        warehouse.splice(idx, 1);
        renderWarehouse(); updateUI(); saveGame();
    }
}

function removeFromMining(id) {
    let idx = miningFarm.findIndex(p => p.id === id);
    if (idx !== -1) {
        warehouse.push(miningFarm[idx]);
        miningFarm.splice(idx, 1);
        renderMining(); updateUI(); saveGame();
    }
}

function buyUpgrade(id, cost) {
    if (money >= cost) {
        money -= cost;
        upgrades[id]++;
        if (id === 'slotsLevel') miningSlots++;
        renderUpgrades(); updateUI(); saveGame();
    }
}

// 4. Ядро системы
function updateUI() {
    document.getElementById('money-display').innerText = '$' + Math.floor(money).toLocaleString();
    let income = Math.floor(miningFarm.reduce((s, p) => s + p.mine, 0) * (1 + upgrades.miningBoostLevel * 0.05));
    document.getElementById('mining-rate').innerText = income.toLocaleString();
    document.getElementById('slots-count').innerText = `${miningFarm.length} / ${miningSlots}`;
    document.getElementById('stats-total-built').innerText = statsTotalBuilt;
    document.getElementById('speed-bonus').innerText = (100 + upgrades.speedLevel * 25) + '%';
}

function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.getElementById('btn-' + tabId).classList.add('active');
    
    if(tabId === 'warehouse') renderWarehouse();
    if(tabId === 'mining') renderMining();
    if(tabId === 'shop') renderUpgrades();
    if(tabId === 'index') renderIndex();
}

// Пассивный доход
setInterval(() => {
    let income = Math.floor(miningFarm.reduce((s, p) => s + p.mine, 0) * (1 + upgrades.miningBoostLevel * 0.05));
    if (income > 0) { money += income; updateUI(); }
}, 1000);

function toggleTheme() {
    const html = document.documentElement;
    html.setAttribute('data-theme', html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

function saveGame() {
    localStorage.setItem('pme_mobile_v1', JSON.stringify({ money, warehouse, miningFarm, upgrades, miningSlots, statsTotalBuilt, phonesDB }));
}

function loadGame() {
    const saved = localStorage.getItem('pme_mobile_v1');
    if (saved) {
        const d = JSON.parse(saved);
        money = d.money; warehouse = d.warehouse; miningFarm = d.miningFarm;
        upgrades = d.upgrades; miningSlots = d.miningSlots; statsTotalBuilt = d.statsTotalBuilt;
        d.phonesDB.forEach(sd => {
            let p = phonesDB.find(x => x.name === sd.name);
            if(p) p.count = sd.count || 0;
        });
    }
    updateUI();
    startBuildLoop();
}

window.onload = loadGame;
