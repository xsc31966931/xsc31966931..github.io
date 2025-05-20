// // 获取当前日期并显示在页面上
// function updateCurrentDate() {
//     const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
//     const currentDate = new Date().toLocaleDateString('zh-CN', options);
//     const element = document.getElementById('current-date');
//     if (element) element.textContent = currentDate;
// }

// // 获取药品列表
// function getMedications() {
//     return JSON.parse(localStorage.getItem('medications')) || [];
// }

// // 保存药品到 localStorage
// function saveMedication(med) {
//     const meds = getMedications();
//     meds.push(med);
//     localStorage.setItem('medications', JSON.stringify(meds));
// }

// // 渲染药品表格
// function renderMedicationTable() {
//     const medications = getMedications();
//     const tbody = document.querySelector('#medication-table-body');
//     if (!tbody) {
//         console.error('找不到药品表格元素 #medication-table-body');
//         return;
//     }
    
//     tbody.innerHTML = '';

//     medications.forEach((med, index) => {
//         const tr = document.createElement('tr');
//         tr.className = "hover:bg-gray-50 transition-colors";
//         tr.innerHTML = `
//             <td class="px-6 py-4 whitespace-nowrap">
//                 <div class="flex items-center">
//                     ${med.image ? `<img src="${med.image}" alt="" class="w-10 h-10 rounded-lg mr-3">` : '<div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3"><i class="fa-solid fa-pill text-primary"></i></div>'}
//                     <div>
//                         <div class="font-medium text-gray-900">${med.name}</div>
//                         <div class="text-sm text-gray-500">${med.brand || ''}</div>
//                     </div>
//                 </div>
//             </td>
//             <td class="px-6 py-4 whitespace-nowrap">${med.dose || ''}</td>
//             <td class="px-6 py-4 whitespace-nowrap">${med.purpose || ''}</td>
//             <td class="px-6 py-4 whitespace-nowrap">${med.expiration || ''}</td>
//             <td class="px-6 py-4 whitespace-nowrap">
//                 <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">正常</span>
//             </td>
//             <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 <button class="text-primary hover:text-primary/80 mr-3" onclick="editMedication(${index})"><i class="fa-solid fa-pencil"></i></button>
//                 <button class="text-danger hover:text-danger/80" onclick="deleteMedication(${index})"><i class="fa-solid fa-trash"></i></button>
//             </td>
//         `;
//         tbody.appendChild(tr);
//     });
// }

// // 删除药品
// function deleteMedication(index) {
//     if (confirm('确定要删除该药品吗？')) {
//         const meds = getMedications();
//         meds.splice(index, 1);
//         localStorage.setItem('medications', JSON.stringify(meds));
//         renderMedicationTable();
//         showToast('药品已删除');
//     }
// }

// // 编辑药品
// function editMedication(index) {
//     const meds = getMedications();
//     const med = meds[index];
//     if (!med) return;
    
//     // 填充表单
//     document.getElementById('medication-name').value = med.name || '';
//     document.getElementById('medication-brand').value = med.brand || '';
//     document.getElementById('medication-dose').value = med.dose || '';
//     document.getElementById('medication-purpose').value = med.purpose || '';
//     document.getElementById('medication-instructions').value = med.instructions || '';
//     document.getElementById('medication-expiration').value = med.expiration || '';
//     document.getElementById('medication-quantity').value = med.quantity || '';
    
//     // 处理图片
//     const imagePreview = document.getElementById('image-preview');
//     const imageUploadArea = document.getElementById('image-upload-area');
//     const previewImage = document.getElementById('preview-image');
    
//     if (med.image) {
//         previewImage.src = med.image;
//         imagePreview.classList.remove('hidden');
//         imageUploadArea.classList.add('hidden');
//     }
    
//     // 存储当前编辑的索引
//     document.getElementById('add-medication-form').dataset.editIndex = index;
    
//     // 打开模态框
//     openMedicationModal();
// }

// // 获取服药计划
// function getSchedules() {
//     return JSON.parse(localStorage.getItem('schedules')) || [];
// }

// // 保存服药计划
// function saveSchedule(schedule) {
//     const schedules = getSchedules();
//     schedules.push(schedule);
//     localStorage.setItem('schedules', JSON.stringify(schedules));
// }

