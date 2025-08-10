// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for appointment action buttons
    const editButtons = document.querySelectorAll('.appointment-actions .outline-btn');
    const cancelButtons = document.querySelectorAll('.appointment-actions .outline-danger');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Edit appointment functionality will be implemented here.');
        });
    });
    
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel this appointment?')) {
                // Here you would normally send a request to the server
                // For demo purposes, we'll just remove the appointment card
                const appointmentCard = this.closest('.appointment-card');
                appointmentCard.style.opacity = '0';
                setTimeout(() => {
                    appointmentCard.remove();
                    
                    // Check if there are no more appointments
                    const appointmentsList = document.querySelector('.appointments-list');
                    if (appointmentsList.children.length === 0) {
                        appointmentsList.innerHTML = '<p class="no-data">No upcoming appointments.</p>';
                    }
                }, 300);
            }
        });
    });
    
    // Feature card hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });
    
    // Open report analyzer in a browser side window
    const analyzeReportBtn = document.getElementById('analyzeReportBtn');
    if (analyzeReportBtn) {
        analyzeReportBtn.addEventListener('click', function(event) {
            event.preventDefault();
            const width = 480;
            const height = 700;
            const left = screen.width - width - 10;
            const top = screen.height - height - 50;
            window.open('report-analyzer.html', '_blank', `width=${width},height=${height},left=${left},top=${top}`);
        });
    }
});