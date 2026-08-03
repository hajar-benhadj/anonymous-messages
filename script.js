document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('messageForm');
    const successMsg = document.getElementById('successMessage');
    const stickersGrid = document.getElementById('stickersGrid');
    const moreStickersBtn = document.getElementById('moreStickersBtn');
    const marqueeTrack = document.getElementById('marqueeTrack');
    const selectedStickerBox = document.getElementById('selectedStickerBox');
    
    let selectedSticker = '';

    // مضاعفة محتوى الشريط المتحرك لضمان الاستمرارية بلا توقف
    if (marqueeTrack) {
        marqueeTrack.innerHTML += marqueeTrack.innerHTML;
    }

    // دالة لتحديث عرض الستيكر المختار بوحدو في الوسط
    function updateSelectedPreview(file) {
        selectedStickerBox.innerHTML = '';
        if (file.endsWith('.webm')) {
            const video = document.createElement('video');
            video.src = `stickers/${file}`;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            selectedStickerBox.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = `stickers/${file}`;
            img.alt = "selected sticker";
            selectedStickerBox.appendChild(img);
        }
    }

    // تفعيل تحريك الإيموجيات باليد (Drag & Drop) بكل سلاسة
    const emojis = document.querySelectorAll('.draggable-emoji');
    emojis.forEach(emoji => {
        let isDragging = false;
        let startX, startY;

        emoji.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - emoji.offsetLeft;
            startY = e.clientY - emoji.offsetTop;
            emoji.style.zIndex = 100;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            emoji.style.left = (e.clientX - startX) + 'px';
            emoji.style.top = (e.clientY - startY) + 'px';
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                emoji.style.zIndex = -1;
            }
        });

        emoji.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX - emoji.offsetLeft;
            startY = e.touches[0].clientY - emoji.offsetTop;
            emoji.style.zIndex = 100;
        });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            emoji.style.left = (e.touches[0].clientX - startX) + 'px';
            emoji.style.top = (e.touches[0].clientY - startY) + 'px';
        });

        document.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
                emoji.style.zIndex = -1;
            }
        });
    });

    // لائحة الستيكرات
    const stickerFiles = [
        "file_1764226.webm", "file_1764227.webm", "file_1764228.webm", "file_1764229.webm", 
        "file_1764232.webm", "file_1764234.webm", "file_1764236.webm", "file_1764238.webm", 
        "file_1764239.webm", "file_1764240.webm", "file_1764241.webm", "file_1764244.webm", 
        "file_1764245.webm", "file_1764246.webm", "file_1764248.webp", "file_1764249.webp", 
        "file_1764251.webm", "file_1764252.webm", "file_1764253.webm", "file_1764254.webm", 
        "file_1764255.webm", "file_1764256.webp", "file_1764257.webp", "file_1764258.webm", 
        "file_1764260.webm", "file_1764261.webm", "file_1764262.webm", "file_1764263.webm", 
        "file_1764266.webm", "file_1764268.webm", "file_1764269.webm", "file_1764270.webm", 
        "file_1764271.webm", "file_1764272.webm", "file_1764273.webm", "file_1764275.webm", 
        "file_1764276.webm", "file_1764277.webm", "file_1764279.webm", "file_1764280.webm", 
        "file_1764281.webm", "file_1764282.webm", "file_1764283.webm", "file_1764284.webm", 
        "file_1764285.webm", "file_1764286.webm", "file_1764287.webm", "file_1764288.webm", 
        "file_1764289.webm", "file_1764290.webm", "file_1764291.webm", "file_1764292.webm", 
        "file_1764293.webm", "file_1764294.webm", "file_1764295.webm", "file_1764296.webp", 
        "file_1764307.webp", "file_1764308.webm", "file_1764309.webp", "file_1764310.webm", 
        "file_1764311.webm", "file_1764312.webm", "file_1764313.webm", "file_1764314.webm", 
        "file_1764315.webp", "file_1764316.webp", "file_1764317.webm", "file_1764318.webm", 
        "file_1764319.webm", "file_1764320.webm", "file_1764321.webm", "file_1764323.webm", 
        "file_1764324.webm", "file_1764325.webm", "file_1764326.webm", "file_1764327.webm", 
        "file_1764328.webp", "file_1764329.webm", "file_1764330.webm", "file_1764331.webp", 
        "file_1764332.webp", "file_1764333.webp", "file_1764337.webp", "file_1764339.webm", 
        "file_1764343.webm"
    ];
    
    stickerFiles.forEach((file, index) => {
        const div = document.createElement('div');
        div.classList.add('sticker-opt');
        
        if(index === 0) {
            div.classList.add('selected');
            selectedSticker = file;
            updateSelectedPreview(file); // عرض الستيكر الأول تلقائياً في الوسط
        }

        if (file.endsWith('.webm')) {
            const video = document.createElement('video');
            video.src = `stickers/${file}`;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            div.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = `stickers/${file}`;
            img.alt = "sticker";
            div.appendChild(img);
        }

        div.addEventListener('click', () => {
            document.querySelectorAll('.sticker-opt').forEach(s => s.classList.remove('selected'));
            div.classList.add('selected');
            selectedSticker = file;
            updateSelectedPreview(file); // تحديث الستيكر المختار في الوسط عند الضغط عليه
        });

        stickersGrid.appendChild(div);
    });

    let isExpanded = false;
    moreStickersBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        stickersGrid.classList.toggle('expanded', isExpanded);
        moreStickersBtn.innerText = isExpanded ? "Show Less 🔺" : "Show More Stickers 🔻";
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageText = document.getElementById('secretMessage').value;
        const songLink = document.getElementById('songLink').value;

        const messageData = {
            message: messageText,
            song: songLink || "No song",
            sticker: selectedSticker,
            timestamp: new Date().toISOString()
        };

        console.log("HARAWKAN Drop:", messageData);

        form.reset();
        selectedSticker = stickerFiles[0];
        updateSelectedPreview(selectedSticker);
        document.querySelectorAll('.sticker-opt').forEach((s, idx) => {
            if(idx === 0) s.classList.add('selected');
            else s.classList.remove('selected');
        });

        successMsg.classList.remove('hidden');
        setTimeout(() => {
            successMsg.classList.add('hidden');
        }, 4000);
    });
});