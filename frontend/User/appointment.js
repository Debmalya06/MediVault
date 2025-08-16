// DOM Elements
const appointmentForm = document.getElementById('appointmentForm');
const doctorSelect = document.getElementById('doctor');
const selectDoctorBtns = document.querySelectorAll('.select-doctor-btn');
const confirmationModal = document.getElementById('confirmationModal');
const closeModal = document.querySelector('.close-modal');
const closeConfirmation = document.getElementById('closeConfirmation');
const confirmDoctor = document.getElementById('confirmDoctor');
const confirmDate = document.getElementById('confirmDate');
const confirmTime = document.getElementById('confirmTime');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const filterSpecialization = document.getElementById('filterSpecialization');
const filterAvailability = document.getElementById('filterAvailability');
const appointmentStatusFilter = document.getElementById('appointmentStatusFilter');
const doctorCards = document.querySelectorAll('.doctor-card');
const appointmentItems = document.querySelectorAll('.appointment-item');

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Set min date for appointment date (today)
const today = new Date().toISOString().split('T')[0];
document.getElementById('appointmentDate').min = today;

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

// Doctor selection buttons
selectDoctorBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const doctorValue = this.getAttribute('data-doctor');
        doctorSelect.value = doctorValue;
        
        // Highlight selected doctor card
        doctorCards.forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`.doctor-card[data-doctor="${doctorValue}"]`).classList.add('selected');
        
        // Update specialization based on selected doctor
        const doctorCard = this.closest('.doctor-card');
        const specialization = doctorCard.getAttribute('data-specialization');
        
        if (specialization === 'general') {
            document.getElementById('specialization').value = 'general';
        } else if (specialization === 'cardiology') {
            document.getElementById('specialization').value = 'cardiology';
        } else if (specialization === 'neurology') {
            document.getElementById('specialization').value = 'neurology';
        }
        
        // Scroll to form
        document.querySelector('.appointment-form-container').scrollIntoView({ behavior: 'smooth' });
    });
});

// Filter doctors
function filterDoctors() {
    const specializationFilter = filterSpecialization.value;
    const availabilityFilter = filterAvailability.value;
    
    doctorCards.forEach(card => {
        const cardSpecialization = card.getAttribute('data-specialization');
        const cardAvailability = card.getAttribute('data-availability');
        
        let showCard = true;
        
        if (specializationFilter !== 'all' && cardSpecialization !== specializationFilter) {
            showCard = false;
        }
        
        if (availabilityFilter !== 'all') {
            if (availabilityFilter === 'today' && cardAvailability !== 'today') {
                showCard = false;
            } else if (availabilityFilter === 'week' && cardAvailability === 'month') {
                showCard = false;
            }
        }
        
        card.style.display = showCard ? 'flex' : 'none';
    });
}

filterSpecialization.addEventListener('change', filterDoctors);
filterAvailability.addEventListener('change', filterDoctors);

// Filter appointments
appointmentStatusFilter.addEventListener('change', function() {
    const statusFilter = this.value;
    
    appointmentItems.forEach(item => {
        if (statusFilter === 'all') {
            item.style.display = 'flex';
        } else {
            if (item.classList.contains(statusFilter)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        }
    });
});

// Format date function
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

// Close modal functions
function closeModalFunc() {
    confirmationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    appointmentForm.reset();
    doctorCards.forEach(card => {
        card.classList.remove('selected');
    });
}

closeModal.addEventListener('click', closeModalFunc);
closeConfirmation.addEventListener('click', closeModalFunc);

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === confirmationModal) {
        closeModalFunc();
    }
});

