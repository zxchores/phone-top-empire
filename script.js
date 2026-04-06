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
    miningBoostLevel: 0 // Новое улучшение (+5% к майнингу)
};

const phonesDB = [
    // Модели Samsung
    { name: "Samsung S26 Ultra", cost: 160000, time: 10, mine: 20000, count: 0 },
    { name: "Samsung S26+", cost: 155000, time: 10, mine: 19500, count: 0 },
    { name: "Samsung S26", cost: 145000, time: 10, mine: 19000, count: 0 },
    { name: "Samsung S25 Ultra", cost: 140000, time: 10, mine: 18500, count: 0 },
    { name: "Samsung S25+", cost: 135000, time: 10, mine: 18000, count: 0 },
    { name: "Samsung S25", cost: 130000, time: 10, mine: 17500, count: 0 },
    { name: "Samsung S25 Edge", cost: 125000, time: 10, mine: 17000, count: 0 },
    { name: "Samunsg S25 FE", cost: 120000, time: 10, mine: 16500, count: 0 },
    { name: "Samsung S24 Ultra", cost: 115000, time: 10, mine: 16000, count: 0 },
    { name: "Samsung S24+", cost: 110000, time: 10, mine: 15500, count: 0 },
    { name: "Samsung S24", cost: 105000, time: 10, mine: 15000, count: 0 },
    { name: "Samsung S24 FE", cost: 100000, time: 10, mine: 14500, count: 0 },
    { name: "Samsung S23 Ultra", cost: 95000, time: 10, mine: 14000, count: 0 },
    { name: "Samsung S23+", cost: 90000, time: 10, mine: 13500, count: 0 },
    { name: "Samsung S23", cost: 85000, time: 10, mine: 13000, count: 0 },
    { name: "Samsung S23 FE", cost: 80000, time: 10, mine: 12500, count: 0 },
    { name: "Samsung S22 Ultra", cost: 75000, time: 10, mine: 12000, count: 0 },
    { name: "Samsung S22+", cost: 70000, time: 10, mine: 11500, count: 0 },
    { name: "Samsung S22", cost: 65000, time: 10, mine: 11000, count: 0 },
    { name: "Samsung S21 Ultra", cost: 60000, time: 10, mine: 10500, count: 0 },
    { name: "Samsung S21+", cost: 55000, time: 10, mine: 10000, count: 0 },
    { name: "Samsung S21", cost: 50000, time: 10, mine: 9500, count: 0 },
    { name: "Samsung S21 FE", cost: 45000, time: 10, mine: 9000, count: 0 },
    { name: "Samsung S20 Ultra", cost: 40000, time: 10, mine: 8500, count: 0 },
    { name: "Samsung S20+", cost: 35000, time: 10, mine: 8000, count: 0 },
    { name: "Samsung S20", cost: 30000, time: 10, mine: 7500, count: 0 },
    { name: "Samsung S20 FE", cost: 25000, time: 10, mine: 7000, count: 0 },

    // Модели iPhone
    { name: "iPhone 17 Pro Max", cost: 160000, time: 10, mine: 15000, count: 0 },
    { name: "iPhone 17 Pro", cost: 155000, time: 10, mine: 14500, count: 0 },
    { name: "iPhone 17 Air", cost: 150000, time: 10, mine: 14000, count: 0 },
    { name: "iPhone 17", cost: 145000, time: 10, mine: 13500, count: 0 },
    { name: "iPhone 17e", cost: 140000, time: 10, mine: 13000, count: 0 },
    { name: "iPhone 16 Pro Max", cost: 135000, time: 10, mine: 12500, count: 0 },
    { name: "iPhone 16 Pro", cost: 130000, time: 10, mine: 12000, count: 0 },
    { name: "iPhone 16 Plus", cost: 125000, time: 10, mine: 11500, count: 0 },
    { name: "iPhone 16", cost: 120000, time: 10, mine: 11000, count: 0 },
    { name: "iPhone 16e", cost: 115000, time: 10, mine: 10500, count: 0 },
    { name: "iPhone 15 Pro Max", cost: 110000, time: 10, mine: 10000, count: 0 },
    { name: "iPhone 15 Pro", cost: 105000, time: 10, mine: 9500, count: 0 },
    { name: "iPhone 15 Plus", cost: 100000, time: 10, mine: 9000, count: 0 },
    { name: "iPhone 15", cost: 95000, time: 10, mine: 8500, count: 0 },
    { name: "iPhone 14 Pro Max", cost: 90000, time: 10, mine: 8000, count: 0 },
    { name: "iPhone 14 Pro", cost: 85000, time: 10, mine: 7500, count: 0 },
    { name: "iPhone 14 Plus", cost: 80000, time: 10, mine: 7000, count: 0 },
    { name: "iPhone 14", cost: 75000, time: 10, mine: 6500, count: 0 },
    { name: "iPhone 13 Pro Max", cost: 70000, time: 10, mine: 6000, count: 0 },
    { name: "iPhone 13 Pro", cost: 65000, time: 10, mine: 5500, count: 0 },
    { name: "iPhone 13 mini", cost: 60000, time: 10, mine: 5000, count: 0 },
    { name: "iPhone 13", cost: 55000, time: 10, mine: 4500, count: 0 },
    { name: "iPhone 12 Pro Max", cost: 50000, time: 10, mine: 4000, count: 0 },
    { name: "iPhone 12 Pro", cost: 45000, time: 10, mine: 3500, count: 0 },
    { name: "iPhone 12 mini", cost: 40000, time: 10, mine: 3000, count: 0 },
    { name: "iPhone 12", cost: 35000, time: 10, mine: 2500, count: 0 },
    { name: "iPhone 11 Pro Max", cost: 30000, time: 10, mine: 2000, count: 0 },
    { name: "iPhone 11 Pro", cost: 25000, time: 10, mine: 1500, count: 0 },
    { name: "iPhone 11 mini", cost: 20000, time: 10, mine: 1000, count: 0 },
    { name: "iPhone 11", cost: 15000, time: 10, mine: 500, count: 0 },

    // Модели Xiaomi
    { name: "Xiaomi 15T", cost: 160000, time: 10, mine: 10000, count: 0 },
    { name: "Xiaomi 14T", cost: 150000, time: 10, mine: 9000, count: 0 },
    { name: "Xiaomi 13T", cost: 140000, time: 10, mine: 8000, count: 0 },
    { name: "Xiaomi 12T", cost: 130000, time: 10, mine: 7000, count: 0 },
    { name: "Xiaomi 11T", cost: 120000, time: 10, mine: 6000, count: 0 },

    // Модели Google
    { name: "Google Pixel 10 Pro", cost: 165000, time: 10, mine: 14000, count: 0 },
    { name: "Google Pixel 10a", cost: 160000, time: 10, mine: 13500, count: 0 },
    { name: "Google Pixel 10", cost: 155000, time: 10, mine: 13000, count: 0 },
    { name: "Google Pixel 9 Pro", cost: 150000, time: 10, mine: 12500, count: 0 },
    { name: "Google Pixel 9a", cost: 145000, time: 10, mine: 12000, count: 0 },
    { name: "Google Pixel 9", cost: 140000, time: 10, mine: 11500, count: 0 },
    { name: "Google Pixel 8 Pro", cost: 145000, time: 10, mine: 11000, count: 0 },
    { name: "Google Pixel 8a", cost: 135000, time: 10, mine: 10000, count: 0 },
    { name: "Google Pixel 8", cost: 130000, time: 10, mine: 9500, count: 0 },
    { name: "Google Pixel 7 Pro", cost: 125000, time: 10, mine: 9000, count: 0 },
    { name: "Google Pixel 7a", cost: 120000, time: 10, mine: 8500, count: 0 },
    { name: "Google Pixel 7", cost: 115000, time: 10, mine: 8000, count: 0 },
    { name: "Google Pixel 6 Pro", cost: 110000, time: 10, mine: 7500, count: 0 },
    { name: "Google Pixel 6a", cost: 105000, time: 10, mine: 7000, count: 0 },
    { name: "Google Pixel 6", cost: 100000, time: 10, mine: 6500, count: 0 },
    { name: "Google Pixel 5a", cost: 95000, time: 10, mine: 6000, count: 0 },
    { name: "Google Pixel 5", cost: 90000, time: 10, mine: 5500, count: 0 },
    { name: "Google Pixel 4 XL", cost: 85000, time: 10, mine: 5000, count: 0 },
    { name: "Google Pixel 4", cost: 80000, time: 10, mine: 4500, count: 0 },
    { name: "Google Pixel 3a XL", cost: 75000, time: 10, mine: 4000, count: 0 },
    { name: "Google Pixel 3a", cost: 70000, time: 10, mine: 3500, count: 0 },
    { name: "Google Pixel 3 XL", cost: 65000, time: 10, mine: 3000, count: 0 },
    { name: "Google Pixel 3", cost: 60000, time: 10, mine: 2500, count: 0 },
    { name: "Google Pixel 2 XL", cost: 55000, time: 10, mine: 2000, count: 0 },
    { name: "Google Pixel 2", cost: 50000, time: 10, mine: 1500, count: 0 },
    { name: "Google Pixel XL", cost: 45000, time: 10, mine: 1000, count: 0 },
    { name: "Google Pixel", cost: 40000, time: 10, mine: 500, count: 0 },

    // Модели OnePlus
    { name: "OnePlus 12", cost: 160000, time: 10, mine: 10000, count: 0 },
    { name: "OnePlus Open", cost: 150000, time: 10, mine: 9000, count: 0 },
    { name: "OnePlus 12R", cost: 140000, time: 10, mine: 8000, count: 0 },
    { name: "OnePlus Nord 4", cost: 130000, time: 10, mine: 7000, count: 0 },
    { name: "OnePlus 11 Pro", cost: 120000, time: 10, mine: 6000, count: 0 },
    { name: "OnePlus Nord CE 4", cost: 110000, time: 10, mine: 5000, count: 0 },
    { name: "OnePlus Ace 3 Pro", cost: 100000, time: 10, mine: 4000, count: 0 },
    { name: "OnePlus 10T", cost: 90000, time: 10, mine: 3000, count: 0 },

    // Модели Vivo
    { name: "Vivo X300 Ultra", cost: 160000, time: 10, mine: 10000, count: 0 },
    { name: "Vivo X300 Pro", cost: 155000, time: 10, mine: 9500, count: 0 },
    { name: "Vivo X300", cost: 150000, time: 10, mine: 9000, count: 0 },
    { name: "Vivo X300s", cost: 145000, time: 10, mine: 8500, count: 0 },
    { name: "Vivo X300 FE", cost: 140000, time: 10, mine: 8000, count: 0 },
    { name: "Vivo X200 Ultra", cost: 135000, time: 10, mine: 7500, count: 0 },
    { name: "Vivo X200 Pro", cost: 130000, time: 10, mine: 7000, count: 0 },
    { name: "Vivo X200 Pro Mini", cost: 125000, time: 10, mine: 6500, count: 0 },
    { name: "Vivo X200", cost: 120000, time: 10, mine: 6000, count: 0 },
    { name: "Vivo X200s", cost: 115000, time: 10, mine: 5500, count: 0 },
    { name: "Vivo X200T", cost: 110000, time: 10, mine: 5000, count: 0 },
    { name: "Vivo X200 FE", cost: 105000, time: 10, mine: 4500, count: 0 },
    { name: "Vivo X100 Ultra", cost: 100000, time: 10, mine: 4000, count: 0 },
    { name: "Vivo X100 Pro", cost: 95000, time: 10, mine: 3500, count: 0 },
    { name: "Vivo X100", cost: 90000, time: 10, mine: 3000, count: 0 },
    { name: "Vivo X90 Pro+", cost: 85000, time: 10, mine: 2500, count: 0 },
    { name: "Vivo X90 Pro", cost: 80000, time: 10, mine: 2000, count: 0 },
    { name: "Vivo X90", cost: 75000, time: 10, mine: 1500, count: 0 },
    { name: "Vivo X80 Pro", cost: 70000, time: 10, mine: 1000, count: 0 },
    { name: "Vivo X80", cost: 65000, time: 10, mine: 500, count: 0 },

    // Модели Huawei
    { name: "Huawei Pura 70 Ultra", cost: 160000, time: 10, mine: 10000, count: 0 },
    { name: "Huawei Mate 60 Pro+", cost: 150000, time: 10, mine: 9000, count: 0 },
    { name: "Huawei Mate X5 Fold", cost: 130000, time: 10, mine: 8000, count: 0 },
    { name: "Huawei Pura 70 Pro", cost: 120000, time: 10, mine: 7000, count: 0 },
    { name: "Huawei Nova 12 Ultra", cost: 110000, time: 10, mine: 6000, count: 0 },
    { name: "Huawei Mate 60 RS", cost: 100000, time: 10, mine: 5000, count: 0 },
    { name: "Huawei P60 Pro", cost: 90000, time: 10, mine: 4000, count: 0 },
    { name: "Huawei Pocket 2", cost: 80000, time: 10, mine: 3000, count: 0 }
];

