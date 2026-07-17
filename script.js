// =======================
// Директор металлургического завода
// game.js - Часть 1
// =======================

// Основные ресурсы
let money = 1000000;
let ore = 500;
let coal = 300;
let steel = 0;
let electricity = 100;
let workers = 50;

// Производство
let furnaceTemperature = 1200;
let equipment = 100;
let productionLevel = 1;
let day = 1;

// Экономика
let steelPrice = 800;
let orePrice = 120;
let coalPrice = 90;
let electricityPrice = 40;

// Статистика
let producedSteel = 0;
let soldSteel = 0;
let accidents = 0;

// Обновление интерфейса
function updateUI() {

    setText("money", money + " ₽");
    setText("ore", ore + " т");
    setText("coal", coal + " т");
    setText("steel", steel + " т");
    setText("electricity", electricity + "%");
    setText("workers", workers);
    setText("temperature", furnaceTemperature + " °C");
    setText("equipment", equipment + "%");
    setText("priceSteel", steelPrice + " ₽/т");
    setText("day", day);

    updateBar("equipmentBar", equipment);
    updateBar("energyBar", electricity);
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = value;
}

function updateBar(id, value) {
    const el = document.getElementById(id);
    if (el) el.style.width = value + "%";
}

// Лог событий
function log(text) {

    const logBox = document.getElementById("log");

    if (!logBox) return;

    const p = document.createElement("p");

    p.innerHTML =
        "[" + day + " день] " + text;

    logBox.prepend(p);

    while (logBox.children.length > 30)
        logBox.removeChild(logBox.lastChild);
}

// Следующий день
function nextDay() {

    day++;

    // Зарплата
    money -= workers * 120;

    // Износ оборудования
    equipment -= Math.random() * 3;

    // Расход энергии
    electricity -= 5;

    // Изменение цен
    steelPrice += Math.floor(Math.random() * 61 - 30);
    orePrice += Math.floor(Math.random() * 21 - 10);
    coalPrice += Math.floor(Math.random() * 21 - 10);

    if (steelPrice < 500) steelPrice = 500;
    if (orePrice < 60) orePrice = 60;
    if (coalPrice < 40) coalPrice = 40;

    checkFactory();

    updateUI();
}

// Проверка состояния завода
function checkFactory() {

    if (equipment <= 0) {

        alert("Оборудование полностью разрушено!");

        location.reload();

    }

    if (electricity <= 0) {

        alert("Завод обесточен!");

        location.reload();

    }

    if (money < -500000) {

        alert("Компания обанкротилась!");

        location.reload();

    }

}

// Покупка руды
function buyOre() {

    ore += 100;

    money -= orePrice * 100;

    log("Закуплено 100 тонн руды.");

    updateUI();

}

// Покупка угля
function buyCoal() {

    coal += 100;

    money -= coalPrice * 100;

    log("Закуплено 100 тонн угля.");

    updateUI();

}

// Покупка электроэнергии
function buyElectricity() {

    if (money >= electricityPrice * 50) {

        electricity += 50;

        if (electricity > 100)
            electricity = 100;

        money -= electricityPrice * 50;

        log("Закуплена электроэнергия.");

    }

    updateUI();

}

// Ремонт оборудования
function repairEquipment() {

    if (money >= 50000) {

        money -= 50000;

        equipment = 100;

        log("Оборудование полностью отремонтировано.");

    }

    updateUI();

}

// Запуск игры
window.onload = function () {

    updateUI();

    log("Металлургический завод готов к работе.");

};// =======================
// game.js - Часть 2
// =======================

// Производство стали
function produceSteel() {

    if (ore < 20) {
        log("❌ Недостаточно руды.");
        return;
    }

    if (coal < 10) {
        log("❌ Недостаточно угля.");
        return;
    }

    if (electricity < 15) {
        log("❌ Недостаточно электроэнергии.");
        return;
    }

    if (equipment < 15) {
        log("❌ Оборудование требует ремонта.");
        return;
    }

    ore -= 20;
    coal -= 10;
    electricity -= 15;

    let amount = productionLevel * workers;

    steel += amount;
    producedSteel += amount;

    equipment -= Math.floor(Math.random() * 5 + 2);

    money -= workers * 10;

    log("🏭 Выплавлено " + amount + " тонн стали.");

    updateUI();

}

