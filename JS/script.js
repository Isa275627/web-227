const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const overlay = document.getElementById("overlay");


hamburger.onclick = () => {
    navLinks.classList.toggle("show");
    hamburger.classList.toggle("active");
    overlay.classList.toggle("show");
};

const pages = document.querySelectorAll(".page");

function showSection(id) {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

navLinks.querySelectorAll("button").forEach(btn => {
    btn.onclick = () => {

        navLinks.querySelectorAll("button").forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        showSection(btn.dataset.section);

        navLinks.classList.remove("show");
        hamburger.classList.remove("active");
        overlay.classList.remove("show");
    };
});

overlay.onclick = () => {
    navLinks.classList.remove("show");
    hamburger.classList.remove("active");
    overlay.classList.remove("show");
};

let count = 0;
const counterValue = document.getElementById("counterValue");

document.getElementById("countBtn").onclick = () => {
    count++;
    counterValue.textContent = count;
};

document.getElementById("resetBtn").onclick = () => {
    count = 0;
    counterValue.textContent = count;
};

const colors = ["#0d6efd", "#6610f2", "#198754", "#dc3545", "#000000"];
let colorIndex = 0;

document.getElementById("colorBtn").onclick = () => {
    counterValue.style.color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
};

const audioPlayer = document.getElementById("audioPlayer");
const playPause = document.getElementById("playPause");
const audioTitle = document.getElementById("audioTitle");
const audioProgress = document.getElementById("audioProgress");

const audioFiles = [
    { src: "mp3/audio.mp3", title: "Al-Baqarah" },
    { src: "mp3/Sura_Lukman.mp3", title: "Сура Лукман" }
];

let currentAudio = 0;

function loadAudio(i) {
    audioPlayer.src = audioFiles[i].src;
    audioTitle.textContent = "AUDIO: " + audioFiles[i].title;
}

playPause.onclick = () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPause.textContent = "⏸";
    } else {
        audioPlayer.pause();
        playPause.textContent = "▶️";
    }
};

audioPlayer.ontimeupdate = () => {
    let percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    audioProgress.style.width = percent + "%";
};

loadAudio(currentAudio);

const pdfModal = document.getElementById("pdfModal");
const pdfIframe = pdfModal.querySelector("iframe");

document.querySelectorAll(".pdfBtn").forEach(btn => {
    btn.onclick = () => {
        pdfIframe.src = btn.dataset.pdf;
        pdfModal.classList.add("show");
    };
});

document.getElementById("closePdf").onclick = () => {
    pdfModal.classList.remove("show");
};

