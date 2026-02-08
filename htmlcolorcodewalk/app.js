// ============================================================
// 1. DATA
// ============================================================
const htmlColors = [
    { name: 'IndianRed', hex: '#CD5C5C', rgb: '205, 92, 92' },
    { name: 'LightCoral', hex: '#F08080', rgb: '240, 128, 128' },
    { name: 'Salmon', hex: '#FA8072', rgb: '250, 128, 114' },
    { name: 'DarkSalmon', hex: '#E9967A', rgb: '233, 150, 122' },
    { name: 'LightSalmon', hex: '#FFA07A', rgb: '255, 160, 122' },
    { name: 'Crimson', hex: '#DC143C', rgb: '220, 20, 60' },
    { name: 'Red', hex: '#FF0000', rgb: '255, 0, 0' },
    { name: 'FireBrick', hex: '#B22222', rgb: '178, 34, 34' },
    { name: 'DarkRed', hex: '#8B0000', rgb: '139, 0, 0' },
    { name: 'Pink', hex: '#FFC0CB', rgb: '255, 192, 203' },
    { name: 'LightPink', hex: '#FFB6C1', rgb: '255, 182, 193' },
    { name: 'HotPink', hex: '#FF69B4', rgb: '255, 105, 180' },
    { name: 'DeepPink', hex: '#FF1493', rgb: '255, 20, 147' },
    { name: 'MediumVioletRed', hex: '#C71585', rgb: '199, 21, 133' },
    { name: 'PaleVioletRed', hex: '#DB7093', rgb: '219, 112, 147' },
    { name: 'Coral', hex: '#FF7F50', rgb: '255, 127, 80' },
    { name: 'Tomato', hex: '#FF6347', rgb: '255, 99, 71' },
    { name: 'OrangeRed', hex: '#FF4500', rgb: '255, 69, 0' },
    { name: 'DarkOrange', hex: '#FF8C00', rgb: '255, 140, 0' },
    { name: 'Orange', hex: '#FFA500', rgb: '255, 165, 0' },
    { name: 'Gold', hex: '#FFD700', rgb: '255, 215, 0' },
    { name: 'Yellow', hex: '#FFFF00', rgb: '255, 255, 0' },
    { name: 'LightYellow', hex: '#FFFFE0', rgb: '255, 255, 224' },
    { name: 'LemonChiffon', hex: '#FFFACD', rgb: '255, 250, 205' },
    { name: 'LightGoldenrodYellow', hex: '#FAFAD2', rgb: '250, 250, 210' },
    { name: 'PapayaWhip', hex: '#FFEFD5', rgb: '255, 239, 213' },
    { name: 'Moccasin', hex: '#FFE4B5', rgb: '255, 228, 181' },
    { name: 'PeachPuff', hex: '#FFDAB9', rgb: '255, 218, 185' },
    { name: 'PaleGoldenrod', hex: '#EEE8AA', rgb: '238, 232, 170' },
    { name: 'Khaki', hex: '#F0E68C', rgb: '240, 230, 140' },
    { name: 'DarkKhaki', hex: '#BDB76B', rgb: '189, 183, 107' },
    { name: 'Lavender', hex: '#E6E6FA', rgb: '230, 230, 250' },
    { name: 'Thistle', hex: '#D8BFD8', rgb: '216, 191, 216' },
    { name: 'Plum', hex: '#DDA0DD', rgb: '221, 160, 221' },
    { name: 'Violet', hex: '#EE82EE', rgb: '238, 130, 238' },
    { name: 'Orchid', hex: '#DA70D6', rgb: '218, 112, 214' },
    { name: 'Fuchsia', hex: '#FF00FF', rgb: '255, 0, 255' },
    { name: 'Magenta', hex: '#FF00FF', rgb: '255, 0, 255' },
    { name: 'MediumOrchid', hex: '#BA55D3', rgb: '186, 85, 211' },
    { name: 'MediumPurple', hex: '#9370DB', rgb: '147, 112, 219' },
    { name: 'RebeccaPurple', hex: '#663399', rgb: '102, 51, 153' },
    { name: 'BlueViolet', hex: '#8A2BE2', rgb: '138, 43, 226' },
    { name: 'DarkViolet', hex: '#9400D3', rgb: '148, 0, 211' },
    { name: 'DarkOrchid', hex: '#9932CC', rgb: '153, 50, 204' },
    { name: 'DarkMagenta', hex: '#8B008B', rgb: '139, 0, 139' },
    { name: 'Purple', hex: '#800080', rgb: '128, 0, 128' },
    { name: 'Indigo', hex: '#4B0082', rgb: '75, 0, 130' },
    { name: 'SlateBlue', hex: '#6A5ACD', rgb: '106, 90, 205' },
    { name: 'DarkSlateBlue', hex: '#483D8B', rgb: '72, 61, 139' },
    { name: 'MediumSlateBlue', hex: '#7B68EE', rgb: '123, 104, 238' },
    { name: 'GreenYellow', hex: '#ADFF2F', rgb: '173, 255, 47' },
    { name: 'Chartreuse', hex: '#7FFF00', rgb: '127, 255, 0' },
    { name: 'LawnGreen', hex: '#7CFC00', rgb: '124, 252, 0' },
    { name: 'Lime', hex: '#00FF00', rgb: '0, 255, 0' },
    { name: 'LimeGreen', hex: '#32CD32', rgb: '50, 205, 50' },
    { name: 'PaleGreen', hex: '#98FB98', rgb: '152, 251, 152' },
    { name: 'LightGreen', hex: '#90EE90', rgb: '144, 238, 144' },
    { name: 'MediumSpringGreen', hex: '#00FA9A', rgb: '0, 250, 154' },
    { name: 'SpringGreen', hex: '#00FF7F', rgb: '0, 255, 127' },
    { name: 'MediumSeaGreen', hex: '#3CB371', rgb: '60, 179, 113' },
    { name: 'SeaGreen', hex: '#2E8B57', rgb: '46, 139, 87' },
    { name: 'ForestGreen', hex: '#228B22', rgb: '34, 139, 34' },
    { name: 'Green', hex: '#008000', rgb: '0, 128, 0' },
    { name: 'DarkGreen', hex: '#006400', rgb: '0, 100, 0' },
    { name: 'YellowGreen', hex: '#9ACD32', rgb: '154, 205, 50' },
    { name: 'OliveDrab', hex: '#6B8E23', rgb: '107, 142, 35' },
    { name: 'Olive', hex: '#808000', rgb: '128, 128, 0' },
    { name: 'DarkOliveGreen', hex: '#556B2F', rgb: '85, 107, 47' },
    { name: 'MediumAquamarine', hex: '#66CDAA', rgb: '102, 205, 170' },
    { name: 'DarkSeaGreen', hex: '#8FBC8B', rgb: '143, 188, 139' },
    { name: 'LightSeaGreen', hex: '#20B2AA', rgb: '32, 178, 170' },
    { name: 'DarkCyan', hex: '#008B8B', rgb: '0, 139, 139' },
    { name: 'Teal', hex: '#008080', rgb: '0, 128, 128' },
    { name: 'Aqua', hex: '#00FFFF', rgb: '0, 255, 255' },
    { name: 'Cyan', hex: '#00FFFF', rgb: '0, 255, 255' },
    { name: 'LightCyan', hex: '#E0FFFF', rgb: '224, 255, 255' },
    { name: 'PaleTurquoise', hex: '#AFEEEE', rgb: '175, 238, 238' },
    { name: 'Aquamarine', hex: '#7FFFD4', rgb: '127, 255, 212' },
    { name: 'Turquoise', hex: '#40E0D0', rgb: '64, 224, 208' },
    { name: 'MediumTurquoise', hex: '#48D1CC', rgb: '72, 209, 204' },
    { name: 'DarkTurquoise', hex: '#00CED1', rgb: '0, 206, 209' },
    { name: 'CadetBlue', hex: '#5F9EA0', rgb: '95, 158, 160' },
    { name: 'SteelBlue', hex: '#4682B4', rgb: '70, 130, 180' },
    { name: 'LightSteelBlue', hex: '#B0C4DE', rgb: '176, 196, 222' },
    { name: 'PowderBlue', hex: '#B0E0E6', rgb: '176, 224, 230' },
    { name: 'LightBlue', hex: '#ADD8E6', rgb: '173, 216, 230' },
    { name: 'SkyBlue', hex: '#87CEEB', rgb: '135, 206, 235' },
    { name: 'LightSkyBlue', hex: '#87CEFA', rgb: '135, 206, 250' },
    { name: 'DeepSkyBlue', hex: '#00BFFF', rgb: '0, 191, 255' },
    { name: 'DodgerBlue', hex: '#1E90FF', rgb: '30, 144, 255' },
    { name: 'CornflowerBlue', hex: '#6495ED', rgb: '100, 149, 237' },
    { name: 'RoyalBlue', hex: '#4169E1', rgb: '65, 105, 225' },
    { name: 'Blue', hex: '#0000FF', rgb: '0, 0, 255' },
    { name: 'MediumBlue', hex: '#0000CD', rgb: '0, 0, 205' },
    { name: 'DarkBlue', hex: '#00008B', rgb: '0, 0, 139' },
    { name: 'Navy', hex: '#000080', rgb: '0, 0, 128' },
    { name: 'MidnightBlue', hex: '#191970', rgb: '25, 25, 112' },
    { name: 'Cornsilk', hex: '#FFF8DC', rgb: '255, 248, 220' },
    { name: 'BlanchedAlmond', hex: '#FFEBCD', rgb: '255, 235, 205' },
    { name: 'Bisque', hex: '#FFE4C4', rgb: '255, 228, 196' },
    { name: 'NavajoWhite', hex: '#FFDEAD', rgb: '255, 222, 173' },
    { name: 'Wheat', hex: '#F5DEB3', rgb: '245, 222, 179' },
    { name: 'BurlyWood', hex: '#DEB887', rgb: '222, 184, 135' },
    { name: 'Tan', hex: '#D2B48C', rgb: '210, 180, 140' },
    { name: 'RosyBrown', hex: '#BC8F8F', rgb: '188, 143, 143' },
    { name: 'SandyBrown', hex: '#F4A460', rgb: '244, 164, 96' },
    { name: 'Goldenrod', hex: '#DAA520', rgb: '218, 165, 32' },
    { name: 'DarkGoldenrod', hex: '#B8860B', rgb: '184, 134, 11' },
    { name: 'Peru', hex: '#CD853F', rgb: '205, 133, 63' },
    { name: 'Chocolate', hex: '#D2691E', rgb: '210, 105, 30' },
    { name: 'SaddleBrown', hex: '#8B4513', rgb: '139, 69, 19' },
    { name: 'Sienna', hex: '#A0522D', rgb: '160, 82, 45' },
    { name: 'Brown', hex: '#A52A2A', rgb: '165, 42, 42' },
    { name: 'Maroon', hex: '#800000', rgb: '128, 0, 0' },
    { name: 'White', hex: '#FFFFFF', rgb: '255, 255, 255' },
    { name: 'Snow', hex: '#FFFAFA', rgb: '255, 250, 250' },
    { name: 'HoneyDew', hex: '#F0FFF0', rgb: '240, 255, 240' },
    { name: 'MintCream', hex: '#F5FFFA', rgb: '245, 255, 250' },
    { name: 'Azure', hex: '#F0FFFF', rgb: '240, 255, 255' },
    { name: 'AliceBlue', hex: '#F0F8FF', rgb: '240, 248, 255' },
    { name: 'GhostWhite', hex: '#F8F8FF', rgb: '248, 248, 255' },
    { name: 'WhiteSmoke', hex: '#F5F5F5', rgb: '245, 245, 245' },
    { name: 'SeaShell', hex: '#FFF5EE', rgb: '255, 245, 238' },
    { name: 'Beige', hex: '#F5F5DC', rgb: '245, 245, 220' },
    { name: 'OldLace', hex: '#FDF5E6', rgb: '253, 245, 230' },
    { name: 'FloralWhite', hex: '#FFFAF0', rgb: '255, 250, 240' },
    { name: 'Ivory', hex: '#FFFFF0', rgb: '255, 255, 240' },
    { name: 'AntiqueWhite', hex: '#FAEBD7', rgb: '250, 235, 215' },
    { name: 'Linen', hex: '#FAF0E6', rgb: '250, 240, 230' },
    { name: 'LavenderBlush', hex: '#FFF0F5', rgb: '255, 240, 245' },
    { name: 'MistyRose', hex: '#FFE4E1', rgb: '255, 228, 225' },
    { name: 'Gainsboro', hex: '#DCDCDC', rgb: '220, 220, 220' },
    { name: 'LightGray', hex: '#D3D3D3', rgb: '211, 211, 211' },
    { name: 'Silver', hex: '#C0C0C0', rgb: '192, 192, 192' },
    { name: 'DarkGray', hex: '#A9A9A9', rgb: '169, 169, 169' },
    { name: 'Gray', hex: '#808080', rgb: '128, 128, 128' },
    { name: 'DimGray', hex: '#696969', rgb: '105, 105, 105' },
    { name: 'LightSlateGray', hex: '#778899', rgb: '119, 136, 153' },
    { name: 'SlateGray', hex: '#708090', rgb: '112, 128, 144' },
    { name: 'DarkSlateGray', hex: '#2F4F4F', rgb: '47, 79, 79' },
    { name: 'Black', hex: '#000000', rgb: '0, 0, 0' }
];