// Продажа стали
function sellSteel() {

    if (steel <= 0) {

        log("❌ Нет готовой стали.");

        return;

    }

    let income = steel * steelPrice;

    money += income;

    soldSteel += steel;

    log("💰 Продано " + steel + " тонн стали.");

    steel = 0;

    updateUI();

}

// Повышение температуры печи
function increaseTemperature() {

    if (electricity < 5) {

        log("⚡ Недостаточно энергии.");

        return;

    }

    electricity -= 5;

    furnaceTemperature += 100;

    if (furnaceTemperature > 1700) {

        furnaceTemperature = 1700;

        log("🔥 Печь работает на максимуме.");

    } else {

        log("🔥 Температура повышена.");

    }

    updateUI();

}

// Понижение температуры
function decreaseTemperature() {

    furnaceTemperature -= 100;

    if (furnaceTemperature < 1000)
        furnaceTemperature = 1000;

    log("🌡 Температура снижена.");

    updateUI();

}

// Найм рабочих
function hireWorkers() {

    if (money < 50000) {

        log("Недостаточно средств.");

        return;

    }

    workers += 10;

    money -= 50000;

    log("👷 Нанято 10 рабочих.");

    updateUI();

}

// Увольнение рабочих
function fireWorkers() {

    if (workers <= 10) {

        log("Минимальное количество работников.");

        return;

    }

    workers -= 10;

    log("Сокращено 10 работников.");

    updateUI();

}

// Улучшение производства
function upgradeFactory() {

    let cost = productionLevel * 300000;

    if (money < cost) {

        log("Недостаточно денег для модернизации.");

        return;

    }

    money -= cost;

    productionLevel++;

    log("🚀 Производительность увеличена до уровня " + productionLevel);

    updateUI();

}

// Автоматический производственный цикл
setInterval(function(){

    if(equipment > 10 &&
       electricity > 10 &&
       ore >= 20 &&
       coal >= 10){

        produceSteel();

    }

},15000);// ==========================
// game.js — Часть 3
// Аварии и рынок
// ==========================

// Случайное событие
function randomEvent() {

    let event = Math.floor(Math.random() * 8);

    switch (event) {

        case 0:
            money += 100000;
            log("💰 Государственная субсидия +100 000 ₽");
            break;

        case 1:
            equipment -= 20;
            accidents++;
            log("💥 Поломка оборудования!");
            break;

        case 2:
            electricity -= 20;
            log("⚡ Авария на электросети.");
            break;

        case 3:
            steelPrice += 150;
            log("📈 Цена на сталь выросла.");
            break;

        case 4:
            steelPrice -= 120;
            if (steelPrice < 500) steelPrice = 500;
            log("📉 Цена на сталь снизилась.");
            break;

        case 5:
            ore += 200;
            log("🚛 Пришла дополнительная партия руды.");
            break;

        case 6:
            coal += 150;
            log("🚚 Получена партия кокса.");
            break;

        case 7:
            workers += 5;
            log("👷 На завод пришли новые специалисты.");
            break;
    }

    updateUI();
}

// Проверка аварий
function accidentCheck() {

    if (furnaceTemperature > 1600) {

        if (Math.random() < 0.35) {

            accidents++;

            equipment -= 40;

            electricity -= 20;

            log("🔥 Авария! Перегрев доменной печи!");

        }

    }

    if (equipment < 30) {

        if (Math.random() < 0.30) {

            accidents++;

            equipment -= 15;

            log("⚠ Оборудование выходит из строя.");

        }

    }

    updateUI();

}

// Контракт
function newContract() {

    let tons = Math.floor(Math.random() * 400 + 100);

    let price = steelPrice + Math.floor(Math.random() * 150);

    window.currentContract = {
        tons: tons,
        price: price
    };

    log("📄 Новый контракт: " +
        tons +
        " т по " +
        price +
        " ₽/т");

}