const questions = [
    {
        question: "Где родился Пророк ﷺ ?",
        options: ["Медина", "Мекка", "Таиф", "Ясриб"],
        correct: 1
    },
    {
        question: "В каком возрасте он получил откровение?",
        options: ["25", "30", "40", "50"],
        correct: 2
    },
    {
        question: "Какой ангел передал Пророку Мухаммаду ﷺ первое откровение?",
        options: ["Микаил", "Джибрил", "Исрафил", "Азраил"],
        correctAnswer: 1
    },
    {
        question: "Как звали первого мужчину, принявшего ислам?",
        options: ["Али ибн Абу Талиб", "Умар ибн аль-Хаттаб", "Абу Бакр ас-Сиддик", "Усман ибн Аффан"],
        correctAnswer: 2
    },
    {
        question: "Сколько лет длилось пророчество Пророка Мухаммада ﷺ ?",
        options: ["20 лет", "23 года", "25 лет", "30 лет"],
        correctAnswer: 1
    },
    {
        question: "Кто была первой женой Пророка Мухаммада ﷺ ?",
        options: ["Аиша бинт Абу Бакр", "Сауда бинт Зам’а", "Хадиджа бинт Хувайлид", "Фатима бинт Мухаммад"],
        correctAnswer: 2
    },
    {
        question: "Как называлась первая битва мусульман против курайшитов?",
        options: ["Битва при Ухуде", "Битва при Табуке", "Битва при Бадре", "Битва при Хунейне"],
        correctAnswer: 2
    },
    {
        question: "В каком году произошел Хиджра — переселение мусульман из Мекки в Медину?",
        options: ["610 г.", "615 г.", "622 г.", "630 г."],
        correctAnswer: 2
    },
    {
        question: "Кто стал первым халифом после смерти Пророка Мухаммада ﷺ ?",
        options: ["Умар ибн аль-Хаттаб", "Абу Бакр ас-Сиддик", "Усман ибн Аффан", "Али ибн Абу Талиб"],
        correctAnswer: 1
    },
    {
        question: "Кто был известен как «Меч Аллаха» (Сайфуллах)?",
        options: ["Халид ибн аль-Валид", "Умар ибн аль-Хаттаб", "Али ибн Абу Талиб", "Салман аль-Фариси"],
        correctAnswer: 0
    },
    {
        question: "Сколько лет Пророк Мухаммад ﷺ прожил в Мекке после начала откровений?",
        options: ["10 лет", "13 лет", "15 лет", "20 лет"],
        correctAnswer: 1
    },
    {
        question: "Как звали лучшего друга и ближайшего сподвижника Пророка Мухаммада ﷺ ?",
        options: ["Усман ибн Аффан", "Али ибн Абу Талиб", "Абу Бакр ас-Сиддик", "Саад ибн Абу Ваккас"],
        correctAnswer: 2
    },
    {
        question: "Кто был назначен главнокомандующим в битве при Муте?",
        options: ["Зайд ибн Хариса", "Халид ибн аль-Валид", "Абдуррахман ибн Ауф", "Умар ибн аль-Хаттаб"],
        correctAnswer: 0
    },
    {
        question: "Какой сахаб был известен своей щедростью и богатством, использовав его для помощи исламу?",
        options: ["Усман ибн Аффан", "Абдуллах ибн Масуд", "Убай ибн Кааб", "Абу Убайда ибн аль-Джаррах"],
        correctAnswer: 0
    },
    {
        question: "В каком возрасте умер Пророк Мухаммад ﷺ ?",
        options: ["60 лет", "61 год", "63 года", "65 лет"],
        correctAnswer: 2
    },
    {
        question: "Какая битва стала поворотной для мусульман, несмотря на поражение?",
        options: ["Битва при Бадре", "Битва при Ухуде", "Битва при Табуке", "Битва при Хандаке"],
        correctAnswer: 1
    },
    {
        question: "Как звали дядю Пророка Мухаммада ﷺ , который защищал его в Мекке?",
        options: ["Абу Лахаб", "Абу Талиб", "Аббас ибн Абд аль-Мутталиб", "Хамза ибн Абд аль-Мутталиб"],
        correctAnswer: 1
    },
    {
        question: "Кто был первым ребёнком, принявшим ислам?",
        options: ["Хасан ибн Али", "Хусейн ибн Али", "Али ибн Абу Талиб", "Зайд ибн Хариса"],
        correctAnswer: 2
    },
    {
        question: "Кто был известен как «переводчик Корана» (Таржуман аль-Коран)?",
        options: ["Ибн Аббас", "Ибн Масуд", "Убай ибн Кааб", "Саад ибн Муад"],
        correctAnswer: 0
    },
    {
        question: "В каком году мусульмане вернулись в Мекку (Фатх Мекка)?",
        options: ["6 год хиджры", "8 год хиджры", "10 год хиджры", "12 год хиджры"],
        correctAnswer: 1
    },
    {
        question: "Как звали няню Пророка Мухаммада ﷺ ?",
        options: ["Умм Аиман", "Халима ас-Саадия", "Барка", "Умм Хабиба"],
        correctAnswer: 1
    },
    {
        question: "Кто был известен как «Амин аль-умма» (Хранитель уммы)?",
        options: ["Абу Бакр ас-Сиддик", "Абу Убайда ибн аль-Джаррах", "Саад ибн Муад", "Хамза ибн Абд аль-Мутталиб"],
        correctAnswer: 1
    },
    {
        question: "Сколько сахабов участвовало в битве при Бадре?",
        options: ["214", "313", "400", "1000"],
        correctAnswer: 1
    },
    {
        question: "Кто был известен своей красноречивой речью и умением распространять ислам?",
        options: ["Абдуллах ибн Масуд", "Мусаб ибн Умайр", "Саад ибн Абу Ваккас", "Зайд ибн Хариса"],
        correctAnswer: 1
    },
    {
        question: "Какое событие произошло в году, известном как «Год печали» (Ам аль-Хузн)?",
        options: ["Хиджра в Медину", "Смерть Абу Талиба и Хадиджи", "Битва при Табуке", "Фатх Мекка"],
        correctAnswer: 1
    },
    {
        question: "В каком году была Битва при Ухуде?",
        options: ["1 год хиджры", "3 год хиджры", "5 год хиджры", "7 год хиджры"],
        correctAnswer: 1
    },
    {
        question: "Как звали мать Пророка Мухаммада ﷺ ?",
        options: ["Амира бинт Абд аль-Уддар", "Амина бинт Уайхаб", "Халима бинт Саадия", "Умм Аиман"],
        correctAnswer: 1
    },
    {
        question: "Кто был первым рабом, принявшим ислам?",
        options: ["Зайд ибн Хариса", "Билал ибн Рабах", "Сумая бинт Хайят", "Абу Фахм"],
        correctAnswer: 1
    },
    {
        question: "Как назывался первый мусульманский календарь?",
        options: ["Хиджри", "Мекканский", "Лунный", "Суннитский"],
        correctAnswer: 0
    },
    {
        question: "Как называлась последняя битва, в которой участвовал Пророк Мухаммад ﷺ ?",
        options: ["Битва при Бадре", "Битва при Ухуде", "Битва при Табуке", "Битва при Хунейне"],
        correctAnswer: 2
    },
    {
        question: "Кто был первым человеком, принявшим ислам среди женщин?",
        options: ["Аиша бинт Абу Бакр", "Фатима бинт Мухаммад", "Хадиджа бинт Хувайлид", "Сауда бинт Зам"],
        correctAnswer: 2
    },
    {
        question: "Сколько раз Пророк Мухаммад ﷺ совершил хадж до переселения?",
        options: ["Один", "Два", "Три", "Четыре"],
        correctAnswer: 2
    },
    {
        question: "Как называется священная мечеть, расположенная в Медине и построенная для молитв Пророка Мухаммада ﷺ?",
        options: ["Мечеть аль-Харам", "Мечеть аль-Набави", "Мечеть аль-Акса", "Мечеть Кибла"],
        correctAnswer: 1
    },
    {
        question: "Кто из сподвижников Пророка Мухаммада ﷺ пал шахидом в битве при Ухуде?",
        options: ["Абдуллах ибн Масуд", "Хамза ибн Абд аль-Мутталиб", "Али ибн Абу Талиб", "Умар ибн аль-Хаттаб"],
        correctAnswer: 1
    },
    {
        question: "В каком году родился Пророк Мухаммад ﷺ ?",
        options: ["580 г.", "600 г.", "610 г.", "570 г."],
        correctAnswer: 3
    },
    {
        question: "Как называлась мечеть, в которой Пророк Мухаммад ﷺ совершил ночное путешествие и вознесение на небеса?",
        options: ["Мечеть аль-Харам", "Мечеть аль-Набави", " Мечеть аль-Акса", "Мечеть Табук"],
        correctAnswer: 2
    },
    {
        question: "Какое событие произошло в 630 году?",
        options: ["Битва при Ухуде", " Фатх Мекка (Открытие Мекки)", "Хиджра", "Битва при Бадре"],
        correctAnswer: 1
    },
    {
        question: "Какое событие произошло в Год слона (Ам аль-Фил)?",
        options: ["Построение Мечети аль-Харам", "Рождение Пророка Мухаммада ﷺ", "Первое откровение Пророку", "Открытие Мекки"],
        correctAnswer: 1
    },
    {
        question: "Кто был главнокомандующим мусульманской армии в битве при Бадре?",
        options: ["Пророк Мухаммад ﷺ", "Абу Бакр ас-Сиддик", "Халид ибн аль-Валид", "Али ибн Абу Талиб"],
        correctAnswer: 0
    },
    {
        question: "Какая из дочерей Пророка Мухаммада ﷺ считается одной из самых благородных фигур в исламе, являясь символом верности и терпения?",
        options: ["Асия бинт Мухаммад", "Халима бинт Мухаммад", "Фатима бинт Мухаммад", "Зейнаб бинт Мухаммад"],
        correctAnswer: 2
    }
];