// // 初始化图表
// function initCharts() {
//     try {
//         const complianceCtx = document.getElementById('complianceChart');
//         const distributionCtx = document.getElementById('medicationDistributionChart');
        
//         if (!complianceCtx || !distributionCtx) {
//             console.warn('图表元素不存在，跳过图表初始化');
//             return;
//         }
        
//         // 服药依从性图表
//         new Chart(complianceCtx.getContext('2d'), {
//             type: 'line',
//             data: {
//                 labels: ['1日', '5日', '10日', '15日', '20日', '25日', '30日'],
//                 datasets: [{
//                     label: '服药依从率',
//                     data: [85, 88, 90, 87, 92, 95, 92],
//                     borderColor: '#165DFF',
//                     backgroundColor: 'rgba(22, 93, 255, 0.1)',
//                     tension: 0.3,
//                     fill: true
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                     legend: { display: false },
//                     tooltip: {
//                         backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                         titleColor: '#1D2129',
//                         bodyColor: '#1D2129',
//                         borderColor: 'rgba(22, 93, 255, 0.2)',
//                         borderWidth: 1,
//                         padding: 12,
//                         boxPadding: 6,
//                         usePointStyle: true,
//                         callbacks: {
//                             label: function(context) {
//                                 return `依从率: ${context.raw}%`;
//                             }
//                         }
//                     }
//                 },
//                 scales: {
//                     y: {
//                         beginAtZero: false,
//                         min: 70,
//                         max: 100,
//                         grid: { color: 'rgba(0, 0, 0, 0.05)' },
//                         ticks: { callback: v => v + '%' }
//                     },
//                     x: { grid: { display: false } }
//                 }
//             }
//         });