// Автоматический цикл сборки
function startBuildLoop() {
    if (isProducing) return;
    isProducing = true;
    
    const phone = phonesDB[Math.floor(Math.random() * phonesDB.length)];

    document.getElementById('active-phone-card').innerHTML = `
        <div class="item-card">
            <h3>Сборка на линии...</h3>
            <p>${phone.name}</p>
        </div>
    `;

    let duration = (phone.time * 1000) / (1 + upgrades.speedLevel * 0.2);
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
            
            phone.count = (phone.count || 0) + 1;
            warehouse.push({...phone, id: Date.now()});
            statsTotalBuilt++;
            
            updateUI();
            saveGame();
            
            // Сразу запускаем следующий
            startBuildLoop();
        }
    }, 50);
}

function renderIndex() {
    const grid = document.getElementById('index-grid');
    grid.innerHTML = phonesDB.map(p => {
        const isUnlocked = p.count > 0;
        return `
            <div class="item-card ${isUnlocked ? '' : 'locked-card'}">
                ${isUnlocked ? `<div class="index-badge">${p.count} шт.</div>` : ''}
                <h3>${isUnlocked ? p.name : ' Модель не найдена'}</h3>
                <p style="font-size: 13px; color: var(--text-dim); margin-top: 8px;">
                    Цена: $${p.cost.toLocaleString()}<br>
                    Базовый майнинг: $${p.mine}/с
                </p>
            </div>
        `;
    }).join('');
}

