
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yalla Masry - The Grand Egyptian Odyssey</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        body { margin: 0; overflow: hidden; font-family: 'Cairo', sans-serif; background: #000; color: white; }
        canvas { display: block; }
        
        #royal-intro {
            position: fixed; inset: 0; background: radial-gradient(circle, #001d3d 0%, #000 100%);
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            z-index: 2000; text-align: center;
        }

        .gold-glow { text-shadow: 0 0 20px rgba(245, 158, 11, 0.7); }
        
        .start-btn {
            background: linear-gradient(45deg, #f59e0b, #d97706);
            color: black; font-weight: 900; padding: 20px 80px;
            border-radius: 50px; cursor: pointer; border: none; font-size: 1.8rem;
            box-shadow: 0 0 40px rgba(245, 158, 11, 0.4); transition: 0.4s;
        }

        #hud-container {
            position: absolute; inset: 0; pointer-events: none; display: none; z-index: 100;
        }

        .location-badge {
            position: absolute; top: 30px; right: 30px;
            background: rgba(0,0,0,0.85); border-right: 5px solid #f59e0b;
            padding: 20px 40px; border-radius: 10px; pointer-events: auto;
        }

        #dialog-system {
            position: absolute; bottom: 50px; left: 50%; transform: translateX(-50%);
            width: 85%; max-width: 900px; background: rgba(0, 15, 35, 0.95);
            border: 2px solid #f59e0b; border-radius: 25px; padding: 30px;
            display: none; pointer-events: auto; backdrop-filter: blur(15px);
        }

        .next-btn {
            background: #f59e0b; color: black; padding: 10px 30px;
            border-radius: 50px; font-weight: 900; cursor: pointer; margin-top: 15px;
        }

        .crosshair {
            position: absolute; top: 50%; left: 50%; width: 6px; height: 6px;
            background: #f59e0b; border-radius: 50%; transform: translate(-50%, -50%);
            box-shadow: 0 0 10px #f59e0b;
        }

        #interaction-msg {
            position: absolute; top: 55%; left: 50%; transform: translateX(-50%);
            color: #f59e0b; font-weight: bold; font-size: 1.4rem; display: none; text-shadow: 2px 2px 4px black;
        }
    </style>
