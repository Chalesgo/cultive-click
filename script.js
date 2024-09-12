let qiAmount = 0;
let qiPerClick = 1;
let qiPerSecond = 0;
let rebirthBonus = 0;

// Costs for upgrades
const bodyUpgradeCosts = {
    hands: 10,
    legs: 50,
    torso: 100
};

const buildingUpgradeCosts = {
    temple: 100,
    tower: 500,
    garden: 1000
};

// Click to generate Qi
function generateQi() {
    qiAmount += qiPerClick + rebirthBonus;
    updateQiDisplay();
}

// Body Upgrades: Increases Qi gathered per click
function upgradeBody(part) {
    if (qiAmount >= bodyUpgradeCosts[part]) {
        switch (part) {
            case 'hands':
                qiPerClick += 1;
                qiAmount -= bodyUpgradeCosts.hands;
                bodyUpgradeCosts.hands *= 2;
                document.getElementById('upgradeHands').title = `Cost: ${bodyUpgradeCosts.hands} Qi, Increases Qi per click by 1`;
                break;
            case 'legs':
                qiPerClick += 2;
                qiAmount -= bodyUpgradeCosts.legs;
                bodyUpgradeCosts.legs *= 2;
                document.getElementById('upgradeLegs').title = `Cost: ${bodyUpgradeCosts.legs} Qi, Increases Qi per click by 2`;
                break;
            case 'torso':
                qiPerClick += 3;
                qiAmount -= bodyUpgradeCosts.torso;
                bodyUpgradeCosts.torso *= 2;
                document.getElementById('upgradeTorso').title = `Cost: ${bodyUpgradeCosts.torso} Qi, Increases Qi per click by 3`;
                break;
        }
        updateQiDisplay();
    } else {
        alert("Not enough Qi for this upgrade!");
    }
}

// Building Upgrades: Increases Qi per second
function upgradeBuilding(building) {
    if (qiAmount >= buildingUpgradeCosts[building]) {
        switch (building) {
            case 'temple':
                qiPerSecond += 5;
                qiAmount -= buildingUpgradeCosts.temple;
                buildingUpgradeCosts.temple *= 2;
                document.getElementById('upgradeTemple').title = `Cost: ${buildingUpgradeCosts.temple} Qi, Increases Qi per second by 5`;
                break;
            case 'tower':
                qiPerSecond += 10;
                qiAmount -= buildingUpgradeCosts.tower;
                buildingUpgradeCosts.tower *= 2;
                document.getElementById('upgradeTower').title = `Cost: ${buildingUpgradeCosts.tower} Qi, Increases Qi per second by 10`;
                break;
            case 'garden':
                qiPerSecond += 15;
                qiAmount -= buildingUpgradeCosts.garden;
                buildingUpgradeCosts.garden *= 2;
                document.getElementById('upgradeGarden').title = `Cost: ${buildingUpgradeCosts.garden} Qi, Increases Qi per second by 15`;
                break;
        }
        updateQiDisplay();
    } else {
        alert("Not enough Qi for this upgrade!");
    }
}

// Rebirth: Resets Qi but gives a bonus
function rebirth() {
    if (qiAmount >= 1000) {
        qiAmount = 0;
        qiPerClick = 1;
        qiPerSecond = 0;
        rebirthBonus += 1;
        alert("Rebirth successful! Bonus added.");
    } else {
        alert("You need 1000 Qi to rebirth.");
    }
    updateQiDisplay();
}

// Update the display of Qi and other stats
function updateQiDisplay() {
    document.getElementById('qiAmount').textContent = qiAmount;
    document.getElementById('qiPerClick').textContent = qiPerClick + rebirthBonus;
    document.getElementById('qiPerSecond').textContent = qiPerSecond;
}

// Save and load game progress
function saveProgress() {
    const saveData = {
        qiAmount: qiAmount,
        qiPerClick: qiPerClick,
        qiPerSecond: qiPerSecond,
        rebirthBonus: rebirthBonus
    };
    document.getElementById('saveText').value = JSON.stringify(saveData);
}

function loadProgress() {
    const saveData = JSON.parse(document.getElementById('saveText').value);
    qiAmount = saveData.qiAmount;
    qiPerClick = saveData.qiPerClick;
    qiPerSecond = saveData.qiPerSecond;
    rebirthBonus = saveData.rebirthBonus;
    updateQiDisplay();
}
