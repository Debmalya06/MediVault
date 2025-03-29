// DOM Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const addDoctorBtn = document.getElementById('addDoctorBtn');
const addDoctorModal = document.getElementById('addDoctorModal');
const doctorForm = document.getElementById('doctorForm');
const cancelDoctorBtn = document.getElementById('cancelDoctorBtn');
const closeModalBtns = document.querySelectorAll('.close-modal');
const viewAppointmentModal = document.getElementById('viewAppointmentModal');
const closeAppointmentDetails = document.getElementById('closeAppointmentDetails');
const uploadReportModal = document.getElementById('uploadReportModal');
const reportUploadForm = document.getElementById('reportUploadForm');
const cancelReportUpload = document.getElementById('cancelReportUpload');
const appointmentStatusFilter = document.getElementById('appointmentStatusFilter');
const appointmentDateFilter = document.getElementById('appointmentDateFilter');
const reportTypeFilter = document.getElementById('reportTypeFilter');
const editDoctorBtns = document.querySelectorAll('.edit-doctor');
const deleteDoctorBtns = document.querySelectorAll('.delete-doctor');
const viewAppointmentBtns = document.querySelectorAll('.view-appointment');
const approveAppointmentBtns = document.querySelectorAll('.approve-appointment');
const cancelAppointmentBtns = document.querySelectorAll('.cancel-appointment');
const completeAppointmentBtns = document.querySelectorAll('.complete-appointment');
const uploadReportBtns = document.querySelectorAll('.upload-report');
const viewReportBtns = document.querySelectorAll('.view-report');
const downloadReportBtns = document.querySelectorAll('.download-report');
const deleteReportBtns = document.querySelectorAll('.delete-report');

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Tab functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all tabs
        tabBtns.forEach(tab => tab.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Show corresponding tab content
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Modal functions
function openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        closeModal(modal);
    });
}

// Add Doctor Modal
addDoctorBtn.addEventListener('click', function() {
    openModal(addDoctorModal);
});

cancelDoctorBtn.addEventListener('click', function() {
    closeModal(addDoctorModal);
    doctorForm.reset();
});

// Close modals with X button
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        closeAllModals();
    });
});

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeAllModals();
    }
});

// Doctor Form Submission
doctorForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const doctorName = document.getElementById('doctorName').value;
    const doctorSpecialization = document.getElementById('doctorSpecialization').value;
    const doctorEmail = document.getElementById('doctorEmail').value;
    const doctorPhone = document.getElementById('doctorPhone').value;
    const doctorQualification = document.getElementById('doctorQualification').value;
    const doctorExperience = document.getElementById('doctorExperience').value;
    
    // Get availability
    const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]:checked');
    const availability = Array.from(availabilityCheckboxes).map(checkbox => checkbox.value);
    
    // Get time slots
    const startTime = document.getElementById('doctorStartTime').value;
    const endTime = document.getElementById('doctorEndTime').value;
    
    // Here you would normally send this data to your server
    // For demo purposes, we'll just show a success message and close the modal
    alert(`Doctor ${doctorName} added successfully!`);
    
    // Reset form and close modal
    doctorForm.reset();
    closeModal(addDoctorModal);
    
    // Refresh the doctor list (in a real app, you would fetch from server)
    // For demo, we'll just reload the page
    // window.location.reload();
    
    // Instead of reloading, let's add the new doctor to the table
    addDoctorToTable({
        id: 'DOC' + (Math.floor(Math.random() * 1000)).toString().padStart(3, '0'),
        name: doctorName,
        specialization: document.getElementById('doctorSpecialization').options[document.getElementById('doctorSpecialization').selectedIndex].text,
        email: doctorEmail,
        phone: doctorPhone,
        availability: availability
    });
});

