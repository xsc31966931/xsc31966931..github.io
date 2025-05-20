// 获取当前日期并显示在页面上
function updateCurrentDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const currentDate = new Date().toLocaleDateString('zh-CN', options);
    document.getElementById('current-date').textContent = currentDate;
}

// 获取药品列表
function getMedications() {
    return JSON.parse(localStorage.getItem('medications')) || [];
}

// 保存药品到 localStorage
function saveMedication(med) {
    const meds = getMedications();
    meds.push(med);
    localStorage.setItem('medications', JSON.stringify(meds));
}

// 渲染药品表格
function renderMedicationTable() {
    const medications = getMedications();
    const tbody = document.querySelector('#medications tbody');
    tbody.innerHTML = '';

    medications.forEach((med, index) => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50 transition-colors";
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    ${med.image ? `<img src="${med.image}" alt="" class="w-10 h-10 rounded-lg mr-3">` : ''}
                    <div>
                        <div class="font-medium text-gray-900">${med.name}</div>
                        <div class="text-sm text-gray-500">${med.brand || ''}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">${med.dose || ''}</td>
            <td class="px-6 py-4 whitespace-nowrap">${med.purpose || ''}</td>
            <td class="px-6 py-4 whitespace-nowrap">${med.expiration || ''}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">正常</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button class="text-primary hover:text-primary/80 mr-3"><i class="fa-solid fa-pencil"></i></button>
                <button class="text-danger hover:text-danger/80" onclick="deleteMedication(${index})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 删除药品
function deleteMedication(index) {
    const meds = getMedications();
    meds.splice(index, 1);
    localStorage.setItem('medications', JSON.stringify(meds));
    renderMedicationTable();
}

// 获取服药计划
function getSchedules() {
    return JSON.parse(localStorage.getItem('schedules')) || [];
}

// 保存服药计划
function saveSchedule(schedule) {
    const schedules = getSchedules();
    schedules.push(schedule);
    localStorage.setItem('schedules', JSON.stringify(schedules));
}

// 初始化图表
function initCharts() {
    // 服药依从性图表
    const complianceCtx = document.getElementById('complianceChart').getContext('2d');
    new Chart(complianceCtx, {
        type: 'line',
        data: {
            labels: ['1日', '5日', '10日', '15日', '20日', '25日', '30日'],
            datasets: [{
                label: '服药依从率',
                data: [85, 88, 90, 87, 92, 95, 92],
                borderColor: '#165DFF',
                backgroundColor: 'rgba(22, 93, 255, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#1D2129',
                    bodyColor: '#1D2129',
                    borderColor: 'rgba(22, 93, 255, 0.2)',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            return `依从率: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 70,
                    max: 100,
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: { callback: v => v + '%' }
                },
                x: { grid: { display: false } }
            }
        }
    });

    // 药品分布图
    const distributionCtx = document.getElementById('medicationDistributionChart').getContext('2d');
    new Chart(distributionCtx, {
        type: 'doughnut',
        data: {
            labels: ['阿司匹林肠溶片', '硝苯地平缓释片', '盐酸二甲双胍片', '布洛芬缓释胶囊', '氯雷他定片', '其他'],
            datasets: [{
                data: [25, 20, 18, 12, 10, 15],
                backgroundColor: ['#165DFF', '#FF7D00', '#00B42A', '#86909C', '#722ED1', '#F53F3F'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { boxWidth: 12, padding: 15 }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#1D2129',
                    bodyColor: '#1D2129',
                    borderColor: 'rgba(22, 93, 255, 0.2)',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });
}

// 显示提醒弹窗
function showReminder(schedule) {
    const med = getMedications().find(m => m.id == schedule.medicationId);
    const reminder = document.getElementById('medication-reminder');

    reminder.querySelector('.text-primary').textContent = med?.name || '';
    reminder.querySelector('.mt-1').textContent = `剂量：${schedule.dose} · ${schedule.notes}`;
    reminder.classList.remove('translate-y-20', 'opacity-0');
}

// 检查是否到服药时间
function checkReminders() {
    const schedules = getSchedules();
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);

    schedules.forEach(schedule => {
        if (schedule.time === currentTime) {
            showReminder(schedule);
        }
    });
}

// 显示 toast 消息
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-6 right-6 bg-dark text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full opacity-0 transition-all duration-500';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-x-full', 'opacity-0');
    }, 100);

    setTimeout(() => {
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => document.body.removeChild(toast), 500);
    }, 3000);
}

// 页面加载后执行初始化逻辑
document.addEventListener('DOMContentLoaded', function () {
    updateCurrentDate();
    renderMedicationTable();
    initCharts();

    // 表单提交 - 添加药品
    document.getElementById('add-medication-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const medication = {
            id: Date.now(),
            name: document.getElementById('medication-name').value,
            brand: document.getElementById('medication-brand').value,
            dose: document.getElementById('medication-dose').value,
            purpose: document.getElementById('medication-purpose').value,
            instructions: document.getElementById('medication-instructions').value,
            expiration: document.getElementById('medication-expiration').value,
            quantity: document.getElementById('medication-quantity').value,
            image: document.getElementById('preview-image').src
        };

        saveMedication(medication);
        closeMedicationModal();
        showToast('药品添加成功！');
        renderMedicationTable();
    });

    // 表单提交 - 添加服药计划
    document.getElementById('add-schedule-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const schedule = {
            id: Date.now(),
            medicationId: document.getElementById('schedule-medication').value,
            dose: document.getElementById('schedule-dose').value,
            time: document.getElementById('schedule-time').value,
            recurrence: document.getElementById('schedule-recurrence').value,
            notes: document.getElementById('schedule-notes').value,
            reminderBefore: document.getElementById('reminder-before').value
        };

        saveSchedule(schedule);
        closeScheduleModal();
        showToast('服药计划添加成功！');
    });

    // 图片上传处理
    const imageUploadArea = document.getElementById('image-upload-area');
    const imageUpload = document.getElementById('image-upload');
    const previewImage = document.getElementById('preview-image');
    const imagePreview = document.getElementById('image-preview');
    const removeImage = document.getElementById('remove-image');

    imageUploadArea.addEventListener('click', function () {
        imageUpload.click();
    });

    imageUpload.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                previewImage.src = e.target.result;
                imagePreview.classList.remove('hidden');
                imageUploadArea.classList.add('hidden');
            }

            reader.readAsDataURL(this.files[0]);
        }
    });

    removeImage.addEventListener('click', function () {
        imagePreview.classList.add('hidden');
        imageUploadArea.classList.remove('hidden');
        imageUpload.value = '';
        previewImage.src = '';
    });

    // 模态框控制 - 添加药品
    const addMedicationBtn = document.getElementById('add-medication-btn');
    const addMedicationBtn2 = document.getElementById('add-medication-btn-2');
    const addMedicationModal = document.getElementById('add-medication-modal');
    const closeMedicationModalBtn = document.getElementById('close-medication-modal');
    const cancelAddMedicationBtn = document.getElementById('cancel-add-medication');

    function openMedicationModal() {
        addMedicationModal.classList.remove('opacity-0', 'pointer-events-none');
        addMedicationModal.querySelector('.bg-white').classList.remove('scale-95');
        addMedicationModal.querySelector('.bg-white').classList.add('scale-100');
    }

    function closeMedicationModal() {
        addMedicationModal.classList.add('opacity-0', 'pointer-events-none');
        addMedicationModal.querySelector('.bg-white').classList.remove('scale-100');
        addMedicationModal.querySelector('.bg-white').classList.add('scale-95');
    }

    addMedicationBtn.addEventListener('click', openMedicationModal);
    addMedicationBtn2.addEventListener('click', openMedicationModal);
    closeMedicationModalBtn.addEventListener('click', closeMedicationModal);
    cancelAddMedicationBtn.addEventListener('click', closeMedicationModal);

    // 模态框控制 - 添加服药计划
    const addScheduleBtn = document.getElementById('add-schedule-btn');
    const addScheduleModal = document.getElementById('add-schedule-modal');
    const closeScheduleModalBtn = document.getElementById('close-schedule-modal');
    const cancelAddScheduleBtn = document.getElementById('cancel-add-schedule');

    function openScheduleModal() {
        addScheduleModal.classList.remove('opacity-0', 'pointer-events-none');
        addScheduleModal.querySelector('.bg-white').classList.remove('scale-95');
        addScheduleModal.querySelector('.bg-white').classList.add('scale-100');
    }

    function closeScheduleModal() {
        addScheduleModal.classList.add('opacity-0', 'pointer-events-none');
        addScheduleModal.querySelector('.bg-white').classList.remove('scale-100');
        addScheduleModal.querySelector('.bg-white').classList.add('scale-95');
    }

    addScheduleBtn.addEventListener('click', openScheduleModal);
    closeScheduleModalBtn.addEventListener('click', closeScheduleModal);
    cancelAddScheduleBtn.addEventListener('click', closeScheduleModal);

    // 切换自定义周期
    const scheduleRecurrence = document.getElementById('schedule-recurrence');
    const customRecurrence = document.getElementById('custom-recurrence');
    scheduleRecurrence.addEventListener('change', function () {
        if (this.value === 'custom') {
            customRecurrence.classList.remove('hidden');
        } else {
            customRecurrence.classList.add('hidden');
        }
    });

    // 服药提醒操作
    const closeReminder = document.getElementById('close-reminder');
    const snoozeMedication = document.getElementById('snooze-medication');
    const takeMedication = document.getElementById('take-medication');
    const medicationReminder = document.getElementById('medication-reminder');

    closeReminder.addEventListener('click', function () {
        medicationReminder.classList.add('translate-y-20', 'opacity-0');
    });

    snoozeMedication.addEventListener('click', function () {
        medicationReminder.classList.add('translate-y-20', 'opacity-0');
        showToast('已推迟15分钟提醒');
        setTimeout(() => {
            medicationReminder.classList.remove('translate-y-20', 'opacity-0');
        }, 15 * 60 * 1000); // 15分钟后再次提醒
    });

    takeMedication.addEventListener('click', function () {
        medicationReminder.classList.add('translate-y-20', 'opacity-0');
        showToast('已记录服药');
    });

    // 自动提醒检查
    setInterval(checkReminders, 60 * 1000);
});<script src="js/app.js"></script>