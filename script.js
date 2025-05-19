// 获取药品列表
async function getMedications() {
    try {
        const response = await fetch('http://localhost:3000/api/medications');
        const medications = await response.json();

        const medicationTableBody = document.querySelector('#medication-table-body');
        medicationTableBody.innerHTML = '';

        medications.forEach(medication => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                            <i class="fa-solid fa-pill text-primary"></i>
                        </div>
                        <div>
                            <div class="font-medium text-gray-900">${medication.name}</div>
                            <div class="text-sm text-gray-500">${medication.brand}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${medication.dose}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${medication.purpose}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${medication.expiration_date}</div>
                    <!-- 这里可以根据过期时间计算剩余天数 -->
                    <div class="text-xs text-success">剩余 ... 天</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">正常</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button class="text-primary hover:text-primary/80 mr-3" onclick="editMedication(${medication.id})">
                        <i class="fa-solid fa-pencil"></i>
                    </button>
                    <button class="text-danger hover:text-danger/80" onclick="deleteMedication(${medication.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            medicationTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('获取药品列表失败:', error);
    }
}

// 添加药品
async function addMedication() {
    const name = prompt('请输入药品名称');
    const brand = prompt('请输入药品品牌');
    const dose = prompt('请输入药品剂量');
    const purpose = prompt('请输入药品用途');
    const expiration_date = prompt('请输入药品保质期（YYYY-MM-DD）');
    const quantity = prompt('请输入药品数量');
    const image_url = prompt('请输入药品图片链接');

    const medicationData = {
        name,
        brand,
        dose,
        purpose,
        expiration_date,
        quantity,
        image_url
    };

    try {
        const response = await fetch('http://localhost:3000/api/medications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicationData)
        });

        if (response.ok) {
            alert('药品添加成功');
            getMedications(); // 刷新药品列表
        } else {
            const errorData = await response.json();
            alert('药品添加失败: ' + errorData.message);
        }
    } catch (error) {
        console.error('添加药品失败:', error);
        alert('药品添加失败: 网络错误');
    }
}

// 更新药品
async function editMedication(id) {
    const medication = await getMedicationById(id);

    const name = prompt('请输入新的药品名称', medication.name);
    const brand = prompt('请输入新的药品品牌', medication.brand);
    const dose = prompt('请输入新的药品剂量', medication.dose);
    const purpose = prompt('请输入新的药品用途', medication.purpose);
    const expiration_date = prompt('请输入新的药品保质期（YYYY-MM-DD）', medication.expiration_date);
    const quantity = prompt('请输入新的药品数量', medication.quantity);
    const image_url = prompt('请输入新的药品图片链接', medication.image_url);

    const updatedMedicationData = {
        name,
        brand,
        dose,
        purpose,
        expiration_date,
        quantity,
        image_url
    };

    try {
        const response = await fetch(`http://localhost:3000/api/medications/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedMedicationData)
        });

        if (response.ok) {
            alert('药品更新成功');
            getMedications(); // 刷新药品列表
        } else {
            const errorData = await response.json();
            alert('药品更新失败: ' + errorData.message);
        }
    } catch (error) {
        console.error('更新药品失败:', error);
        alert('药品更新失败: 网络错误');
    }
}

async function getMedicationById(id) {
    const response = await fetch(`http://localhost:3000/api/medications/${id}`);
    return await response.json();
}

// 删除药品
async function deleteMedication(id) {
    if (confirm('确定要删除该药品吗？')) {
        try {
            const response = await fetch(`http://localhost:3000/api/medications/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('药品删除成功');
                getMedications(); // 刷新药品列表
            } else {
                const errorData = await response.json();
                alert('药品删除失败: ' + errorData.message);
            }
        } catch (error) {
            console.error('删除药品失败:', error);
            alert('药品删除失败: 网络错误');
        }
    }
}

// 添加服药计划
async function addSchedule() {
    const medication_id = prompt('请输入药品 ID');
    const dose = prompt('请输入服药剂量');
    const time = prompt('请输入服药时间（HH:MM）');
    const recurrence = prompt('请输入服药频率');
    const notes = prompt('请输入备注');
    const sound_alert = confirm('是否开启声音提醒？');
    const vibrate_alert = confirm('是否开启震动提醒？');
    const reminder_before = prompt('请输入提前提醒的分钟数', 5);

    const scheduleData = {
        medication_id,
        dose,
        time,
        recurrence,
        notes,
        sound_alert,
        vibrate_alert,
        reminder_before
    };

    try {
        const response = await fetch('http://localhost:3000/api/schedules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scheduleData)
        });

        if (response.ok) {
            alert('服药计划添加成功');
        } else {
            const errorData = await response.json();
            alert('服药计划添加失败: ' + errorData.message);
        }
    } catch (error) {
        console.error('添加服药计划失败:', error);
        alert('服药计划添加失败: 网络错误');
    }
}

// 更新服药计划状态
async function updateScheduleStatus(id, is_taken) {
    try {
        const response = await fetch(`http://localhost:3000/api/schedules/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ is_taken })
        });

        if (response.ok) {
            alert('服药状态更新成功');
        } else {
            const errorData = await response.json();
            alert('服药状态更新失败: ' + errorData.message);
        }
    } catch (error) {
        console.error('更新服药状态失败:', error);
        alert('更新服药状态失败: 网络错误');
    }
}

// 更新仪表盘统计数据
async function updateDashboardStats() {
    try {
        // 获取总药品数
        const medicationsResponse = await fetch('http://localhost:3000/api/medications');
        const medications = await medicationsResponse.json();
        const totalMedications = medications.length;

        // 这里可以添加获取今日服药数、即将过期药品数和服药依从性的逻辑

        // 更新页面上的统计数据
        const totalMedicationsElement = document.querySelector('#total-medications');
        totalMedicationsElement.textContent = totalMedications;

        // 更新其他统计数据的代码类似
    } catch (error) {
        console.error('更新仪表盘统计数据失败:', error);
    }
}

// 页面加载完成后调用相关函数
window.addEventListener('load', () => {
    getMedications();
    updateDashboardStats();

    // 为添加药品按钮添加点击事件监听器
    const addMedicationBtn = document.getElementById('add-medication-btn');
    addMedicationBtn.addEventListener('click', addMedication);

    const addMedicationBtn2 = document.getElementById('add-medication-btn-2');
    addMedicationBtn2.addEventListener('click', addMedication);

    // 为添加服药计划按钮添加点击事件监听器
    const addScheduleBtn = document.getElementById('add-schedule-btn');
    addScheduleBtn.addEventListener('click', addSchedule);
});