function renderUpgrades() {
    const data = [
        { id: 'speedLevel', name: 'Скорость сборки', desc: '+20% к скорости конвейера', base: 1000 },
        { id: 'slotsLevel', name: 'Места на ферме', desc: '+1 слот для майнинга', base: 5000 },
        { id: 'marketingLevel', name: 'Маркетинг', desc: '+10% к цене продажи телефонов', base: 2500 },
        { id: 'miningBoostLevel', name: 'Оверклокинг', desc: '+5% к прибыли со всей фермы', base: 4000 }
    ];

    document.getElementById('upgrades-list').innerHTML = data.map(u => {
        let cost = u.base * (upgrades[u.id] + 1);
        return `
            <div class="item-card">
                <h3>${u.name} (Ур. ${upgrades[u.id]})</h3>
                <p style="color: var(--text-dim); margin: 8px 0;">${u.desc}</p>
                <button class="btn-action" onclick="buyUpgrade('${u.id}', ${cost})">Купить за $${cost.toLocaleString()}</button>
            </div>
        `;
    }).join('');
}

function buyUpgrade(id, cost) {
    if (money >= cost) {
        money -= cost;
        upgrades[id]++;
        if (id === 'slotsLevel') miningSlots++;
        updateUI();
        renderUpgrades();
        saveGame();
    }
}