// Handle appointment actions in My Appointments tab
document.addEventListener('DOMContentLoaded', function() {
    // Reschedule buttons
    const rescheduleButtons = document.querySelectorAll('.appointment-actions .outline-btn');
    rescheduleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Switch to new appointment tab and pre-fill form
            document.querySelector('[data-tab="new-appointment"]').click();
            document.querySelector('.appointment-form-container').scrollIntoView({ behavior: 'smooth' });
            alert('You can now reschedule your appointment with the form above.');
        });
    });
    
    // Cancel buttons
    const cancelButtons = document.querySelectorAll('.appointment-actions .outline-danger');
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel this appointment?')) {
                const appointmentItem = this.closest('.appointment-item');
                
                // Change status to cancelled
                const statusBadge = appointmentItem.querySelector('.appointment-status');
                statusBadge.textContent = 'Cancelled';
                statusBadge.className = 'appointment-status cancelled';
                
                // Update actions
                const actionsDiv = appointmentItem.querySelector('.appointment-actions');
                actionsDiv.innerHTML = `
                    <button class="btn primary-btn"><i class="fas fa-calendar-plus"></i> Reschedule</button>
                `;
                
                // Add class for filtering
                appointmentItem.className = 'appointment-item cancelled';
                
                // Add event listener to new reschedule button
                actionsDiv.querySelector('.primary-btn').addEventListener('click', function() {
                    document.querySelector('[data-tab="new-appointment"]').click();
                    document.querySelector('.appointment-form-container').scrollIntoView({ behavior: 'smooth' });
                });
            }
        });
    });
    
    // Specialization change
    document.getElementById('specialization').addEventListener('change', function() {
        const selectedSpecialization = this.value;
        
        // Update doctor dropdown based on specialization
        const doctorOptions = doctorSelect.options;
        
        // Reset doctor dropdown
        doctorSelect.value = '';
        
        // Show/hide doctors based on specialization
        for (let i = 0; i < doctorOptions.length; i++) {
            const option = doctorOptions[i];
            
            if (option.value === '') continue; // Skip placeholder option
            
            if (selectedSpecialization === 'general' && option.value === 'dr-chen') {
                option.style.display = '';
            } else if (selectedSpecialization === 'cardiology' && option.value === 'dr-johnson') {
                option.style.display = '';
            } else if (selectedSpecialization === 'neurology' && option.value === 'dr-wilson') {
                option.style.display = '';
            } else {
                option.style.display = 'none';
            }
        }
    });

    // Dynamically set the username
    const username = localStorage.getItem('username') || 'User';
    document.getElementById('username').textContent = username;

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('username');
        localStorage.removeItem('userEmail');
        window.location.href = '../login.html';
    });
});


/////

// Fetch and display doctors in the Appointment section
async function fetchDoctors() {
    try {
        const response = await fetch("https://medivault-r1do.onrender.com/api/doctors/getdoctors");
        if (!response.ok) {
            throw new Error(`Failed to fetch doctors. Status: ${response.status}`);
        }

        const doctors = await response.json();
        const doctorsList = document.querySelector(".doctors-list");
        doctorsList.innerHTML = ""; // Clear existing doctor cards

        doctors.forEach(doctor => {
            const doctorCard = document.createElement("div");
            doctorCard.className = "doctor-card";
            doctorCard.setAttribute("data-doctor", doctor.id);
            doctorCard.setAttribute("data-specialization", doctor.specialization);
            doctorCard.setAttribute("data-availability", doctor.availability);

            doctorCard.innerHTML = `
                <img src="${doctor.imageUrl || '/placeholder.svg?height=100&width=100'}" alt="${doctor.name}" class="doctor-image">
                <div class="doctor-info">
                    <h3>${doctor.name}</h3>
                    <p class="doctor-specialty">${doctor.specialization}</p>
                    <div class="doctor-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                        <span>(120 reviews)</span>
                    </div>
                    <p class="doctor-availability available">
                        <i class="fas fa-calendar-check"></i> ${doctor.availability}
                    </p>
                    <button class="btn outline-btn select-doctor-btn" data-doctor="${doctor.id}">Select</button>
                </div>
            `;

            doctorsList.appendChild(doctorCard);
        });

        // Add event listeners to the dynamically created "Select" buttons
        document.querySelectorAll(".select-doctor-btn").forEach(button => {
            button.addEventListener("click", function () {
                const doctorId = this.getAttribute("data-doctor");
                document.getElementById("doctor").value = doctorId;

                // Highlight the selected doctor card
                document.querySelectorAll(".doctor-card").forEach(card => {
                    card.classList.remove("selected");
                });
                this.closest(".doctor-card").classList.add("selected");

                // Scroll to the appointment form
                document.querySelector(".appointment-form-container").scrollIntoView({ behavior: "smooth" });
            });
        });
    } catch (error) {
        console.error("Error fetching doctors:", error);
    }
}

