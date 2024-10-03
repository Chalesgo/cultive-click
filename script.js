let qiAmount = 0;
let qiPerClick = 1;
let qiPerSecond = 0;
let rebirthBonus = 0;

// Costs for cultivation upgrades
const cultivationUpgradeCosts = {
    organ: 10,
    skeleton: 50,
    muscle: 100,
    skin: 200
};

const buildingUpgradeCosts = {
    array: 100,
    extractor: 500,
    engine: 1000
};

// Click to generate Qi
function generateQi() {
    qiAmount += qiPerClick + rebirthBonus;
    updateQiDisplay();
}

// Cultivation Upgrades
function upgradeBody(part) {
    if (qiAmount >= cultivationUpgradeCosts[part]) {
        qiAmount -= cultivationUpgradeCosts[part];
        // Define what each upgrade increases
        // Adjust these values as per the final game mechanics
        cultivationUpgradeCosts[part] *= 2;
        document.getElementById(`upgrade${capitalize(part)}`).title = `Cost: ${cultivationUpgradeCosts[part]} Qi, Increases ???`;
        updateQiDisplay();
    } else {
        alert("Not enough Qi for this upgrade!");
    }
}

// Building Upgrades
function upgradeBuilding(building) {
    if (qiAmount >= buildingUpgradeCosts[building]) {
        switch (building) {
            case 'array':
                qiPerSecond += 5;
                break;
            case 'extractor':
                qiPerSecond += 10;
                break;
            case 'engine':
                qiPerSecond += 15;
                break;
        }
        qiAmount -= buildingUpgradeCosts[building];
        buildingUpgradeCosts[building] *= 2;
        document.getElementById(`upgrade${capitalize(building)}`).title = `Cost: ${buildingUpgradeCosts[building]} Qi, Increases Qi per second by ${building === 'array' ? 5 : building === 'extractor' ? 10 : 15}`;
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

// Utility function to capitalize strings for dynamic references
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Start the Qi per second generator
setInterval(() => {
    qiAmount += qiPerSecond;
    updateQiDisplay();
}, 1000);

