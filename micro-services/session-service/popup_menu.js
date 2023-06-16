$(document).ready(function () {
    var hamburgerIcon = $('#hamburger-icon');
    var popupMenu = $('#popup-menu');
    var customizationBtn = $('#customization-btn');
    var viewBtn = $('#view-btn');
    var logoutBtn = $('#logout-btn');
    var loginBtn = $('#login-btn');
    var sectionTitle = $('#section-title');
    var customizationContent = $('#customization-content');
    var viewContent = $('#view-content');

    popupMenu.hide()

    // Function to open the menu
    function openMenu() {
        popupMenu.show();
    }

    // Function to close the menu
    function closeMenu() {
        popupMenu.hide();
    }



    // Function to switch to customization section
    function switchToCustomization() {
        sectionTitle.text('Customization');
        customizationContent.addClass('active');
        viewContent.removeClass('active');
    }

    // Function to switch to view section
    function switchToView() {
        sectionTitle.text('View');
        customizationContent.removeClass('active');
        viewContent.addClass('active');
    }

    // Function to handle login/logout
    function handleAuthentication(loggedIn) {
        if (loggedIn) {
            logoutBtn.show();
            loginBtn.hide();
        } else {
            logoutBtn.hide();
            loginBtn.show();
        }
    }

    // Initially hide the logout button
    logoutBtn.hide();

    // Attach event handlers
    hamburgerIcon.click(openMenu);
    popupMenu.click(function (event) {
        if (event.target === popupMenu[0]) {
            closeMenu();
        }
    });
    customizationBtn.click(switchToCustomization);
    viewBtn.click(switchToView);
    logoutBtn.click(function () {
        handleAuthentication(false);
    });
    loginBtn.click(function () {
        handleAuthentication(true);
    });
});