// Function to add a new doctor to the table
function addDoctorToTable(doctor) {
    const doctorList = document.querySelector('.doctor-list tbody');
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${doctor.id}</td>
        <td>
            <div class="user-info">
                <img src="/placeholder.svg?height=40&width=40" alt="${doctor.name}">
                <div>
                    <p class="user-name">${doctor.name}</p>
                    <p class="user-email">${doctor.email}</p>
                </div>
            </div>
        </td>
        <td>${doctor.specialization}</td>
        <td>${doctor.phone}</td>
        <td>
            <div class="availability-days">
                <span class="day-badge ${doctor.availability.includes('sunday') ? 'active' : ''}">Sun</span>
                <span class="day-badge ${doctor.availability.includes('monday') ? 'active' : ''}">Mon</span>
                <span class="day-badge ${doctor.availability.includes('tuesday') ? 'active' : ''}">Tue</span>
                <span class="day-badge ${doctor.availability.includes('wednesday') ? 'active' : ''}">Wed</span>
                <span class="day-badge ${doctor.availability.includes('thursday') ? 'active' : ''}">Thu</span>
                <span class="day-badge ${doctor.availability.includes('friday') ? 'active' : ''}">Fri</span>
                <span class="day-badge ${doctor.availability.includes('saturday') ? 'active' : ''}">Sat</span>
            </div>
        </td>
        <td><span class="status-badge active">Active</span></td>
        <td>
            <div class="action-buttons">
                <button class="btn icon-btn edit-doctor" data-id="${doctor.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn icon-btn delete-doctor" data-id="${doctor.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    doctorList.appendChild(newRow);
    
    // Add event listeners to the new buttons
    newRow.querySelector('.edit-doctor').addEventListener('click', handleEditDoctor);
    newRow.querySelector('.delete-doctor').addEventListener('click', handleDeleteDoctor);
}

// View Appointment Modal
function handleViewAppointment() {
    const appointmentId = this.getAttribute('data-id');
    
    // In a real app, you would fetch appointment details from the server
    // For demo, we'll use hardcoded data
    let appointmentData;
    
    if (appointmentId === 'APT001') {
        appointmentData = {
            id: 'APT001',
            patient: 'John Doe',
            doctor: 'Dr. Michael Chen',
            dateTime: 'Mar 20, 2025, 10:30 AM',
            type: 'General Checkup',
            status: 'pending',
            contact: 'john.doe@example.com | +1 (555) 123-4567',
            reason: 'Regular health checkup and follow-up on previous medication.'
        };
    } else if (appointmentId === 'APT002') {
        appointmentData = {
            id: 'APT002',
            patient: 'Jane Smith',
            doctor: 'Dr. Sarah Johnson',
            dateTime: 'Mar 22, 2025, 2:15 PM',
            type: 'Cardiology Consultation',
            status: 'confirmed',
            contact: 'jane.smith@example.com | +1 (555) 987-6543',
            reason: 'Chest pain and shortness of breath during physical activity.'
        };
    } else if (appointmentId === 'APT003') {
        appointmentData = {
            id: 'APT003',
            patient: 'Robert Johnson',
            doctor: 'Dr. Michael Chen',
            dateTime: 'Mar 18, 2025, 9:00 AM',
            type: 'Follow-up Visit',
            status: 'completed',
            contact: 'robert.johnson@example.com | +1 (555) 456-7890',
            reason: 'Follow-up on blood test results and medication adjustment.'
        };
    } else {
        appointmentData = {
            id: appointmentId,
            patient: 'Emily Davis',
            doctor: 'Dr. James Wilson',
            dateTime: 'Mar 15, 2025, 11:45 AM',
            type: 'Neurology Consultation',
            status: 'cancelled',
            contact: 'emily.davis@example.com | +1 (555) 234-5678',
            reason: 'Recurring headaches and dizziness for the past two weeks.'
        };
    }
    
    // Populate modal with appointment data
    document.getElementById('viewAppointmentId').textContent = appointmentData.id;
    document.getElementById('viewPatientName').textContent = appointmentData.patient;
    document.getElementById('viewDoctorName').textContent = appointmentData.doctor;
    document.getElementById('viewDateTime').textContent = appointmentData.dateTime;
    document.getElementById('viewAppointmentType').textContent = appointmentData.type;
    document.getElementById('viewContact').textContent = appointmentData.contact;
    document.getElementById('viewReason').textContent = appointmentData.reason;
    
    // Update status badge
    const statusBadge = document.getElementById('viewStatus');
    statusBadge.textContent = appointmentData.status.charAt(0).toUpperCase() + appointmentData.status.slice(1);
    statusBadge.className = `status-badge ${appointmentData.status}`;
    
    // Show/hide buttons based on status
    const updateStatusBtn = document.getElementById('updateAppointmentStatus');
    if (appointmentData.status === 'pending') {
        updateStatusBtn.textContent = 'Confirm Appointment';
    } else if (appointmentData.status === 'confirmed') {
        updateStatusBtn.textContent = 'Mark as Completed';
    } else {
        updateStatusBtn.style.display = 'none';
    }
    
    // Open modal
    openModal(viewAppointmentModal);
}

// Upload Report Modal
function handleUploadReport() {
    const appointmentId = this.getAttribute('data-id');
    
    // In a real app, you would fetch patient data from the server
    // For demo, we'll use hardcoded data
    let patientName;
    
    if (appointmentId === 'APT003' || appointmentId === 'REP003') {
        patientName = 'John Doe';
    } else {
        patientName = 'Robert Johnson';
    }
    
    // Set patient name in form
    document.getElementById('reportPatient').value = patientName;
    
    // Set current date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('reportDate').value = today;
    
    // Open modal
    openModal(uploadReportModal);
}