// ============================================================
// 2. STATE
// ============================================================
let selectedColors = [];
let galleryData = [];
let isAdminAuthenticated = false;

// ============================================================
// 3. CORE FUNCTIONS
// ============================================================
function renderColorList() {
    const colorList = document.getElementById('colorList');
    colorList.innerHTML = htmlColors.map(color => `
        <li class="color-item" data-color="${color.name}" onclick="toggleColor('${color.name}')">
            <span class="color-name">${color.name}</span>
            <span class="hex-code">${color.hex}</span>
            <span class="rgb-value">${color.rgb}</span>
        </li>
    `).join('');
}

function toggleColor(colorName) {
    const color = htmlColors.find(c => c.name === colorName);

    if (selectedColors.includes(colorName)) {
        // Deselect
        selectedColors = selectedColors.filter(c => c !== colorName);
    } else {
        // Select
        selectedColors.push(colorName);
    }

    // Update ALL instances of this color (desktop + mobile overlay)
    const allItems = document.querySelectorAll(`[data-color="${colorName}"]`);
    allItems.forEach(colorItem => {
        if (selectedColors.includes(colorName)) {
            colorItem.classList.add('selected');
        } else {
            colorItem.classList.remove('selected');
            colorItem.querySelector('.color-name').style.color = '#000';
            colorItem.querySelector('.hex-code').style.color = 'rgba(0, 0, 0, 0.25)';
            colorItem.querySelector('.rgb-value').style.color = 'rgba(0, 0, 0, 0.25)';
        }
    });

    updateBackgroundColor();
    updateSelectedColorStyles();
    renderGallery();
}