let currentQuestion = 0;
let answers = [];
let timeLeft = 20 * 60;
let timerInterval;

const startBtn = document.getElementById("startTest");
const testBox = document.getElementById("testBox");
const optionsBox = document.getElementById("optionsBox");
const questionText = document.getElementById("questionText");
const timerEl = document.getElementById("timer");

const finishScreen = document.getElementById("finishScreen");
const finalScore = document.getElementById("finalScore");

function startTimer() {

    clearInterval(timerInterval);

    timeLeft = 20 * 60;

    timerInterval = setInterval(() => {

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        timerEl.textContent =
            `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        timeLeft--;

        if (timeLeft < 0) {
            finishTest();
        }

    }, 1000);
}


function showQuestion() {
    let q = questions[currentQuestion];
    questionText.textContent = q.question;
    optionsBox.innerHTML = "";

    q.options.forEach((opt, i) => {
        let div = document.createElement("div");
        div.classList.add("option-btn");
        div.textContent = opt;

        if (answers[currentQuestion] === i) div.classList.add("selected");

        div.onclick = () => {
            answers[currentQuestion] = i;
            document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
            div.classList.add("selected");
        };

        optionsBox.appendChild(div);
    });

    document.querySelector(".progress-fill").style.width =
        ((currentQuestion + 1) / questions.length) * 100 + "%";
}

function finishTest() {

    clearInterval(timerInterval);

    testBox.style.display = "none";

    testButtons.style.display = "none";

    finishScreen.style.display = "block";

    let score = 0;
    questions.forEach((q, i) => {
        if (answers[i] === q.correctAnswer) score++;
    });

    resultText.textContent = `Вы ответили правильно на ${score} из ${questions.length}`;
}

const testButtons = document.querySelector(".test-buttons");

startBtn.onclick = () => {

    startBtn.style.display = "none";

    testBox.style.display = "block";

    testButtons.style.display = "flex";

    finishScreen.style.display = "none";

    currentQuestion = 0;
    answers = [];

    startTimer();
    showQuestion();
};

retryTest.onclick = () => {

    finishScreen.style.display = "none";

    testButtons.style.display = "none";

    startBtn.style.display = "block";

    testBox.style.display = "block";

    currentQuestion = 0;
    answers = [];

    progressFill.style.width = "0%";

    clearInterval(timerInterval);
    timerEl.textContent = "20:00";
};


document.getElementById("nextQuestion").onclick = () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
};

document.getElementById("prevQuestion").onclick = () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
};

document.getElementById("finishBtn").onclick = finishTest;

document.getElementById("retryTest").onclick = () => {

    finishScreen.style.display = "none";

    startBtn.style.display = "block";

    testBox.style.display = "block";

    currentQuestion = 0;
    answers = [];

    document.querySelector(".progress-fill").style.width = "0%";

    questionText.textContent = "";
    optionsBox.innerHTML = "";

    clearInterval(timerInterval);

    timerEl.textContent = "20:00";
};