//         // 药品分布图
//         new Chart(distributionCtx.getContext('2d'), {
//             type: 'doughnut',
//             data: {
//                 labels: ['阿司匹林肠溶片', '硝苯地平缓释片', '盐酸二甲双胍片', '布洛芬缓释胶囊', '氯雷他定片', '其他'],
//                 datasets: [{
//                     data: [25, 20, 18, 12, 10, 15],
//                     backgroundColor: ['#165DFF', '#FF7D00', '#00B42A', '#86909C', '#722ED1', '#F53F3F'],
//                     borderWidth: 0
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                     legend: {
//                         position: 'right',
//                         labels: { boxWidth: 12, padding: 15 }
//                     },
//                     tooltip: {
//                         backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                         titleColor: '#1D2129',
//                         bodyColor: '#1D2129',
//                         borderColor: 'rgba(22, 93, 255, 0.2)',
//                         borderWidth: 1,
//                         padding: 12,
//                         boxPadding: 6,
//                         usePointStyle: true,
//                         callbacks: {
//                             label: function(context) {
//                                 return `${context.label}: ${context.raw}%`;
//                             }
//                         }
//                     }
//                 },
//                 cutout: '65%'
//             }
//         });
//     } catch (error) {
//         console.error('初始化图表失败:', error);
//     }
// }

// // 显示提醒弹窗
// function showReminder(schedule) {
//     const med = getMedications().find(m => m.id == schedule.medicationId);
//     const reminder = document.getElementById('medication-reminder');
//     if (!reminder) return;

//     const nameElement = reminder.querySelector('.text-primary');
//     const doseElement = reminder.querySelector('.mt-1');
    
//     if (nameElement) nameElement.textContent = med?.name || '';
//     if (doseElement) doseElement.textContent = `剂量：${schedule.dose} · ${schedule.notes || ''}`;
    
//     reminder.classList.remove('translate-y-20', 'opacity-0');
// }

// // 检查是否到服药时间
// function checkReminders() {
//     const schedules = getSchedules();
//     const now = new Date();
//     const currentTime = now.toTimeString().slice(0, 5);

//     schedules.forEach(schedule => {
//         if (schedule.time === currentTime) {
//             showReminder(schedule);
//         }
//     });
// }

// // 显示 toast 消息
// function showToast(message) {
//     const toast = document.createElement('div');
//     toast.className = 'fixed top-6 right-6 bg-dark text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full opacity-0 transition-all duration-500';
//     toast.textContent = message;
//     document.body.appendChild(toast);

//     setTimeout(() => {
//         toast.classList.remove('translate-x-full', 'opacity-0');
//     }, 100);

//     setTimeout(() => {
//         toast.classList.add('translate-x-full', 'opacity-0');
//         setTimeout(() => document.body.removeChild(toast), 500);
//     }, 3000);
// }

// // 模态框控制函数
// function openMedicationModal() {
//     const modal = document.getElementById('add-medication-modal');
//     if (!modal) return;
    
//     modal.classList.remove('opacity-0', 'pointer-events-none');
//     const modalContent = modal.querySelector('.bg-white');
//     if (modalContent) {
//         modalContent.classList.remove('scale-95');
//         modalContent.classList.add('scale-100');
//     }
// }

// function closeMedicationModal() {
//     const modal = document.getElementById('add-medication-modal');
//     if (!modal) return;
    
//     modal.classList.add('opacity-0', 'pointer-events-none');
//     const modalContent = modal.querySelector('.bg-white');
//     if (modalContent) {
//         modalContent.classList.remove('scale-100');
//         modalContent.classList.add('scale-95');
//     }
    
//     // 重置表单
//     const form = document.getElementById('add-medication-form');
//     if (form) {
//         form.reset();
//         delete form.dataset.editIndex;
//     }
    
//     // 重置图片预览
//     const imagePreview = document.getElementById('image-preview');
//     const imageUploadArea = document.getElementById('image-upload-area');
//     if (imagePreview && imageUploadArea) {
//         imagePreview.classList.add('hidden');
//         imageUploadArea.classList.remove('hidden');
//     }
// }

// function openScheduleModal() {
//     const modal = document.getElementById('add-schedule-modal');
//     if (!modal) return;
    
//     modal.classList.remove('opacity-0', 'pointer-events-none');
//     const modalContent = modal.querySelector('.bg-white');
//     if (modalContent) {
//         modalContent.classList.remove('scale-95');
//         modalContent.classList.add('scale-100');
//     }
// }

// function closeScheduleModal() {
//     const modal = document.getElementById('add-schedule-modal');
//     if (!modal) return;
    
//     modal.classList.add('opacity-0', 'pointer-events-none');
//     const modalContent = modal.querySelector('.bg-white');
//     if (modalContent) {
//         modalContent.classList.remove('scale-100');
//         modalContent.classList.add('scale-95');
//     }
// }



// // 页面加载后执行初始化逻辑
// document.addEventListener('DOMContentLoaded', function () {
//     try {
//         console.log('DOM加载完成，开始初始化...');
//         updateCurrentDate();
//         renderMedicationTable();
        
//         // 延迟初始化图表，确保DOM元素已完全加载
//         setTimeout(() => {
//             initCharts();
//         }, 100);

//         // 绑定模态框控制事件
//         const addMedicationBtn = document.getElementById('add-medication-btn');
//         const addMedicationBtn2 = document.getElementById('add-medication-btn-2');
//         const closeMedicationModalBtn = document.getElementById('close-medication-modal');
//         const cancelAddMedicationBtn = document.getElementById('cancel-add-medication');

//         if (addMedicationBtn) addMedicationBtn.addEventListener('click', openMedicationModal);
//         if (addMedicationBtn2) addMedicationBtn2.addEventListener('click', openMedicationModal);
//         if (closeMedicationModalBtn) closeMedicationModalBtn.addEventListener('click', closeMedicationModal);
//         if (cancelAddMedicationBtn) cancelAddMedicationBtn.addEventListener('click', closeMedicationModal);

//         const addScheduleBtn = document.getElementById('add-schedule-btn');
//         const closeScheduleModalBtn = document.getElementById('close-schedule-modal');
//         const cancelAddScheduleBtn = document.getElementById('cancel-add-schedule');

//         if (addScheduleBtn) addScheduleBtn.addEventListener('click', openScheduleModal);
//         if (closeScheduleModalBtn) closeScheduleModalBtn.addEventListener('click', closeScheduleModal);
//         if (cancelAddScheduleBtn) cancelAddScheduleBtn.addEventListener('click', closeScheduleModal);

//         // 表单提交 - 添加药品
//         const addMedicationForm = document.getElementById('add-medication-form');
//         if (addMedicationForm) {
//             addMedicationForm.addEventListener('submit', function (e) {
//                 e.preventDefault();

//                 const medication = {
//                     id: Date.now(),
//                     name: document.getElementById('medication-name').value,
//                     brand: document.getElementById('medication-brand').value,
//                     dose: document.getElementById('medication-dose').value,
//                     purpose: document.getElementById('medication-purpose').value,
//                     instructions: document.getElementById('medication-instructions').value,
//                     expiration: document.getElementById('medication-expiration').value,
//                     quantity: document.getElementById('medication-quantity').value,
//                     image: document.getElementById('preview-image').src || ''
//                 };

//                 // 检查是否是编辑模式
//                 const editIndex = this.dataset.editIndex;
//                 if (editIndex !== undefined) {
//                     // 更新现有药品
//                     const meds = getMedications();
//                     meds[editIndex] = { ...meds[editIndex], ...medication };
//                     localStorage.setItem('medications', JSON.stringify(meds));
//                     showToast('药品更新成功！');
//                 } else {
//                     // 添加新药品
//                     saveMedication(medication);
//                     showToast('药品添加成功！');
//                 }

//                 closeMedicationModal();
//                 renderMedicationTable();
//             });
//         }

//         // 表单提交 - 添加服药计划
//         const addScheduleForm = document.getElementById('add-schedule-form');
//         if (addScheduleForm) {
//             addScheduleForm.addEventListener('submit', function (e) {
//                 e.preventDefault();

//                 const schedule = {
//                     id: Date.now(),
//                     medicationId: document.getElementById('schedule-medication').value,
//                     dose: document.getElementById('schedule-dose').value,
//                     time: document.getElementById('schedule-time').value,
//                     recurrence: document.getElementById('schedule-recurrence').value,
//                     notes: document.getElementById('schedule-notes').value,
//                     soundAlert: document.getElementById('sound-alert')?.checked,
//                     vibrateAlert: document.getElementById('vibrate-alert')?.checked,
//                     reminderBefore: document.getElementById('reminder-before').value
//                 };

//                 saveSchedule(schedule);
//                 closeScheduleModal();
//                 showToast('服药计划添加成功！');
//             });
//         }

//         // 图片上传处理
//         const imageUploadArea = document.getElementById('image-upload-area');
//         const imageUpload = document.getElementById('image-upload');
//         const previewImage = document.getElementById('preview-image');
//         const imagePreview = document.getElementById('image-preview');
//         const removeImage = document.getElementById('remove-image');

//         if (imageUploadArea && imageUpload) {
//             imageUploadArea.addEventListener('click', function () {
//                 imageUpload.click();
//             });
//         }

//         if (imageUpload && previewImage && imagePreview && imageUploadArea) {
//             imageUpload.addEventListener('change', function () {
//                 if (this.files && this.files[0]) {
//                     const reader = new FileReader();

//                     reader.onload = function (e) {
//                         previewImage.src = e.target.result;
//                         imagePreview.classList.remove('hidden');
//                         imageUploadArea.classList.add('hidden');
//                     }

//                     reader.readAsDataURL(this.files[0]);
//                 }
//             });
//         }

//         if (removeImage && imagePreview && imageUploadArea && imageUpload && previewImage) {
//             removeImage.addEventListener('click', function () {
//                 imagePreview.classList.add('hidden');
//                 imageUploadArea.classList.remove('hidden');
//                 imageUpload.value = '';
//                 previewImage.src = '';
//             });
//         }

//         // 切换自定义周期
//         const scheduleRecurrence = document.getElementById('schedule-recurrence');
//         const customRecurrence = document.getElementById('custom-recurrence');
//         if (scheduleRecurrence && customRecurrence) {
//             scheduleRecurrence.addEventListener('change', function () {
//                 if (this.value === 'custom') {
//                     customRecurrence.classList.remove('hidden');
//                 } else {
//                     customRecurrence.classList.add('hidden');
//                 }
//             });
//         }

//         // 服药提醒操作
//         const closeReminder = document.getElementById('close-reminder');
//         const snoozeMedication = document.getElementById('snooze-medication');
//         const takeMedication = document.getElementById('take-medication');
//         const medicationReminder = document.getElementById('medication-reminder');

//         if (closeReminder && medicationReminder) {
//             closeReminder.addEventListener('click', function () {
//                 medicationReminder.classList.add('translate-y-20', 'opacity-0');
//             });
//         }

//         if (snoozeMedication && medicationReminder) {
//             snoozeMedication.addEventListener('click', function () {
//                 medicationReminder.classList.add('translate-y-20', 'opacity-0');
//                 showToast('已推迟15分钟提醒');
//                 setTimeout(() => {
//                     medicationReminder.classList.remove('translate-y-20', 'opacity-0');
//                 }, 15 * 60 * 1000); // 15分钟后再次提醒
//             });
//         }

//         if (takeMedication && medicationReminder) {
//             takeMedication.addEventListener('click', function () {
//                 medicationReminder.classList.add('translate-y-20', 'opacity-0');
//                 showToast('已记录服药');
//             });
//         }

//         // 自动提醒检查
//         setInterval(checkReminders, 60 * 1000);
        
//         console.log('初始化完成');
//     } catch (error) {
//         console.error('初始化失败:', error);
//     }

// });

// 获取当前日期并显示在页面上
function updateCurrentDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const currentDate = new Date().toLocaleDateString('zh-CN', options);
    const element = document.getElementById('current-date');
    if (element) element.textContent = currentDate;
}