function renderGallery() {
    const gallery = document.getElementById('gallery');
    let filteredData = galleryData;

    if (selectedColors.length > 0) {
        filteredData = galleryData.filter(item =>
            selectedColors.includes(item.color.name)
        );
    }

    if (filteredData.length === 0) {
        gallery.innerHTML = '';
        return;
    }

    gallery.innerHTML = filteredData.map(item => `
        <div class="gallery-item">
            ${item.type === 'video'
                ? `<video src="${item.image}" autoplay loop muted playsinline preload="auto"></video>`
                : `<img src="${item.image}" alt="${item.color.name}" loading="lazy">`
            }
            ${isAdminAuthenticated ? `<button class="delete-btn" onclick="deleteFromGallery('${item.id}')">&times;</button>` : ''}
        </div>
    `).join('');
}

async function addToGallery(imageDataUrl, colorName, fileType) {
    const color = htmlColors.find(c => c.name === colorName);
    const id = Date.now().toString();

    try {
        // 1. dataURL → Blob
        const response = await fetch(imageDataUrl);
        const blob = await response.blob();

        // 2. Upload to Cloudinary (unsigned)
        const formData = new FormData();
        formData.append('file', blob);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', 'colorwalk');

        const endpoint = fileType === 'video' ? 'video' : 'image';
        const uploadRes = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${endpoint}/upload`,
            { method: 'POST', body: formData }
        );
        const uploadData = await uploadRes.json();

        // 3. Optimize URL with Cloudinary transformations
        const optimizedUrl = uploadData.secure_url.replace('/upload/', '/upload/w_400,f_auto,q_auto/');

        // 4. Save metadata to Firestore
        await db.collection('gallery').doc(id).set({
            image: optimizedUrl,
            cloudinaryId: uploadData.public_id,
            type: fileType || 'image',
            color: { name: color.name, hex: color.hex, rgb: color.rgb },
            date: new Date().toLocaleDateString('en-US'),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        // onSnapshot listener will auto-refresh the gallery
    } catch (err) {
        console.error('Upload failed:', err);
        alert('Upload failed. Please try again.');
    }
}

// Upload video file directly (no resize)
async function addToGalleryFromFile(file, colorName, fileType) {
    const color = htmlColors.find(c => c.name === colorName);
    const id = Date.now().toString();

    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', 'colorwalk');

        const uploadRes = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`,
            { method: 'POST', body: formData }
        );
        const uploadData = await uploadRes.json();

        // Optimize URL with Cloudinary transformations for video
        const optimizedUrl = uploadData.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');

        await db.collection('gallery').doc(id).set({
            image: optimizedUrl,
            cloudinaryId: uploadData.public_id,
            type: fileType || 'video',
            color: { name: color.name, hex: color.hex, rgb: color.rgb },
            date: new Date().toLocaleDateString('en-US'),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (err) {
        console.error('Upload failed:', err);
        alert('Upload failed. Please try again.');
    }
}

// ============================================================
// 4. BACKGROUND COLOR
// ============================================================
function updateBackgroundColor() {
    const logoText = document.querySelector('#bouncingLogo span');
    if (selectedColors.length === 0) {
        document.body.style.backgroundColor = '#FFFFFF';
        if (logoText) logoText.style.color = '#fff';
    } else {
        const lastColorName = selectedColors[selectedColors.length - 1];
        const lastColor = htmlColors.find(c => c.name === lastColorName);
        document.body.style.backgroundColor = lastColor.hex;
        if (logoText) logoText.style.color = lastColor.hex;
    }
}

function updateSelectedColorStyles() {
    const currentBgColorName = selectedColors.length > 0
        ? selectedColors[selectedColors.length - 1]
        : null;

    selectedColors.forEach(colorName => {
        const allItems = document.querySelectorAll(`[data-color="${colorName}"]`);
        const color = htmlColors.find(c => c.name === colorName);

        allItems.forEach(colorItem => {
            if (colorName === currentBgColorName) {
                // This color IS the background — keep text black for visibility
                colorItem.querySelector('.color-name').style.color = '#000';
                colorItem.querySelector('.hex-code').style.color = '#000';
                colorItem.querySelector('.rgb-value').style.color = '#000';
            } else {
                // This color is NOT the background — show in its hex color
                colorItem.querySelector('.color-name').style.color = color.hex;
                colorItem.querySelector('.hex-code').style.color = color.hex;
                colorItem.querySelector('.rgb-value').style.color = color.hex;
            }
        });
    });
}

// ============================================================
// 5. ADMIN MODE
// ============================================================
async function deleteFromGallery(docId) {
    if (!isAdminAuthenticated) return;

    try {
        await db.collection('gallery').doc(docId).delete();
        // Cloudinary image remains but won't be referenced anymore
        // Can be manually deleted from Cloudinary dashboard if needed
    } catch (err) {
        console.error('Delete failed:', err);
        alert('Delete failed.');
    }
}

// ============================================================
// 6. BOUNCING LOGO (desktop only)
// ============================================================
(function initBouncingLogo() {
    const logo = document.getElementById('bouncingLogo');
    const fileInput = document.getElementById('imageUpload');
    const LOGO_SIZE = 50;

    function isMobile() {
        return window.innerWidth <= 768;
    }

    let x = Math.random() * (window.innerWidth - LOGO_SIZE);
    let y = Math.random() * (window.innerHeight - LOGO_SIZE);
    let vx = 2 * (Math.random() > 0.5 ? 1 : -1);
    let vy = 1.5 * (Math.random() > 0.5 ? 1 : -1);
    let paused = false;

    function animate() {
        if (!paused && !isMobile()) {
            x += vx;
            y += vy;

            if (x + LOGO_SIZE >= window.innerWidth) {
                x = window.innerWidth - LOGO_SIZE;
                vx = -vx;
            } else if (x <= 0) {
                x = 0;
                vx = -vx;
            }

            if (y + LOGO_SIZE >= window.innerHeight) {
                y = window.innerHeight - LOGO_SIZE;
                vy = -vy;
            } else if (y <= 0) {
                y = 0;
                vy = -vy;
            }

            logo.style.transform = `translate(${x}px, ${y}px)`;
        }
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        if (x + LOGO_SIZE > window.innerWidth) x = window.innerWidth - LOGO_SIZE;
        if (y + LOGO_SIZE > window.innerHeight) y = window.innerHeight - LOGO_SIZE;
    });

    logo.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', handleFileSelect);

    // Expose pause/resume for modal
    window.bouncingLogo = {
        pause: () => { paused = true; logo.style.display = 'none'; },
        resume: () => { paused = false; if (!isMobile()) logo.style.display = 'flex'; }
    };
})();

// ============================================================
// 7. FILE UPLOAD HANDLER
// ============================================================
let pendingFileType = 'image'; // 'image' or 'video'
let pendingVideoFile = null;

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
        alert('File too large (max 10MB)');
        event.target.value = '';
        return;
    }

    if (file.type.startsWith('video/')) {
        // Video: extract first frame for color picker
        pendingFileType = 'video';
        pendingVideoFile = file;
        const video = document.createElement('video');
        video.preload = 'auto';
        video.muted = true;
        video.onloadeddata = function () {
            video.currentTime = 0;
        };
        video.onseeked = function () {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            const frameDataUrl = canvas.toDataURL('image/jpeg', 0.8);
            openColorPickerModal(frameDataUrl);
            URL.revokeObjectURL(video.src);
        };
        video.src = URL.createObjectURL(file);
    } else {
        // Image: existing flow
        pendingFileType = 'image';
        pendingVideoFile = null;
        const reader = new FileReader();
        reader.onload = function (e) {
            openColorPickerModal(e.target.result);
        };
        reader.readAsDataURL(file);
    }
    event.target.value = '';
}

