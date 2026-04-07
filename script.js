"use strict";

const Engine = (function() {
    // --- ЗАКРЫТЫЕ ДАННЫЕ (ЧИТЕРЫ ИХ НЕ ВИДЯТ) ---
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

    // Модели  OnePlus
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


    // --- ВНУТРЕННЯЯ ЛОГИКА ---

    function updateUI() {
        document.getElementById('money-display').innerText = '$' + Math.floor(money).toLocaleString();
        let baseIncome = miningFarm.reduce((sum, p) => sum + p.mine, 0);
        let totalIncome = Math.floor(baseIncome * (1 + upgrades.miningBoostLevel * 0.05));
        
        document.getElementById('mining-rate').innerText = totalIncome.toLocaleString();
        const sc = document.getElementById('slots-count');
        if(sc) sc.innerText = `${miningFarm.length} / ${miningSlots}`;
        
        const stb = document.getElementById('stats-total-built');
        if(stb) stb.innerText = statsTotalBuilt;
        
        const sb = document.getElementById('speed-bonus');
        if(sb) sb.innerText = (100 + upgrades.speedLevel * 20) + '%';
    }

    function saveGame() {
        localStorage.setItem('pme_save_secure', JSON.stringify({ 
            money, warehouse, miningFarm, upgrades, miningSlots, statsTotalBuilt, phonesDB 
        }));
    }

    function startBuildLoop() {
        if (isProducing) return;
        isProducing = true;
        const phone = phonesDB[Math.floor(Math.random() * phonesDB.length)];
        const card = document.getElementById('active-phone-card');
        if(card) card.innerHTML = `<div class="item-card"><h3>Сборка...</h3><p>${phone.name}</p></div>`;

        let duration = (phone.time * 1000) / (1 + upgrades.speedLevel * 0.2);
        let start = Date.now();

        const interval = setInterval(() => {
            let elapsed = Date.now() - start;
            let percent = Math.min((elapsed / duration) * 100, 100);
            const fill = document.getElementById('auto-progress-fill');
            if(fill) fill.style.width = percent + '%';
            
            if (elapsed >= duration) {
                clearInterval(interval);
                isProducing = false;
                phone.count = (phone.count || 0) + 1;
                warehouse.push({...phone, id: Date.now()});
                statsTotalBuilt++;
                updateUI();
                saveGame();
                startBuildLoop();
            }
        }, 50);
    }

    // --- ПУБЛИЧНЫЕ МЕТОДЫ (ДОСТУПНЫ ИЗ HTML) ---
    return {
        init: function() {
            const saved = localStorage.getItem('pme_save_secure');
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
            updateUI();
            startBuildLoop();
            console.log("%c Phone Market Empire: Защита активна ", "background: #007aff; color: white;");
        },

        openTab: function(tabId) {
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            const btn = document.getElementById('btn-' + tabId);
            if(btn) btn.classList.add('active');

            if(tabId === 'warehouse') this.renderWarehouse();
            if(tabId === 'mining') this.renderMining();
            if(tabId === 'shop') this.renderUpgrades();
            if(tabId === 'index') this.renderIndex();
        },

        sell: function(id) {
            let idx = warehouse.findIndex(p => p.id === id);
            if (idx !== -1) {
                money += Math.floor(warehouse[idx].cost * (1 + upgrades.marketingLevel * 0.1));
                warehouse.splice(idx, 1);
                this.renderWarehouse();
                updateUI();
                saveGame();
            }
        },

        toMining: function(id) {
            if (miningFarm.length >= miningSlots) return alert("Нет свободных слотов!");
            let idx = warehouse.findIndex(p => p.id === id);
            if (idx !== -1) {
                miningFarm.push(warehouse[idx]);
                warehouse.splice(idx, 1);
                this.renderWarehouse();
                updateUI();
                saveGame();
            }
        },

        buyUpgrade: function(id, cost) {
            if (money >= cost) {
                money -= cost;
                upgrades[id]++;
                if (id === 'slotsLevel') miningSlots++;
                updateUI();
                this.renderUpgrades();
                saveGame();
            }
        },

        // Рендер-функции перенесены внутрь для доступа к приватным переменным
        renderWarehouse: function() {
            const grid = document.getElementById('market-sell');
            grid.innerHTML = warehouse.map(p => `
                <div class="item-card">
                    <h3>${p.name}</h3>
                    <button class="btn-action" onclick="Engine.sell(${p.id})">Продать</button>
                    <button class="btn-secondary" onclick="Engine.toMining(${p.id})">В майнинг</button>
                </div>
            `).join('');
        },

        renderUpgrades: function() {
            const upgData = [
                { id: 'speedLevel', name: 'Скорость', base: 1000 },
                { id: 'slotsLevel', name: 'Слоты', base: 5000 },
                { id: 'marketingLevel', name: 'Маркетинг', base: 2500 },
                { id: 'miningBoostLevel', name: 'Оверклокинг', base: 4000 }
            ];
            document.getElementById('upgrades-list').innerHTML = upgData.map(u => {
                let cost = u.base * (upgrades[u.id] + 1);
                return `<div class="item-card">
                    <h3>${u.name} (Ур. ${upgrades[u.id]})</h3>
                    <button class="btn-action" onclick="Engine.buyUpgrade('${u.id}', ${cost})">Купить за $${cost}</button>
                </div>`;
            }).join('');
        },

        toggleTheme: function() {
            const html = document.documentElement;
            html.setAttribute('data-theme', html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        },

        tick: function() {
            let baseIncome = miningFarm.reduce((sum, p) => sum + p.mine, 0);
            let totalIncome = Math.floor(baseIncome * (1 + upgrades.miningBoostLevel * 0.05));
            if (totalIncome > 0) {
                money += totalIncome;
                updateUI();
            }
        }
    };
})();

// Запуск
window.onload = Engine.init;
setInterval(() => Engine.tick(), 1000);

// Анти-отладка (зацикливаем дебаггер при открытии консоли)
(function() {
    let devtools = function() {};
    devtools.toString = function() {
        setInterval(() => { debugger; }, 50);
        return "";
    };
    console.log("%c", devtools);
}());