// Report Upload Form Submission
reportUploadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const patientName = document.getElementById('reportPatient').value;
    const reportType = document.getElementById('reportType').value;
    const reportDate = document.getElementById('reportDate').value;
    const reportFile = document.getElementById('reportFile').files[0];
    const reportNotes = document.getElementById('reportNotes').value;
    
    // Here you would normally upload the file to your server
    // For demo purposes, we'll just show a success message and close the modal
    alert(`Report for ${patientName} uploaded successfully!`);
    
    // Reset form and close modal
    reportUploadForm.reset();
    closeModal(uploadReportModal);
    
    // Refresh the report list (in a real app, you would fetch from server)
    // For demo, we'll update the status of the pending report
    const pendingReport = document.querySelector('tr:has(td:contains("Pending Upload"))');
    if (pendingReport) {
        const statusCell = pendingReport.querySelector('td:nth-child(6)');
        statusCell.innerHTML = '<span class="status-badge completed">Uploaded</span>';
        
        const actionsCell = pendingReport.querySelector('td:nth-child(7)');
        actionsCell.innerHTML = `
            <div class="action-buttons">
                <button class="btn icon-btn view-report" data-id="REP003" title="View Report">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn icon-btn download-report" data-id="REP003" title="Download">
                    <i class="fas fa-download"></i>
                </button>
                <button class="btn icon-btn delete-report" data-id="REP003" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }
});

// Handle appointment status changes
function handleApproveAppointment() {
    const appointmentId = this.getAttribute('data-id');
    const row = this.closest('tr');
    
    // Update status in the table
    const statusCell = row.querySelector('td:nth-child(6)');
    statusCell.innerHTML = '<span class="status-badge confirmed">Confirmed</span>';
    
    // Update action buttons
    const actionsCell = row.querySelector('td:nth-child(7)');
    actionsCell.innerHTML = `
        <div class="action-buttons">
            <button class="btn icon-btn complete-appointment" data-id="${appointmentId}" title="Mark as Completed">
                <i class="fas fa-check-double"></i>
            </button>
            <button class="btn icon-btn cancel-appointment" data-id="${appointmentId}" title="Cancel">
                <i class="fas fa-times"></i>
            </button>
            <button class="btn icon-btn view-appointment" data-id="${appointmentId}" title="View Details">
                <i class="fas fa-eye"></i>
            </button>
        </div>
    `;
    
    // Add event listeners to new buttons
    actionsCell.querySelector('.complete-appointment').addEventListener('click', handleCompleteAppointment);
    actionsCell.querySelector('.cancel-appointment').addEventListener('click', handleCancelAppointment);
    actionsCell.querySelector('.view-appointment').addEventListener('click', handleViewAppointment);
    
    alert(`Appointment ${appointmentId} has been confirmed.`);
}

function handleCompleteAppointment() {
    const appointmentId = this.getAttribute('data-id');
    const row = this.closest('tr');
    
    // Update status in the table
    const statusCell = row.querySelector('td:nth-child(6)');
    statusCell.innerHTML = '<span class="status-badge completed">Completed</span>';
    
    // Update action buttons
    const actionsCell = row.querySelector('td:nth-child(7)');
    actionsCell.innerHTML = `
        <div class="action-buttons">
            <button class="btn icon-btn upload-report" data-id="${appointmentId}" title="Upload Report">
                <i class="fas fa-file-upload"></i>
            </button>
            <button class="btn icon-btn view-appointment" data-id="${appointmentId}" title="View Details">
                <i class="fas fa-eye"></i>
            </button>
        </div>
    `;
    
    // Add event listeners to new buttons
    actionsCell.querySelector('.upload-report').addEventListener('click', handleUploadReport);
    actionsCell.querySelector('.view-appointment').addEventListener('click', handleViewAppointment);
    
    alert(`Appointment ${appointmentId} has been marked as completed.`);
}

function handleCancelAppointment() {
    const appointmentId = this.getAttribute('data-id');
    const row = this.closest('tr');
    
    if (confirm(`Are you sure you want to cancel appointment ${appointmentId}?`)) {
        // Update status in the table
        const statusCell = row.querySelector('td:nth-child(6)');
        statusCell.innerHTML = '<span class="status-badge cancelled">Cancelled</span>';
        
        // Update action buttons
        const actionsCell = row.querySelector('td:nth-child(7)');
        actionsCell.innerHTML = `
            <div class="action-buttons">
                <button class="btn icon-btn reschedule-appointment" data-id="${appointmentId}" title="Reschedule">
                    <i class="fas fa-calendar-alt"></i>
                </button>
                <button class="btn icon-btn view-appointment" data-id="${appointmentId}" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        `;
        
        // Add event listeners to new buttons
        actionsCell.querySelector('.view-appointment').addEventListener('click', handleViewAppointment);
        
        alert(`Appointment ${appointmentId} has been cancelled.`);
    }
}

// Handle doctor actions
function handleEditDoctor() {
    const doctorId = this.getAttribute('data-id');
    alert(`Edit doctor with ID: ${doctorId}`);
    // In a real app, you would open a modal with the doctor's data for editing
}

function handleDeleteDoctor() {
    const doctorId = this.getAttribute('data-id');
    if (confirm(`Are you sure you want to delete doctor with ID: ${doctorId}?`)) {
        // Remove the row from the table
        this.closest('tr').remove();
        alert(`Doctor with ID: ${doctorId} has been deleted.`);
    }
}

// Handle report actions
function handleViewReport() {
    const reportId = this.getAttribute('data-id');
    alert(`View report with ID: ${reportId}`);
    // In a real app, you would open a modal or new page with the report details
}

function handleDownloadReport() {
    const reportId = this.getAttribute('data-id');
    alert(`Downloading report with ID: ${reportId}`);
    // In a real app, you would trigger a file download
}

function handleDeleteReport() {
    const reportId = this.getAttribute('data-id');
    if (confirm(`Are you sure you want to delete report with ID: ${reportId}?`)) {
        // Remove the row from the table
        this.closest('tr').remove();
        alert(`Report with ID: ${reportId} has been deleted.`);
    }
}

// Filter appointments
appointmentStatusFilter.addEventListener('change', function() {
    const status = this.value;
    const rows = document.querySelectorAll('#appointment-management tbody tr');
    
    rows.forEach(row => {
        const statusBadge = row.querySelector('.status-badge');
        if (status === 'all' || statusBadge.classList.contains(status)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

appointmentDateFilter.addEventListener('change', function() {
    const selectedDate = new Date(this.value);
    const rows = document.querySelectorAll('#appointment-management tbody tr');
    
    if (isNaN(selectedDate.getTime())) {
        // If no date is selected, show all rows
        rows.forEach(row => {
            row.style.display = '';
        });
        return;
    }
    
    const formattedSelectedDate = selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    rows.forEach(row => {
        const dateCell = row.querySelector('.date');
        if (dateCell.textContent === formattedSelectedDate) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Filter reports
reportTypeFilter.addEventListener('change', function() {
    const type = this.value;
    const rows = document.querySelectorAll('#report-management tbody tr');
    
    rows.forEach(row => {
        const reportType = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
        
        if (type === 'all') {
            row.style.display = '';
        } else if (type === 'lab' && reportType.includes('blood')) {
            row.style.display = '';
        } else if (type === 'xray' && reportType.includes('x-ray')) {
            row.style.display = '';
        } else if (type === 'other' && reportType.includes('ecg')) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Doctor management
    editDoctorBtns.forEach(btn => {
        btn.addEventListener('click', handleEditDoctor);
    });
    
    deleteDoctorBtns.forEach(btn => {
        btn.addEventListener('click', handleDeleteDoctor);
    });
    
    // Appointment management
    viewAppointmentBtns.forEach(btn => {
        btn.addEventListener('click', handleViewAppointment);
    });
    
    approveAppointmentBtns.forEach(btn => {
        btn.addEventListener('click', handleApproveAppointment);
    });
    
    cancelAppointmentBtns.forEach(btn => {
        btn.addEventListener('click', handleCancelAppointment);
    });
    
    completeAppointmentBtns.forEach(btn => {
        btn.addEventListener('click', handleCompleteAppointment);
    });
    
    // Report management
    uploadReportBtns.forEach(btn => {
        btn.addEventListener('click', handleUploadReport);
    });
    
    viewReportBtns.forEach(btn => {
        btn.addEventListener('click', handleViewReport);
    });
    
    downloadReportBtns.forEach(btn => {
        btn.addEventListener('click', handleDownloadReport);
    });
    
    deleteReportBtns.forEach(btn => {
        btn.addEventListener('click', handleDeleteReport);
    });
    
    // Close appointment details
    closeAppointmentDetails.addEventListener('click', function() {
        closeModal(viewAppointmentModal);
    });
    
    // Cancel report upload
    cancelReportUpload.addEventListener('click', function() {
        closeModal(uploadReportModal);
        reportUploadForm.reset();
    });
});