// ============================================================
// 8. COLOR PICKER MODAL
// ============================================================
let pickedColor = null;
let pendingImageDataUrl = null;

function openColorPickerModal(imageDataUrl) {
    pendingImageDataUrl = imageDataUrl;
    const modal = document.getElementById('colorPickerModal');
    const canvas = document.getElementById('colorPickerCanvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = function () {
        const maxW = window.innerWidth * 0.75;
        const maxH = window.innerHeight * 0.6;
        let w = img.naturalWidth;
        let h = img.naturalHeight;

        if (w > maxW) { h *= maxW / w; w = maxW; }
        if (h > maxH) { w *= maxH / h; h = maxH; }

        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);

        modal.classList.add('active');
        window.bouncingLogo.pause();
    };
    img.src = imageDataUrl;

    document.getElementById('previewSwatch').style.background = '#fff';
    document.getElementById('previewColorName').textContent = '-';
    document.getElementById('confirmColorBtn').disabled = true;
    pickedColor = null;
}

function closeColorPickerModal() {
    document.getElementById('colorPickerModal').classList.remove('active');
    pendingImageDataUrl = null;
    pickedColor = null;
    window.bouncingLogo.resume();
}

// Canvas click: read pixel color
document.getElementById('colorPickerCanvas').addEventListener('click', function (e) {
    const canvas = this;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const r = pixel[0], g = pixel[1], b = pixel[2];

    pickedColor = { r, g, b };
    const nearest = findNearestColor(r, g, b);

    document.getElementById('previewSwatch').style.background = `rgb(${r}, ${g}, ${b})`;
    document.getElementById('previewColorName').textContent =
        `${nearest.name} (rgb: ${r}, ${g}, ${b})`;
    document.getElementById('confirmColorBtn').disabled = false;
});