</head>
<body>

    <div id="royal-intro">
        <h1 class="text-7xl font-black text-amber-500 mb-4 gold-glow">أكاديمية يلا مصري</h1>
        <p class="text-amber-100/70 mb-12 text-2xl italic tracking-widest">محاكاة الواقع المصري: رحلة الهوية الكاملة</p>
        <button class="start-btn" onclick="initJourney()">بدء الرحلة يا جلالة الملكة</button>
    </div>

    <div id="hud-container">
        <div class="location-badge">
            <h2 id="loc-name" class="text-3xl font-black text-amber-500 tracking-tighter">مطار القاهرة</h2>
            <p id="loc-step" class="text-xs text-amber-200/50 uppercase tracking-[0.3em] mt-1">المحطة 1 من 7</p>
        </div>

        <div class="crosshair"></div>
        <div id="interaction-msg">اضغطي [E] للتحدث</div>

        <div id="dialog-system">
            <div class="flex items-center gap-4 mb-3">
                <div class="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <h3 id="char-name" class="text-amber-500 font-black text-2xl"></h3>
            </div>
            <p id="char-speech" class="text-white text-2xl leading-relaxed font-medium"></p>
            <div class="flex justify-end">
                <button id="next-chapter" class="next-btn" onclick="advanceChapter()">الموقف التالي</button>
            </div>
        </div>
    </div>

    <script>
        let scene, camera, renderer, clock;
        let moveF = false, moveB = false, moveL = false, moveR = false;
        let velocity = new THREE.Vector3();
        let currentChapter = 0;
        let activeAudio = null;
        const apiKey = "";

        const chapters = [
            {
                name: "مطار القاهرة الدولي",
                char: "ضابط الجوازات",
                speech: "أهلاً بكِ يا جلالة الملكة نفرتيتي في أرض الوطن. جواز سفركِ مختوم بختم العزة، تفضلي بكل فخر.",
                pos: { x: 0, z: -15 },
                color: 0x001d3d
            },
            {
                name: "خارج صالة الوصول",
                char: "سائق التاكسي",
                speech: "خطوة عزيزة يا هانم! نورتي مصر كلها. التاكسي جاهز، والرحلة للفندق هتكون أجمل رحلة في حياتك.",
                pos: { x: 15, z: -35 },
                color: 0x222200
            },
            {
                name: "استقبال الفندق الملكي",
                char: "موظف الاستقبال",
                speech: "جلالة الملكة، الأكاديمية ترحب بكِ. كل شيء معد بدقة متناهية لتناسب مقامكِ الرفيع.",
                pos: { x: -15, z: -55 },
                color: 0x1a1a1a
            },
            {
                name: "بهو الفندق",
                char: "شيال الشنط (البل مان)",
                speech: "عن حضرتك يا فندم، الشنط في الحفظ والصون وهتسبقك على الجناح الملكي فوراً.",
                pos: { x: 0, z: -75 },
                color: 0x0a0a0a
            },
            {
                name: "خان الخليلي - التحف",
                char: "تاجر التحف القديمة",
                speech: "يا ست الهوانم، القطعة دي مالهاش مثيل، زي جلالتك بالظبط. دي روح مصر اللي بنحافظ عليها.",
                pos: { x: 25, z: -95 },
                color: 0x3d1d00
            },
            {
                name: "البقالة العادية - شارع المعز",
                char: "عم محمد البقال",
                speech: "نورتي الحتة يا هانم! أحلى سكر وشاي لأجدع ملكة. مصر دايماً عامرة بيكم وبأصلكم الطيب.",
                pos: { x: -25, z: -115 },
                color: 0x002200
            },
            {
                name: "الجناح الملكي للأكاديمية",
                char: "مرشد الهوية",
                speech: "هنا يا جلالة الملكة نفرتيتي، تكتمل الرحلة وتبدأ الرسالة. أهلاً بكِ في موطن الهوية الحقيقي.",
                pos: { x: 0, z: -140 },
                color: 0xf59e0b
            }
        ];

        function initJourney() {
            document.getElementById('royal-intro').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('royal-intro').style.display = 'none';
                document.getElementById('hud-container').style.display = 'block';
                setupScene();
                setupControls();
                loadChapter(0);
                animate();
            }, 1000);
        }

        function setupScene() {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x000105);
            scene.fog = new THREE.Fog(0x000105, 10, 80);

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 1.7, 5);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            document.body.appendChild(renderer.domElement);

            clock = new THREE.Clock();

            scene.add(new THREE.AmbientLight(0xffffff, 0.3));
            const sun = new THREE.PointLight(0xf59e0b, 2, 100);
            sun.position.set(0, 20, 0);
            scene.add(sun);

            const floor = new THREE.Mesh(
                new THREE.PlaneGeometry(500, 500),
                new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.1 })
            );
            floor.rotation.x = -Math.PI / 2;
            scene.add(floor);

            chapters.forEach((ch, idx) => {
                const group = new THREE.Group();
                group.position.set(ch.pos.x, 0, ch.pos.z);
                
                const base = new THREE.Mesh(
                    new THREE.CylinderGeometry(4, 4.5, 0.5, 32),
                    new THREE.MeshStandardMaterial({ color: ch.color })
                );
                base.position.y = 0.25;
                group.add(base);

                const iconGeo = new THREE.TorusKnotGeometry(0.6, 0.15, 100, 16);
                const iconMat = new THREE.MeshStandardMaterial({ 
                    color: 0xf59e0b, metalness: 1, emissive: 0xf59e0b, emissiveIntensity: 0.4 
                });
                const icon = new THREE.Mesh(iconGeo, iconMat);
                icon.position.y = 4;
                group.add(icon);
                ch.icon = icon;

                scene.add(group);
            });
        }

        function setupControls() {
            document.addEventListener('keydown', (e) => {
                if(e.code === 'KeyW') moveF = true;
                if(e.code === 'KeyS') moveB = true;
                if(e.code === 'KeyA') moveL = true;
                if(e.code === 'KeyD') moveR = true;
                if(e.code === 'KeyE') interact();
            });
            document.addEventListener('keyup', (e) => {
                if(e.code === 'KeyW') moveF = false;
                if(e.code === 'KeyS') moveB = false;
                if(e.code === 'KeyA') moveL = false;
                if(e.code === 'KeyD') moveR = false;
            });
            document.addEventListener('mousemove', (e) => {
                if(document.pointerLockElement) {
                    camera.rotation.order = "YXZ";
                    camera.rotation.y -= e.movementX * 0.002;
                    camera.rotation.x -= e.movementY * 0.002;
                    camera.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, camera.rotation.x));
                }
            });
            renderer.domElement.addEventListener('click', () => {
                if(!document.getElementById('dialog-system').style.display || document.getElementById('dialog-system').style.display === 'none') {
                    renderer.domElement.requestPointerLock();
                }
            });
        }

        function loadChapter(idx) {
            currentChapter = idx;
            const ch = chapters[idx];
            document.getElementById('loc-name').innerText = ch.name;
            document.getElementById('loc-step').innerText = `المحطة ${idx + 1} من ${chapters.length}`;
            speak(ch.speech);
        }

        function interact() {
            const ch = chapters[currentChapter];
            const dist = camera.position.distanceTo(new THREE.Vector3(ch.pos.x, 1.7, ch.pos.z));
            if(dist < 6) {
                document.exitPointerLock();
                const box = document.getElementById('dialog-system');
                box.style.display = 'block';
                document.getElementById('char-name').innerText = ch.char;
                document.getElementById('char-speech').innerText = ch.speech;
                speak(ch.speech);
            }
        }

        function advanceChapter() {
            document.getElementById('dialog-system').style.display = 'none';
            if(currentChapter < chapters.length - 1) {
                currentChapter++;
                loadChapter(currentChapter);
                renderer.domElement.requestPointerLock();
            } else {
                speak("اكتملت الرحلة بنجاح يا جلالة الملكة.");
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();

            if(document.pointerLockElement) {
                const speed = 15;
                const dir = new THREE.Vector3();
                camera.getWorldDirection(dir);
                dir.y = 0; dir.normalize();
                const side = new THREE.Vector3().crossVectors(camera.up, dir).normalize();

                if(moveF) camera.position.addScaledVector(dir, speed * delta);
                if(moveB) camera.position.addScaledVector(dir, -speed * delta);
                if(moveL) camera.position.addScaledVector(side, speed * delta);
                if(moveR) camera.position.addScaledVector(side, -speed * delta);
            }

            chapters.forEach(ch => {
                ch.icon.rotation.y += 0.04;
                ch.icon.position.y = 4 + Math.sin(Date.now() * 0.003) * 0.2;
            });

            const ch = chapters[currentChapter];
            const dist = camera.position.distanceTo(new THREE.Vector3(ch.pos.x, 1.7, ch.pos.z));
            document.getElementById('interaction-msg').style.display = (dist < 6) ? 'block' : 'none';

            renderer.render(scene, camera);
        }

        async function speak(text) {
            if (activeAudio) activeAudio.pause();
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: `High-class Egyptian royal female voice: ${text}` }] }],
                        generationConfig: { 
                            responseModalities: ["AUDIO"], 
                            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } } 
                        }
                    })
                });
                const result = await response.json();
                const audioData = result.candidates[0].content.parts.find(p => p.inlineData).inlineData.data;
                const blob = pcmToWav(audioData, 24000);
                activeAudio = new Audio(URL.createObjectURL(blob));
                activeAudio.play();
            } catch (e) {}
        }

        function pcmToWav(base64, sampleRate) {
            const buffer = Uint8Array.from(atob(base64), c => c.charCodeAt(0)).buffer;
            const wav = new ArrayBuffer(44 + buffer.byteLength);
            const view = new DataView(wav);
            const s = (o, str) => { for(let i=0; i<str.length; i++) view.setUint8(o+i, str.charCodeAt(i)); };
            s(0, 'RIFF'); view.setUint32(4, 36 + buffer.byteLength, true); s(8, 'WAVE'); s(12, 'fmt ');
            view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
            view.setUint32(24, sampleRate, true); view.setUint32(28, sampleRate * 2, true);
            view.setUint16(32, 2, true); view.setUint16(34, 16, true); s(36, 'data');
            view.setUint32(40, buffer.byteLength, true);
            new Uint8Array(wav, 44).set(new Uint8Array(buffer));
            return new Blob([wav], { type: 'audio/wav' });
        }
    </script>
</body>
</html>
