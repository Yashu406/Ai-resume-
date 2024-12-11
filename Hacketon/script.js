// Initialize CodeMirror editor
var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "javascript", // Set the language mode
    theme: "dracula",    // Set the theme
    lineNumbers: true,   // Show line numbers
    matchBrackets: true, // Highlight matching brackets
    indentUnit: 4,       // Set indentation width
    tabSize: 4,          // Set tab size
    autofocus: true,     // Auto-focus the editor when page loads
    lineWrapping: true,  // Wrap long lines
});

// Feedback Section Elements
const feedbackSection = document.getElementById("feedback");
const feedbackText = document.getElementById("feedbackText");
const submitCodeBtn = document.getElementById("submitCodeBtn");

// Function to simulate code evaluation
function evaluateCode(code) {
    let feedback = '';
    try {
        // Here we simulate running the code. You could call your backend for real evaluation.
        // Let's assume the code should print "Hello, World!" to be correct.
        if (code.includes('console.log("Hello, World!")')) {
            feedback = 'Code is correct! Output: "Hello, World!"';
        } else {
            feedback = 'Error: Code did not produce the expected output.';
        }
    } catch (error) {
        feedback = `Error: ${error.message}`;
    }
    return feedback;
}

// Event listener for Submit button
submitCodeBtn.addEventListener("click", function () {
    // Get the code from the editor
    const userCode = editor.getValue();

    // Evaluate the code and get feedback
    const result = evaluateCode(userCode);

    // Display feedback
    feedbackText.textContent = result;
    feedbackSection.classList.add("show");
});
document.getElementById("start-screening").addEventListener("click", function() {
    var fileInput = document.getElementById("resume-upload");
    var file = fileInput.files[0];

    // Check if a file is selected
    if (!file) {
        alert("Please upload a resume file.");
        return;
    }

    // Show the feedback section and simulate the analysis process
    document.getElementById("feedback").classList.remove("hidden");
    document.getElementById("feedbackText").innerText = "Analyzing your resume...";

    // Simulating the resume analysis process (you can replace this part with a real API call)
    setTimeout(function() {
        document.getElementById("feedbackText").innerText = "Your resume has been successfully analyzed! Here are the key insights: \n- Skills: JavaScript, Python\n- Experience: 3 years in software development\n- Strengths: Problem-solving, Team collaboration";
    }, 3000); // Simulated analysis time (3 seconds)
});
document.getElementById("schedule-interview-btn").addEventListener("click", function() {
    var interviewDate = document.getElementById("interview-date").value;
    
    if (!interviewDate) {
        alert("Please select a date for the interview.");
        return;
    }

    // Prepare data for scheduling the interview
    var interviewDetails = {
        topic: "Mock Interview",
        start_time: interviewDate, // The selected interview time
        duration: 60, // Interview duration in minutes
        timezone: "UTC", // You can adjust the timezone based on user preference
        agenda: "Interview practice session",
    };

    // Zoom API Endpoint for scheduling a meeting
    var zoomApiUrl = 'https://api.zoom.us/v2/users/me/meetings';
    
    // Use your OAuth2 access token from Zoom API (replace with your actual token)
    var accessToken = "YOUR_ZOOM_ACCESS_TOKEN";
    
    // Create the meeting using Zoom API
    fetch(zoomApiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            topic: interviewDetails.topic,
            type: 2, // Scheduled meeting
            start_time: interviewDetails.start_time,
            duration: interviewDetails.duration,
            timezone: interviewDetails.timezone,
            agenda: interviewDetails.agenda
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.join_url) {
            // Successfully scheduled the interview
            document.getElementById("zoom-link-section").classList.remove("hidden");
            document.getElementById("zoom-link").href = data.join_url;
            document.getElementById("zoom-link").innerText = "Join Zoom Interview";
            document.getElementById("confirmation").classList.remove("hidden");
        } else {
            alert("Error scheduling the interview. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error scheduling Zoom meeting:", error);
        alert("Error scheduling the interview. Please try again.");
    });
});

 // Simple JavaScript for toggling leaderboard visibility
 document.getElementById('leaderboardBtn').onclick = function() {
    const leaderboardTable = document.getElementById('leaderboardTable');
    // Toggle visibility of the leaderboard table
    if (leaderboardTable.classList.contains('hidden')) {
        leaderboardTable.classList.remove('hidden');
    } else {
        leaderboardTable.classList.add('hidden');
    }
};
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log("Full Name: " + profile.getName());
    console.log("Email: " + profile.getEmail());

    // You can send this data to your backend for further processing
}