// Confirm: resize image & add to gallery
document.getElementById('confirmColorBtn').addEventListener('click', function () {
    if (!pickedColor || !pendingImageDataUrl) return;

    const nearest = findNearestColor(pickedColor.r, pickedColor.g, pickedColor.b);

    if (pendingFileType === 'video' && pendingVideoFile) {
        // Video: upload original file directly to Cloudinary
        addToGalleryFromFile(pendingVideoFile, nearest.name, 'video');
        closeColorPickerModal();
    } else {
        // Image: resize then upload
        resizeImage(pendingImageDataUrl, 800, function (resizedDataUrl) {
            addToGallery(resizedDataUrl, nearest.name, 'image');
            closeColorPickerModal();
        });
    }
});

// Close button
document.getElementById('closePickerBtn').addEventListener('click', closeColorPickerModal);

// ESC key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeColorPickerModal();
});

// ============================================================
// 9. NEAREST COLOR (Redmean weighted Euclidean)
// ============================================================
function findNearestColor(r, g, b) {
    let minDist = Infinity;
    let nearest = htmlColors[0];

    for (const color of htmlColors) {
        const parts = color.rgb.split(',').map(s => parseInt(s.trim(), 10));
        const dr = r - parts[0];
        const dg = g - parts[1];
        const db = b - parts[2];
        const rMean = (r + parts[0]) / 2;

        const dist = (2 + rMean / 256) * dr * dr
            + 4 * dg * dg
            + (2 + (255 - rMean) / 256) * db * db;

        if (dist < minDist) {
            minDist = dist;
            nearest = color;
        }
    }

    return nearest;
}