function renderWarehouse() {
    const grid = document.getElementById('market-sell');
    grid.innerHTML = warehouse.map(p => {
        let sellPrice = Math.floor(p.cost * (1 + upgrades.marketingLevel * 0.1));
        return `
            <div class="item-card">
                <h3>${p.name}</h3>
                <p>Цена продажи: <b>$${sellPrice.toLocaleString()}</b></p>
                <button class="btn-action" onclick="sellPhone(${p.id})">Продать</button>
                <button class="btn-secondary" onclick="toMining(${p.id})">В майнинг</button>
            </div>
        `;
    }).join('');
}

function sellPhone(id) {
    let idx = warehouse.findIndex(p => p.id === id);
    if (idx !== -1) {
        money += Math.floor(warehouse[idx].cost * (1 + upgrades.marketingLevel * 0.1));
        warehouse.splice(idx, 1);
        renderWarehouse();
        updateUI();
        saveGame();
    }
}

function toMining(id) {
    if (miningFarm.length >= miningSlots) return;
    let idx = warehouse.findIndex(p => p.id === id);
    if (idx !== -1) {
        miningFarm.push(warehouse[idx]);
        warehouse.splice(idx, 1);
        renderWarehouse();
        updateUI();
        saveGame();
    }
}

// Новая функция: Убрать из майнинга
function removeFromMining(id) {
    let idx = miningFarm.findIndex(p => p.id === id);
    if (idx !== -1) {
        warehouse.push(miningFarm[idx]);
        miningFarm.splice(idx, 1);
        renderMining();
        updateUI();
        saveGame();
    }
}