// Call fetchDoctors when the page loads
document.addEventListener("DOMContentLoaded", function () {
    fetchDoctors();
});

document.addEventListener('DOMContentLoaded', function () {
    const appointmentForm = document.getElementById('appointmentForm');
    const confirmationModal = document.getElementById('confirmationModal');
    const closeConfirmation = document.getElementById('closeConfirmation');
    const confirmDoctor = document.getElementById('confirmDoctor');
    const confirmDate = document.getElementById('confirmDate');
    const confirmTime = document.getElementById('confirmTime');

    appointmentForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Collect form data
        const data = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            age: parseInt(document.getElementById('age').value),
            gender: document.getElementById('gender').value,
            appointmentType: document.getElementById('appointmentType').value,
            specialization: document.getElementById('specialization').value,
            doctor: document.getElementById('doctor').value,
            appointmentDate: document.getElementById('appointmentDate').value,
            appointmentTime: document.getElementById('appointmentTime').value,
            reason: document.getElementById('reason').value,
            previousVisit: document.querySelector('input[name="previousVisit"]:checked').value
        };

        try {
            const response = await fetch('https://medivault-r1do.onrender.com/api/appointments/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Show confirmation modal
                confirmDoctor.textContent = data.doctor;
                confirmDate.textContent = data.appointmentDate;
                confirmTime.textContent = data.appointmentTime;
                confirmationModal.style.display = 'block';
                appointmentForm.reset();
            } else {
                alert(result.message || 'Failed to book appointment');
            }
        } catch (error) {
            alert('Error booking appointment: ' + error.message);
        }
    });

    // Close confirmation modal
    closeConfirmation.addEventListener('click', function () {
        confirmationModal.style.display = 'none';
    });

    // Optional: Close modal when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    });
});

// Function to fetch and display appointments for the logged-in user
async function loadMyAppointments() {
    const email = localStorage.getItem('userEmail'); // Or get from your login/session
    if (!email) return;

    try {
        const response = await fetch(`https://medivault-r1do.onrender.com/api/appointments?email=${encodeURIComponent(email)}`);
        const appointments = await response.json();

        const appointmentsList = document.querySelector('.appointments-list');
        appointmentsList.innerHTML = '';

        if (appointments.length === 0) {
            appointmentsList.innerHTML = '<p>No appointments found.</p>';
            return;
        }

        appointments.forEach(app => {
            const item = document.createElement('div');
            item.className = `appointment-item ${app.status}`;

            item.innerHTML = `
                <div class="appointment-date">
                    <div class="date-box">
                        <span class="month">${new Date(app.appointmentDate).toLocaleString('en-US', { month: 'short' }).toUpperCase()}</span>
                        <span class="day">${new Date(app.appointmentDate).getDate()}</span>
                    </div>
                    <span class="time">${app.appointmentTime}</span>
                </div>
                <div class="appointment-details">
                    <h3>${app.appointmentType}</h3>
                    <p><i class="fas fa-user-md"></i> ${app.doctor}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${app.specialization}</p>
                    <span class="appointment-status ${app.status}">${app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
                </div>
                <div class="appointment-actions">
                    <!-- Add reschedule/cancel buttons if needed -->
                </div>
            `;
            appointmentsList.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading appointments:', error);
    }
}

// Call this when "My Appointments" tab is shown
document.querySelector('[data-tab="my-appointments"]').addEventListener('click', loadMyAppointments);

// Optionally, load on page ready if tab is active
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.tab-btn[data-tab="my-appointments"]').classList.contains('active')) {
        loadMyAppointments();
    }
});