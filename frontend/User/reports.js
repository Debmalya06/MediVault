// DOM Elements
const uploadBtn = document.getElementById('uploadReportBtn');
const uploadModal = document.getElementById('uploadModal');
const closeModal = document.querySelector('.close-modal');
const cancelUpload = document.getElementById('cancelUpload');
const uploadForm = document.getElementById('uploadForm');
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('reportFile');
const filePreview = document.getElementById('filePreview');
const searchInput = document.querySelector('.search-input');
const filterSelect = document.querySelector('.filter-select');

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Modal Functions
function openModal() {
    uploadModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    uploadModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetForm();
}

// Event Listeners
uploadBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFunc);
cancelUpload.addEventListener('click', closeModalFunc);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === uploadModal) {
        closeModalFunc();
    }
});

// File Upload Handling
fileInput.addEventListener('change', handleFileSelect);

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    const primaryLight = getComputedStyle(document.documentElement).getPropertyValue('--primary-light');
    dropArea.style.borderColor = primaryColor;
    dropArea.style.backgroundColor = primaryLight;
}

function unhighlight() {
    dropArea.style.borderColor = '';
    dropArea.style.backgroundColor = '';
}

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    fileInput.files = files;
    handleFileSelect();
}

function handleFileSelect() {
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('File size exceeds 10MB limit. Please choose a smaller file.');
            fileInput.value = '';
            return;
        }
        
        // Check file type
        const acceptedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!acceptedTypes.includes(file.type)) {
            alert('Invalid file type. Please upload PDF, JPG, JPEG, or PNG files only.');
            fileInput.value = '';
            return;
        }
        
        // Display file preview
        showFilePreview(file);
    }
}

function showFilePreview(file) {
    filePreview.innerHTML = '';
    filePreview.classList.add('active');
    
    const previewItem = document.createElement('div');
    previewItem.className = 'preview-item';
    
    // Choose icon based on file type
    let iconClass = 'fa-file';
    if (file.type === 'application/pdf') {
        iconClass = 'fa-file-pdf';
    } else if (file.type.startsWith('image/')) {
        iconClass = 'fa-file-image';
    }
    
    // Format file size
    const fileSize = formatFileSize(file.size);
    
    previewItem.innerHTML = `
        <i class="fas ${iconClass} preview-item-icon"></i>
        <span class="preview-item-name">${file.name}</span>
        <span class="preview-item-size">${fileSize}</span>
        <i class="fas fa-times preview-item-remove"></i>
    `;
    
    filePreview.appendChild(previewItem);
    
    // Add event listener to remove button
    const removeBtn = previewItem.querySelector('.preview-item-remove');
    removeBtn.addEventListener('click', () => {
        fileInput.value = '';
        filePreview.innerHTML = '';
        filePreview.classList.remove('active');
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Form submission
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('reportName', document.getElementById('reportName').value);
    formData.append('reportType', document.getElementById('reportType').value);
    formData.append('reportDate', document.getElementById('reportDate').value);
    formData.append('doctorName', document.getElementById('doctorName').value);
    formData.append('reportNotes', document.getElementById('reportNotes').value);
    formData.append('userEmail', localStorage.getItem('userEmail')); // Retrieve user email from local storage

    try {
        const response = await fetch('http://localhost:8081/api/reports/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            alert('Report uploaded successfully');
            fetchReports(); // Refresh the reports table
            closeModalFunc();
        } else {
            alert('Failed to upload report');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while uploading the report');
    }
});

async function fetchReports() {
    try {
        const response = await fetch(`http://localhost:8081/api/reports?userEmail=${localStorage.getItem('userEmail')}`);
        const reports = await response.json();

        const reportsTableBody = document.querySelector('.reports-table tbody');
        reportsTableBody.innerHTML = '';

        reports.forEach(report => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="report-name">
                        <i class="fas fa-file-medical report-icon"></i>
                        <span>${report.reportName}</span>
                    </div>
                </td>
                <td>${report.reportType}</td>
                <td>${report.reportDate}</td>
                <td>${report.doctorName}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn delete-btn" title="Delete Report" data-id="${report.id}"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            `;
            reportsTableBody.appendChild(row);
        });

        // Update total reports count
        const totalReports = reports.length;
        document.querySelector('.summary-card:nth-child(1) .summary-count').textContent = totalReports;

    } catch (error) {
        console.error('Error fetching reports:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchReports);

function resetForm() {
    uploadForm.reset();
    filePreview.innerHTML = '';
    filePreview.classList.remove('active');
}

// Add event listeners to action buttons
document.addEventListener('click', async (e) => {
    // Delete button
    if (e.target.closest('.delete-btn')) {
        if (confirm('Are you sure you want to delete this report?')) {
            const row = e.target.closest('tr');
            const reportId = e.target.closest('.delete-btn').getAttribute('data-id');

            try {
                const response = await fetch(`http://localhost:8081/api/reports/${reportId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    alert('Report deleted successfully');
                    row.remove();
                } else {
                    alert('Failed to delete report');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while deleting the report');
            }
        }
    }
});

// Search and Filter Functionality
searchInput.addEventListener('input', filterReports);
filterSelect.addEventListener('change', filterReports);

function filterReports() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;
    const rows = document.querySelectorAll('.reports-table tbody tr');

    rows.forEach(row => {
        const reportName = row.querySelector('.report-name span').textContent.toLowerCase();
        const reportType = row.querySelector('td:nth-child(2)').textContent.toLowerCase();

        const matchesSearch = reportName.includes(searchTerm);
        const matchesFilter = filterValue === 'all' || reportType === filterValue;

        if (matchesSearch && matchesFilter) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}