function renderMining() {
    document.getElementById('mining-grid').innerHTML = miningFarm.map(p => {
        let actualMine = Math.floor(p.mine * (1 + upgrades.miningBoostLevel * 0.05));
        return `
        <div class="item-card">
            <h3>${p.name}</h3>
            <p>Доход: <b>$${actualMine.toLocaleString()}/с</b></p>
            <button class="btn-secondary" onclick="removeFromMining(${p.id})">Снять с фермы</button>
        </div>
        `;
    }).join('');
}

function updateUI() {
    document.getElementById('money-display').innerText = '$' + Math.floor(money).toLocaleString();
    
    let baseIncome = miningFarm.reduce((sum, p) => sum + p.mine, 0);
    let totalIncome = Math.floor(baseIncome * (1 + upgrades.miningBoostLevel * 0.05));
    
    document.getElementById('mining-rate').innerText = totalIncome.toLocaleString();
    document.getElementById('slots-count').innerText = `${miningFarm.length} / ${miningSlots}`;
    document.getElementById('stats-total-built').innerText = statsTotalBuilt;
    document.getElementById('speed-bonus').innerText = (100 + upgrades.speedLevel * 20) + '%';
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

setInterval(() => {
    let baseIncome = miningFarm.reduce((sum, p) => sum + p.mine, 0);
    let totalIncome = Math.floor(baseIncome * (1 + upgrades.miningBoostLevel * 0.05));
    if (totalIncome > 0) {
        money += totalIncome;
        updateUI();
    }
}, 1000);

function toggleTheme() {
    const html = document.documentElement;
    html.setAttribute('data-theme', html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

function saveGame() {
    localStorage.setItem('pme_save_v3', JSON.stringify({ 
        money, warehouse, miningFarm, upgrades, miningSlots, statsTotalBuilt, phonesDB 
    }));
}

function loadGame() {
    const saved = localStorage.getItem('pme_save_v3');
    if (saved) {
        const d = JSON.parse(saved);
        money = d.money; warehouse = d.warehouse; miningFarm = d.miningFarm;
        upgrades = d.upgrades || upgrades;
        miningSlots = d.miningSlots; statsTotalBuilt = d.statsTotalBuilt;
        if(d.phonesDB) {
            d.phonesDB.forEach(sd => {
                let p = phonesDB.find(x => x.name === sd.name);
                if(p) p.count = sd.count || 0;
            });
        }
    }
    // Если Оверклокинга не было в старом сохранении, добавляем его
    if (upgrades.miningBoostLevel === undefined) upgrades.miningBoostLevel = 0;
    
    updateUI();
    startBuildLoop(); // Запускаем автосборку при загрузке страницы
}

window.onload = loadGame;
