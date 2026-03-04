(() => {
    // --- NAVIGATION ---
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    const pages = document.querySelectorAll(".page");

    function showSection(id) {
        pages.forEach(p => p.classList.remove("active"));
        document.getElementById(id).classList.add("active");
    }

    hamburger.onclick = () => {
        navLinks.classList.toggle("show");
        hamburger.classList.toggle("active");
    };

    navLinks.querySelectorAll("button").forEach(btn => {
        btn.onclick = () => {
            showSection(btn.dataset.section);
            navLinks.classList.remove("show");
            hamburger.classList.remove("active");
        };
    });

    // --- COUNTER ---
    let count = 0;
    const counterValue = document.getElementById("counterValue");
    const colors = ["#0d6efd", "#6610f2", "#198754", "#dc3545", "#000000"];
    let colorIndex = 0;

    document.getElementById("countBtn").onclick = () => {
        count++;
        counterValue.textContent = count;
    };

    document.getElementById("resetBtn").onclick = () => {
        count = 0;
        counterValue.textContent = count;
    };

    document.getElementById("colorBtn").onclick = () => {
        counterValue.style.color = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    };

    // --- AUDIO ---
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

    document.getElementById("prevAudio").onclick = () => {
        currentAudio = (currentAudio - 1 + audioFiles.length) % audioFiles.length;
        loadAudio(currentAudio);
        audioPlayer.play();
        playPause.textContent = "⏸";
    };

    document.getElementById("nextAudio").onclick = () => {
        currentAudio = (currentAudio + 1) % audioFiles.length;
        loadAudio(currentAudio);
        audioPlayer.play();
        playPause.textContent = "⏸";
    };

    audioPlayer.ontimeupdate = () => {
        if (!audioPlayer.duration) return;
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        audioProgress.style.width = percent + "%";
    };

    loadAudio(currentAudio);

    // --- PDF MODAL ---
    const pdfModal = document.getElementById("pdfModal");
    const pdfIframe = pdfModal.querySelector("iframe");
    const closePdf = document.getElementById("closePdf");

    function openPDF(url) {
        pdfIframe.src = "";
        setTimeout(() => pdfIframe.src = url, 50);
        pdfModal.classList.add("show");
    }

    document.querySelectorAll(".pdfBtn").forEach(btn => {
        btn.onclick = () => openPDF(btn.dataset.pdf);
    });

    closePdf.onclick = () => {
        pdfModal.classList.remove("show");
        pdfIframe.src = "";
    };

    pdfModal.addEventListener("click", (e) => {
        if (e.target === pdfModal) {
            pdfModal.classList.remove("show");
            pdfIframe.src = "";
        }
    });

    // --- QUIZ TEST ---
    const allQuestions = [
        { question: "Где родился Пророк ﷺ ?", options: ["Медина","Мекка","Таиф","Ясриб"], correctAnswer: 1 },
        { question: "В каком возрасте он получил откровение?", options: ["25","30","40","50"], correctAnswer: 2 },
        { question: "Какой ангел передал Пророку Мухаммаду ﷺ первое откровение?", options: ["Микаил","Джибрил","Исрафил","Азраил"], correctAnswer: 1 },
        { question: "Как звали первого мужчину, принявшего ислам?", options: ["Али ибн Абу Талиб","Умар ибн аль-Хаттаб","Абу Бакр ас-Сиддик","Усман ибн Аффан"], correctAnswer: 2 },
        { question: "Сколько лет длилось пророчество Пророка Мухаммада ﷺ ?", options: ["20 лет","23 года","25 лет","30 лет"], correctAnswer: 1 },
        { question: "Кто была первой женой Пророка Мухаммада ﷺ ?", options: ["Аиша бинт Абу Бакр","Сауда бинт Зам’а","Хадиджа бинт Хувайлид","Фатима бинт Мухаммад"], correctAnswer: 2 },
        { question: "Как называлась первая битва мусульман против курайшитов?", options: ["Битва при Ухуде","Битва при Табуке","Битва при Бадре","Битва при Хунейне"], correctAnswer: 2 },
        { question: "В каком году произошел Хиджра — переселение мусульман из Мекки в Медину?", options: ["610 г.","615 г.","622 г.","630 г."], correctAnswer: 2 },
        { question: "Кто стал первым халифом после смерти Пророка Мухаммада ﷺ ?", options: ["Умар ибн аль-Хаттаб","Абу Бакр ас-Сиддик","Усман ибн Аффан","Али ибн Абу Талиб"], correctAnswer: 1 },
        { question: "Кто был известен как «Меч Аллаха» (Сайфуллах)?", options: ["Халид ибн аль-Валид","Умар ибн аль-Хаттаб","Али ибн Абу Талиб","Салман аль-Фариси"], correctAnswer: 0 }
    ];

    // --- Выбор уровня сложности ---
    const startBtn = document.getElementById("startTest");
    const testBox = document.getElementById("testBox");
    const optionsBox = document.getElementById("optionsBox");
    const questionText = document.getElementById("questionText");
    const timerEl = document.getElementById("timer");
    const finishScreen = document.getElementById("finishScreen");
    const finalScore = document.getElementById("finalScore");
    const testButtons = document.querySelector(".test-buttons");
    const progressFill = document.querySelector(".progress-fill");
    const retryBtn = document.getElementById("retryTest");

    let questions = [];
    let currentQuestion = 0;
    let answers = [];
    let timeLeft = 20*60;
    let timerInterval;

    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = 20*60;
        timerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerEl.textContent = `${minutes}:${seconds < 10 ? "0":""}${seconds}`;
            timeLeft--;
            if(timeLeft < 0) finishTest();
        }, 1000);
    }

    function saveProgress() {
        localStorage.setItem("quizProgress", JSON.stringify({
            currentQuestion,
            answers,
            questions
        }));
    }

    function loadProgress() {
        const data = JSON.parse(localStorage.getItem("quizProgress"));
        if(data){
            currentQuestion = data.currentQuestion;
            answers = data.answers;
            questions = data.questions;
            return true;
        }
        return false;
    }

    function showQuestion() {
        const q = questions[currentQuestion];
        questionText.textContent = q.question;
        optionsBox.innerHTML = "";
        q.options.forEach((opt,i)=>{
            const div = document.createElement("div");
            div.classList.add("option-btn");
            div.textContent = opt;
            if(answers[currentQuestion] === i) div.classList.add("selected");
            div.onclick = () => {
                answers[currentQuestion] = i;
                saveProgress();

                // подсветка правильного ответа
                optionsBox.querySelectorAll(".option-btn").forEach(b=>{
                    b.classList.remove("selected");
                    if(b.textContent === q.options[q.correctAnswer]){
                        b.classList.add("correct");
                    } else if(b.textContent === opt){
                        b.classList.add("wrong");
                    }
                });

                setTimeout(()=>{
                    if(currentQuestion < questions.length-1){
                        currentQuestion++;
                        showQuestion();
                    } else {
                        finishTest();
                    }
                }, 1000);

                progressFill.style.width = ((currentQuestion+1)/questions.length)*100+"%";
            };
            optionsBox.appendChild(div);
        });
    }

    function finishTest() {
        clearInterval(timerInterval);
        testBox.style.display = "none";
        testButtons.style.display = "none";
        finishScreen.style.display = "block";

        // подсчет результатов
        let score = 0;
        questions.forEach((q,i)=>{ if(answers[i] === q.correctAnswer) score++; });

        finalScore.innerHTML = `Вы ответили правильно на ${score} из ${questions.length}`;

        // добавить круговой прогресс
        const canvas = document.createElement("canvas");
        canvas.width = 150; canvas.height = 150;
        finishScreen.appendChild(canvas);
        const ctx = canvas.getContext("2d");
        const percent = score/questions.length;
        ctx.lineWidth = 12;
        ctx.strokeStyle = "#ddd";
        ctx.beginPath();
        ctx.arc(75,75,60,0,2*Math.PI);
        ctx.stroke();
        ctx.strokeStyle = "#198754";
        ctx.beginPath();
        ctx.arc(75,75,60,-Math.PI/2, -Math.PI/2 + 2*Math.PI*percent);
        ctx.stroke();
        ctx.fillStyle = "#000";
        ctx.font = "16px Roboto";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(Math.round(percent*100)+"%",75,75);

        // удалить прогресс из localStorage
        localStorage.removeItem("quizProgress");
    }

    function resetTest() {
        finishScreen.style.display = "none";
        testButtons.style.display = "none";
        startBtn.style.display = "block";
        testBox.style.display = "block";
        currentQuestion = 0;
        answers = [];
        progressFill.style.width = "0%";
        questionText.textContent = "";
        optionsBox.innerHTML = "";
        clearInterval(timerInterval);
        timerEl.textContent = "20:00";
        localStorage.removeItem("quizProgress");
    }

    startBtn.onclick = () => {
        // выбор уровня сложности
        let level = prompt("Выберите уровень сложности: легкий, средний, сложный").toLowerCase();
        let qCount = 10;
        if(level === "легкий") qCount = 5;
        else if(level === "средний") qCount = 10;
        else if(level === "сложный") qCount = allQuestions.length;
        questions = [...allQuestions].sort(()=>Math.random()-0.5).slice(0,qCount);

        if(!loadProgress()) answers = Array(questions.length).fill(null);

        startBtn.style.display = "none";
        testBox.style.display = "block";
        testButtons.style.display = "flex";
        finishScreen.style.display = "none";
        startTimer();
        showQuestion();
    };

    retryBtn.onclick = resetTest;
})();