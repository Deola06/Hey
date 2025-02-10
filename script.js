$(document).ready(function () {
    const envelope = $("#envelope");
    const btnOpen = $("#open");
    const btnReset = $("#reset");
    const song = document.getElementById("loveSong");

    let heartInterval;

    btnOpen.click(function () {
        openEnvelope();
        launchConfetti();
        playLoveSong();
        triggerFloatingHearts();
    });

    btnReset.click(resetEnvelope);

    function openEnvelope() {
        envelope.addClass("open").removeClass("close");
    }

    function resetEnvelope() {
        envelope.addClass("close").removeClass("open");
        stopFloatingHearts();
        stopLoveSong();
    }

    function launchConfetti() {
        if (typeof confetti !== "undefined") {
            const emojiShape = confetti.shapeFromText
                ? confetti.shapeFromText({ text: "❤️", scalar: 2.5 })
                : undefined;

            confetti({
                particleCount: 150,
                spread: 90,
                startVelocity: 40,
                decay: 0.9,
                shapes: emojiShape ? [emojiShape] : undefined,
                origin: { x: 0.5, y: 0.75 },
            });
        }
    }

    function playLoveSong() {
        if (song) {
            song.volume = 0.2;
            song.currentTime = 0; // Reset to start
            song.play();
        }
    }

    function stopLoveSong() {
        if (song) {
            song.pause();
            song.currentTime = 0; // Reset playback
        }
    }

    function triggerFloatingHearts() {
        let count = 0;
        heartInterval = setInterval(() => {
            createFloatingHeart();
            count++;
            if (count >= 100) stopFloatingHearts();
        }, 300);
    }

    function stopFloatingHearts() {
        clearInterval(heartInterval);
        $(".heart").remove(); // Remove all floating hearts
    }

    function createFloatingHeart() {
        const heart = $("<div>").addClass("heart").html("❤️");
        heart.css("left", Math.random() * 100 + "vw");
        $("body").append(heart);

        setTimeout(() => heart.remove(), 4000);
    }

    $(document.body).click(function (event) {
        const kiss = $("<div>")
            .addClass("kiss-mark")
            .css({ left: `${event.clientX - 25}px`, top: `${event.clientY - 25}px` });

        $("body").append(kiss);
        setTimeout(() => kiss.remove(), 1000);
    });

    function typeWriterEffect(texts, elements, speed, index = 0) {
        if (index >= texts.length) return;

        let i = 0;
        elements[index].innerHTML = ""; 

        function type() {
            if (i < texts[index].length) {
                elements[index].innerHTML += texts[index].charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(() => typeWriterEffect(texts, elements, speed, index + 1), 500);
            }
        }
        type();
    }

    $("#open").click(function () {
        const messages = [
            "Hi Baby,",
            "Happy Valentine's Day! Your girl loves you a lot. She also wishes you were here so she could wine and dine you.",
            "P.S. It's me, I'm your girl. ❤️",
            "xoxo",
        ];

        const textElements = document.querySelectorAll(".words");
        typeWriterEffect(messages, textElements, 50);
    });
});
