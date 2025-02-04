document.addEventListener("DOMContentLoaded", function () {
    // Create the modal container
    let modalContainer = document.createElement("div");
    modalContainer.id = "myModal";
    modalContainer.className = "modal fade";
    modalContainer.setAttribute("tabindex", "-1");
    modalContainer.setAttribute("role", "dialog");
    modalContainer.setAttribute("aria-labelledby", "exampleModalLabel");
    modalContainer.setAttribute("aria-hidden", "true");
    modalContainer.setAttribute("data-backdrop", "static");
    modalContainer.setAttribute("data-keyboard", "false");

    // Add modal HTML content
    modalContainer.innerHTML = `
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <!-- Modal Header with Close Button -->
                <div class="modal-header heading-section d-flex align-items-center position-relative">
                    <h3 class="modal-title heading_color text-center mx-auto bold-text" id="exampleModalLabel">
                        Get Connected with an Expert
                    </h3>
                    <button type="button" class="close" style="position: absolute; right: 1rem; top: 50%; transform: translateY(-20%);" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <!-- Modal Body (Form) -->
                <div class="modal-body">
                    <form id="enquiryForm" method="POST" role="form" class="enquiry-form ftco-animate">
                        <div class="row mb-1">
                            <div class="col-12 col-lg-6">
                                <div class="form-group">
                                    <input type="text" class="form-control" id="name1" placeholder="Name" required>
                                </div>
                            </div>
                            <div class="col-12 col-lg-6">
                                <div class="form-group">
                                    <input type="email" class="form-control" id="email1" placeholder="Email-Id" required>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-1">
                            <div class="col-12 col-lg-6">
                                <div class="form-group">
                                    <input type="tel" class="form-control" id="contact_number1" placeholder="Contact Number" required>
                                </div>
                            </div>
                            <div class="col-12 col-lg-6">
                                <div class="form-group">
                                    <input type="text" class="form-control" id="qualification1" placeholder="Qualification" required>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-1">
                            <div class="col-12 col-lg-6">
                                <div class="form-group">
                                    <select class="form-control" id="program1" required>
                                        <option value="" disabled selected>Select Program</option>
                                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                                        <option value="Master's Degree">Master's Degree</option>
                                        <option value="PhD">PhD</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 col-lg-6">
                                <div class="form-group">
                                    <select class="form-control" id="destination1" required>
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
                        </div>

                        <div class="form-group mb-1">
                            <textarea class="form-control" id="message1" rows="4" placeholder="Feel free to ask or share your thoughts" required></textarea>
                        </div>

                        <div class="my-3">
                            <div class="loading">Loading</div>
                            <div class="error-message"></div>
                            <div class="sent-message">Your message has been sent. Thank you!</div>
                        </div>

                        <div class="form-group text-center">
                            <button type="submit" class="btn btn-primary btn-lg py-3 px-5 custom-btn" style="background-color: #ffffff; color: #000;">
                                Avail FREE Counselling
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Append modal to body
    document.body.appendChild(modalContainer);

    // Event Listener for Form Submission
    document.getElementById("enquiryForm").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Form submitted successfully!");
        $("#myModal").modal("hide");
    });
});

// Function to Open the Modal
function openModal() {
    $("#myModal").modal("show");
}
