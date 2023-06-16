    $(document).ready(function () {
      var menu = $('#popup-menu');
      var openBtn = $('#open-menu-btn');
      var customizationBtn = $('#customization-btn');
      var viewBtn = $('#view-btn');
      var logoutBtn = $('#logout-btn');
      var loginBtn = $('#login-btn');
      var sectionTitle = $('#section-title');
      var customizationContent = $('#customization-content');
      var viewContent = $('#view-content');

      // Function to open the menu
      function openMenu() {
        menu.show();
      }

      // Function to close the menu
      function closeMenu() {
        menu.hide();
      }

      // Function to switch to the Customization section
      function switchToCustomization() {
        sectionTitle.text('Customization');
        customizationContent.addClass('active');
        viewContent.removeClass('active');
      }

      // Function to switch to the View section
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
      openBtn.click(openMenu);
      menu.click(function (event) {
        if (event.target === menu[0]) {
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