// ============================================================
// 10. IMAGE RESIZE
// ============================================================
function resizeImage(dataUrl, maxDim, callback) {
    const img = new Image();
    img.onload = function () {
        let w = img.width, h = img.height;
        if (w > maxDim || h > maxDim) {
            if (w > h) { h *= maxDim / w; w = maxDim; }
            else { w *= maxDim / h; h = maxDim; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        callback(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.src = dataUrl;
}

// ============================================================
// 11. MOBILE — header & color list overlay
// ============================================================
const mobileUploadBtn = document.getElementById('mobileUploadBtn');
const mobileListToggle = document.getElementById('mobileListToggle');
const colorListOverlay = document.getElementById('colorListOverlay');
const overlayBackdrop = document.getElementById('overlayBackdrop');

// Mobile upload button → file input
if (mobileUploadBtn) {
    mobileUploadBtn.addEventListener('click', () => {
        document.getElementById('imageUpload').click();
    });
}

// Mobile color list overlay toggle
if (mobileListToggle && colorListOverlay) {
    mobileListToggle.addEventListener('click', () => {
        if (colorListOverlay.classList.contains('active')) {
            closeMobileColorList();
        } else {
            openMobileColorList();
        }
    });
}

if (overlayBackdrop) {
    overlayBackdrop.addEventListener('click', () => {
        closeMobileColorList();
    });
}

function openMobileColorList() {
    renderMobileColorList();
    colorListOverlay.classList.add('active');
}

function closeMobileColorList() {
    colorListOverlay.classList.remove('active');
}

function renderMobileColorList() {
    const overlayContent = document.getElementById('overlayContent');
    overlayContent.innerHTML = `
        <ul class="color-list">
            ${htmlColors.map(color => {
                const isSelected = selectedColors.includes(color.name);
                return `
                    <li class="color-item ${isSelected ? 'selected' : ''}"
                        data-color="${color.name}"
                        onclick="toggleColor('${color.name}')">
                        <span class="color-name">${color.name}</span>
                        <span class="hex-code">${color.hex}</span>
                        <span class="rgb-value">${color.rgb}</span>
                    </li>
                `;
            }).join('')}
        </ul>
    `;

    // Apply current selection styles to overlay items
    updateSelectedColorStyles();
}

// ============================================================
// 12. INITIALIZATION
// ============================================================

// Firestore real-time listener — all visitors see the same gallery
db.collection('gallery')
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
        galleryData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        renderGallery();
    }, err => {
        console.error('Firestore listener error:', err);
    });

// Admin login (when URL has ?admin=true, prompt for password)
const isAdminParam = new URLSearchParams(window.location.search).get('admin') === 'true';
if (isAdminParam) {
    const password = prompt('Admin password:');
    if (password) {
        auth.signInWithEmailAndPassword('yewonpaark@gmail.com', password)
            .then(() => {
                isAdminAuthenticated = true;
                renderGallery();
                console.log('Admin authenticated');
            })
            .catch(err => {
                console.error('Admin login failed:', err);
                alert('Login failed');
            });
    }
}

renderColorList();
