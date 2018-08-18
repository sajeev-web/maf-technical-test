/* ---- Main js ----- */

;(function()
{
    "use strict";

    var Main = (function()
    {
        var CONSTANTS = 
        {
            ID_SELECTORS:
            {
                "loginForm": "#login-form",
                "loginBtn": "#login-btn"
            },
            CLASS_SELECTORS:
            {
                "searchBtn": ".search-label",
                "labelUsername": ".label-username",
                "labelPassword": ".label-password"
            },
            CUSTOM_SELECTORS:
            {
                "usernameField": "input[name='username']",
                "passwordField": "input[name='password']"
            }
        }

        return {
            main: function()
            {
                if ($(CONSTANTS.CLASS_SELECTORS.searchBtn).length > 0) {
                    this.handleSearch();
                }
                if ($(CONSTANTS.ID_SELECTORS.loginForm).length > 0) {
                    this.handleGeneralEvents();
                    this.validateForm();
                }
            },
            handleSearch: function()
            {
                $(CONSTANTS.CLASS_SELECTORS.searchBtn).on("click", function(evnt)
                {
                    var $this = $(this); // dom element cached to $this variable
                    if ($this.parent().hasClass("unleash-search")) {
                        $this.parent().find("input").val("");
                    }
                    $this.parent().toggleClass("unleash-search");
                    evnt.stopPropagation();
                });
            },
            handleGeneralEvents: function() {
                var $inputUserName = $(CONSTANTS.CUSTOM_SELECTORS.usernameField);
                var $inputPassword = $(CONSTANTS.CUSTOM_SELECTORS.passwordField);
                var $labelUserName = $(CONSTANTS.CLASS_SELECTORS.labelUsername);
                var $labelPassword = $(CONSTANTS.CLASS_SELECTORS.labelPassword);

                $inputUserName.on("focus", function() {
                    $inputUserName.removeClass("border-danger");
                    $inputUserName.parent().find(".notify").addClass("v-hidden");
                    $labelUserName.removeClass("v-hidden");
                    $inputUserName.attr("placeholder", "");
                });

                $inputPassword.on("focus", function() {
                    $inputPassword.removeClass("border-danger");
                    $inputPassword.parent().find(".notify").addClass("v-hidden");
                    $labelPassword.removeClass("v-hidden");
                    $inputPassword.attr("placeholder", "");
                });

                $inputUserName.on("blur", function() {
                    $labelUserName .addClass("v-hidden");
                    $inputUserName.attr("placeholder", "User name");
                });

                $inputPassword.on("blur", function() {
                    $labelPassword.addClass("v-hidden");
                    $inputPassword.attr("placeholder", "Password");
                });
            },
            validateForm: function() {
                var $this = this;
                var $inputUserName = $(CONSTANTS.CUSTOM_SELECTORS.usernameField);
                var $inputPassword = $(CONSTANTS.CUSTOM_SELECTORS.passwordField);


                $(CONSTANTS.ID_SELECTORS.loginForm).submit(function(evnt){
                    evnt.preventDefault()
                    evnt.stopPropagation();
                    
                   if ($.trim($inputUserName.val()).length == 0) {
                        $(CONSTANTS.ID_SELECTORS.loginBtn).addClass("btn-shake-x");
                       $inputUserName.addClass("border-danger");
                       $inputUserName.parent().find(".notify").removeClass("v-hidden");
                       setTimeout(function(){$(CONSTANTS.ID_SELECTORS.loginBtn).removeClass("btn-shake-x");}, 820);
                       return;
                   }
                   if ($.trim($inputPassword.val()).length == 0) {
                        $(CONSTANTS.ID_SELECTORS.loginBtn).addClass("btn-shake-x"); 
                       $inputPassword.addClass("border border-danger");
                       $inputPassword.parent().find(".notify").removeClass("v-hidden");
                       setTimeout(function(){$(CONSTANTS.ID_SELECTORS.loginBtn).removeClass("btn-shake-x");}, 820);
                        return;
                   }
                   
                   var dataToPass = {
                        username: $inputUserName.val(),
                        password: $inputPassword.val()
                   }

                   $.ajax({
                        method: "POST",
                        cache: false,
                        data: dataToPass,
                        beforeSend: function() {
                            if ($inputUserName.val() == "root" && $inputPassword.val() == "password") {
                                $(CONSTANTS.ID_SELECTORS.loginBtn).addClass("btn-shake-y");
                                $this.showSimulation();
                            } else {
                                $(CONSTANTS.ID_SELECTORS.loginBtn).addClass("btn-shake-x");
                                setTimeout(function(){
                                    $(CONSTANTS.ID_SELECTORS.loginBtn).removeClass("btn-shake-x");
                                    $(CONSTANTS.ID_SELECTORS.loginBtn) .text("Wrong username or password");
                                    setTimeout(function(){
                                        $(CONSTANTS.ID_SELECTORS.loginBtn) .text("Login");
                                    }, 2000);
                                }, 820);
                            }
                        },
                        success: function(data)
                        {
                            //if there is DB Success code comes here
                        }
                    });

                });
            },
            showSimulation: function() {
                setTimeout(function(){
                    var $inputUserName = $(CONSTANTS.CUSTOM_SELECTORS.usernameField);
                    var $inputPassword = $(CONSTANTS.CUSTOM_SELECTORS.passwordField);
                    $(CONSTANTS.ID_SELECTORS.loginBtn).removeClass("btn-shake-y");
                    $(CONSTANTS.ID_SELECTORS.loginBtn) .text("Your are signed in !");
                    $inputUserName.attr('disabled', 'disabled');
                    $inputPassword.attr('disabled', 'disabled');
                }, 2000);
                
            }

        }
    })();
    
    Main.main();
})();

