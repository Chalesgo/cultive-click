// Core game variables
let qi = 0;
let qiPerClick = 1;
let rebirthCost = 1000;
let fatePoints = 0;

// Upgrades
const upgrades = [
    { name: "Infuse Organ", cost: 10, level: 0, maxLevel: 10, multiplier: 2 },
    { name: "Infuse Skeleton", cost: 20, level: 0, maxLevel: 10, multiplier: 3 },
    { name: "Infuse Muscle", cost: 30, level: 0, maxLevel: 10, multiplier: 4 },
    { name: "Infuse Skin", cost: 40, level: 0, maxLevel: 10, multiplier: 5 }
];

// Elements
const yinYang = document.getElementById('yinYang');
const qiDisplay = document.getElementById('qiDisplay');
const qiPerClickDisplay = document.getElementById('qiPerClickDisplay');
const upgradeList = document.getElementById('upgradeList');

// Click functionality
yinYang.addEventListener('click', () => {
    qi += qiPerClick;
    updateStats();

    // Spin animation speed-up
    yinYang.style.animation = 'spin 0.5s linear infinite';
    setTimeout(() => {
        yinYang.style.animation = 'spin 5s linear infinite';
    }, 500);
});

// Update stats
function updateStats() {
    qiDisplay.textContent = qi;
    qiPerClickDisplay.textContent = qiPerClick;
    renderUpgrades();
}

// Render upgrades dynamically
function renderUpgrades() {
    upgradeList.innerHTML = '';
    upgrades.forEach((upgrade, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${upgrade.name} - Cost: ${upgrade.cost}, Level: ${upgrade.level}/${upgrade.maxLevel}</span>
            <button 
                ${qi < upgrade.cost || upgrade.level >= upgrade.maxLevel ? 'disabled' : ''} 
                onclick="purchaseUpgrade(${index})">
                Upgrade
            </button>
        `;
        upgradeList.appendChild(li);
    });
}

// Purchase an upgrade
function purchaseUpgrade(index) {
    const upgrade = upgrades[index];
    if (qi >= upgrade.cost && upgrade.level < upgrade.maxLevel) {
        qi -= upgrade.cost;
        upgrade.level++;
        upgrade.cost = Math.ceil(upgrade.cost * 1.5); // Cost increases by 50%
        qiPerClick += upgrade.multiplier;
        updateStats();
    }
}

// Rebirth functionality
function rebirth() {
    if (qi >= rebirthCost) {
        fatePoints += Math.floor(qi / rebirthCost); // Gain fate points based on excess Qi
        qi = 0;
        qiPerClick = 1;
        upgrades.forEach(upgrade => {
            upgrade.level = 0;
            upgrade.cost = 10; // Reset to default cost
        });
        updateStats();
        alert(`Rebirth successful! Fate Points: ${fatePoints}`);
    } else {
        alert('Not enough Qi to rebirth!');
    }
}

// Save and load functionality
function saveGame() {
    const saveData = JSON.stringify({ qi, qiPerClick, upgrades, fatePoints });
    document.getElementById('saveBox').value = saveData;
}

function loadGame() {
    const saveData = document.getElementById('saveBox').value;
    if (saveData) {
        const parsedData = JSON.parse(saveData);
        qi = parsedData.qi;
        qiPerClick = parsedData.qiPerClick;
        fatePoints = parsedData.fatePoints;
        parsedData.upgrades.forEach((upgrade, index) => {
            upgrades[index].cost = upgrade.cost;
            upgrades[index].level = upgrade.level;
        });
        updateStats();
    }
}

// Initialize game
updateStats();