// 获取药品列表
function getMedications() {
    return JSON.parse(localStorage.getItem('medications')) || [];
}

//保存药品数据
function handleAddMedication() {
    const name = document.getElementById('medication-name').value;
    const brand = document.getElementById('medication-brand').value;
    const dose = document.getElementById('medication-dose').value;
    const purpose = document.getElementById('medication-purpose').value;
    const expiration = document.getElementById('medication-expiration').value;
    const quantity = document.getElementById('medication-quantity').value;
    const image = document.getElementById('preview-image').src;

    const med = {
        name,
        brand,
        dose,
        purpose,
        expiration,
        quantity,
        image
    };

    saveMedication(med);
    renderMedicationTable();
    closeMedicationModal();
    showToast('药品添加成功！');
}
// 保存药品到 localStorage
function saveMedication(med) {
    const meds = getMedications();
    meds.push(med);
    localStorage.setItem('medications', JSON.stringify(meds));
}

// 渲染药品表格
function renderMedicationTable(page = 1, pageSize = 5) {
    const medications = getMedications();
    const tbody = document.querySelector('#medication-table-body');
    if (!tbody) {
        console.error('找不到药品表格元素 #medication-table-body');
        return;
    }

    tbody.innerHTML = '';

    // 分页处理
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedItems = medications.slice(start, end);

    paginatedItems.forEach((med, index) => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50 transition-colors";
        tr.dataset.index = start + index; // 真实索引用于编辑/删除
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    ${med.image ? `<img src="${med.image}" alt="" class="w-10 h-10 rounded-lg mr-3">` : '<div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3"><i class="fa-solid fa-pill text-primary"></i></div>'}
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
                <button class="text-primary hover:text-primary/80 mr-3 edit-btn"><i class="fa-solid fa-pencil"></i></button>
                <button class="text-danger hover:text-danger/80 delete-btn"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    updatePaginationControls(page, Math.ceil(medications.length / pageSize));
}

// 更新分页控件
function updatePaginationControls(currentPage, totalPages) {
    const paginationNav = document.querySelector('.pagination-nav');
    if (!paginationNav) return;

    paginationNav.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50';
        if (i === currentPage) {
            a.classList.add('bg-primary', 'text-white');
        }
        a.textContent = i;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            renderMedicationTable(i);
        });
        paginationNav.appendChild(a);
    }
}