// Выполнить контракт
function completeContract() {

    if (!window.currentContract) {

        log("Нет активного контракта.");

        return;

    }

    if (steel < window.currentContract.tons) {

        log("Недостаточно стали.");

        return;

    }

    steel -= window.currentContract.tons;

    let income =
        window.currentContract.tons *
        window.currentContract.price;

    money += income;

    log("✅ Контракт выполнен.");

    window.currentContract = null;

    updateUI();

}

// Рыночные цены
function marketUpdate() {

    steelPrice += Math.floor(Math.random() * 101 - 50);

    orePrice += Math.floor(Math.random() * 21 - 10);

    coalPrice += Math.floor(Math.random() * 21 - 10);

    if (steelPrice < 500)
        steelPrice = 500;

    if (orePrice < 60)
        orePrice = 60;

    if (coalPrice < 40)
        coalPrice = 40;

    updateUI();

}

// Таймеры
setInterval(randomEvent,60000);

setInterval(accidentCheck,25000);

setInterval(newContract,120000);

setInterval(marketUpdate,30000);// ==========================
// game.js — Часть 4
// Сохранение, достижения,
// уровни и ИИ-конкурент
// ==========================

// Уровень компании
let companyLevel = 1;

// Конкурент
let competitor = {
    name: "Steel Corp",
    money: 1000000,
    steel: 0,
    level: 1
};

// Проверка уровня
function checkLevel() {

    if (producedSteel >= 1000 && companyLevel < 2) {
        companyLevel = 2;
        log("🏆 Компания достигла уровня 2!");
    }

    if (producedSteel >= 5000 && companyLevel < 3) {
        companyLevel = 3;
        log("🏆 Компания достигла уровня 3!");
    }

    if (producedSteel >= 10000 && companyLevel < 4) {
        companyLevel = 4;
        log("🏆 Компания достигла уровня 4!");
    }

}

// Достижения
function checkAchievements() {

    if (money >= 5000000) {
        log("💎 Достижение: Финансовый магнат!");
    }

    if (producedSteel >= 10000) {
        log("🏭 Достижение: Металлург года!");
    }

    if (workers >= 200) {
        log("👷 Достижение: Крупнейший работодатель!");
    }

}

// ИИ-конкурент
function competitorTurn() {

    competitor.steel += competitor.level * 40;

    competitor.money += competitor.steel * 20;

    if (Math.random() < 0.25) {
        competitor.level++;
    }

}

// Проверка победы
function checkVictory() {

    if (money >= 10000000) {

        alert("🎉 Поздравляем! Вы построили крупнейший металлургический завод!");

        location.reload();

    }

}

// Проверка поражения
function checkLose() {

    if (money <= -1000000) {

        alert("💀 Завод обанкротился.");

        location.reload();

    }

}

// Сохранение игры
function saveGame() {

    let save = {

        money,
        ore,
        coal,
        steel,
        electricity,
        workers,
        furnaceTemperature,
        equipment,
        productionLevel,
        day,
        producedSteel,
        soldSteel,
        accidents,
        companyLevel

    };

    localStorage.setItem("steelFactorySave", JSON.stringify(save));

    log("💾 Игра сохранена.");

}

// Загрузка игры
function loadGame() {

    let save = localStorage.getItem("steelFactorySave");

    if (!save)
        return;

    save = JSON.parse(save);

    money = save.money;
    ore = save.ore;
    coal = save.coal;
    steel = save.steel;
    electricity = save.electricity;
    workers = save.workers;
    furnaceTemperature = save.furnaceTemperature;
    equipment = save.equipment;
    productionLevel = save.productionLevel;
    day = save.day;
    producedSteel = save.producedSteel;
    soldSteel = save.soldSteel;
    accidents = save.accidents;
    companyLevel = save.companyLevel;

    updateUI();

    log("📂 Игра загружена.");

}

// Автосохранение каждые 30 секунд
setInterval(saveGame, 30000);

// Проверки каждые 5 секунд
setInterval(function(){

    checkLevel();

    checkAchievements();

    checkVictory();

    checkLose();

    competitorTurn();

},5000);
