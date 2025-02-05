document.addEventListener("DOMContentLoaded", function () {
    const openButtons = document.querySelectorAll(".open-form");

    function createAndShowForm() {
        // Remove existing form if any
        let existingPopup = document.getElementById("popup");
        if (existingPopup) {
            existingPopup.remove();
        }

        // Create the form HTML dynamically
        const popupOverlay = document.createElement("div");
        popupOverlay.id = "popup";
        popupOverlay.className = "popup-overlay";
        popupOverlay.style.position = "fixed";
        popupOverlay.style.top = "0";
        popupOverlay.style.left = "0";
        popupOverlay.style.width = "100%";
        popupOverlay.style.height = "100%";
        popupOverlay.style.background = "rgba(0, 0, 0, 0.5)";
        popupOverlay.style.display = "flex";
        popupOverlay.style.justifyContent = "center";
        popupOverlay.style.alignItems = "center";

        popupOverlay.innerHTML = `
        <div class="popup-form" style="background:#ffffff; padding:20px; border-radius:10px; width:90%; max-width:450px; color:#2e3192; position:relative;">
            <span class="close-btn" style="position:absolute; top:10px; right:15px; font-size:20px; cursor:pointer; color:black;">&times;</span>
            <h4 class="text-center bold-text" style="color:#2e3192">Get Connected with an Expert</h4>
            <form style='background:#2e3192; padding:20px;'>
                <div class="row mb-4">
                    <div class="col-6">
                        <input type="text" class="form-control" placeholder="Name">
                    </div>
                    <div class="col-6">
                        <input type="email" class="form-control" placeholder="Email-Id">
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col-6">
                        <input type="text" class="form-control" placeholder="Contact Number">
                    </div>
                    <div class="col-6">
                        <input type="text" class="form-control" placeholder="Qualification">
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col-6">
                        <select class="form-control">
                           <option value="" disabled selected>Select Program</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="PhD">PhD</option>
                      <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="col-6">
                        <select class="form-control">
                             <option value="" disabled selected>Select Study Destination</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Poland">Poland</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Australia">Australia</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="New Zealand">New Zealand</option>
                        </select>
                    </div>
                </div>
                <div class="mb-4">
                    <textarea class="form-control" rows="4" placeholder="Feel free to ask or share your thoughts"></textarea>
                </div>
                <div class="form-group text-center">
                <button type="submit" class="btn btn-light py-3 px-5" style="border-radius: 20px;">Avail FREE Counselling</button>
                </div>
            </form>
        </div>
    `;

        document.body.appendChild(popupOverlay);

        // Close popup on clicking 'X' button
        document.querySelector(".close-btn").addEventListener("click", function () {
            popupOverlay.style.display = "none";
        });

        // Close popup when clicking outside the form
        popupOverlay.addEventListener("click", function (event) {
            if (event.target === popupOverlay) {
                popupOverlay.style.display = "none";
            }
        });
    }

    // Attach event listeners to all "open-form" buttons
    openButtons.forEach(button => {
        button.addEventListener("click", function () {
            createAndShowForm();
        });
    });
});