// 删除药品
function deleteMedication(index) {
    if (confirm('确定要删除该药品吗？')) {
        const meds = getMedications();
        meds.splice(index, 1);
        localStorage.setItem('medications', JSON.stringify(meds));
        renderMedicationTable();
        showToast('药品已删除');
    }
}

// 编辑药品
function editMedication(index) {
    const meds = getMedications();
    const med = meds[index];
    if (!med) return;

    // 填充表单
    document.getElementById('medication-name').value = med.name || '';
    document.getElementById('medication-brand').value = med.brand || '';
    document.getElementById('medication-dose').value = med.dose || '';
    document.getElementById('medication-purpose').value = med.purpose || '';
    document.getElementById('medication-instructions').value = med.instructions || '';
    document.getElementById('medication-expiration').value = med.expiration || '';
    document.getElementById('medication-quantity').value = med.quantity || '';

    // 处理图片
    const imagePreview = document.getElementById('image-preview');
    const imageUploadArea = document.getElementById('image-upload-area');
    const previewImage = document.getElementById('preview-image');

    if (med.image) {
        previewImage.src = med.image;
        imagePreview.classList.remove('hidden');
        imageUploadArea.classList.add('hidden');
    }

    // 存储当前编辑的索引
    document.getElementById('add-medication-form').dataset.editIndex = index;

    openMedicationModal();
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

function searchMedications() {
    const searchInput = document.getElementById('search-medication');
    const keyword = searchInput.value.toLowerCase();
    const medications = getMedications();
    const filteredMedications = medications.filter(med => {
        return med.name.toLowerCase().includes(keyword) || (med.brand && med.brand.toLowerCase().includes(keyword));
    });

    const tbody = document.querySelector('#medication-table-body');
    if (!tbody) {
        console.error('找不到药品表格元素 #medication-table-body');
        return;
    }
    
    tbody.innerHTML = '';

    filteredMedications.forEach((med, index) => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50 transition-colors";
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    ${med.image ? `<img src="${med.image}" alt="" class="w-10 h-10 rounded-lg mr-3">` : '<div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3"><i class="fa-solid fa-pill text-primary"></i></div>'}
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
                <button class="text-primary hover:text-primary/80 mr-3" onclick="editMedication(${index})"><i class="fa-solid fa-pencil"></i></button>
                <button class="text-danger hover:text-danger/80" onclick="deleteMedication(${index})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
// 初始化图表
function initCharts() {
    try {
        const complianceCtx = document.getElementById('complianceChart');
        const distributionCtx = document.getElementById('medicationDistributionChart');

        if (!complianceCtx || !distributionCtx) {
            console.warn('图表元素不存在，跳过图表初始化');
            return;
        }

        // 服药依从性图表
        new Chart(complianceCtx.getContext('2d'), {
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
        new Chart(distributionCtx.getContext('2d'), {
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
    } catch (error) {
        console.error('初始化图表失败:', error);
    }
}

// 显示提醒弹窗
function showReminder(schedule) {
    const med = getMedications().find(m => m.id == schedule.medicationId);
    const reminder = document.getElementById('medication-reminder');
    if (!reminder) return;

    const nameElement = reminder.querySelector('.text-primary');
    const doseElement = reminder.querySelector('.mt-1');

    if (nameElement) nameElement.textContent = med?.name || '';
    if (doseElement) doseElement.textContent = `剂量：${schedule.dose} · ${schedule.notes || ''}`;

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

// 模态框控制函数
function openMedicationModal() {
    const modal = document.getElementById('add-medication-modal');
    if (!modal) return;

    modal.classList.remove('opacity-0', 'pointer-events-none');
    const modalContent = modal.querySelector('.bg-white');
    if (modalContent) {
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }
}

function closeMedicationModal() {
    const modal = document.getElementById('add-medication-modal');
    if (!modal) return;

    modal.classList.add('opacity-0', 'pointer-events-none');
    const modalContent = modal.querySelector('.bg-white');
    if (modalContent) {
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
    }

    // 重置表单
    const form = document.getElementById('add-medication-form');
    if (form) {
        form.reset();
        delete form.dataset.editIndex;
    }

    // 重置图片预览
    const imagePreview = document.getElementById('image-preview');
    const imageUploadArea = document.getElementById('image-upload-area');
    if (imagePreview && imageUploadArea) {
        imagePreview.classList.add('hidden');
        imageUploadArea.classList.remove('hidden');
    }
}

function openScheduleModal() {
    const modal = document.getElementById('add-schedule-modal');
    if (!modal) return;

    modal.classList.remove('opacity-0', 'pointer-events-none');
    const modalContent = modal.querySelector('.bg-white');
    if (modalContent) {
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }
}

function closeScheduleModal() {
    const modal = document.getElementById('add-schedule-modal');
    if (!modal) return;

    modal.classList.add('opacity-0', 'pointer-events-none');
    const modalContent = modal.querySelector('.bg-white');
    if (modalContent) {
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
    }
}

// 页面加载后执行初始化逻辑
document.addEventListener('DOMContentLoaded', function () {
    try {
        updateCurrentDate();
        renderMedicationTable();

        // 延迟初始化图表
        setTimeout(() => {
            initCharts();
        }, 100);

        // 绑定模态框控制事件
        const addMedicationBtn = document.getElementById('add-medication-btn');
        const addMedicationBtn2 = document.getElementById('add-medication-btn-2');
        const closeMedicationModalBtn = document.getElementById('close-medication-modal');
        const cancelAddMedicationBtn = document.getElementById('cancel-add-medication');

        if (addMedicationBtn) addMedicationBtn.addEventListener('click', openMedicationModal);
        if (addMedicationBtn2) addMedicationBtn2.addEventListener('click', openMedicationModal);
        if (closeMedicationModalBtn) closeMedicationModalBtn.addEventListener('click', closeMedicationModal);
        if (cancelAddMedicationBtn) cancelAddMedicationBtn.addEventListener('click', closeMedicationModal);

        const addScheduleBtn = document.getElementById('add-schedule-btn');
        const closeScheduleModalBtn = document.getElementById('close-schedule-modal');
        const cancelAddScheduleBtn = document.getElementById('cancel-add-schedule');

        if (addScheduleBtn) addScheduleBtn.addEventListener('click', openScheduleModal);
        if (closeScheduleModalBtn) closeScheduleModalBtn.addEventListener('click', closeScheduleModal);
        if (cancelAddScheduleBtn) cancelAddScheduleBtn.addEventListener('click', closeScheduleModal);

        // 表单提交 - 添加药品
        const addMedicationForm = document.getElementById('add-medication-form');
        if (addMedicationForm) {
            addMedicationForm.addEventListener('submit', function (e) {
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
                    image: document.getElementById('preview-image')?.src || ''
                };

                // 检查是否是编辑模式
                const editIndex = this.dataset.editIndex;
                if (editIndex !== undefined) {
                    const meds = getMedications();
                    meds[editIndex] = { ...meds[editIndex], ...medication };
                    localStorage.setItem('medications', JSON.stringify(meds));
                    showToast('药品更新成功！');
                } else {
                    saveMedication(medication);
                    showToast('药品添加成功！');
                }

                closeMedicationModal();
                renderMedicationTable();
            });
        }

        // 表单提交 - 添加服药计划
        const addScheduleForm = document.getElementById('add-schedule-form');
        if (addScheduleForm) {
            addScheduleForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const schedule = {
                    id: Date.now(),
                    medicationId: document.getElementById('schedule-medication').value,
                    dose: document.getElementById('schedule-dose').value,
                    time: document.getElementById('schedule-time').value,
                    recurrence: document.getElementById('schedule-recurrence').value,
                    notes: document.getElementById('schedule-notes').value,
                    soundAlert: document.getElementById('sound-alert')?.checked,
                    vibrateAlert: document.getElementById('vibrate-alert')?.checked,
                    reminderBefore: document.getElementById('reminder-before').value
                };

                saveSchedule(schedule);
                closeScheduleModal();
                showToast('服药计划添加成功！');
            });
        }

        // 图片上传处理
        const imageUploadArea = document.getElementById('image-upload-area');
        const imageUpload = document.getElementById('image-upload');
        const previewImage = document.getElementById('preview-image');
        const imagePreview = document.getElementById('image-preview');
        const removeImage = document.getElementById('remove-image');

        if (imageUploadArea && imageUpload) {
            imageUploadArea.addEventListener('click', function () {
                imageUpload.click();
            });
        }

        if (imageUpload && previewImage && imagePreview && imageUploadArea) {
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
        }

        if (removeImage && imagePreview && imageUploadArea && imageUpload && previewImage) {
            removeImage.addEventListener('click', function () {
                imagePreview.classList.add('hidden');
                imageUploadArea.classList.remove('hidden');
                imageUpload.value = '';
                previewImage.src = '';
            });
        }

        // 切换自定义周期
        const scheduleRecurrence = document.getElementById('schedule-recurrence');
        const customRecurrence = document.getElementById('custom-recurrence');
        if (scheduleRecurrence && customRecurrence) {
            scheduleRecurrence.addEventListener('change', function () {
                if (this.value === 'custom') {
                    customRecurrence.classList.remove('hidden');
                } else {
                    customRecurrence.classList.add('hidden');
                }
            });
        }

        // 服药提醒操作
        const closeReminder = document.getElementById('close-reminder');
        const snoozeMedication = document.getElementById('snooze-medication');
        const takeMedication = document.getElementById('take-medication');
        const medicationReminder = document.getElementById('medication-reminder');

        if (closeReminder && medicationReminder) {
            closeReminder.addEventListener('click', function () {
                medicationReminder.classList.add('translate-y-20', 'opacity-0');
            });
        }

        if (snoozeMedication && medicationReminder) {
            snoozeMedication.addEventListener('click', function () {
                medicationReminder.classList.add('translate-y-20', 'opacity-0');
                showToast('已推迟15分钟提醒');
                setTimeout(() => {
                    medicationReminder.classList.remove('translate-y-20', 'opacity-0');
                }, 15 * 60 * 1000);
            });
        }

        if (takeMedication && medicationReminder) {
            takeMedication.addEventListener('click', function () {
                medicationReminder.classList.add('translate-y-20', 'opacity-0');
                showToast('已记录服药');
            });
        }

        // 自动提醒检查
        setInterval(checkReminders, 60 * 1000);

        // 搜索功能
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                searchMedications(this.value);
            });
        }

        // 事件委托处理编辑和删除
        document.querySelector('#medication-table-body').addEventListener('click', function (e) {
            const target = e.target.closest('.delete-btn');
            const editTarget = e.target.closest('.edit-btn');
            if (target) {
                const index = parseInt(target.closest('tr').dataset.index, 10);
                deleteMedication(index);
            }
            if (editTarget) {
                const index = parseInt(editTarget.closest('tr').dataset.index, 10);
                editMedication(index);
            }
        });

        // 切换日期重新渲染图表
        const dateRangeSelect = document.querySelector('select[name="date-range"]');
        if (dateRangeSelect) {
            dateRangeSelect.addEventListener('change', function () {
                updateCharts(dateRangeSelect.value);
            });
        }

        // 消息中心
        const notificationBtn = document.getElementById('notification-btn');
        const notificationsModal = document.getElementById('notifications-modal');
        if (notificationBtn && notificationsModal) {
            notificationBtn.addEventListener('click', () => {
                notificationsModal.classList.remove('opacity-0', 'pointer-events-none');
                const list = document.getElementById('notifications-list');
                list.innerHTML = `
                    <li class="p-3 bg-gray-50 rounded-lg">您有新的服药提醒，请及时查看。</li>
                    <li class="p-3 bg-gray-50 rounded-lg">药品「阿司匹林」即将过期，请注意处理。</li>
                `;
            });
        }

        const closeNotificationsBtn = document.getElementById('close-notifications');
        if (closeNotificationsBtn) {
            closeNotificationsBtn.addEventListener('click', () => {
                notificationsModal.classList.add('opacity-0', 'pointer-events-none');
            });
        }

        console.log('初始化完成');
    } catch (error) {
        console.error('初始化失败:', error);
    }
});

// 搜索药品
function searchMedications(keyword) {
    const medications = getMedications();
    const filtered = medications.filter(med =>
        med.name.toLowerCase().includes(keyword.toLowerCase()) ||
        (med.brand && med.brand.toLowerCase().includes(keyword.toLowerCase()))
    );
    renderFilteredMedicationTable(filtered);
}

// 渲染过滤后的药品表格
function renderFilteredMedicationTable(filtered) {
    const tbody = document.querySelector('#medication-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    filtered.forEach((med, index) => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50 transition-colors";
        tr.dataset.index = index;
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    ${med.image ? `<img src="${med.image}" alt="" class="w-10 h-10 rounded-lg mr-3">` : '<div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3"><i class="fa-solid fa-pill text-primary"></i></div>'}
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
                <button class="text-primary hover:text-primary/80 mr-3 edit-btn"><i class="fa-solid fa-pencil"></i></button>
                <button class="text-danger hover:text-danger/80 delete-btn"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 关闭消息中心
function closeNotifications() {
    const notificationsModal = document.getElementById('notifications-modal');
    if (notificationsModal) {
        notificationsModal.classList.add('opacity-0', 'pointer-events-none');
    }
}
